import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
 
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);
    navigate("/");
  };

  return (
    <div className="w-full h-16 bg-white shadow flex justify-between items-center px-6">
      <div className="text-xl font-bold">لوحة القيادة</div>
      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          disabled={loading}
          className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
               تسجيل الخروج...
            </>
          ) : (
            "تسجيل خروج"
          )}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
