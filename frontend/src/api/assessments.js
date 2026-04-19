import axios from 'axios'

const BASE = '/api/assessments'

function getHeaders() {
  const stored = localStorage.getItem('lm360_user')
  if (!stored) return {}
  const token = JSON.parse(stored).token
  return {
    Authorization: `Bearer ${token}`,
  }
}

export async function getCatalog() {
  const response = await axios.get(`${BASE}/catalog`, { headers: getHeaders() })
  return response.data
}

export async function validateAccess(assessmentId) {
  const response = await axios.post(`${BASE}/validate-access/${assessmentId}`, {}, { headers: getHeaders() })
  return response.data
}

export async function getHistory() {
  const response = await axios.get('/api/assessment/history', { headers: getHeaders() })
  return response.data
}
