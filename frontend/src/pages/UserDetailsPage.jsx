import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAssessment } from '../context/AssessmentContext.jsx'

export default function UserDetailsPage() {
  const navigate = useNavigate()
  const { setUserDetails } = useAssessment()
  const [form, setForm] = useState({ name: '', age: '', className: '', gender: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Please enter your name.')
      return
    }
    const age = parseInt(form.age)
    if (!form.age || isNaN(age) || age < 10 || age > 100) {
      setError('Please enter a valid age between 10 and 100.')
      return
    }
    setError('')
    setUserDetails({ ...form, age: form.age })
    navigate('/question/1')
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
          <span className="assessment-emoji" style={{ display: 'block', textAlign: 'center' }}>👤</span>
          <h2 className="assessment-title" style={{ textAlign: 'center' }}>Tell Us About You</h2>
          <p className="assessment-subtitle" style={{ textAlign: 'center', marginBottom: '28px' }}>
            Helps us personalise your report
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Alex"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Age *</label>
              <input
                type="number"
                className="form-input"
                placeholder="e.g. 16"
                value={form.age}
                min={10}
                max={100}
                onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
                required
              />
              {error && <p className="form-error">{error}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Class / Grade <span className="optional">(optional)</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 10th Grade, Year 12, First Year"
                value={form.className}
                onChange={e => setForm(f => ({ ...f, className: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Gender <span className="optional">(optional)</span>
              </label>
              <select
                className="form-input form-select"
                value={form.gender}
                onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
              >
                <option value="">Prefer not to say</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary btn-full mt-16">
              Continue →
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
