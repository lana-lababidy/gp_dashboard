const BASE_URL = 'https://abshir-api.justfortesting.ovh/api';

class ApiService {
  constructor() {
    this.baseURL = BASE_URL;
  }

  // Generic HTTP request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add authorization token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
     
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async login(credentials) {
    return this.request('/login-admin', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async refreshToken() {
    return this.request('/auth/refresh', {
      method: 'POST',
    });
  }

  // User endpoints
  async getUsers(params = {}) {
    return this.request(`/allUsers`);
  }

  async getUserById(userId) {
    return this.request(`/users/${userId}`);
  }

  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(userId, userData) {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(userId) {
    return this.request(`/users/${userId}`, {
      method: 'DELETE',
    });
  }

  // Dashboard endpoints
  async getDashboardData() {
    return this.request('/dashboard');
  }

  async getDashboardStats() {
    return this.request('/dashboard/stats');
  }

  async getDashboardCharts(timeframe = '30d') {
    return this.request(`/dashboard/charts?timeframe=${timeframe}`);
  }

  // Reports endpoints
  async getReports(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/reports${queryString ? `?${queryString}` : ''}`);
  }

  async getReportById(reportId) {
    return this.request(`/reports/${reportId}`);
  }

  async createReport(reportData) {
    return this.request('/reports', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  }

  async updateReport(reportId, reportData) {
    return this.request(`/reports/${reportId}`, {
      method: 'PUT',
      body: JSON.stringify(reportData),
    });
  }

  async deleteReport(reportId) {
    return this.request(`/reports/${reportId}`, {
      method: 'DELETE',
    });
  }

  // Requests endpoints
  async getRequests(params = {}) {
    return this.request(`/request-cases`);
  }

  async getRequestById(requestId) {
    return this.request(`/requests/${requestId}`);
  }

  async createRequest(requestData) {
    return this.request('/requests', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  async updateRequest(requestId, requestData) {
    return this.request(`/requests/${requestId}`, {
      method: 'PUT',
      body: JSON.stringify(requestData),
    });
  }

  async approveRequest(requestId) {
    return this.request(`/request-cases/${requestId}/approve`, {
      method: 'POST',
    });
  }

  async rejectRequest(requestId, reason = '') {
    return this.request(`/request-cases/${requestId}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  // Wallet endpoints
  async getWalletInfo() {
    return this.request('/admin/wallet/requests');
  }

  async getWalletTransactions(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/wallet/transactions${queryString ? `?${queryString}` : ''}`);
  }

  async getWalletBalance() {
    return this.request('/wallet/balance');
  }

  async addFunds(amount) {
    return this.request('/wallet/add-funds', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
  }

  async withdrawFunds(amount) {
    return this.request('/wallet/withdraw', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
  }

  // Notifications endpoints
  async getNotifications(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/notifications${queryString ? `?${queryString}` : ''}`);
  }

  async markNotificationAsRead(notificationId) {
    return this.request(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  }

  async markAllNotificationsAsRead() {
    return this.request('/notifications/mark-all-read', {
      method: 'PUT',
    });
  }

  async deleteNotification(notificationId) {
    return this.request(`/notifications/${notificationId}`, {
      method: 'DELETE',
    });
  }

  // FAQ endpoints
  async getFAQs() {
    return this.request('/faqs');
  }

  async getFAQById(faqId) {
    return this.request(`/faq/${faqId}`);
  }

  async createFAQ(faqData) {
    return this.request('/fqas', {
      method: 'POST',
      body: JSON.stringify(faqData),
    });
  }

  async updateFAQ(faqId, faqData) {
    return this.request(`/fqas/${faqId}`, {
      method: 'PUT',
      body: JSON.stringify(faqData),
    });
  }

  async deleteFAQ(faqId) {
    return this.request(`/fqas/${faqId}`, {
      method: 'DELETE',
    });
  }

  // Ranks endpoints
  async getRanks() {
    return this.request('/ranks');
  }

  async getUserRank(userId) {
    return this.request(`/ranks/user/${userId}`);
  }

  async getLeaderboard(limit = 10) {
    return this.request(`/ranks/leaderboard?limit=${limit}`);
  }

  // Secret Info endpoints
  async getSecretInfo() {
    return this.request('/secret-info');
  }

  async updateSecretInfo(data) {
    return this.request('/secret-info', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // File upload endpoint
  async uploadFile(file, endpoint = '/upload') {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('authToken');
    const config = {
      method: 'POST',
      body: formData,
      headers: {},
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
     
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();

// Export specific API modules that components are importing
export const authAPI = {
  loginAdmin: (credentials) => apiService.login(credentials),
  login: (credentials) => apiService.login(credentials),
  logout: () => apiService.logout(),
  refreshToken: () => apiService.refreshToken()
};

export const userAPI = {
  getUsers: (params) => apiService.getUsers(params),
  getUserById: (userId) => apiService.getUserById(userId),
  createUser: (userData) => apiService.createUser(userData),
  updateUser: (userId, userData) => apiService.updateUser(userId, userData),
  deleteUser: (userId) => apiService.deleteUser(userId)
};

export const secretInfoAPI = {
  getAllSecretInfo:  () => apiService.getSecretInfo(),
  getSecretInfo: () => apiService.getSecretInfo(),
  getSecretInfoByUser: (userId) => apiService.request(`/users/${userId}/secret-info`),
  updateSecretInfo: (data) => apiService.updateSecretInfo(data)
};

export const reportsAPI = {
  getStatistics: () => apiService.request('/reports/statistics'),
  getReports: (params) => apiService.getReports(params),
  getReportById: (reportId) => apiService.getReportById(reportId),
  createReport: (reportData) => apiService.createReport(reportData),
  updateReport: (reportId, reportData) => apiService.updateReport(reportId, reportData),
  deleteReport: (reportId) => apiService.deleteReport(reportId)
};

export const requestAPI = {
  getRequests: (params) => apiService.getRequests(params),
  getPendingRequests: () => apiService.request('/request-cases/pending'),
  getRequestById: (requestId) => apiService.getRequestById(requestId),
  createRequest: (requestData) => apiService.createRequest(requestData),
  updateRequestCase: (requestId, requestData) => apiService.updateRequest(requestId, requestData),
  updateRequestStatus: (requestId, status) => apiService.request(`/requests/${requestId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  }),
  approveRequest: (requestId) => apiService.approveRequest(requestId),
  rejectRequest: (requestId, reason) => apiService.rejectRequest(requestId, reason),
  deleteRequestCase: (requestId) => apiService.request(`/request-cases/${requestId}`, { method: 'DELETE' })
};

export const walletAPI = {
  getWalletInfo: () => apiService.getWalletInfo(),
  getWalletTransactions: (params) => apiService.getWalletTransactions(params),
  getWalletBalance: () => apiService.getWalletBalance(),
  getPendingWalletRequests: () => apiService.request('/wallet/pending-requests'),
  processWalletRequest: (data) => apiService.request('/wallet/process-request', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  acceptWalletRequest: (data) => apiService.request('/admin/wallet/process', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  addFunds: (amount) => apiService.addFunds(amount),
  withdrawFunds: (amount) => apiService.withdrawFunds(amount)
};

export const chargeRequestAPI = {
  approveChargeRequest: (requestId) => apiService.request(`/charge-requests/${requestId}/approve`, {
    method: 'POST'
  }),
  rejectChargeRequest: (requestId, reason) => apiService.request(`/charge-requests/${requestId}/reject`, {
    method: 'POST',
    body: JSON.stringify({ reason })
  }),
  getChargeRequests: (params) => {
    const queryString = new URLSearchParams(params).toString();
    return apiService.request(`/charge-requests${queryString ? `?${queryString}` : ''}`);
  }
};

export const notificationAPI = {
  getNotifications: (params) => apiService.getNotifications(params),
  markNotificationAsRead: (notificationId) => apiService.markNotificationAsRead(notificationId),
  markAllNotificationsAsRead: () => apiService.markAllNotificationsAsRead(),
  deleteNotification: (notificationId) => apiService.deleteNotification(notificationId)
};

export const faqAPI = {
  getFAQs: () => apiService.getFAQs(),
  getFAQById: (faqId) => apiService.getFAQById(faqId),
  createFAQ: (faqData) => apiService.createFAQ(faqData),
  updateFAQ: (faqId, faqData) => apiService.updateFAQ(faqId, faqData),
  deleteFAQ: (faqId) => apiService.deleteFAQ(faqId)
};

export const rankAPI = {
  getRanks: () => apiService.getRanks(),
  getUserRank: (userId) => apiService.getUserRank(userId),
  getLeaderboard: (limit) => apiService.getLeaderboard(limit)
};

export const dashboardAPI = {
  getDashboardData: () => apiService.getDashboardData(),
  getDashboardStats: () => apiService.getDashboardStats(),
  getDashboardCharts: (timeframe) => apiService.getDashboardCharts(timeframe)
};

// Export default instance and class
export default apiService;
export { ApiService };
