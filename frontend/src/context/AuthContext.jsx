import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('lm360_user')
    return stored ? JSON.parse(stored) : null
  })

  const login = (token, name, email, userType, subscriptionPlan, subscriptionDuration) => {
    const userData = { token, name, email, userType, subscriptionPlan, subscriptionDuration }
    localStorage.setItem('lm360_user', JSON.stringify(userData))
    setUser(userData)
  }

  const updateUser = updates => {
    const nextUser = { ...user, ...updates }
    localStorage.setItem('lm360_user', JSON.stringify(nextUser))
    setUser(nextUser)
  }

  const logout = () => {
    localStorage.removeItem('lm360_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
