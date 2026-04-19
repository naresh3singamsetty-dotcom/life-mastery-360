import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function AssessmentTrackerPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [trackerData, setTrackerData] = useState(null)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    // TODO: Fetch assessment tracker data from backend
    setTrackerData({
      totalAssessments: 4,
      completionRate: 100,
      averageScore: 74,
      lastAssessment: '2025-04-15',
      streakDays: 15,
      milestones: [
        { name: 'First Assessment', completed: true, date: '2025-03-25' },
        { name: '5 Assessments', completed: true, date: '2025-04-10' },
        { name: '10 Assessments', completed: false, progress: 40 },
      ],
      monthlyProgress: [
        { month: 'Mar', assessments: 1, avgScore: 70 },
        { month: 'Apr', assessments: 3, avgScore: 75 },
      ],
    })
  }, [isAuthenticated, navigate])

  if (!isAuthenticated || !trackerData) {
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
            <h2 className="assessment-title" style={{ textAlign: 'center', marginBottom: 12 }}>Assessment Status Tracker</h2>
            <p className="assessment-subtitle" style={{ textAlign: 'center', marginBottom: 32 }}>
              Monitor your assessment progress and achievements
            </p>

            {/* Key Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
              <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 8 }}>Total Assessments</p>
                <p style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--primary)' }}>{trackerData.totalAssessments}</p>
              </div>
              <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 8 }}>Average Score</p>
                <p style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--primary)' }}>{trackerData.averageScore}%</p>
              </div>
              <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 8 }}>Current Streak</p>
                <p style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--primary)' }}>{trackerData.streakDays} 🔥</p>
              </div>
              <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 8 }}>Completion Rate</p>
                <p style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--primary)' }}>{trackerData.completionRate}%</p>
              </div>
            </div>

            {/* Milestones */}
            <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 20 }}>🏆 Milestones</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {trackerData.milestones.map((milestone, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ fontSize: '1.5rem' }}>
                      {milestone.completed ? '✅' : '⏳'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 600, marginBottom: 4 }}>{milestone.name}</p>
                      {milestone.completed && (
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          Completed on {milestone.date}
                        </p>
                      )}
                      {milestone.progress && (
                        <div style={{ marginTop: 8, backgroundColor: 'var(--bg-subtle)', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                          <div style={{ backgroundColor: 'var(--primary)', height: '100%', width: `${milestone.progress}%` }} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Progress */}
            <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 24 }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 20 }}>📈 Monthly Progress</h3>
              <div style={{ display: 'grid', gap: 16 }}>
                {trackerData.monthlyProgress.map((month) => (
                  <div key={month.month} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: 4 }}>{month.month}</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {month.assessments} assessment{month.assessments !== 1 ? 's' : ''} • Avg {month.avgScore}%
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {Array(Math.min(month.assessments, 10)).fill(0).map((_, i) => (
                        <div
                          key={i}
                          style={{
                            width: 12,
                            height: 12,
                            backgroundColor: 'var(--primary)',
                            borderRadius: '50%',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
