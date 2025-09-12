 
import React, { useState, useEffect } from "react";
import { DollarSign, School, Users, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { reportsAPI } from "../services/apiService";


function Reports() {
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    totalDonations: 0,
    totalDonationAmount: 0,
    completedRequests: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await reportsAPI.getStatistics();
      console.log(data)
      const dt = {
            totalUsers:  data?.total_users || 0,
            totalDonations:  data?.completed_requests || 0,
            totalDonationAmount:  data?.total_quantity || 0,
            completedRequests: data?.completed_requests || 0
        }
      setStatistics(dt);
    } catch (error) {
      console.error('Error fetching statistics:', error);
      setError('فشل في جلب الإحصائيات');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">التقارير والإحصائيات</h2>
          <p className="text-gray-600">ملخص شامل لإحصائيات الموقع</p>
        </div>
        <button
          onClick={fetchStatistics}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          تحديث
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8 mb-6">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">جاري تحميل الإحصائيات...</p>
        </div>
      )}

      {/* Top KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="rounded-xl shadow p-5 bg-blue-500 text-white flex flex-col">
          <div className="flex items-center justify-between">
            <h4 className="text-sm">إجمالي التبرعات</h4>
            <DollarSign size={24} />
          </div>
          <div className="text-2xl font-bold">
            ${statistics.totalDonationAmount?.toLocaleString() || '0'}
          </div>
        </div>
        <div className="rounded-xl shadow p-5 bg-green-500 text-white flex flex-col">
          <div className="flex items-center justify-between">
            <h4 className="text-sm">عدد التبرعات</h4>
            <School size={24} />
          </div>
          <div className="text-2xl font-bold">
            {statistics.totalDonations?.toLocaleString() || '0'}
          </div>
        </div>
        <div className="rounded-xl shadow p-5 bg-purple-500 text-white flex flex-col">
          <div className="flex items-center justify-between">
            <h4 className="text-sm">عدد المستخدمين</h4>
            <Users size={24} />
          </div>
          <div className="text-2xl font-bold">
            {statistics.totalUsers?.toLocaleString() || '0'}
          </div>
        </div>
        <div className="rounded-xl shadow p-5 bg-orange-500 text-white flex flex-col">
          <div className="flex items-center justify-between">
            <h4 className="text-sm">الطلبات المكتملة</h4>
            <CheckCircle size={24} />
          </div>
          <div className="text-2xl font-bold">
            {statistics.completedRequests?.toLocaleString() || '0'}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Reports;
