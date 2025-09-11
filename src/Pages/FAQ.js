import React, { useState, useEffect } from "react";
import { PlusCircle, Edit, Trash2, AlertCircle } from "lucide-react";
import { faqAPI } from "../services/apiService";

function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newFAQ, setNewFAQ] = useState({
    question: "",
    answer: "",
    order: "1",
  });
  const [editFAQ, setEditFAQ] = useState({
    question: "",
    answer: "",
  });

  // Load FAQs on component mount
  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await faqAPI.getFAQs();

      const formattedFAQs = response.data.map((faq) => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        lastUpdated: faq?.updated_at?.split("T")[0] || "--",
      }));

      setFaqs(formattedFAQs);
    } catch (error) {
      console.error("Error loading FAQs:", error);
      setError("فشل في تحميل الأسئلة الشائعة");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFAQ = async () => {
    if (!newFAQ.question || !newFAQ.answer) {
      setError("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await faqAPI.createFAQ(newFAQ);

      if (response) {
        await loadFAQs(); // reload instead of full page refresh
      }

      setNewFAQ({ question: "", answer: "", order: "1" });
      setShowModal(false);
    } catch (error) {
      console.error("Error creating FAQ:", error);
      setError("فشل في إضافة السؤال الشائع");
    } finally {
      setLoading(false);
    }
  };

  const handleEditFAQ = (faq) => {
    setSelectedFAQ(faq);
    setEditFAQ({
      question: faq.question,
      answer: faq.answer,
    });
    setShowEditModal(true);
  };

  const handleUpdateFAQ = async () => {
    if (!editFAQ.question || !editFAQ.answer || !selectedFAQ) {
      setError("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await faqAPI.updateFAQ(selectedFAQ.id, editFAQ);

      // Update local state without reload
      setFaqs(
        faqs.map((faq) =>
          faq.id === selectedFAQ.id
            ? { ...faq, ...editFAQ, lastUpdated: new Date().toISOString().split("T")[0] }
            : faq
        )
      );

      setShowEditModal(false);
      setSelectedFAQ(null);
    } catch (error) {
      console.error("Error updating FAQ:", error);
      setError("فشل في تحديث السؤال الشائع");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا السؤال الشائع؟")) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      await faqAPI.deleteFAQ(id);
      setFaqs(faqs.filter((faq) => faq.id !== id));
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      setError("فشل في حذف السؤال الشائع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">إدارة الأسئلة الشائعة</h2>

      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-500">إدارة الأسئلة الشائعة للموقع</p>
        <button
          onClick={() => setShowModal(true)}
          disabled={loading}
          className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg shadow hover:bg-green-900 disabled:opacity-50"
        >
          <PlusCircle size={20} /> إضافة سؤال شائع
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
          <button
            onClick={() => setError("")}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      )}

      {/* FAQ Table or Loader */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-4 border-green-600"></div>
            <p className="mt-3 text-gray-600">جاري تحميل الأسئلة...</p>
          </div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-green-700 text-white">
              <tr>
                  <th className="py-3 px-4 text-right">المعرف</th>
                  <th className="py-3 px-4 text-right">السؤال</th>
                  <th className="py-3 px-4 text-right">آخر تحديث</th>
                  <th className="py-3 px-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {faqs.length > 0 ? (
                faqs.map((faq) => (
                  <tr key={faq.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-2 px-4">{faq.id}</td>
                    <td className="py-2 px-4">{faq.question}</td>
                    <td className="py-2 px-4">{faq.lastUpdated}</td>
                    <td className="py-2 px-4 text-center flex justify-center gap-2">
                      <button
                        onClick={() => handleEditFAQ(faq)}
                        className="text-green-600 hover:text-green-800"
                        title="تعديل"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="text-red-600 hover:text-red-800"
                        title="حذف"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    لا توجد أسئلة شائعة متاحة
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add FAQ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-bold mb-4">إضافة سؤال شائع جديد</h3>

            <div className="mb-4">
              <label className="block text-sm mb-1">السؤال</label>
              <input
                type="text"
                value={newFAQ.question}
                onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
                placeholder="أدخل السؤال هنا..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">الجواب</label>
              <textarea
                value={newFAQ.answer}
                onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
                rows="4"
                placeholder="أدخل الجواب هنا..."
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setError("");
                }}
                className="px-4 py-2 border rounded-lg"
                disabled={loading}
              >
                إلغاء
              </button>
              <button
                onClick={handleAddFAQ}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-900 disabled:opacity-50"
              >
                {loading ? "جاري الحفظ..." : "حفظ"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit FAQ Modal */}
      {showEditModal && selectedFAQ && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-bold mb-4">تعديل السؤال الشائع</h3>

            <div className="mb-4">
              <label className="block text-sm mb-1">السؤال</label>
              <input
                type="text"
                value={editFAQ.question}
                onChange={(e) => setEditFAQ({ ...editFAQ, question: e.target.value })}
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">الجواب</label>
              <textarea
                value={editFAQ.answer}
                onChange={(e) => setEditFAQ({ ...editFAQ, answer: e.target.value })}
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
                rows="4"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedFAQ(null);
                  setError("");
                }}
                className="px-4 py-2 border rounded-lg"
                disabled={loading}
              >
                إلغاء
              </button>
              <button
                onClick={handleUpdateFAQ}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-800 disabled:opacity-50"
              >
                {loading ? "جاري التحديث..." : "تحديث"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FAQ;
