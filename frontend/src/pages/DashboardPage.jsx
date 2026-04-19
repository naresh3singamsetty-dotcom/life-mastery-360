import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const [assessmentHistory, setAssessmentHistory] = useState([])
  const [activities, setActivities] = useState({
    logicalThinking: 0,
    verbalThinking: 0,
    fearOfStage: 0,
    fearOfExam: 0,
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    // Fetch assessment history and activities from backend (future integration)
    // For now, using placeholder data
    setAssessmentHistory([
      { id: 1, date: '2025-04-15', type: 'Full Assessment', score: 78, duration: '4 min' },
      { id: 2, date: '2025-04-10', type: 'Quick Scan', score: 72, duration: '1 min' },
    ])
    setActivities({
      logicalThinking: 65,
      verbalThinking: 72,
      fearOfStage: 58,
      fearOfExam: 81,
    })
  }, [isAuthenticated, navigate])

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header-inner">
            <div className="logo" onClick={() => navigate('/')}>Life Mastery <span>360</span></div>
            <div className="nav-auth">
              <span className="nav-greeting">Hi, {user.name}</span>
              <button className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '0.85rem' }} onClick={logout}>
                Sign Out
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Hero */}
        <section className="dashboard-hero fade-in" style={{ marginTop: 32, marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '2rem', marginBottom: 8 }}>Welcome back, {user.firstName}!</h1>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                Plan: <strong>{user.subscriptionPlan || 'No active plan'}</strong> · {user.userType} user
              </p>
            </div>
            <div style={{ textAlign: 'right', fontSize: '3rem' }}>📊</div>
          </div>
        </section>

        {/* Main Dashboard Grid */}
        <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 40 }}>
          
          {/* Assessment Module */}
          <div className="dashboard-card" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 24, cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => navigate('/assessments')}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🧠</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>Start Assessment</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 12 }}>
              Browse and take a MindPulse assessment to track your mental wellness.
            </p>
            <button className="btn btn-primary btn-sm" style={{ width: '100%' }}>
              Browse Assessments →
            </button>
          </div>

          {/* Assessment History Module */}
          <div className="dashboard-card" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 24, cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => navigate('/assessment-history')}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📈</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>Earlier Assessments</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 12 }}>
              View your assessment history and past results.
            </p>
            <button className="btn btn-outline btn-sm" style={{ width: '100%' }}>
              View History →
            </button>
          </div>

          {/* Profile Module */}
          <div className="dashboard-card" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 24, cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => navigate('/profile')}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>👤</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>Profile Details</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 12 }}>
              Manage your personal information and preferences.
            </p>
            <button className="btn btn-outline btn-sm" style={{ width: '100%' }}>
              Edit Profile →
            </button>
          </div>

          {/* Change Password Module */}
          <div className="dashboard-card" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 24, cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => navigate('/change-password')}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🔐</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>Change Password</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 12 }}>
              Update your account security credentials.
            </p>
            <button className="btn btn-outline btn-sm" style={{ width: '100%' }}>
              Change Now →
            </button>
          </div>

          {/* Assessment Status Tracker */}
          <div className="dashboard-card" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 24, cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => navigate('/assessment-tracker')}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📋</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>Assessment Status</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 12 }}>
              Track your assessment completion and progress.
            </p>
            <button className="btn btn-outline btn-sm" style={{ width: '100%' }}>
              View Status →
            </button>
          </div>

          {/* Issue Analysis Tracker */}
          <div className="dashboard-card" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 24, cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => navigate('/issue-tracker')}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🔍</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>Issue Analysis</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 12 }}>
              Analyze identified issues and improvement areas.
            </p>
            <button className="btn btn-outline btn-sm" style={{ width: '100%' }}>
              View Issues →
            </button>
          </div>
        </div>

        {/* Activities Section */}
        <section className="activities-section" style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 24 }}>Your Activities</h2>
          <div className="activities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            
            {/* Logical Thinking */}
            <div className="activity-card" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>Logical Thinking</span>
                <span style={{ fontSize: '1.3rem' }}>🧩</span>
              </div>
              <div style={{ backgroundColor: 'var(--bg-subtle)', borderRadius: 8, height: 8, overflow: 'hidden' }}>
                <div style={{ backgroundColor: 'var(--primary)', height: '100%', width: `${activities.logicalThinking}%`, transition: 'width 0.3s' }} />
              </div>
              <p style={{ marginTop: 8, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{activities.logicalThinking}% proficiency</p>
            </div>

            {/* Verbal Thinking */}
            <div className="activity-card" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>Verbal Thinking</span>
                <span style={{ fontSize: '1.3rem' }}>💬</span>
              </div>
              <div style={{ backgroundColor: 'var(--bg-subtle)', borderRadius: 8, height: 8, overflow: 'hidden' }}>
                <div style={{ backgroundColor: 'var(--primary)', height: '100%', width: `${activities.verbalThinking}%`, transition: 'width 0.3s' }} />
              </div>
              <p style={{ marginTop: 8, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{activities.verbalThinking}% proficiency</p>
            </div>

            {/* Fear of Stage */}
            <div className="activity-card" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>Fear of Stage</span>
                <span style={{ fontSize: '1.3rem' }}>🎭</span>
              </div>
              <div style={{ backgroundColor: 'var(--bg-subtle)', borderRadius: 8, height: 8, overflow: 'hidden' }}>
                <div style={{ backgroundColor: 'var(--primary)', height: '100%', width: `${activities.fearOfStage}%`, transition: 'width 0.3s' }} />
              </div>
              <p style={{ marginTop: 8, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{activities.fearOfStage}% managed</p>
            </div>

            {/* Fear of Exam */}
            <div className="activity-card" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>Fear of Exam</span>
                <span style={{ fontSize: '1.3rem' }}>📝</span>
              </div>
              <div style={{ backgroundColor: 'var(--bg-subtle)', borderRadius: 8, height: 8, overflow: 'hidden' }}>
                <div style={{ backgroundColor: 'var(--primary)', height: '100%', width: `${activities.fearOfExam}%`, transition: 'width 0.3s' }} />
              </div>
              <p style={{ marginTop: 8, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{activities.fearOfExam}% managed</p>
            </div>
          </div>
        </section>

        {/* Recent Assessments */}
        <section className="recent-assessments" style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 16 }}>Recent Assessments</h2>
          <div className="assessments-list" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {assessmentHistory.length > 0 ? (
              assessmentHistory.map(assessment => (
                <div key={assessment.id} style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600, marginBottom: 4 }}>{assessment.type}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{assessment.date} • {assessment.duration}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--primary)' }}>{assessment.score}%</p>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 20 }}>No assessments yet. Start your first assessment!</p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
