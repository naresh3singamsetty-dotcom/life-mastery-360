import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ChangePasswordPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setError('Please fill in all fields.')
      return
    }
    if (form.newPassword.length < 6) {
      setError('New password must be at least 6 characters.')
      return
    }
    if (form.newPassword !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (form.currentPassword === form.newPassword) {
      setError('New password must be different from current password.')
      return
    }

    setError('')
    setSuccess('')
    setLoading(true)
    try {
      // TODO: Call backend API to change password
      // const response = await changePassword(form)
      setSuccess('Password changed successfully!')
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => navigate('/dashboard'), 2000)
    } catch (err) {
      setError(err.response?.data || 'Failed to change password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <div className="header-inner">
            <div className="logo" onClick={() => navigate('/')}>Life Mastery <span>360</span></div>
            <button className="btn btn-outline" onClick={() => navigate('/dashboard')} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
              Back to Dashboard
            </button>
          </div>
        </header>

        <div className="details-content">
          <div className="details-card fade-in" style={{ maxWidth: 500 }}>
            <span className="assessment-emoji" style={{ display: 'block', textAlign: 'center' }}>🔐</span>
            <h2 className="assessment-title" style={{ textAlign: 'center' }}>Change Password</h2>
            <p className="assessment-subtitle" style={{ textAlign: 'center', marginBottom: 28 }}>
              Update your account security
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Current Password *</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter your current password"
                  value={form.currentPassword}
                  onChange={e => setForm(f => ({ ...f, currentPassword: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">New Password *</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="At least 6 characters"
                  value={form.newPassword}
                  onChange={e => setForm(f => ({ ...f, newPassword: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm New Password *</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Repeat your new password"
                  value={form.confirmPassword}
                  onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                  required
                />
              </div>

              {error && <p className="form-error">{error}</p>}
              {success && <p className="form-success">{success}</p>}

              <button type="submit" className="btn btn-primary btn-full mt-16" disabled={loading}>
                {loading ? 'Updating password…' : 'Change Password →'}
              </button>
            </form>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 16, textAlign: 'center' }}>
              Make sure your password is strong and unique to protect your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
