import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Trash2,
  Eye,
  AlertCircle,
  RefreshCw,
  Search,
  Filter,
  Star,
  Package,
  Clock,
} from "lucide-react";
import { requestAPI } from "../services/apiService";

// Mock API service to simulate network requests

const statusOptions = [
  { value: "inreview", label: "بانتظار المراجعة", color: "bg-yellow-100 text-yellow-800", icon: <Clock size={12} /> },
  { value: "accepted", label: "مقبول", color: "bg-sky-100 text-sky-800", icon: <CheckCircle size={12} /> },
  { value: "rejected", label: "مرفوض", color: "bg-red-100 text-red-800", icon: <XCircle size={12} /> },
  { value: "completed", label: "مكتمل", color: "bg-green-100 text-green-800", icon: <Package size={12} /> },
];

const getStatusInfo = (statusCode) => {
    return statusOptions.find((s) => s.value === statusCode) || {};
};

function Requests() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Modals
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [showRejectModal, setShowRejectModal] = useState(false);
  
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await requestAPI.getRequests();
      if (response.status === 'success' && Array.isArray(response.data)) {
        setRequests(response.data);
      } else {
        throw new Error("Invalid data format from API");
      }
    } catch (err) {
      console.error('Error loading requests:', err);
      setError('فشل في جلب الطلبات. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveRequest = async (id) => {
    if (!window.confirm('هل أنت متأكد من الموافقة على هذا الطلب؟')) return;
    try {
      setLoading(true);
      await requestAPI.approveRequest(id);
      setRequests(requests.map(req =>
        req.id === id ? { ...req, status: { id: 2, name: "Accepted", code: "accepted" }, status_id: 2 } : req
      ));
    } catch (err) { setError('فشل في قبول الطلب'); } 
    finally { setLoading(false); }
  };

  const handleRejectRequest = async () => {
    try {
      setLoading(true);
      await requestAPI.rejectRequest(selectedRequest.id, rejectReason);
      setRequests(requests.map(req =>
        req.id === selectedRequest.id ? { ...req, status: { id: 3, name: "Rejected", code: "rejected", reason: rejectReason }, status_id: 3 } : req
      ));
      setShowRejectModal(false);
    } catch (err) { setError('فشل في رفض الطلب'); } 
    finally { setLoading(false); }
  };
  

  
  const handleDeleteRequest = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الطلب؟')) return;
    try {
      setLoading(true);
      await requestAPI.deleteRequestCase(id);
      setRequests(requests.filter(req => req.id !== id));
    } catch (err) { setError('فشل في حذف الطلب'); } 
    finally { setLoading(false); }
  };

  const filteredRequests = requests.filter(req => {
    const searchTerm = search.toLowerCase();
    const matchesSearch = req.title.toLowerCase().includes(searchTerm) ||
                          req.userName.toLowerCase().includes(searchTerm) ||
                          req.description.toLowerCase().includes(searchTerm);
    const matchesStatus = statusFilter === "ALL" || req.status.code === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: requests.length,
    inreview: requests.filter(r => r.status.code === 'inreview').length,
    accepted: requests.filter(r => r.status.code === 'accepted').length,
    rejected: requests.filter(r => r.status.code === 'rejected').length
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">إدارة طلبات المساعدة</h2>
          <p className="text-gray-600">عرض، تعديل، والموافقة على طلبات الدعم</p>
        </div>
        <button
          onClick={loadRequests}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          تحديث
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-center gap-2">
          <AlertCircle size={16} />{error}<button onClick={() => setError('')} className="mr-auto">✕</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-purple-100 rounded-xl p-4 shadow"><div className="text-sm text-gray-500">إجمالي الطلبات</div><div className="text-3xl font-semibold">{stats.total}</div></div>
        <div className="bg-yellow-100 rounded-xl p-4 shadow"><div className="text-sm text-gray-500">بانتظار المراجعة</div><div className="text-3xl font-semibold">{stats.inreview}</div></div>
        <div className="bg-sky-100 rounded-xl p-4 shadow"><div className="text-sm text-gray-500">مقبولة</div><div className="text-3xl font-semibold">{stats.accepted}</div></div>
        <div className="bg-red-100 rounded-xl p-4 shadow"><div className="text-sm text-gray-500">مرفوضة</div><div className="text-3xl font-semibold">{stats.rejected}</div></div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="البحث في الطلبات..." className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="relative">
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full md:w-auto pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-right">
              <option value="ALL">جميع الحالات</option>
              {statusOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-right">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">عنوان الطلب</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">مقدم الطلب</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">الكمية</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ الإنشاء</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{req.userName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{`${req.fulfilled_quantity} / ${req.goal_quantity}`}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(req.created_at).toLocaleDateString('ar-SY')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${getStatusInfo(req.status.code)?.color}`}>
                        {getStatusInfo(req.status.code)?.icon}
                        {getStatusInfo(req.status.code)?.label}
                      </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-3 justify-end">
                      <button onClick={() => { setSelectedRequest(req); setShowDetailsModal(true); }} className="text-blue-600 hover:text-blue-900" title="عرض التفاصيل"><Eye size={18} /></button>
                      <button onClick={() => handleDeleteRequest(req.id)} className="text-red-600 hover:text-red-900" title="حذف"><Trash2 size={18} /></button>
                      {req.status.code === 'inreview' && (
                        <>
                          <button onClick={() => handleApproveRequest(req.id)} className="text-green-600 hover:text-green-900" title="موافقة"><CheckCircle size={18} /></button>
                          <button onClick={() => { setSelectedRequest(req); setShowRejectModal(true); }} className="text-gray-500 hover:text-gray-800" title="رفض"><XCircle size={18} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && !requests.length && <div className="text-center py-8 text-gray-500">جاري تحميل الطلبات...</div>}
          {!loading && !filteredRequests.length && <div className="text-center py-8 text-gray-500">لا توجد طلبات تطابق معايير البحث.</div>}
        </div>
      </div>
      
      {/* --- MODALS --- */}
      {showDetailsModal && selectedRequest && <DetailsModal request={selectedRequest} onClose={() => setShowDetailsModal(false)} />}
      {showRejectModal && selectedRequest && <RejectModal request={selectedRequest} reason={rejectReason} setReason={setRejectReason} onClose={() => setShowRejectModal(false)} onReject={handleRejectRequest} loading={loading} />}
    </div>
  )
};

// --- Sub-components for Modals ---

const DetailsModal = ({ request, onClose }) => {
    const progress = Math.min((request.fulfilled_quantity / request.goal_quantity) * 100, 100);
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-fade-in-up">
                <button className="absolute top-4 left-4 text-gray-500 hover:text-gray-800" onClick={onClose}>✕</button>
                <h2 className="text-xl font-bold mb-4 text-gray-800 text-right border-b pb-3">{request.title}</h2>
                <div className="space-y-4 text-right">
                    <div><strong>الوصف:</strong> <p className="text-gray-600 mt-1">{request.description}</p></div>
                    <div><strong>مقدم الطلب:</strong> <span className="text-gray-700">{request.userName} ({request.mobile_number})</span></div>
                    <div><strong>الأهمية:</strong> <span className="flex items-center justify-end gap-1 text-yellow-500">{Array.from({length: request.importance}).map((_, i) => <Star key={i} size={16} fill="currentColor"/>)}</span></div>
                    <div>
                        <strong>التقدم المحرز:</strong>
                        <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
                            <div className="bg-green-500 h-4 rounded-full text-white text-xs flex items-center justify-center" style={{ width: `${progress}%` }}>
                                {progress.toFixed(0)}%
                            </div>
                        </div>
                        <p className="text-sm text-center mt-1">{`${request.fulfilled_quantity} / ${request.goal_quantity}`}</p>
                    </div>
                     {request.status.code === 'rejected' && request.status.reason && (
                        <div className="bg-red-50 p-3 rounded-md"><strong>سبب الرفض:</strong> <p className="text-red-700 mt-1">{request.status.reason}</p></div>
                    )}
                </div>
            </div>
        </div>
    );
};


const RejectModal = ({ request, reason, setReason, onClose, onReject, loading }) => (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg text-right animate-fade-in-up">
            <h3 className="text-lg font-bold mb-4">رفض الطلب</h3>
            <p className="text-sm text-gray-600 mb-4">هل أنت متأكد من رفض طلب: <strong>{request.title}</strong>؟</p>
            <div className="flex justify-start gap-3">
                <button onClick={onClose} className="px-4 py-2 border rounded-lg" disabled={loading}>إلغاء</button>
                <button onClick={onReject} disabled={loading} className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-800 disabled:opacity-50">{loading ? 'جاري الرفض...' : 'رفض الطلب'}</button>
            </div>
        </div>
    </div>
);

export default Requests;
