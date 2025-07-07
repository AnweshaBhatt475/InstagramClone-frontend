import axios from 'axios'

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// Auth endpoints
export const authApi = {
  signup: (userData) => api.post('/api/auth/signup', userData),
  login: (credentials) => api.post('/api/auth/login', credentials),
  logout: () => api.delete('/api/auth/logout'),
}

// Post endpoints
export const postApi = {
  getFeed: () => api.get('/api/post/feed'),
  getAllPosts: () => api.get('/api/post/all-posts'),
  createPost: (postData) => api.post('/api/post/create', postData),
  likePost: (postId) => api.post(`/api/post/like/${postId}`),
  unlikePost: (postId) => api.post(`/api/post/unlike/${postId}`),
  getPostComments: (postId) => api.get(`/api/comment/${postId}`),
  getMyPosts: () => api.get('/api/post/my-posts'),
  deletePost: (postId) => api.delete(`/api/post/delete/${postId}`),
  uploadFile: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/api/post/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

// Comment endpoints
export const commentApi = {
  createComment: (postId, commentData) => api.post(`/api/comment/create/${postId}`, commentData),
  deleteComment: (commentId) => api.delete(`/api/comment/${commentId}`),
}

export const userApi = {
  getUserProfile: (userId) => api.get(`/api/user/profile/${userId}`),
  updateProfile: (profileData) => api.put('/api/user/profile', profileData),
}


export default api
