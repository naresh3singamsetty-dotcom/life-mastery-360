import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const BENEFITS = [
  { icon: '⚡', text: '3-minute assessment' },
  { icon: '📊', text: 'Instant personalized report' },
  { icon: '🎯', text: 'Actionable growth plan' },
]

const TRUST_CARDS = [
  {
    icon: '🎓',
    title: 'For Students',
    desc: 'Designed for young learners navigating academic pressure, social challenges, and personal growth in today\'s fast-paced world.',
  },
  {
    icon: '🏫',
    title: 'For Schools',
    desc: 'A scalable wellness tool that helps educators understand and proactively support their students\' mental wellbeing.',
  },
  {
    icon: '🧠',
    title: 'Psychology-Based',
    desc: 'Built on proven psychological principles across five key dimensions of mental health and personal effectiveness.',
  },
]

export default function HomePage() {
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <div className="header-inner">
            <div className="logo">Life Mastery <span>360</span></div>
            <div className="nav-auth">
              {isAuthenticated ? (
                <>
                  <span className="nav-greeting">Hi, {user.name}</span>
                  <button className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '0.85rem' }} onClick={logout}>
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '0.85rem' }} onClick={() => navigate('/login')}>
                    Sign In
                  </button>
                  <button className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }} onClick={() => navigate('/register')}>
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="hero fade-in">
          <div className="hero-badge">🧠 MindPulse AI Assessment</div>
          <h1 className="hero-title">
            Understand Your Mind.<br />
            <span className="highlight">Improve Your Life.</span>
          </h1>
          <p className="hero-subtitle">
            A 3-minute psychological assessment for students — discover your mental strengths,
            identify growth areas, and get a personalized wellness plan.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/start')}>
              Start MindPulse Assessment →
            </button>
          </div>
          <div className="benefits">
            {BENEFITS.map((b, i) => (
              <div className="benefit-item" key={i}>
                <span>{b.icon}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Section */}
        <section className="trust-section">
          <h2 className="section-title">Built for Real Growth</h2>
          <div className="trust-grid">
            {TRUST_CARDS.map((card, i) => (
              <div className={`trust-card fade-in-${i + 1}`} key={i}>
                <div className="trust-card-icon">{card.icon}</div>
                <div className="trust-card-title">{card.title}</div>
                <div className="trust-card-desc">{card.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="home-footer-cta fade-in-3">
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/start')}>
            Take the Free Assessment →
          </button>
          <p className="muted mt-16">No account required · 100% free · Results in under 5 minutes</p>
        </div>
      </div>
    </div>
  )
}
