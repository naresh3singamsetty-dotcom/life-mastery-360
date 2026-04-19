import axios from 'axios'

const BASE = '/api/subscription'

function getHeaders() {
  const stored = localStorage.getItem('lm360_user')
  if (!stored) return {}
  const token = JSON.parse(stored).token
  return {
    Authorization: `Bearer ${token}`,
  }
}

export async function getPlans(userType) {
  const response = await axios.get(`${BASE}/plans/${userType}`, { headers: getHeaders() })
  return response.data
}

export async function getSubscription() {
  const response = await axios.get(`${BASE}/me`, { headers: getHeaders() })
  return response.data
}

export async function selectSubscription(data) {
  const response = await axios.post(`${BASE}/select`, data, { headers: getHeaders() })
  return response.data
}
