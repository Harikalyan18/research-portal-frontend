import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    timeout: 500000, // 5 min for AI processing
})

export const documentAPI = {
    uploadDocument: (formData) => api.post('/documents/upload', formData),
    analyzeDocument: (documentId) => api.post(`/documents/${documentId}/analyze`),
    getDocument: (documentId) => api.get(`/documents/${documentId}`),
}

export default api