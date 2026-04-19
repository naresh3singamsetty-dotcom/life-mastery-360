import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getPlans, getSubscription, selectSubscription } from '../api/subscription.js'

export default function SubscriptionPage() {
  const navigate = useNavigate()
  const { user, isAuthenticated, updateUser } = useAuth()
  const [plans, setPlans] = useState([])
  const [currentSub, setCurrentSub] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    async function load() {
      try {
        const planData = await getPlans(user.userType || 'Individual')
        setPlans(planData)
      } catch (err) {
        setError('Unable to load subscription plans. Please try again.')
      }
      try {
        const subscription = await getSubscription()
        setCurrentSub(subscription)
      } catch (err) {
        // ignore if not available
      }
    }
    load()
  }, [isAuthenticated, navigate, user?.userType])

  const handleSubscribe = async () => {
    if (!selectedPlan || !selectedDuration) {
      setError('Please select a plan and duration.')
      setSuccess('')
      return
    }
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      const response = await selectSubscription({
        userType: user.userType,
        subscriptionPlan: selectedPlan,
        subscriptionDuration: selectedDuration,
      })
      setCurrentSub(response)
      updateUser({ subscriptionPlan: response.subscriptionPlan, subscriptionDuration: response.subscriptionDuration })
      setSuccess('Subscription activated successfully.')
    } catch (err) {
      setError(err.response?.data || 'Subscription update failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const availableUserType = user?.userType || 'Individual'
  const activePlan = currentSub?.subscriptionPlan ? `${currentSub.subscriptionPlan} (${currentSub.subscriptionDuration})` : 'No active subscription'

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <div className="header-inner">
            <div className="logo" onClick={() => navigate('/')}>Life Mastery <span>360</span></div>
          </div>
        </header>

        <div className="details-content">
          <div className="details-card fade-in" style={{ maxWidth: 760 }}>
            <h2 className="assessment-title" style={{ textAlign: 'center' }}>Manage Subscription</h2>
            <p className="assessment-subtitle" style={{ textAlign: 'center', marginBottom: 24 }}>
              Current user type: {availableUserType}
            </p>
            <div style={{ marginBottom: 16, textAlign: 'center' }}>
              <strong>Current plan:</strong> {activePlan}
            </div>

            <div className="subscription-grid">
              {plans.map((plan, index) => (
                <div key={`${plan.name}-${index}`} className="subscription-card">
                  <div className="subscription-name">{plan.name}</div>
                  <div className="subscription-duration">{plan.duration}</div>
                  <div className="subscription-desc">{plan.description}</div>
                  <button
                    className={`btn btn-outline btn-full ${selectedPlan === plan.name && selectedDuration === plan.duration ? 'btn-selected' : ''}`}
                    type="button"
                    onClick={() => {
                      setSelectedPlan(plan.name)
                      setSelectedDuration(plan.duration)
                      setError('')
                      setSuccess('')
                    }}
                  >
                    {selectedPlan === plan.name && selectedDuration === plan.duration ? 'Selected' : 'Select'}
                  </button>
                </div>
              ))}
            </div>

            {error && <p className="form-error" style={{ marginTop: 16 }}>{error}</p>}
            {success && <p className="form-success" style={{ marginTop: 16 }}>{success}</p>}

            <button
              className="btn btn-primary btn-full mt-16"
              onClick={handleSubscribe}
              disabled={loading}
            >
              {loading ? 'Activating subscription…' : 'Activate Subscription'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
