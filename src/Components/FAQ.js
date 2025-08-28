import React, { useState } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

const initialFAQs = [
  {
    id: 1,
    question: "How can schools register?",
    answer: "Schools can register by filling out the registration form on the platform.",
    category: "Schools",
    lastUpdated: "2025-08-15",
  },
  {
    id: 2,
    question: "What types of donations are accepted?",
    answer: "We accept monetary, in-kind, and volunteer support.",
    category: "Donors",
    lastUpdated: "2025-08-10",
  },
  {
    id: 3,
    question: "How can I reset my password?",
    answer: "Click 'Forgot password' on the login page and follow the instructions.",
    category: "Technical",
    lastUpdated: "2025-08-05",
  },
];

 function FAQ() {
  const [faqs, setFaqs] = useState(initialFAQs);
  const [showModal, setShowModal] = useState(false);
  const [newFAQ, setNewFAQ] = useState({
    question: "",
    answer: "",
    category: "General",
  });

  const handleAddFAQ = () => {
    if (!newFAQ.question || !newFAQ.answer) return;
    const newEntry = {
      ...newFAQ,
      id: faqs.length + 1,
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    setFaqs([...faqs, newEntry]);
    setNewFAQ({ question: "", answer: "", category: "General" });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">FAQ Management</h2>

      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-500">Manage frequently asked questions</p>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg shadow hover:bg-green-900"
        >
          <PlusCircle size={20} /> Add FAQ
        </button>
      </div>

      {/* FAQ Table */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Question</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Last Updated</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr
                key={faq.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-2 px-4">{faq.id}</td>
                <td className="py-2 px-4">{faq.question}</td>
                <td className="py-2 px-4">{faq.category}</td>
                <td className="py-2 px-4">{faq.lastUpdated}</td>
                <td className="py-2 px-4 text-center flex justify-center gap-2">
                  <button className="text-green-600 hover:text-green-800">
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add FAQ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-bold mb-4">Add New FAQ</h3>

            <div className="mb-4">
              <label className="block text-sm mb-1">Question</label>
              <input
                type="text"
                value={newFAQ.question}
                onChange={(e) =>
                  setNewFAQ({ ...newFAQ, question: e.target.value })
                }
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Answer</label>
              <textarea
                value={newFAQ.answer}
                onChange={(e) =>
                  setNewFAQ({ ...newFAQ, answer: e.target.value })
                }
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Category</label>
              <select
                value={newFAQ.category}
                onChange={(e) =>
                  setNewFAQ({ ...newFAQ, category: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              >
                <option>General</option>
                <option>Schools</option>
                <option>Donors</option>
                <option>Technical</option>
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFAQ}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-900"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default FAQ;