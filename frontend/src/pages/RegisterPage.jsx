import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register as registerApi } from '../api/auth.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    age: '',
    place: '',
    userType: 'Individual',
    schoolName: '',
    areaName: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email || !form.password || !form.phoneNumber || !form.age || !form.place) {
      setError('Please fill in all required fields.')
      return
    }
    if (+form.age < 1 || +form.age > 100) {
      setError('Age must be between 1 and 100.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (form.userType === 'School' && (!form.schoolName.trim() || !form.areaName.trim())) {
      setError('School Name and Area Name are required for school users.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const data = await registerApi({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        phoneNumber: form.phoneNumber,
        age: +form.age,
        place: form.place,
        userType: form.userType,
        schoolName: form.schoolName,
        areaName: form.areaName
      })
      login(data.token, data.name, data.email, data.userType, data.subscriptionPlan, data.subscriptionDuration)
      navigate('/')
    } catch (err) {
      setError(err.response?.data || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="assessment-page">
      <div className="container">
        <header className="header">
          <div className="header-inner">
            <div className="logo" onClick={() => navigate('/')}>Life Mastery <span>360</span></div>
          </div>
        </header>
      </div>

      <div className="details-content">
        <div className="details-card fade-in">
          <span className="assessment-emoji" style={{ display: 'block', textAlign: 'center' }}>✨</span>
          <h2 className="assessment-title" style={{ textAlign: 'center' }}>Create Account</h2>
          <p className="assessment-subtitle" style={{ textAlign: 'center', marginBottom: 28 }}>
            Join Life Mastery 360 today
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">First Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Alex"
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
                placeholder="e.g. Johnson"
                value={form.lastName}
                onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                className="form-input"
                placeholder="e.g. 9876543210"
                value={form.phoneNumber}
                onChange={e => setForm(f => ({ ...f, phoneNumber: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Age *</label>
              <input
                type="number"
                className="form-input"
                placeholder="e.g. 18"
                value={form.age}
                min={1}
                max={100}
                onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Place *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Mumbai"
                value={form.place}
                onChange={e => setForm(f => ({ ...f, place: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">User Type *</label>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {['Individual', 'School'].map(option => (
                  <label key={option} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                      type="radio"
                      name="userType"
                      value={option}
                      checked={form.userType === option}
                      onChange={e => setForm(f => ({ ...f, userType: e.target.value }))}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            {form.userType === 'School' && (
              <>
                <div className="form-group">
                  <label className="form-label">School Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Harmony High School"
                    value={form.schoolName}
                    onChange={e => setForm(f => ({ ...f, schoolName: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Area Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Andheri East"
                    value={form.areaName}
                    onChange={e => setForm(f => ({ ...f, areaName: e.target.value }))}
                    required
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password"
                className="form-input"
                placeholder="At least 6 characters"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <input
                type="password"
                className="form-input"
                placeholder="Repeat your password"
                value={form.confirmPassword}
                onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                required
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="btn btn-primary btn-full mt-16" disabled={loading}>
              {loading ? 'Creating account…' : 'Create Account →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <span
              style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => navigate('/login')}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
