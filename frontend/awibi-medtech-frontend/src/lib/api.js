import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  updatePreferences: (data) => api.put('/auth/preferences', data),
  changePassword: (data) => api.put('/auth/password', data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.put(`/auth/reset-password/${token}`, { password }),
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
  resendVerification: () => api.post('/auth/resend-verification'),
};

// Users API
export const usersAPI = {
  getUsers: (params) => api.get('/users', { params }),
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  deleteUser: (id) => api.delete(`/users/${id}`),
  getUsersByChapter: (chapterId) => api.get(`/users/chapter/${chapterId}`),
  getLeaders: () => api.get('/users/leaders/all'),
  getUserStats: () => api.get('/users/stats/overview'),
  joinChapter: (userId, chapterId) => api.post(`/users/${userId}/join-chapter`, { chapterId }),
  leaveChapter: (userId) => api.post(`/users/${userId}/leave-chapter`),
};

// Chapters API
export const chaptersAPI = {
  getChapters: (params) => api.get('/chapters', { params }),
  getChapter: (id) => api.get(`/chapters/${id}`),
  createChapter: (data) => api.post('/chapters', data),
  updateChapter: (id, data) => api.put(`/chapters/${id}`, data),
  deleteChapter: (id) => api.delete(`/chapters/${id}`),
  getChaptersByCountry: (country) => api.get(`/chapters/country/${country}`),
  getPendingChapters: () => api.get('/chapters/pending/all'),
  approveChapter: (id) => api.post(`/chapters/${id}/approve`),
  addLeader: (id, data) => api.post(`/chapters/${id}/leaders`, data),
  removeLeader: (id, userId) => api.delete(`/chapters/${id}/leaders/${userId}`),
  getChapterStats: () => api.get('/chapters/stats/overview'),
};

// Events API
export const eventsAPI = {
  getEvents: (params) => api.get('/events', { params }),
  getEvent: (id) => api.get(`/events/${id}`),
  createEvent: (data) => api.post('/events', data),
  updateEvent: (id, data) => api.put(`/events/${id}`, data),
  deleteEvent: (id) => api.delete(`/events/${id}`),
  registerForEvent: (id) => api.post(`/events/${id}/register`),
  unregisterFromEvent: (id) => api.delete(`/events/${id}/register`),
  markAttendance: (id, data) => api.post(`/events/${id}/attendance`, data),
  submitFeedback: (id, data) => api.post(`/events/${id}/feedback`, data),
  getUpcomingEvents: (limit) => api.get('/events/upcoming/all', { params: { limit } }),
  getEventsByChapter: (chapterId) => api.get(`/events/chapter/${chapterId}`),
  getEventStats: () => api.get('/events/stats/overview'),
};

// Badges API
export const badgesAPI = {
  getBadges: (params) => api.get('/badges', { params }),
  getBadge: (id) => api.get(`/badges/${id}`),
  createBadge: (data) => api.post('/badges', data),
  updateBadge: (id, data) => api.put(`/badges/${id}`, data),
  deleteBadge: (id) => api.delete(`/badges/${id}`),
  getBadgesByCategory: (category) => api.get(`/badges/category/${category}`),
  awardBadge: (id, userId) => api.post(`/badges/${id}/award`, { userId }),
  checkEligibility: (id, userId) => api.get(`/badges/${id}/eligibility/${userId}`),
  getUserBadges: (userId) => api.get(`/badges/user/${userId}`),
  autoAwardBadges: () => api.post('/badges/auto-award'),
  getBadgeStats: () => api.get('/badges/stats/overview'),
  getBadgeLeaderboard: (limit) => api.get('/badges/leaderboard/top', { params: { limit } }),
};

export default api;

