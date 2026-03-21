import axios from 'axios'

const BASE = '/api/auth'

export async function register(data) {
  const res = await axios.post(`${BASE}/register`, data)
  return res.data
}

export async function login(data) {
  const res = await axios.post(`${BASE}/login`, data)
  return res.data
}
