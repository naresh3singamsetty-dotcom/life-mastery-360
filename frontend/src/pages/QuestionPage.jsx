import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAssessment } from '../context/AssessmentContext.jsx'
import { QUESTIONS_6_8, QUESTIONS_9_12, QUICK_INDICES, OPTIONS } from '../data/questions.js'
import { submitAssessment } from '../api/assessment.js'

export default function QuestionPage() {
  const { number } = useParams()
  const navigate = useNavigate()
  const { userDetails, answers, setAnswer, assessmentMode, classSegment } = useAssessment()
  const [submitting, setSubmitting] = useState(false)

  const QUESTIONS = classSegment === '6-8' ? QUESTIONS_6_8 : QUESTIONS_9_12
  const isQuick = assessmentMode === 'quick'
  const total = isQuick ? QUICK_INDICES.length : 30
  const qNum = parseInt(number)

  // Map qNum to the real QUESTIONS index
  const realIndex = isQuick ? QUICK_INDICES[qNum - 1] : qNum - 1
  const question = QUESTIONS[realIndex]
  const selectedValue = answers[realIndex]
  const progress = (qNum / total) * 100
  const isLast = qNum === total

  useEffect(() => {
    if (!question || qNum < 1 || qNum > total) { navigate('/'); return }
    if (!userDetails.age) { navigate('/details'); return }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [number])

  const handleSelect = (value) => {
    setAnswer(realIndex, value)
  }

  const handleNext = async () => {
    if (selectedValue === null || selectedValue === undefined) return

    if (!isLast) {
      navigate(`/question/${qNum + 1}`)
    } else {
      setSubmitting(true)
      try {
        // For quick mode, pad unanswered slots with 1 (neutral)
        const finalAnswers = isQuick
          ? Array(30).fill(1).map((v, i) => answers[i] !== null ? answers[i] : v)
          : answers

        const result = await submitAssessment({
          age: parseInt(userDetails.age),
          className: userDetails.className || null,
          gender: userDetails.gender || null,
          answers: finalAnswers,
        })
        navigate(`/results/${result.id}`)
      } catch (err) {
        alert('Something went wrong submitting your assessment. Please try again.')
        setSubmitting(false)
      }
    }
  }

  const handleBack = () => {
    if (qNum > 1) {
      navigate(`/question/${qNum - 1}`)
    } else {
      navigate('/details')
    }
  }

  if (!question) return null

  const hasAnswer = selectedValue !== null && selectedValue !== undefined

  return (
    <div className="question-page">
      <div className="container">
        <header className="header">
          <div className="header-inner">
            <div className="logo" onClick={() => navigate('/')}>Life Mastery <span>360</span></div>
            <span className="muted" style={{ fontWeight: 600 }}>{qNum} / {total}</span>
          </div>
        </header>

        <div className="progress-section">
          <div className="progress-info">
            <span className="progress-category">{question.category}</span>
            <span className="progress-label">{Math.round(progress)}% complete</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="question-content">
        <div className="question-card fade-in" key={number}>
          <div className="question-number">Question {qNum} of {total}{isQuick ? ' · Quick Scan' : ''}</div>
          <p className="question-text">{question.text}</p>

          <div className="options-list">
            {OPTIONS.map((option) => (
              <button
                key={option.value}
                className={`option-btn ${selectedValue === option.value ? 'selected' : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                <span className="option-dot" />
                {option.label}
              </button>
            ))}
          </div>

          <div className="question-nav">
            <button
              className="btn btn-outline"
              onClick={handleBack}
              style={{ padding: '12px 24px', fontSize: '0.9rem' }}
            >
              ← Back
            </button>
            <button
              className="btn btn-primary"
              onClick={handleNext}
              disabled={!hasAnswer || submitting}
              style={{ padding: '12px 28px', fontSize: '0.9rem' }}
            >
              {submitting ? 'Analysing...' : isLast ? 'Get My Results →' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
