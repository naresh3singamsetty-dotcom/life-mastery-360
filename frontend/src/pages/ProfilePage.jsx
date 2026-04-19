import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, isAuthenticated, updateUser } = useAuth()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    age: '',
    place: '',
    schoolName: '',
    areaName: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    if (user) {
      setForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        age: user.age || '',
        place: user.place || '',
        schoolName: user.schoolName || '',
        areaName: user.areaName || '',
      })
    }
  }, [isAuthenticated, user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError('First and last names are required.')
      return
    }
    if (!form.phoneNumber.trim() || !form.age || !form.place.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      // TODO: Call backend API to update user profile
      updateUser({
        firstName: form.firstName,
        lastName: form.lastName,
        phoneNumber: form.phoneNumber,
        age: form.age,
        place: form.place,
        schoolName: form.schoolName,
        areaName: form.areaName,
      })
      setSuccess('Profile updated successfully!')
    } catch (err) {
      setError('Failed to update profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated || !user) {
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
          <div className="details-card fade-in" style={{ maxWidth: 600 }}>
            <h2 className="assessment-title" style={{ textAlign: 'center' }}>Edit Profile</h2>
            <p className="assessment-subtitle" style={{ textAlign: 'center', marginBottom: 28 }}>
              Update your personal information
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={form.lastName}
                    onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={form.email}
                  disabled
                  style={{ opacity: 0.6, cursor: 'not-allowed' }}
                />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>Email cannot be changed</p>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  className="form-input"
                  value={form.phoneNumber}
                  onChange={e => setForm(f => ({ ...f, phoneNumber: e.target.value }))}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Age *</label>
                  <input
                    type="number"
                    className="form-input"
                    value={form.age}
                    onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
                    min={1}
                    max={100}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Place *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={form.place}
                    onChange={e => setForm(f => ({ ...f, place: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {user.userType === 'School' && (
                <>
                  <div className="form-group">
                    <label className="form-label">School Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={form.schoolName}
                      onChange={e => setForm(f => ({ ...f, schoolName: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Area Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={form.areaName}
                      onChange={e => setForm(f => ({ ...f, areaName: e.target.value }))}
                    />
                  </div>
                </>
              )}

              {error && <p className="form-error">{error}</p>}
              {success && <p className="form-success">{success}</p>}

              <button type="submit" className="btn btn-primary btn-full mt-16" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
