import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function GuestResultsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchResult()
  }, [id])

  const fetchResult = async () => {
    try {
      const response = await axios.get(`/api/assessment/${id}`)
      setResult(response.data)
    } catch (err) {
      setError('Could not load results. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
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
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading your results...</p>
        </div>
      </div>
    )
  }

  if (error) {
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
          <div className="assessment-card" style={{ textAlign: 'center' }}>
            <span className="assessment-emoji">⚠️</span>
            <h2 className="assessment-title">{error}</h2>
            <button className="btn btn-primary btn-full" onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!result) return null

  const scoreColor = (score) => {
    if (score < 40) return '#e74c3c'
    if (score < 60) return '#f39c12'
    if (score < 80) return '#f1c40f'
    return '#27ae60'
  }

  const renderScoreBar = (label, score, color) => (
    <div key={label} style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontWeight: 500 }}>{label}</span>
        <span style={{ fontWeight: 700, color }}>{score}/100</span>
      </div>
      <div style={{ height: 8, backgroundColor: 'var(--border-color)', borderRadius: 4, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            backgroundColor: color,
            width: `${score}%`,
            transition: 'width 0.3s',
          }}
        />
      </div>
    </div>
  )

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <div className="header-inner">
            <div className="logo" onClick={() => navigate('/')}>Life Mastery <span>360</span></div>
            <button className="btn btn-outline" onClick={() => navigate('/')} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
              Back to Home
            </button>
          </div>
        </header>

        <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 24px' }}>
          {/* Header */}
          <div className="fade-in" style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: 16 }}>📊</span>
            <h1 className="assessment-title" style={{ marginBottom: 12 }}>Your Wellness Report</h1>
            <p className="assessment-subtitle">
              Anonymous Assessment • Class {result.age >= 15 ? '9–12' : '6–8'} • {result.gender}
            </p>
          </div>

          {/* Scores Overview */}
          <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 32, marginBottom: 40 }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 24 }}>Key Dimensions</h2>
            {renderScoreBar('Stress Management', result.scores.stress, scoreColor(result.scores.stress))}
            {renderScoreBar('Focus & Concentration', result.scores.focus, scoreColor(result.scores.focus))}
            {renderScoreBar('Emotional Regulation', result.scores.emotionalRegulation, scoreColor(result.scores.emotionalRegulation))}
            {renderScoreBar('Habit & Discipline', result.scores.habitDiscipline, scoreColor(result.scores.habitDiscipline))}
            {renderScoreBar('Social Confidence', result.scores.socialConfidence, scoreColor(result.scores.socialConfidence))}
          </div>

          {/* Interpretation */}
          {result.interpretation && (
            <div style={{ backgroundColor: 'var(--bg-subtle)', borderRadius: 12, padding: 32, marginBottom: 40 }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 20 }}>Insights</h2>

              {result.interpretation.summary && (
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>Overview</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {result.interpretation.summary}
                  </p>
                </div>
              )}

              {result.interpretation.strengths && result.interpretation.strengths.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8, color: '#27ae60' }}>💪 Your Strengths</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {result.interpretation.strengths.map((strength, i) => (
                      <li key={i} style={{ marginBottom: 8, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <span style={{ color: '#27ae60', flexShrink: 0 }}>✓</span>
                        <span style={{ color: 'var(--text-muted)' }}>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.interpretation.growthAreas && result.interpretation.growthAreas.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8, color: '#e74c3c' }}>🌱 Growth Opportunities</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {result.interpretation.growthAreas.map((area, i) => (
                      <li key={i} style={{ marginBottom: 8, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <span style={{ color: '#e74c3c', flexShrink: 0 }}>→</span>
                        <span style={{ color: 'var(--text-muted)' }}>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.interpretation.recommendations && result.interpretation.recommendations.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8, color: '#3498db' }}>💡 Recommended Actions</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {result.interpretation.recommendations.map((rec, i) => (
                      <li key={i} style={{ marginBottom: 8, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <span style={{ color: '#3498db', flexShrink: 0 }}>📌</span>
                        <span style={{ color: 'var(--text-muted)' }}>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* CTA */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: 16 }}>
              Want to save this report, track your progress, and get deeper insights?
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/register')} style={{ padding: '12px 32px' }}>
              Create an Account →
            </button>
          </div>

          {/* Disclaimer */}
          <div style={{ backgroundColor: 'var(--bg-subtle)', borderRadius: 12, padding: 24, textAlign: 'center' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              This assessment is for self-reflection purposes. For professional mental health support, please consult a qualified counselor or therapist.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
