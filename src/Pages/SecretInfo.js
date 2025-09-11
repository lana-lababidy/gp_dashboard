import React, { useState, useEffect } from 'react';
// Mock API services - in a real app, these would make network requests.
import { Search, Eye, User, Calendar, AlertCircle, Trash2, Edit, ShieldCheck, Users, Mail, Cake, MapPin, Venus } from 'lucide-react';
import { secretInfoAPI, userAPI } from '../services/apiService';

const SecretInfo = () => {
  // User management states
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Secret info states
  const [selectedUser, setSelectedUser] = useState(null);
  const [userSecretInfo, setUserSecretInfo] = useState(null);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [secretInfoLoading, setSecretInfoLoading] = useState(false);

  // Edit user states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    username: '',
    aliasname: '',
    email: '',
    mobile_number: ''
  });

  // New static users data
  const staticUsers = [
        {
            "id": 1,
            "username": "محمود",
            "aliasname": "البطل",
            "mobile_number": "0934271139",
            "password": "$2y$12$T/cLNZv.z5hUxr8dQAHll.PRi6MlO7PFoEfEFK45GlBEdaSSr.GY.",
            "user_session": null,
            "fcm_token": null,
            "remember_token": null,
            "email": "mahmoudlab8@gmail.com",
            "created_at": "2025-09-11T14:55:06.000000Z",
            "updated_at": "2025-09-11T14:55:06.000000Z",
            "role_id": 1
        },
        {
            "id": 2,
            "username": "محمد",
            "aliasname": "الوحش",
            "mobile_number": "0947214749",
            "password": "$2y$12$HnpjT8V8yMD37stPIdZWpOK4jNvoIE6007nDtSbJXCTLKe9lg3gc.",
            "user_session": null,
            "fcm_token": null,
            "remember_token": null,
            "email": null,
            "created_at": "2025-09-11T14:55:06.000000Z",
            "updated_at": "2025-09-11T14:55:06.000000Z",
            "role_id": 2
        },
        {
            "id": 3,
            "username": "لانا",
            "aliasname": "البطلة",
            "mobile_number": "0968879073",
            "password": "$2y$12$kHmghnSH/PnLPwo3sVL0o.otG88.mkB5j/7H7rkynBCl9Rgsu8fR6",
            "user_session": null,
            "fcm_token": null,
            "remember_token": null,
            "email": null,
            "created_at": "2025-09-11T14:55:06.000000Z",
            "updated_at": "2025-09-11T14:55:06.000000Z",
            "role_id": 2
        },
        {
            "id": 4,
            "username": "عمر",
            "aliasname": "المتبرع الفهيم",
            "mobile_number": "0956976021",
            "password": "$2y$12$pA/tVl4nhdzofimdZrRX/Owfg/tQ9nTNJD5xb6xIAWsN/FqSGx8su",
            "user_session": null,
            "fcm_token": null,
            "remember_token": null,
            "email": null,
            "created_at": "2025-09-11T14:55:07.000000Z",
            "updated_at": "2025-09-11T14:55:07.000000Z",
            "role_id": 2
        },
        {
            "id": 5,
            "username": "testuser",
            "aliasname": null,
            "mobile_number": "0999999999",
            "password": "$2y$12$Mz67ML9zOqbpw5.po5cP2.zX6eChK8LjYPdebU7v8G11aNeA.J6hS",
            "user_session": null,
            "fcm_token": null,
            "remember_token": null,
            "email": null,
            "created_at": "2025-09-11T14:55:07.000000Z",
            "updated_at": "2025-09-11T14:55:07.000000Z",
            "role_id": 1
        }
    ];

  // Load users data on component mount
  useEffect(() => {
    loadUsers();
  }, []);
  
  const loadUsers = async () => {
    try {
      setLoading(true);
      // Using static data. In a real app, you would fetch from an API
      const response = await userAPI.getUsers();
      setUsers(response?.data || []);
      setFilteredUsers(response?.data || []);
    } catch (error) {
      console.error('Error loading users:', error);
      setError('فشل في تحميل بيانات المستخدمين');
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = users.filter(user =>
        user.username.toLowerCase().includes(lowercasedTerm) ||
        (user.email && user.email.toLowerCase().includes(lowercasedTerm)) ||
        user.mobile_number.includes(searchTerm) ||
        (user.aliasname && user.aliasname.toLowerCase().includes(lowercasedTerm))
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);


  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    // Replace window.confirm with a custom modal in a real app
    if (!window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      return;
    }

    try {
      setLoading(true);
      await userAPI.deleteUser(userId); // API call
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      // Replace alert with a toast notification in a real app
      alert('تم حذف المستخدم بنجاح');
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('فشل في حذف المستخدم');
    } finally {
      setLoading(false);
    }
  };

  // Submit edit form
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      setLoading(true);
      await userAPI.updateUser(selectedUser.id, editFormData); // API Call

      // Update local state
      const updatedUsers = users.map(user =>
        user.id === selectedUser.id
          ? { ...user, ...editFormData }
          : user
      );
      setUsers(updatedUsers);
      setShowEditModal(false);
      // Replace alert with a toast notification in a real app
      alert('تم تحديث بيانات المستخدم بنجاح');
    } catch (error) {
      console.error('Error updating user:', error);
      setError('فشل في تحديث بيانات المستخدم');
    } finally {
      setLoading(false);
    }
  };

  // View user secret info
  const handleViewSecretInfo = async (user) => {
    try {
      setSecretInfoLoading(true);
      setSelectedUser(user);
      setShowSecretModal(true);
      
      const secretInfo = await secretInfoAPI.getSecretInfoByUser(user.id);
      setUserSecretInfo(secretInfo?.data || secretInfo);
    } catch (error) {
      console.error('Error fetching secret info:', error);
      setError('لا توجد معلومات سرية لهذا المستخدم أو حدث خطأ');
      setUserSecretInfo(null);
    } finally {
      setSecretInfoLoading(false);
    }
  };

  const getRoleInfo = (roleId) => {
      if (roleId === 1) {
          return { text: 'مدير', className: 'bg-blue-100 text-blue-800'};
      }
      return { text: 'مستخدم', className: 'bg-green-100 text-green-800'};
  }

  // Reset search
  const resetSearch = () => {
    setSearchTerm('');
  };

  // Close secret info modal
  const closeSecretModal = () => {
    setShowSecretModal(false);
    setSelectedUser(null);
    setUserSecretInfo(null);
    setError('');
  };

    const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-start text-right">
        <div className="mt-1 ml-3 text-blue-500">{icon}</div>
        <div>
            <p className="text-xs text-gray-500 font-medium">{label}</p>
            <p className="text-sm text-gray-900 font-semibold">{value || '-'}</p>
        </div>
    </div>
  );

// Helper function to calculate age from birthdate
const calculateAge = (birthdate) => {
    if (!birthdate) return null;
    try {
        const birthDate = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    } catch (e) {
        return null;
    }
};

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">إدارة المستخدمين والمعلومات السرية</h2>
        <p className="text-gray-600">عرض وإدارة حسابات المستخدمين مع إمكانية الوصول إلى معلوماتهم السرية</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              البحث في المستخدمين
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث بالاسم، الاسم المستعار، البريد الإلكتروني، أو رقم الموبايل..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 md:items-end">
            <button
              onClick={resetSearch}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 flex items-center gap-2"
            >
              إعادة تعيين
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-purple-100 rounded-xl p-4 shadow">
          <div className="flex items-center gap-3">
            <div className="bg-purple-500 p-2 rounded-lg">
              <User className="text-white" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">إجمالي المستخدمين</p>
              <p className="text-xl font-semibold text-gray-800">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-100 rounded-xl p-4 shadow">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500 p-2 rounded-lg">
              <Search className="text-white" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">النتائج المعروضة</p>
              <p className="text-xl font-semibold text-gray-800">{filteredUsers.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-100 rounded-xl p-4 shadow">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <ShieldCheck className="text-white" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">المديرون</p>
              <p className="text-xl font-semibold text-gray-800">
                {users.filter(user => user.role_id === 1).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-green-100 rounded-xl p-4 shadow">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-2 rounded-lg">
              <Users className="text-white" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">المستخدمون</p>
              <p className="text-xl font-semibold text-gray-800">
                {users.filter(user => user.role_id === 2).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
          <button
            onClick={() => setError('')}
            className="ml-auto text-red-700 hover:text-red-900"
          >
            ✕
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && !users.length && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">جاري التحميل...</p>
        </div>
      )}

      {/* Users Table */}
      {!loading || users.length > 0 ? (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left">
                <th className="px-4 py-3">اسم المستخدم</th>
                <th className="px-4 py-3">الاسم المستعار</th>
                <th className="px-4 py-3">الدور</th>
                <th className="px-4 py-3">البريد الإلكتروني</th>
                <th className="px-4 py-3">رقم الموبايل</th>
                <th className="px-4 py-3">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-white">
                         {user.username.charAt(0).toUpperCase()}
                      </div>
                      <span className="ml-2">{user.username}</span>
                    </td>
                    <td className="px-4 py-3">{user.aliasname || '-'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleInfo(user.role_id).className}`}
                      >
                        {getRoleInfo(user.role_id).text}
                      </span>
                    </td>
                    <td className="px-4 py-3">{user.email || '-'}</td>
                    <td className="px-4 py-3">{user.mobile_number || '-'}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="حذف المستخدم"
                        >
                          <Trash2 size={14} />
                        </button>
                        <button
                          onClick={() => handleViewSecretInfo(user)}
                          className="text-green-600 hover:text-green-800 p-1"
                          title="عرض المعلومات السرية"
                        >
                          <Eye size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    {searchTerm ? 'لا توجد نتائج للبحث المحدد' : 'لا يوجد مستخدمون'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : null}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg relative">
            <h2 className="text-xl font-semibold text-gray-700 mb-1">تعديل بيانات المستخدم</h2>
            <p className="text-sm text-gray-400 mb-6">تحديث معلومات المستخدم في النظام</p>

            <form onSubmit={handleSubmitEdit} className="grid grid-cols-1 gap-4">
              <div>
                  <label className="text-sm font-medium text-gray-600">اسم المستخدم</label>
                  <input
                    type="text"
                    value={editFormData.username}
                    onChange={(e) => setEditFormData({...editFormData, username: e.target.value})}
                    className="w-full mt-1 border px-4 py-2 rounded"
                    required
                  />
              </div>
              <div>
                  <label className="text-sm font-medium text-gray-600">الاسم المستعار</label>
                  <input
                    type="text"
                    value={editFormData.aliasname}
                    onChange={(e) => setEditFormData({...editFormData, aliasname: e.target.value})}
                    className="w-full mt-1 border px-4 py-2 rounded"
                  />
              </div>
              <div>
                  <label className="text-sm font-medium text-gray-600">البريد الإلكتروني</label>
                   <input
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                    className="w-full mt-1 border px-4 py-2 rounded"
                  />
              </div>
              <div>
                  <label className="text-sm font-medium text-gray-600">رقم الموبايل</label>
                  <input
                    type="text"
                    value={editFormData.mobile_number}
                    onChange={(e) => setEditFormData({...editFormData, mobile_number: e.target.value})}
                    className="w-full mt-1 border px-4 py-2 rounded"
                  />
              </div>
              <div className="flex justify-end mt-4 space-x-2 gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded border hover:bg-gray-100"
                  onClick={() => setShowEditModal(false)}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50 hover:bg-blue-700"
                >
                  {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Secret Info Modal */}
      {showSecretModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  المعلومات السرية للمستخدم: {selectedUser.username}
                </h3>
                <button
                  onClick={closeSecretModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              {secretInfoLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-600">جاري تحميل المعلومات السرية...</p>
                </div>
              ) : userSecretInfo ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        معرف المستخدم
                      </label>
                      <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                        {selectedUser.id}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        اسم المستخدم
                      </label>
                      <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                        {selectedUser.username}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      المعلومات السرية (مثال)
                    </label>
                    <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded max-h-60 overflow-y-auto">
                      {secretInfoLoading ? (
                <div className="text-center py-8"><div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div><p className="mt-2 text-gray-600">جاري تحميل المعلومات...</p></div>
              ) : (Array.isArray(userSecretInfo) && userSecretInfo.length > 0) ? (
                (() => {
                    const secretDetails = userSecretInfo[0];
                    const age = calculateAge(secretDetails.birthdate);
                    return (
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 pt-3">
                                <InfoItem icon={<User size={18} />} label="الاسم الحقيقي" value={secretDetails.RealName} />
                                <InfoItem icon={<Mail size={18} />} label="البريد الإلكتروني" value={secretDetails.email} />
                                <InfoItem icon={<Cake size={18} />} label="تاريخ الميلاد" value={secretDetails.birthdate ? `${secretDetails.birthdate} (العمر: ${age})` : '-'} />
                                <InfoItem icon={<MapPin size={18} />} label="المدينة" value={secretDetails.city} />
                                <InfoItem icon={<Venus size={18} />} label="الجنس" value={secretDetails.gender === 'female' ? 'أنثى' : 'ذكر'} />
                                
                            </div>
                        </div>
                    );
                })()
              ) : (
                <div className="text-center py-8"><AlertCircle className="mx-auto text-gray-400" size={48} /><p className="mt-4 text-gray-600">لا توجد معلومات سرية لعرضها</p></div>
              )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="mx-auto text-gray-400" size={48} />
                  <p className="mt-4 text-gray-600">لا توجد معلومات سرية لهذا المستخدم</p>
                </div>
              )}
              
              <div className="flex justify-end pt-4 mt-4 border-t">
                <button
                  onClick={closeSecretModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecretInfo;
