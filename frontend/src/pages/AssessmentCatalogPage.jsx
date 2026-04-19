import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const AVAILABLE_ASSESSMENTS = [
  {
    id: 'quick-scan',
    name: 'Quick Scan',
    icon: '⚡',
    duration: '1 min',
    questions: 5,
    description: 'A fast wellness snapshot to gauge your current mental state.',
    color: '#3498db',
    accessLevel: 'basic', // basic, intermediate, advanced
    benefits: [
      'Fast assessment',
      'Instant results',
      'Daily tracking',
    ],
  },
  {
    id: 'wellness-check',
    name: 'Wellness Check',
    icon: '💚',
    duration: '2 min',
    questions: 10,
    description: 'A comprehensive but quick check of your overall wellness across key dimensions.',
    color: '#27ae60',
    accessLevel: 'basic',
    benefits: [
      'Balanced depth',
      'Multi-dimensional',
      'Actionable insights',
    ],
  },
  {
    id: 'full-assessment',
    name: 'Full Assessment',
    icon: '📊',
    duration: '3–5 min',
    questions: 30,
    description: 'Detailed 5-area assessment for comprehensive mental wellness insights.',
    color: '#9b59b6',
    accessLevel: 'intermediate',
    benefits: [
      'Five key areas',
      'Detailed report',
      'Personalized plan',
    ],
  },
  {
    id: 'deep-dive',
    name: 'Deep Dive',
    icon: '🔬',
    duration: '5–10 min',
    questions: 50,
    description: 'The most comprehensive assessment with advanced analytics and intervention recommendations.',
    color: '#e74c3c',
    accessLevel: 'advanced',
    benefits: [
      'In-depth analysis',
      'Advanced insights',
      'Expert recommendations',
    ],
  },
]

export default function AssessmentCatalogPage() {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const [selectedAssessment, setSelectedAssessment] = useState(null)
  const [error, setError] = useState('')
  const [showAccessError, setShowAccessError] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
  }, [isAuthenticated, navigate])

  const getAccessLevel = () => {
    const plan = user?.subscriptionPlan
    if (!plan) return 'none'
    if (plan === 'Basic') return 'basic'
    if (plan === 'Intermediate') return 'intermediate'
    if (plan === 'Advanced') return 'advanced'
    return 'none'
  }

  const canAccessAssessment = (requiredLevel) => {
    const levels = { none: 0, basic: 1, intermediate: 2, advanced: 3 }
    const userLevel = levels[getAccessLevel()]
    const requiredLevelValue = levels[requiredLevel]
    return userLevel >= requiredLevelValue
  }

  const handleTakeAssessment = (assessment) => {
    setError('')
    setShowAccessError(false)

    if (!canAccessAssessment(assessment.accessLevel)) {
      setSelectedAssessment(assessment)
      setShowAccessError(true)
      setError(`This assessment is not accessible with your current ${user?.subscriptionPlan || 'free'} plan.`)
      return
    }

    // Store selected assessment and proceed to class level selection
    sessionStorage.setItem('selectedAssessmentId', assessment.id)
    navigate('/start')
  }

  const getUpgradeRecommendation = (requiredLevel) => {
    const recommendations = {
      basic: 'Intermediate',
      intermediate: 'Advanced',
      advanced: 'Contact Sales',
    }
    return recommendations[requiredLevel]
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <div className="header-inner">
            <div className="logo" onClick={() => navigate('/')}>Life Mastery <span>360</span></div>
            <div className="nav-auth">
              <span className="nav-greeting">Hi, {user.name}</span>
              <button className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '0.85rem' }} onClick={() => navigate('/dashboard')}>
                Dashboard
              </button>
            </div>
          </div>
        </header>

        <div style={{ maxWidth: 1200, margin: '40px auto' }}>
          <div className="fade-in">
            <h1 className="assessment-title" style={{ textAlign: 'center', marginBottom: 12 }}>Assessment Catalog</h1>
            <p className="assessment-subtitle" style={{ textAlign: 'center', marginBottom: 16 }}>
              Choose an assessment to start your mental wellness journey
            </p>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Current plan: <strong>{user.subscriptionPlan || 'No active plan'}</strong>
              </span>
            </div>

            {/* Assessment Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 40 }}>
              {AVAILABLE_ASSESSMENTS.map((assessment) => {
                const hasAccess = canAccessAssessment(assessment.accessLevel)
                return (
                  <div
                    key={assessment.id}
                    style={{
                      backgroundColor: 'var(--card-bg)',
                      border: `2px solid ${hasAccess ? assessment.color : 'var(--border-color)'}20`,
                      borderRadius: 12,
                      overflow: 'hidden',
                      transition: 'all 0.3s',
                      opacity: hasAccess ? 1 : 0.7,
                      transform: hasAccess ? 'translateY(0)' : 'translateY(4px)',
                    }}
                    onMouseEnter={e => {
                      if (hasAccess) {
                        e.currentTarget.style.transform = 'translateY(-4px)'
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)'
                      }
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = hasAccess ? 'translateY(0)' : 'translateY(4px)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {/* Header with icon and access badge */}
                    <div style={{ padding: 20, borderBottom: `1px solid var(--border-color)`, display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div style={{ fontSize: '3rem' }}>{assessment.icon}</div>
                      {!hasAccess && (
                        <span style={{ backgroundColor: '#f39c12', color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>
                          Upgrade
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ padding: 20 }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 8 }}>{assessment.name}</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 16 }}>
                        {assessment.description}
                      </p>

                      {/* Metadata */}
                      <div style={{ display: 'flex', gap: 16, marginBottom: 16, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <div>⏱️ {assessment.duration}</div>
                        <div>❓ {assessment.questions} questions</div>
                      </div>

                      {/* Benefits */}
                      <ul style={{ marginBottom: 16, fontSize: '0.85rem', listStyle: 'none', padding: 0 }}>
                        {assessment.benefits.map((benefit, i) => (
                          <li key={i} style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ color: assessment.color }}>✓</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>

                      {/* Take Assessment Button */}
                      {hasAccess ? (
                        <button
                          className="btn btn-primary btn-full"
                          onClick={() => handleTakeAssessment(assessment)}
                          style={{
                            backgroundColor: assessment.color,
                            borderColor: assessment.color,
                          }}
                        >
                          Take Assessment →
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline btn-full"
                          onClick={() => handleTakeAssessment(assessment)}
                          style={{ color: 'var(--text-muted)', opacity: 0.6 }}
                        >
                          Locked - Upgrade to access
                        </button>
                      )}
                    </div>

                    {/* Access Level Badge */}
                    <div style={{ padding: '12px 20px', backgroundColor: 'var(--bg-subtle)', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Requires: <strong>{assessment.accessLevel.charAt(0).toUpperCase() + assessment.accessLevel.slice(1)} Plan</strong>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Access Error Modal */}
            {showAccessError && selectedAssessment && (
              <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: 12, padding: 32, maxWidth: 500, boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 16, textAlign: 'center' }}>🔒</div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: 12, textAlign: 'center' }}>
                    Access Restricted
                  </h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: 16, textAlign: 'center' }}>
                    The <strong>{selectedAssessment.name}</strong> is not accessible with your current <strong>{user?.subscriptionPlan || 'free'} plan</strong>.
                  </p>
                  <div style={{ backgroundColor: 'var(--bg-subtle)', padding: 16, borderRadius: 8, marginBottom: 20 }}>
                    <p style={{ fontSize: '0.9rem', marginBottom: 8 }}>
                      <strong>📋 Current Access:</strong>
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Your {user?.subscriptionPlan || 'account'} plan gives you access to Basic-level assessments only.
                    </p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                    <button
                      className="btn btn-outline"
                      onClick={() => {
                        setShowAccessError(false)
                        setSelectedAssessment(null)
                      }}
                    >
                      Close
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setShowAccessError(false)
                        setSelectedAssessment(null)
                        navigate('/subscriptions')
                      }}
                    >
                      Upgrade Plan →
                    </button>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                    Upgrade to <strong>{getUpgradeRecommendation(selectedAssessment.accessLevel)} Plan</strong> to access this assessment.
                  </p>
                </div>
              </div>
            )}

            {/* Info Section */}
            <section style={{ backgroundColor: 'var(--bg-subtle)', borderRadius: 12, padding: 24, marginTop: 40 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16 }}>📚 About Our Assessments</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
                <div>
                  <p style={{ fontWeight: 600, marginBottom: 8 }}>🎯 Scientifically-Backed</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Each assessment is based on proven psychological principles and validated research.
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: 600, marginBottom: 8 }}>📊 Personalized Results</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Get detailed insights specific to your mental wellness profile and needs.
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: 600, marginBottom: 8 }}>🔐 Private & Secure</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Your responses are encrypted and never shared with third parties.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
