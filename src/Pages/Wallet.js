import React, { useState, useEffect } from "react";
import axios from "axios";
import { walletAPI } from "../services/apiService";

function Wallet() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load requests on mount
  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError("");
      // 🔹 Replace with your real API endpoint
            const response = await walletAPI.getWalletInfo();
      console.log(response)
      setRequests(response || []);
    } catch (err) {
      console.error("Error loading requests:", err);
      setError("فشل في تحميل بيانات الطلبات");
    } finally {
      setLoading(false);
    }
  };

  // Approve → remove request from list
  const handleApprove = async (id) => {
    try {
      // 🔹 Example API call for approve
      await walletAPI.acceptWalletRequest({
          request_id: id,
          action: "approve"
      });

      setRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (err) {
      console.error("Approve failed:", err);
      alert("فشل في قبول الطلب");
    }
  };

  // Reject → remove request from list
  const handleReject = async (id) => {
    try {
      // 🔹 Example API call for reject
            await walletAPI.acceptWalletRequest({
          request_id: id,
          action: "decline"
      });
      
      setRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (err) {
      console.error("Reject failed:", err);
      alert("فشل في رفض الطلب");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen w-full">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8 text-gray-800">إدارة المحفظة</h1>

      {/* Requests Table */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">الطلبات</h2>

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-500 font-semibold py-4">{error}</p>
        )}

        {/* Loading */}
        {loading ? (
          <p className="text-center text-gray-500 italic py-6">
            جاري تحميل البيانات...
          </p>
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-500 italic py-6">
            لا يوجد طلبات حالياً
          </p>
        ) : (
          <table className="min-w-full text-center border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3">المعرف</th>
                 <th className="p-3">المستخدم</th>
                <th className="p-3">الاسم المستعار</th>
                <th className="p-3">رقم الجوال</th>
                <th className="p-3">المبلغ</th>
                <th className="p-3">التاريخ</th>
                <th className="p-3">الإجراء</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr
                  key={req.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{req.id}</td>
                  <td className="p-3 font-medium">{req.user.username}</td>
                  <td className="p-3">{req.user.aliasname}</td>
                  <td className="p-3">{req.user.mobile_number}</td>
                  <td className="p-3 font-semibold">{req.amount} $</td>
                  <td className="p-3">
                    {new Date(req.created_at).toLocaleDateString("ar-EG")}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => handleApprove(req.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                      >
                        قبول
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                      >
                        رفض
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Wallet;













