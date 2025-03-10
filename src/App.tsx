import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./features/ewaste/pages/HomePage"
import { LoginPage, RegisterPage } from "./features/auth"
import { CollectionPointsPage, DashboardPage, RecyclingPage, RewardsPage } from "./features/dashboard"
import { store } from "./app/store"
import { Provider } from "react-redux"
import { AnnouncementDetailPage, AnnouncementsPage } from "./features/annonce"


function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/announcements/:id" element={<AnnouncementDetailPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/collection-points" element={<CollectionPointsPage />} />
        <Route path="/dashboard/recycling" element={<RecyclingPage />} />
        <Route path="/dashboard/rewards" element={<RewardsPage />} />
      </Routes>
    </Router>
    </Provider>
  )
}

export default App

