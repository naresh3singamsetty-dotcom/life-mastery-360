import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getHistory } from '../api/assessments.js'

export default function AssessmentHistoryPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [assessments, setAssessments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    const fetchHistory = async () => {
      try {
        const data = await getHistory()
        const formattedAssessments = data.map(assessment => ({
          id: assessment.id,
          date: new Date(assessment.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }),
          type: 'Full Assessment', // Could be determined from scores or add type field later
          score: Math.round(Object.values(assessment.scores).reduce((a, b) => a + b, 0) / Object.values(assessment.scores).length),
          duration: '4 min', // Placeholder, could calculate from timestamps
          classLevel: assessment.age ? `${Math.floor(assessment.age / 3) * 3}-${Math.floor(assessment.age / 3) * 3 + 2}` : 'Unknown',
          areas: assessment.scores
        }))
        setAssessments(formattedAssessments)
      } catch (error) {
        console.error('Failed to fetch assessment history:', error)
        // Keep placeholder data for now if API fails
        setAssessments([
          {
            id: 1,
            date: '2025-04-15',
            type: 'Full Assessment',
            score: 78,
            duration: '4 min',
            classLevel: '9-12',
            areas: {
              stress: 72,
              focus: 81,
              emotionalRegulation: 75,
              habitDiscipline: 82,
              socialConfidence: 68,
            }
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [isAuthenticated, navigate])

  const handleDownloadReport = (assessment) => {
    // Simple text-based report for now
    const reportContent = `
Life Mastery 360 Assessment Report
===================================

Assessment ID: ${assessment.id}
Date: ${assessment.date}
Type: ${assessment.type}
Overall Score: ${assessment.score}%
Class Level: ${assessment.classLevel}
Duration: ${assessment.duration}

Detailed Scores:
${assessment.areas ? Object.entries(assessment.areas).map(([key, value]) => 
  `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}: ${value}%`
).join('\n') : 'No detailed scores available'}

Generated on: ${new Date().toLocaleString()}
    `.trim()

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `assessment-report-${assessment.id}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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

        <div style={{ maxWidth: 900, margin: '40px auto' }}>
          <div className="fade-in">
            <h2 className="assessment-title" style={{ textAlign: 'center', marginBottom: 12 }}>Assessment History</h2>
            <p className="assessment-subtitle" style={{ textAlign: 'center', marginBottom: 32 }}>
              View all your previous assessments and detailed results
            </p>

            {loading ? (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading assessments...</p>
            ) : assessments.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {assessments.map((assessment) => (
                  <div
                    key={assessment.id}
                    style={{
                      backgroundColor: 'var(--card-bg)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 12,
                      padding: 20,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                    onClick={() => navigate(`/results/${assessment.id}`)}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'start' }}>
                      <div>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                          <span style={{ fontSize: '1.3rem' }}>
                            {assessment.type === 'Full Assessment' ? '📊' : '⚡'}
                          </span>
                          <div>
                            <h3 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 4 }}>
                              {assessment.type}
                            </h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                              {assessment.date} • Class {assessment.classLevel} • {assessment.duration}
                            </p>
                          </div>
                        </div>
                        {assessment.areas && (
                          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-color)' }}>
                            <p style={{ fontSize: '0.85rem', fontWeight: 500, marginBottom: 8, color: 'var(--text-muted)' }}>
                              Key Areas:
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
                              {Object.entries(assessment.areas).map(([key, value]) => (
                                <div key={key} style={{ fontSize: '0.8rem' }}>
                                  <p style={{ marginBottom: 4, textTransform: 'capitalize' }}>
                                    {key.replace(/([A-Z])/g, ' $1')}
                                  </p>
                                  <div style={{ backgroundColor: 'var(--bg-subtle)', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                                    <div style={{ backgroundColor: 'var(--primary)', height: '100%', width: `${value}%` }} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--primary)', marginBottom: 8 }}>
                          {assessment.score}%
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button className="btn btn-outline btn-sm" onClick={(e) => { e.stopPropagation(); handleDownloadReport(assessment) }}>
                            📄 Download PDF
                          </button>
                          <button className="btn btn-outline btn-sm">
                            View Details →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <p style={{ fontSize: '3rem', marginBottom: 16 }}>📭</p>
                <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>No assessments found yet.</p>
                <button className="btn btn-primary" onClick={() => navigate('/start')}>
                  Start Your First Assessment →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
