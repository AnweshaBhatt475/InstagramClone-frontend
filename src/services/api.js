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
  signup: (userData) => api.post('/auth/signup', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.delete('/auth/logout'),
}

// Post endpoints
export const postApi = {
  getFeed: () => api.get('/post/feed'),
  getAllPosts: () => api.get('/post/all-posts'),
  createPost: (postData) => api.post('/post/create', postData),
  likePost: (postId) => api.post(`/post/like/${postId}`),
  unlikePost: (postId) => api.post(`/post/unlike/${postId}`),
  getPostComments: (postId) => api.get(`/comment/${postId}`),
  getMyPosts: () => api.get('/post/my-posts'),
  deletePost: (postId) => api.delete(`/post/delete/${postId}`),
  uploadFile: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/post/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    },
    
}

// Comment endpoints
export const commentApi = {
  createComment: (postId, commentData) => api.post(`/comment/create/${postId}`, commentData),
  deleteComment: (commentId) => api.delete(`/comment/${commentId}`),
}
export const userApi = {
  getUserProfile: (userId) => api.get(`/user/profile/${userId}`),
  updateProfile: (profileData) => api.put('/user/profile', profileData),
}


export default api