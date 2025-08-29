 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  //  نخزن المدخلات
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    //  تحقق من البيانات
    if (username === "haneen" && password === "12341234") {
      setError("");
      navigate("/dashboard"); // يدخل للداشبورد
    } else {
      setError( "Error" );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-400 to-purple-900">
      <div className="bg-white rounded-xl shadow-lg w-96 overflow-hidden">
        <div className="bg-gradient-to-b from-purple-700 to-purple-900 p-6 text-center">
          <h2 className="text-white text-2xl font-bold">Welcome</h2>
          <p className="text-purple-200 text-sm">
            Login to access your admin dashboard
          </p>
        </div>

        <div className="p-6">
          <h3 className="text-center text-lg font-medium mb-6">Login</h3>
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/*  رسالة خطأ */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-blue-500 hover:underline">
                ?Forgot password
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-md shadow-md hover:opacity-90 transition"
            >
              LOGIN
            </button> 
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

