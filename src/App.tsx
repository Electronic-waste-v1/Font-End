import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./features/ewaste/pages/HomePage"
import { LoginPage, RegisterPage } from "./features/auth"
import { CollectionPointsPage, DashboardPage, DashbordAnnouncementsPage, RecyclingPage, RewardsPage } from "./features/dashboard"

import { AnnouncementDetailPage, AnnouncementsPage } from "./features/annonce"
import { PublicCollectionPointsPage } from "./features/collection"
import PublicRewardsPage from "./features/rewards/pages/RewardsPage"
import DashboardEwastePage from "./features/dashboard/pages/EwastePage"
import RecyclingCenterPage from "./recycling-center/pages/RecyclingCenterPage"
import RecompensePage from "./features/recompense/pages/RecompensePage"
import { CommunityPage } from "./features/community"


import { initializeAuth } from "./features/auth/slices/authSlice"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { AppDispatch } from "./app/store"
import ProtectedRoute from "./shared/config/ProtectedRoute"

function App() {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    
    dispatch(initializeAuth());
  }, [dispatch]);

  return (

    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/announcements/:id" element={<AnnouncementDetailPage />} />
          <Route path="/collection-points" element={<PublicCollectionPointsPage />} />
          <Route path="/rewards" element={<PublicRewardsPage />} />
          <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/collection-points" element={<CollectionPointsPage />} />
      <Route path="/dashboard/recycling" element={<RecyclingPage />} />
      <Route path="/dashboard/rewards" element={<RewardsPage />} />
      <Route path="/dashboard/community" element={<CommunityPage />} />
      <Route path="/dashboard/announcements" element={<DashbordAnnouncementsPage />} />
      <Route path="/dashboard/recompense" element={<RecompensePage />} />
      <Route path="/dashboard/Ewaste" element={<DashboardEwastePage />} />
      <Route path="/dashboard/recycling-centers" element={<RecyclingCenterPage />} />
    </Route>
  </Routes>
   
    </Router>
   
  )
}

export default App

