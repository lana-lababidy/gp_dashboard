
import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ مهم

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // هنا ممكن كمان تحذفي بيانات المستخدم أو التوكن إذا في
    navigate("/"); // ✅ يرجعك لواجهة تسجيل الدخول
  };

  return (
    <div className="w-full h-16 bg-white shadow flex justify-between items-center px-6">
      <div className="text-xl font-bold">Dashboard</div>
      <div className="flex items-center gap-4">
        <span>Admin</span>
        <button
          onClick={handleLogout} // ✅ تفعيل الزر
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
