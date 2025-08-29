 
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { DollarSign, School, Users, CheckCircle } from "lucide-react";

// Mock Data
const MONTHLY_DONATIONS = [
  { month: "Jan", current: 120 },
  { month: "Feb", current: 180 },
  { month: "Mar", current: 220 },
  { month: "Apr", current: 260 },
  { month: "May", current: 300 },
  { month: "Jun", current: 320 },
  { month: "Jul", current: 360 },
  { month: "Aug", current: 420 },
  { month: "Sep", current: 460 },
  { month: "Oct", current: 490 },
  { month: "Nov", current: 520 },
  { month: "Dec", current: 560 },
];

const REQUEST_STATUS = [
  { name: "Pending", value: 120 },
  { name: "In Progress", value: 180 },
  { name: "Done", value: 350 },
  { name: "Declined", value: 50 },
];

const TOP_DONORS = [
  { donor: "Ahmed Khalil", donations: 24, favorite: "Material" },
  { donor: "Sarah Youssef", donations: 18, favorite: "In-kind" },
  { donor: "Mohammed Ali", donations: 15, favorite: "Volunteer" },
  { donor: "Leila Khaled", donations: 11, favorite: "Material" },
  { donor: "Rami Adnan", donations: 9, favorite: "In-kind" },
];

const RECENT_DONATIONS = [
  { id: 1, donor: "Abdullah H", type: "Material", school: "Al-Rabee School", date: "2025-02-06", value: 900 },
  { id: 2, donor: "Maha S", type: "In-kind", school: "Al-Noor School", date: "2025-02-05", value: 300 },
  { id: 3, donor: "Eyad K", type: "Volunteer", school: "Al-Mustaqbal School", date: "2025-02-03", value: 0 },
  { id: 4, donor: "Noor M", type: "Material", school: "Al-Rabee School", date: "2025-02-01", value: 500 },
  { id: 5, donor: "Khaled A", type: "In-kind", school: "Al-Rayan School", date: "2025-01-28", value: 0 },
];

const SUCCESS_STORIES = [
  { school: "Al-Rabee School", target: "4th Grade", description: "Renovation of restrooms and new chairs" },
  { school: "Al-Noor School", target: "6th Grade", description: "School supplies and stationery" },
  { school: "Al-Mustaqbal School", target: "Science Lab", description: "Lab equipment and tables" },
  { school: "Al-Rayan School", target: "Playground", description: "Playground flooring and cleaning" },
  { school: "Success School", target: "Library", description: "Books organization and shelves donation" },
];

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

function Reports() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Top KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="rounded-xl shadow p-5 bg-blue-500 text-white flex flex-col">
          <div className="flex items-center justify-between">
            <h4 className="text-sm">Total Donations</h4>
            <DollarSign size={24} />
          </div>
          <div className="text-2xl font-bold">$250,000</div>
        </div>
        <div className="rounded-xl shadow p-5 bg-green-500 text-white flex flex-col">
          <div className="flex items-center justify-between">
            <h4 className="text-sm">Beneficiary Schools</h4>
            <School size={24} />
          </div>
          <div className="text-2xl font-bold">75</div>
        </div>
        <div className="rounded-xl shadow p-5 bg-purple-500 text-white flex flex-col">
          <div className="flex items-center justify-between">
            <h4 className="text-sm">Active Donors</h4>
            <Users size={24} />
          </div>
          <div className="text-2xl font-bold">200</div>
        </div>
        <div className="rounded-xl shadow p-5 bg-orange-500 text-white flex flex-col">
          <div className="flex items-center justify-between">
            <h4 className="text-sm">Completed Requests</h4>
            <CheckCircle size={24} />
          </div>
          <div className="text-2xl font-bold">150</div>
        </div>
      </div>

      {/* Middle Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Bar Chart - Monthly Donations */}
        <div className="bg-white rounded-xl shadow p-5">
          <h4 className="text-sm text-gray-500 mb-4">Monthly Donations</h4>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_DONATIONS}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="current" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart - Request Status */}
        <div className="bg-white rounded-xl shadow p-5">
          <h4 className="text-sm text-gray-500 mb-4">Request Status</h4>
          <div className="h-60 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={REQUEST_STATUS}
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  nameKey="name"
                >
                  {REQUEST_STATUS.map((entry, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart - Total Donations Over Time */}
        <div className="bg-white rounded-xl shadow p-5">
          <h4 className="text-sm text-gray-500 mb-4">Total Donations Over Time</h4>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_DONATIONS}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="#ef4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Donors Table */}
      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <h4 className="text-sm text-gray-500 mb-4">Top Donors</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-2 px-3">Donor</th>
                <th className="py-2 px-3">Donations</th>
                <th className="py-2 px-3">Favorite Type</th>
              </tr>
            </thead>
            <tbody>
              {TOP_DONORS.map((d, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2 px-3">{d.donor}</td>
                  <td className="py-2 px-3">{d.donations}</td>
                  <td className="py-2 px-3">{d.favorite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Latest Donations Table */}
      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <h4 className="text-sm text-gray-500 mb-4">Latest Donations (Recent Donations)</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-2 px-3">ID</th>
                <th className="py-2 px-3">Donor</th>
                <th className="py-2 px-3">Type</th>
                <th className="py-2 px-3">School</th>
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Value</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_DONATIONS.map((d) => (
                <tr key={d.id} className="border-b last:border-0">
                  <td className="py-2 px-3">{d.id}</td>
                  <td className="py-2 px-3">{d.donor}</td>
                  <td className="py-2 px-3">{d.type}</td>
                  <td className="py-2 px-3">{d.school}</td>
                  <td className="py-2 px-3">{new Date(d.date).toLocaleDateString()}</td>
                  <td className="py-2 px-3">{d.value ? `$${d.value}` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Success Stories Table */}
      <div className="bg-white rounded-xl shadow p-5">
        <h4 className="text-sm text-gray-500 mb-4">Success Stories</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-2 px-3">School</th>
                <th className="py-2 px-3">Target Group</th>
                <th className="py-2 px-3">Description</th>
              </tr>
            </thead>
            <tbody>
              {SUCCESS_STORIES.map((s, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2 px-3">{s.school}</td>
                  <td className="py-2 px-3">{s.target}</td>
                  <td className="py-2 px-3">{s.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reports;
