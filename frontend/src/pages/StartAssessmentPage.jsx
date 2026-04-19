import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAssessment } from '../context/AssessmentContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const INSTRUCTIONS = [
  { icon: '💭', text: 'Answer based on how you truly feel, not how you want to feel' },
  { icon: '✅', text: 'There are no right or wrong answers' },
  { icon: '🔒', text: 'Your responses are private and not shared with anyone' },
]

export default function StartAssessmentPage() {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { setAssessmentMode, setClassSegment } = useAssessment()
  const [selectedClass, setSelectedClass] = useState(null)   // '6-8' | '9-12'
  const [selectedMode, setSelectedMode] = useState(null)     // 'quick' | 'full'
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    if (!user?.subscriptionPlan) {
      navigate('/subscriptions')
      return
    }
  }, [isAuthenticated, user?.subscriptionPlan, navigate])

  const handleContinue = () => {
    if (!selectedClass && !selectedMode) {
      setError('Please select your class level and assessment type.')
      return
    }
    if (!selectedClass) {
      setError('Please select your class level (Step 1).')
      return
    }
    if (!selectedMode) {
      setError('Please select an assessment type (Step 2).')
      return
    }
    setError('')
    setClassSegment(selectedClass)
    setAssessmentMode(selectedMode)
    navigate('/details')
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

      <div className="assessment-content">
        <div className="assessment-card fade-in" style={{ maxWidth: 560 }}>
          <span className="assessment-emoji">🧠</span>
          <h1 className="assessment-title">MindPulse AI Assessment</h1>
          <p className="assessment-subtitle">Select your class level and assessment type</p>

          {/* Step 1: Class Level */}
          <div className="select-section">
            <div className="select-section-label">Step 1 · Your Class Level</div>
            <div className="mode-grid">
              <div
                className={`mode-card ${selectedClass === '6-8' ? 'mode-card-selected' : ''}`}
                onClick={() => setSelectedClass('6-8')}
              >
                <div className="mode-icon">🏫</div>
                <div className="mode-title">Class 6 – 8</div>
                <div className="mode-desc">Middle School</div>
                <div className="mode-note">Simple, relatable language</div>
              </div>
              <div
                className={`mode-card ${selectedClass === '9-12' ? 'mode-card-selected' : ''}`}
                onClick={() => setSelectedClass('9-12')}
              >
                <div className="mode-icon">🎓</div>
                <div className="mode-title">Class 9 – 12</div>
                <div className="mode-desc">High School</div>
                <div className="mode-note">Slightly deeper, reflective language</div>
              </div>
            </div>
          </div>

          {/* Step 2: Assessment Mode */}
          <div className="select-section">
            <div className="select-section-label">Step 2 · Assessment Type</div>
            <div className="mode-grid">
              <div
                className={`mode-card ${selectedMode === 'quick' ? 'mode-card-selected' : ''}`}
                onClick={() => setSelectedMode('quick')}
              >
                <div className="mode-icon">⚡</div>
                <div className="mode-title">Quick Scan</div>
                <div className="mode-desc">5 questions · ~1 min</div>
                <div className="mode-note">Fast wellness snapshot</div>
              </div>
              <div
                className={`mode-card ${selectedMode === 'full' ? 'mode-card-selected' : ''}`}
                onClick={() => setSelectedMode('full')}
              >
                <div className="mode-icon">📊</div>
                <div className="mode-title">Full Assessment</div>
                <div className="mode-desc">30 questions · 3–5 min</div>
                <div className="mode-note">Detailed 5-area report</div>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            className="btn btn-primary btn-full"
            style={{ marginTop: 8 }}
            onClick={handleContinue}
          >
            Continue →
          </button>

          {error && (
            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--danger)', marginTop: 10, fontWeight: 500 }}>
              ⚠ {error}
            </p>
          )}

          <ul className="instructions-list" style={{ marginTop: 20 }}>
            {INSTRUCTIONS.map((item, i) => (
              <li key={i}>
                <span className="instr-icon">{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
