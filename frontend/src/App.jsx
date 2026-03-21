import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import StartAssessmentPage from './pages/StartAssessmentPage.jsx'
import UserDetailsPage from './pages/UserDetailsPage.jsx'
import QuestionPage from './pages/QuestionPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import { AssessmentProvider } from './context/AssessmentContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

export default function App() {
  return (
    <AuthProvider>
      <AssessmentProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/start" element={<StartAssessmentPage />} />
            <Route path="/details" element={<UserDetailsPage />} />
            <Route path="/question/:number" element={<QuestionPage />} />
            <Route path="/results/:id" element={<ResultsPage />} />
          </Routes>
        </BrowserRouter>
      </AssessmentProvider>
    </AuthProvider>
  )
}
