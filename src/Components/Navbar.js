
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate("/");
  };

  return (
    <div className="w-full h-16  bg-white shadow flex justify-between items-center px-6">
      <div className="text-xl font-bold">Dashboard</div>
      <div className="flex items-center gap-4">
        
        <button
          onClick={handleLogout} 
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
