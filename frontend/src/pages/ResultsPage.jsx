import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getResult } from '../api/assessment.js'
import { useAssessment } from '../context/AssessmentContext.jsx'

function PsychologistPopup({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-icon">🧑‍⚕️</div>
        <h2 className="modal-title">We Care About You</h2>
        <p className="modal-body">
          One or more of your wellness areas need attention. We strongly recommend speaking
          with a <strong>psychologist or counsellor</strong> — reaching out for support is a
          sign of strength, not weakness.
        </p>
        <p className="modal-body" style={{ marginTop: 8, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          You can find professional help through your school counsellor, a trusted adult,
          or a mental health helpline in your region.
        </p>
        <button className="btn btn-primary btn-full" style={{ marginTop: 20 }} onClick={onClose}>
          I Understand
        </button>
      </div>
    </div>
  )
}

const LABELS = {
  stress:              'Stress',
  focus:               'Focus',
  emotionalRegulation: 'Emotional Regulation',
  habitDiscipline:     'Habit Discipline',
  socialConfidence:    'Social Confidence',
}

const ICONS = {
  stress:              '🌡️',
  focus:               '🎯',
  emotionalRegulation: '💭',
  habitDiscipline:     '⚙️',
  socialConfidence:    '🤝',
}

const LEVEL_CLASS = {
  'Good':            'good',
  'Moderate':        'moderate',
  'Needs Attention': 'attention',
}

export default function ResultsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { resetAssessment, assessmentMode, userDetails } = useAssessment()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    getResult(id)
      .then(data => {
        setResult(data)
        setLoading(false)
        const hasAttention = Object.values(data.levels).some(l => l === 'Needs Attention')
        if (hasAttention) setShowPopup(true)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [id])

  const handleRetake = () => {
    resetAssessment()
    navigate('/')
  }

  if (loading) return (
    <div className="loading">
      <div className="spinner" />
      <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Preparing your MindPulse Report…</p>
    </div>
  )

  if (error) return (
    <div className="loading">
      <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
        Could not load your results.{' '}
        <button className="btn btn-primary" onClick={() => navigate('/')} style={{ marginTop: 16, padding: '10px 24px', fontSize: '0.9rem' }}>
          Go Home
        </button>
      </p>
    </div>
  )

  const { scores, levels, interpretation } = result

  return (
    <div className="results-page">
      {showPopup && <PsychologistPopup onClose={() => setShowPopup(false)} />}

      {/* Header */}
      <div className="results-header">
        <div className="results-header-logo">Life Mastery 360</div>
        <h1>Your MindPulse Report{userDetails.name ? `, ${userDetails.name}` : ''}</h1>
        <p>Based on your {assessmentMode === 'quick' ? '3-question quick scan' : '30-question assessment'}</p>
        {assessmentMode === 'quick' && (
          <div className="quick-scan-note">
            ⚡ Quick Scan — for a full picture, take the complete 30-question assessment
          </div>
        )}
      </div>

      <div className="results-body">

        {/* Scores */}
        <div className="result-section fade-in-1">
          <div className="result-section-title">📊 Your Scores</div>
          <div className="scores-grid">
            {Object.entries(scores).map(([key, score]) => {
              const level = levels[key]
              const cls = LEVEL_CLASS[level]
              const pct = Math.max(4, 100 - Math.round((score / 18) * 100))
              return (
                <div className="score-row" key={key}>
                  <span className="score-label">{ICONS[key]} {LABELS[key]}</span>
                  <div className="score-bar-wrap">
                    <div className={`score-bar-fill ${cls}`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className={`score-tag ${cls}`}>{level}</span>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 16, marginTop: 18, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} />
              Good (0–5)
            </span>
            <span style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--warning)', display: 'inline-block' }} />
              Moderate (6–11)
            </span>
            <span style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--danger)', display: 'inline-block' }} />
              Needs Attention (12–18)
            </span>
          </div>
        </div>

        {/* AI Summary */}
        <div className="result-section fade-in-2">
          <div className="result-section-title">🤖 AI Summary</div>
          <p className="summary-text">{interpretation.summary}</p>
        </div>

        {/* Strengths */}
        {interpretation.strengths?.length > 0 && (
          <div className="result-section fade-in-3">
            <div className="result-section-title">💪 Your Strengths</div>
            <div className="items-list">
              {interpretation.strengths.map((s, i) => (
                <div className="list-item" key={i}>
                  <span className="list-icon">✅</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Growth Areas */}
        {interpretation.growthAreas?.length > 0 && (
          <div className="result-section fade-in-3">
            <div className="result-section-title">🌱 Growth Areas</div>
            <div className="items-list">
              {interpretation.growthAreas.map((g, i) => (
                <div className="list-item" key={i}>
                  <span className="list-icon">🎯</span>
                  <span>{g}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {interpretation.recommendations?.length > 0 && (
          <div className="result-section fade-in-4">
            <div className="result-section-title">📋 Recommended Practices</div>
            {interpretation.recommendations.map((r, i) => (
              <div className="reco-item" key={i}>
                <div className="reco-number">{i + 1}</div>
                <div className="reco-text">{r}</div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="result-section cta-section fade-in-5">
          <h3 className="cta-title">Ready to Transform Your Life?</h3>
          <p className="cta-sub">Retake the assessment after 30 days to measure your progress</p>
          <button className="btn btn-primary btn-lg" onClick={handleRetake}>
            Take Assessment Again
          </button>
        </div>

      </div>
    </div>
  )
}
