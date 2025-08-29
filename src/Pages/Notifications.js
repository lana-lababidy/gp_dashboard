import React, { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Bell,
  Send,
  Trash2,
  Users,
  School,
  FileText,
  X,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";

/**
 * Notifications Page (Admin)
 * - TailwindCSS styles only
 * - Recharts for charts
 * - lucide-react icons
 * Replace mock data and handlers with real API calls when integrating.
 */

/* -------------------- Mock Data -------------------- */
const MOCK_NOTIFICATIONS = [
  {
    id: 101,
    title: "Supply Drive Update",
    message: "New supplies available. Please confirm receipt.",
    targetType: "School",
    targetName: "Al-Rabee Primary",
    date: "2025-02-04T10:15:00Z",
    status: "Sent",
  },
  {
    id: 102,
    title: "Volunteer Event",
    message: "Join our weekend cleanup.",
    targetType: "Donor",
    targetName: "All Donors",
    date: "2025-02-03T16:40:00Z",
    status: "Sent",
  },
  {
    id: 103,
    title: "Reminder: Documents",
    message: "Please upload missing documents.",
    targetType: "School",
    targetName: "Al-Noor Secondary",
    date: "2025-02-02T08:05:00Z",
    status: "Draft",
  },
  {
    id: 104,
    title: "Thank You",
    message: "Your donation made a difference.",
    targetType: "Donor",
    targetName: "Top Donors",
    date: "2025-02-01T09:20:00Z",
    status: "Sent",
  },
  {
    id: 105,
    title: "Delivery Delay",
    message: "Shipment delayed due to weather.",
    targetType: "School",
    targetName: "Al-Mustaqbal Model",
    date: "2025-01-30T14:10:00Z",
    status: "Failed",
  },
];

const MOCK_MONTHLY_SENT = [
  { month: "Jan", sent: 35 },
  { month: "Feb", sent: 22 },
  { month: "Mar", sent: 28 },
  { month: "Apr", sent: 30 },
  { month: "May", sent: 26 },
  { month: "Jun", sent: 32 },
  { month: "Jul", sent: 40 },
  { month: "Aug", sent: 25 },
  { month: "Sep", sent: 29 },
  { month: "Oct", sent: 31 },
  { month: "Nov", sent: 27 },
  { month: "Dec", sent: 34 },
];

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

/* -------------------- Utilities -------------------- */
function classNames(...arr) {
  return arr.filter(Boolean).join(" ");
}

function toLocalDate(ts) {
  const d = new Date(ts);
  return d.toLocaleString();
}

function downloadCSV(filename, rows) {
  if (!rows || rows.length === 0) return;
  const header = Object.keys(rows[0]);
  const esc = (v) => `"${String(v ?? "").replaceAll('"', '""')}"`;
  const csv =
    [header.map(esc).join(",")]
      .concat(rows.map((r) => header.map((h) => esc(r[h])).join(",")))
      .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/* -------------------- Small UI Pieces -------------------- */
function Badge({ children, color = "gray" }) {
  const map = {
    gray: "bg-gray-100 text-gray-700",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
  };
  return (
    <span className={classNames("inline-flex px-2 py-1 rounded-md text-xs font-medium", map[color])}>
      {children}
    </span>
  );
}

function KPI({ color, icon: Icon, label, value, sub }) {
  const colorMap = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
  };
  return (
    <div className={classNames("rounded-xl shadow p-5 text-white", colorMap[color] || "bg-blue-500")}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm opacity-90">{label}</h4>
        {Icon ? <Icon size={24} /> : null}
      </div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
      {sub ? <div className="mt-1 text-xs opacity-90">{sub}</div> : null}
    </div>
  );
}

function SectionCard({ title, action, children }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

/* -------------------- Modal -------------------- */
function NewNotificationModal({ open, onClose, onSubmit, schools = [], donors = [] }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("All");
  const [specific, setSpecific] = useState("");

  if (!open) return null;

  function submit() {
    if (!title.trim() || !message.trim()) return;
    onSubmit({
      title,
      message,
      targetType: audience === "All" ? "All" : audience,
      targetName: audience === "School" ? (specific || "Selected School") :
                 audience === "Donor" ? (specific || "Selected Donor") : "All",
    });
    setTitle("");
    setMessage("");
    setAudience("All");
    setSpecific("");
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-semibold text-gray-800">Send New Notification</h4>
            <button
              className="p-2 rounded-lg hover:bg-gray-100"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Title</label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a concise title"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Message</label>
              <textarea
                className="w-full px-3 py-2 rounded-lg border border-gray-300 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write the notification content"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="block text-xs text-gray-500 mb-1">Audience</label>
                <select
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
                  value={audience}
                  onChange={(e) => { setAudience(e.target.value); setSpecific(""); }}
                >
                  <option value="All">All</option>
                  <option value="School">School</option>
                  <option value="Donor">Donor</option>
                </select>
              </div>
              {audience === "School" && (
                <div className="sm:col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">Select School</label>
                  <select
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
                    value={specific}
                    onChange={(e) => setSpecific(e.target.value)}
                  >
                    <option value="">Choose...</option>
                    {schools.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              )}
              {audience === "Donor" && (
                <div className="sm:col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">Select Donor</label>
                  <select
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
                    value={specific}
                    onChange={(e) => setSpecific(e.target.value)}
                  >
                    <option value="">Choose...</option>
                    {donors.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black"
                onClick={submit}
              >
                Send
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* -------------------- Main Page -------------------- */
 function Notifications() {
  const [rows, setRows] = useState(MOCK_NOTIFICATIONS);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [targetFilter, setTargetFilter] = useState("All");
  const [openModal, setOpenModal] = useState(false);

  // derive KPIs
  const total = rows.length;
  const schoolsCount = rows.filter((r) => r.targetType === "School").length;
  const donorsCount = rows.filter((r) => r.targetType === "Donor").length;
  const draftsCount = rows.filter((r) => r.status === "Draft").length;

  const schoolsList = useMemo(() => {
    return Array.from(new Set(rows.filter(r => r.targetType === "School").map(r => r.targetName)));
  }, [rows]);

  const donorsList = useMemo(() => {
    return Array.from(new Set(["All Donors", "Top Donors"]));
  }, []);

  // charts data
  const pieData = useMemo(() => {
    const all = rows.length || 1;
    const school = rows.filter(r => r.targetType === "School").length;
    const donor = rows.filter(r => r.targetType === "Donor").length;
    const other = rows.filter(r => r.targetType !== "School" && r.targetType !== "Donor").length;
    return [
      { name: "Schools", value: school },
      { name: "Donors", value: donor },
      { name: "Other/All", value: other },
    ];
  }, [rows]);

  const filtered = useMemo(() => {
    return rows
      .filter((r) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return (
          r.title.toLowerCase().includes(q) ||
          r.message.toLowerCase().includes(q) ||
          r.targetName.toLowerCase().includes(q)
        );
      })
      .filter((r) => (statusFilter === "All" ? true : r.status === statusFilter))
      .filter((r) => (targetFilter === "All" ? true : r.targetType === targetFilter))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [rows, query, statusFilter, targetFilter]);

  function handleDelete(id) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  function handleResend(id) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Sent", date: new Date().toISOString() } : r))
    );
  }

  function handleCreate(newNotif) {
    const next = {
      id: Math.max(0, ...rows.map((r) => r.id)) + 1,
      title: newNotif.title,
      message: newNotif.message,
      targetType: newNotif.targetType,
      targetName: newNotif.targetName,
      date: new Date().toISOString(),
      status: "Sent",
    };
    setRows((prev) => [next, ...prev]);
    setOpenModal(false);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => downloadCSV("notifications.csv", filtered)}
              className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm hover:bg-gray-100 flex items-center gap-2"
              title="Export CSV"
            >
              <Download size={16} />
              Export
            </button>
            <button
              onClick={() => setOpenModal(true)}
              className="px-3 py-2 rounded-lg bg-gray-900 text-white text-sm hover:bg-black flex items-center gap-2"
            >
              <Send size={16} />
              New Notification
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* KPIs */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPI color="blue" icon={Bell} label="Total Notifications" value={total} sub="All time" />
          <KPI color="green" icon={School} label="To Schools" value={schoolsCount} sub="Delivered or pending" />
          <KPI color="purple" icon={Users} label="To Donors" value={donorsCount} sub="Delivered or pending" />
          <KPI color="orange" icon={FileText} label="Drafts" value={draftsCount} sub="Waiting to send" />
        </section>

        {/* Filters + Chart Row */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SectionCard
            title="Filters"
            action={
              <button
                className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  setQuery("");
                  setStatusFilter("All");
                  setTargetFilter("All");
                }}
              >
                <RefreshCw size={16} />
                Reset
              </button>
            }
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 pl-9"
                    placeholder="Search title, message, or target"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <Filter className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  className="px-3 py-2 rounded-lg border border-gray-300"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Sent">Sent</option>
                  <option value="Draft">Draft</option>
                  <option value="Failed">Failed</option>
                </select>
                <select
                  className="px-3 py-2 rounded-lg border border-gray-300"
                  value={targetFilter}
                  onChange={(e) => setTargetFilter(e.target.value)}
                >
                  <option value="All">All Targets</option>
                  <option value="School">School</option>
                  <option value="Donor">Donor</option>
                  <option value="AllTarget">Other/All</option>
                </select>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="By Audience (Pie)">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Monthly Sent (12m)">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MOCK_MONTHLY_SENT}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sent" stroke="#2563eb" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </section>

        {/* Table */}
        <SectionCard
          title="Notifications List"
          action={
            <button
              onClick={() => downloadCSV("notifications.csv", filtered)}
              className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm hover:bg-gray-100 flex items-center gap-2"
            >
              <Download size={16} />
              Export
            </button>
          }
        >
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-2 px-3 text-left">ID</th>
                  <th className="py-2 px-3 text-left">Title</th>
                  <th className="py-2 px-3 text-left">Target</th>
                  <th className="py-2 px-3 text-left">Date</th>
                  <th className="py-2 px-3 text-left">Status</th>
                  <th className="py-2 px-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr
                    key={r.id}
                    className={classNames(i % 2 === 0 ? "bg-gray-50" : "bg-white", "hover:bg-gray-100 transition")}
                  >
                    <td className="py-2 px-3">{r.id}</td>
                    <td className="py-2 px-3">
                      <div className="font-medium text-gray-800">{r.title}</div>
                      <div className="text-xs text-gray-500 line-clamp-1">{r.message}</div>
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        {r.targetType === "School" ? <School size={16} /> : r.targetType === "Donor" ? <Users size={16} /> : <Bell size={16} />}
                        <span className="text-gray-700">
                          {r.targetType} {r.targetName ? `- ${r.targetName}` : ""}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-3">{toLocalDate(r.date)}</td>
                    <td className="py-2 px-3">
                      {r.status === "Sent" && <Badge color="green">Sent</Badge>}
                      {r.status === "Draft" && <Badge color="yellow">Draft</Badge>}
                      {r.status === "Failed" && <Badge color="red">Failed</Badge>}
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 rounded-md bg-white border border-gray-200 hover:bg-gray-100 flex items-center gap-1"
                          title="Resend"
                          onClick={() => handleResend(r.id)}
                        >
                          <Send size={14} />
                          <span>Resend</span>
                        </button>
                        <button
                          className="px-2 py-1 rounded-md bg-white border border-gray-200 hover:bg-gray-100 flex items-center gap-1 text-red-600"
                          title="Delete"
                          onClick={() => handleDelete(r.id)}
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-500">No notifications found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </main>

      {/* Modal */}
      <NewNotificationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleCreate}
        schools={schoolsList}
        donors={donorsList}
      />
    </div>
  );
}
export default Notifications