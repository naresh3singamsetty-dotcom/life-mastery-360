import axios from 'axios'

// Use environment variable for API URL, fallback to relative path
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''
const BASE = `${BACKEND_URL}/api/assessment`

export async function submitAssessment(data) {
  const response = await axios.post(`${BASE}/submit`, data)
  return response.data
}

export async function getResult(id) {
  const response = await axios.get(`${BASE}/${id}`)
  return response.data
}
