import axios from 'axios'

const BASE = '/api/assessment'

export async function submitAssessment(data) {
  const response = await axios.post(`${BASE}/submit`, data)
  return response.data
}

export async function getResult(id) {
  const response = await axios.get(`${BASE}/${id}`)
  return response.data
}
