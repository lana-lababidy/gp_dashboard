       
import React, { useState, useEffect } from 'react';
import { userAPI, secretInfoAPI } from '../services/apiService';
import { Edit, Trash2, Eye, AlertCircle } from 'lucide-react';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Static users data for now - في التطبيق الحقيقي، يجب جلب البيانات من API
  // const staticUsers = [
   
    

  // ];

  // Load users data on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    // For now, using static data. In real app, fetch from API
    const data = await userAPI.getUsers();
    // setUsers(staticUsers);
    setLoading(false);
  };

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      return;
    }

    try {
      setLoading(true);
      await userAPI.deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
      alert('تم حذف المستخدم بنجاح');
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('فشل في حذف المستخدم');
    } finally {
      setLoading(false);
    }
  };

  // Handle edit user
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || ''
    });
    // setShowEditModal(true);
  };

  // Submit edit form
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      setLoading(true);
      await userAPI.updateUser(selectedUser.id, editFormData);
      
      // Update local state
      setUsers(users.map(user =>
        user.id === selectedUser.id
          ? { ...user, ...editFormData }
          : user
      ));
      
      // setShowEditModal(false);
      alert('تم تحديث بيانات المستخدم بنجاح');
    } catch (error) {
      console.error('Error updating user:', error);
      setError('فشل في تحديث بيانات المستخدم');
    } finally {
      setLoading(false);
    }
  };

  // View user secret info
  const handleViewSecretInfo = async (userId) => {
    try {
      const secretInfo = await secretInfoAPI.getSecretInfoByUser(userId);
      alert(`المعلومات السرية للمستخدم: ${JSON.stringify(secretInfo, null, 2)}`);
    } catch (error) {
      console.error('Error fetching secret info:', error);
      alert('لا توجد معلومات سرية لهذا المستخدم أو حدث خطأ');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">إدارة المستخدمين</h2>
          <p className="text-gray-600">عرض وإدارة حسابات المستخدمين</p>
        </div>
      
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">جاري التحميل...</p>
        </div>
      )}

      {/* كروت الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-purple-100 rounded-xl p-4 shadow">
          <div className="text-sm text-gray-500">Total Users</div>
          <div className="text-3xl font-semibold">356</div>
        </div>
        <div className="bg-green-100 rounded-xl p-4 shadow">
          <div className="text-sm text-gray-500">Active users</div>
          <div className="text-3xl font-semibold">239</div>
        </div>
        <div className="bg-blue-100 rounded-xl p-4 shadow">
          <div className="text-sm text-gray-500">Return user rate</div>
          <div className="text-3xl font-semibold">79</div>
        </div>
        <div className="bg-red-100 rounded-xl p-4 shadow">
          <div className="text-sm text-gray-500">Fake accounts</div>
          <div className="text-3xl font-semibold">2</div>
        </div>
      </div>

      {/* Tabs و الفلاتر */}
      {/* <div className="flex justify-between items-center mb-4">
      
     
      </div> */}

      {/* جدول المستخدمين */}
      {/* <div className="bg-white rounded-xl shadow overflow-x-auto"> */}
        {/* <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Signed up as</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 flex items-center space-x-2">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <span>{user.name}</span>
                </td>
                <td className="px-4 py-3">{user.address}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Valid account'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">{user.email || '-'}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  {user.phone || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      {/* </div> */}

      {/* Modal - Create New User */}
      {/* {showModal && ( */}
        {/* // <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"> */}
          {/* <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-lg relative"> */}
            {/* <h2 className="text-xl font-semibold text-gray-700 mb-1">Create new user</h2> */}
            {/* <p className="text-sm text-gray-400 mb-6">Create a new user account for your system.</p> */}

            {/* <form className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
              {/* Avatar */}
              {/* <div className="col-span-2 flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                
              </div> */}

              {/* Name */}
              {/* <input type="text" placeholder="Name" className="col-span-2 border px-4 py-2 rounded" /> */}
              {/* Email */}
              {/* <input type="email" placeholder="Email" className="col-span-2 border px-4 py-2 rounded" /> */}

              {/* Phone */}
              {/* <div className="flex space-x-2 col-span-2">
                <input type="text" placeholder="Code" className="w-1/4 border px-4 py-2 rounded" />
                <input type="text" placeholder="Phone" className="w-3/4 border px-4 py-2 rounded" />
              </div> */}
              {/* <button type="button" className="text-sm text-blue-500 col-span-2 text-left pl-1">+ Add phone</button> */}

              {/* Address */}
              {/* <input type="text" placeholder="Street" className="col-span-2 border px-4 py-2 rounded" />
              <input type="text" placeholder="Street line 2 (Optional)" className="col-span-2 border px-4 py-2 rounded" />
              <div className="flex space-x-2 col-span-2">
                <input type="text" placeholder="City" className="w-1/2 border px-4 py-2 rounded" />
                <input type="text" placeholder="Zip/Postal code" className="w-1/2 border px-4 py-2 rounded" />
              </div>
              <input type="text" placeholder="Country" className="col-span-2 border px-4 py-2 rounded" /> */}

              {/* Buttons */}
              {/* <div className="col-span-2 flex justify-end mt-4 space-x-2"> */}
                {/* <button
                  type="button"
                  className="px-4 py-2 rounded border"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button> */}
                {/* <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
                  Add user
                </button> */}
              {/* </div> */}
            {/* </form>
          </div>
        </div>
      )} */}

    </div>
  );
};

export default UsersPage;


