import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import StartAssessmentPage from './pages/StartAssessmentPage.jsx'
import UserDetailsPage from './pages/UserDetailsPage.jsx'
import QuestionPage from './pages/QuestionPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import SubscriptionPage from './pages/SubscriptionPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ChangePasswordPage from './pages/ChangePasswordPage.jsx'
import AssessmentHistoryPage from './pages/AssessmentHistoryPage.jsx'
import AssessmentTrackerPage from './pages/AssessmentTrackerPage.jsx'
import IssueTrackerPage from './pages/IssueTrackerPage.jsx'
import AssessmentCatalogPage from './pages/AssessmentCatalogPage.jsx'
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
            <Route path="/subscriptions" element={<SubscriptionPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path="/assessment-history" element={<AssessmentHistoryPage />} />
            <Route path="/assessment-tracker" element={<AssessmentTrackerPage />} />
            <Route path="/issue-tracker" element={<IssueTrackerPage />} />
            <Route path="/assessments" element={<AssessmentCatalogPage />} />
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
