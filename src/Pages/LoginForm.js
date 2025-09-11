import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/apiService";

function LoginForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {

      await new Promise((resolve) => setTimeout(resolve, 1000));
      if(!username || !password) {
        setError("ادخل معلومات تسجيل صحيحة!")
        return
      }

      
        localStorage.setItem('adminToken', "admin");
        localStorage.setItem('adminData', "admin");
        navigate("/dashboard");
      
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.status === 401) {
        setError("اسم المستخدم أو كلمة المرور غير صحيحة");
      } else if (error.response?.status === 422) {
        setError("بيانات غير صالحة. تأكد من ملء جميع الحقول");
      } else {
        setError("خطأ في الشبكة. تأكد من اتصالك بالإنترنت وحاول مرة أخرى");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-400 to-purple-900">
      <div className="bg-white rounded-xl shadow-lg w-96 overflow-hidden">
        <div className="bg-gradient-to-b from-purple-700 to-purple-900 p-6 text-center">
          <h2 className="text-white text-2xl font-bold">اهلا بك!</h2>
          <p className="text-purple-200 text-sm">
            تسجيل الدخول للوصول إلى لوحة التحكم الإدارية الخاصة بك
          </p>
        </div>

        <div className="p-6">
          <h3 className="text-center text-lg font-medium mb-6">تسجيل الدخول</h3>
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="اسم المستخدم"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

           
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-md shadow-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

