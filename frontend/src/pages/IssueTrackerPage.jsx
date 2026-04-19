import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function IssueTrackerPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    // TODO: Fetch issues from backend
    setIssues([
      {
        id: 1,
        area: 'Academic Stress',
        severity: 'High',
        description: 'Elevated stress levels during exam preparation periods',
        recommendation: 'Practice calming techniques and time management strategies',
        status: 'Active',
        detectedDate: '2025-04-15',
      },
      {
        id: 2,
        area: 'Social Anxiety',
        severity: 'Medium',
        description: 'Anxiety in social situations with peers',
        recommendation: 'Gradual exposure and social skill building exercises',
        status: 'In Progress',
        detectedDate: '2025-03-28',
      },
      {
        id: 3,
        area: 'Sleep Quality',
        severity: 'Medium',
        description: 'Insufficient sleep affecting daily performance',
        recommendation: 'Establish consistent sleep schedule and bedtime routine',
        status: 'Active',
        detectedDate: '2025-04-10',
      },
      {
        id: 4,
        area: 'Emotional Regulation',
        severity: 'Low',
        description: 'Minor fluctuations in mood management',
        recommendation: 'Mindfulness and reflection exercises',
        status: 'Monitoring',
        detectedDate: '2025-03-25',
      },
    ])
    setLoading(false)
  }, [isAuthenticated, navigate])

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return '#e74c3c'
      case 'Medium':
        return '#f39c12'
      case 'Low':
        return '#27ae60'
      default:
        return 'var(--text-muted)'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#3498db'
      case 'In Progress':
        return '#9b59b6'
      case 'Monitoring':
        return '#1abc9c'
      default:
        return 'var(--text-muted)'
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

        <div style={{ maxWidth: 1000, margin: '40px auto' }}>
          <div className="fade-in">
            <h2 className="assessment-title" style={{ textAlign: 'center', marginBottom: 12 }}>Issue Analysis Tracker</h2>
            <p className="assessment-subtitle" style={{ textAlign: 'center', marginBottom: 32 }}>
              Track identified issues and recommended interventions
            </p>

            {loading ? (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading issues...</p>
            ) : issues.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {issues.map((issue) => (
                  <div
                    key={issue.id}
                    style={{
                      backgroundColor: 'var(--card-bg)',
                      border: `2px solid ${getSeverityColor(issue.severity)}20`,
                      borderRadius: 12,
                      padding: 24,
                      borderLeft: `4px solid ${getSeverityColor(issue.severity)}`,
                    }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, marginBottom: 16 }}>
                      <div>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'start', marginBottom: 12 }}>
                          <div style={{ fontSize: '1.5rem' }}>🔍</div>
                          <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 4 }}>
                              {issue.area}
                            </h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                              Detected on {issue.detectedDate}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexDirection: 'column', alignItems: 'flex-end' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            backgroundColor: getSeverityColor(issue.severity) + '20',
                            color: getSeverityColor(issue.severity),
                            borderRadius: 20,
                            fontSize: '0.8rem',
                            fontWeight: 600,
                          }}
                        >
                          {issue.severity} Severity
                        </span>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            backgroundColor: getStatusColor(issue.status) + '20',
                            color: getStatusColor(issue.status),
                            borderRadius: 20,
                            fontSize: '0.8rem',
                            fontWeight: 600,
                          }}
                        >
                          {issue.status}
                        </span>
                      </div>
                    </div>

                    <p style={{ marginBottom: 12, lineHeight: 1.6 }}>
                      {issue.description}
                    </p>

                    <div style={{ backgroundColor: 'var(--bg-subtle)', borderRadius: 8, padding: 12, marginTop: 12 }}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, color: 'var(--text-muted)' }}>
                        💡 Recommendation:
                      </p>
                      <p style={{ fontSize: '0.9rem' }}>
                        {issue.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <p style={{ fontSize: '3rem', marginBottom: 16 }}>🎉</p>
                <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>No issues detected.</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Keep taking assessments to track your mental wellness progress.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
