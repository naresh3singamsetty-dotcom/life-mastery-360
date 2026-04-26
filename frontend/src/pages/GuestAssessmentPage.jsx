import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUESTIONS_6_8, QUESTIONS_9_12, OPTIONS } from '../data/questions.js'
import { submitAssessment } from '../api/assessment.js'
import axios from 'axios'

export default function GuestAssessmentPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState('welcome') // welcome -> select -> questions -> results
  const [classLevel, setClassLevel] = useState(null)
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resultId, setResultId] = useState(null)

  const questions = classLevel === '6-8' ? QUESTIONS_6_8 : QUESTIONS_9_12

  const handleSelectClass = (cl) => {
    setClassLevel(cl)
    setStep('details')
  }

  const handleDetailsSubmit = (e) => {
    e.preventDefault()
    if (!age || !gender) {
      setError('Please fill in all fields')
      return
    }
    setError('')
    setStep('questions')
    setAnswers(new Array(30).fill(null)) // Full assessment has 30 questions
  }

  const handleAnswerSelect = (answerIdx) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIdx
    setAnswers(newAnswers)

    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleSubmit = async () => {
    setError('')
    setLoading(true)

    try {
      const payload = {
        answers: answers,
        age: parseInt(age),
        className: classLevel,
        gender,
      }

      const response = await axios.post('/api/assessment/guest/submit', payload)
      setResultId(response.data.id)
      setStep('results')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit assessment')
      setLoading(false)
    }
  }

  if (step === 'welcome') {
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
            <p className="assessment-subtitle">No account required — 30 questions, 5–10 minutes</p>

            <div style={{ backgroundColor: 'var(--bg-subtle)', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
                Get a comprehensive analysis of your mental wellness across five key areas. Your responses are anonymous and not stored permanently.
              </p>
            </div>

            <button
              className="btn btn-primary btn-full"
              onClick={() => handleSelectClass('6-8')}
              style={{ marginBottom: 12 }}
            >
              I'm in Class 6–8 →
            </button>
            <button
              className="btn btn-primary btn-full"
              onClick={() => handleSelectClass('9-12')}
              style={{ marginBottom: 12 }}
            >
              I'm in Class 9–12 →
            </button>

            <hr style={{ margin: '24px 0', borderColor: 'var(--border-color)' }} />

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: 12 }}>
              Want to save your results and get personalized recommendations?
            </p>
            <button
              className="btn btn-outline btn-full"
              onClick={() => navigate('/register')}
            >
              Create an Account
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'details') {
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
          <div className="assessment-card fade-in">
            <span className="assessment-emoji">🧑‍🎓</span>
            <h1 className="assessment-title">Your Details</h1>
            <p className="assessment-subtitle">Quick info to personalize your results</p>

            <form onSubmit={handleDetailsSubmit}>
              <div className="form-group">
                <label className="form-label">Age *</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="10"
                  max="20"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Gender *</label>
                <select
                  className="form-input"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer Not">Prefer Not to Say</option>
                </select>
              </div>

              {error && (
                <p style={{ color: 'var(--danger)', fontSize: '0.85rem', marginBottom: 16 }}>
                  ⚠ {error}
                </p>
              )}

              <button type="submit" className="btn btn-primary btn-full">
                Continue →
              </button>
            </form>

            <button
              className="btn btn-outline btn-full"
              onClick={() => setStep('welcome')}
              style={{ marginTop: 12 }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'questions') {
    const question = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / 30) * 100

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
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                Question {currentQuestion + 1} of 30
              </div>
              <div style={{ height: 4, backgroundColor: 'var(--border-color)', borderRadius: 2, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    backgroundColor: '#3498db',
                    width: `${progress}%`,
                    transition: 'width 0.3s',
                  }}
                />
              </div>
            </div>

            <p style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: 24, lineHeight: 1.6 }}>
              {question.text}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {OPTIONS.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswerSelect(i)}
                  style={{
                    padding: '12px 16px',
                    backgroundColor: answers[currentQuestion] === i ? '#3498db' : 'var(--card-bg)',
                    color: answers[currentQuestion] === i ? 'white' : 'var(--text)',
                    border: `2px solid ${answers[currentQuestion] === i ? '#3498db' : 'var(--border-color)'}`,
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    transition: 'all 0.2s',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => {
                    if (answers[currentQuestion] !== i) {
                      e.currentTarget.style.borderColor = '#3498db'
                      e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (answers[currentQuestion] !== i) {
                      e.currentTarget.style.borderColor = 'var(--border-color)'
                      e.currentTarget.style.backgroundColor = 'var(--card-bg)'
                    }
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            {currentQuestion === 29 && (
              <button
                className="btn btn-primary btn-full"
                onClick={handleSubmit}
                disabled={answers[currentQuestion] === null || loading}
                style={{ marginTop: 24, opacity: answers[currentQuestion] === null || loading ? 0.6 : 1 }}
              >
                {loading ? '⏳ Analyzing...' : 'Get My Results →'}
              </button>
            )}

            {error && (
              <p style={{ color: 'var(--danger)', fontSize: '0.85rem', marginTop: 16, textAlign: 'center' }}>
                ⚠ {error}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (step === 'results') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>
        <div style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)', padding: '48px', maxWidth: '560px', width: '100%', textAlign: 'center' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: 20 }}>✅</span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 12 }}>Assessment Complete!</h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.6 }}>
            Your results are ready. View your personalized wellness report below, or create an account to save and track your progress over time.
          </p>

          <button
            className="btn btn-primary btn-full"
            onClick={() => navigate(`/guest-results/${resultId}`)}
            style={{ marginBottom: 12 }}
          >
            View My Results →
          </button>

          <button
            className="btn btn-outline btn-full"
            onClick={() => navigate('/register')}
            style={{ marginBottom: 12 }}
          >
            Create Account to Save
          </button>

          <button
            className="btn btn-outline btn-full"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }
}
