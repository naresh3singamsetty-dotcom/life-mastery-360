import { createContext, useContext, useState } from 'react'

const AssessmentContext = createContext(null)

export function AssessmentProvider({ children }) {
  const [userDetails, setUserDetails] = useState({ name: '', age: '', className: '', gender: '' })
  const [answers, setAnswers] = useState(Array(30).fill(null))
  const [assessmentMode, setAssessmentMode] = useState('full')      // 'full' | 'quick'
  const [classSegment, setClassSegment] = useState(null)            // '6-8' | '9-12'

  const setAnswer = (questionIndex, value) => {
    setAnswers(prev => {
      const updated = [...prev]
      updated[questionIndex] = value
      return updated
    })
  }

  const resetAssessment = () => {
    setUserDetails({ name: '', age: '', className: '', gender: '' })
    setAnswers(Array(30).fill(null))
    setAssessmentMode('full')
    setClassSegment(null)
  }

  return (
    <AssessmentContext.Provider value={{
      userDetails, setUserDetails,
      answers, setAnswer,
      resetAssessment,
      assessmentMode, setAssessmentMode,
      classSegment, setClassSegment,
    }}>
      {children}
    </AssessmentContext.Provider>
  )
}

export function useAssessment() {
  return useContext(AssessmentContext)
}
