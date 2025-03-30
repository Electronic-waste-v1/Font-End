"use client"

import { useState } from "react"
import { Recycle, RefreshCw } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { useToast } from "@/shared/components/ui/use-toast"
import Header from "../components/DashboardHeader"
import Sidebar from "../components/DashboardSidebar"
import OverviewCards from "../components/OverviewCards"
import RecyclingActivity from "../components/RecyclingActivity"
import RewardsSection from "../components/RewardsSection"
import NearbyLocations from "../components/NearbyLocations"
import RecentAnnouncements from "../components/RecentAnnouncements"
import { useGetLeaderboardQuery, useGetTotalImpactQuery } from "@/shared/services/recyclingApi"
import { useGetAllAnnoncesQuery } from "@/shared/services/annonceApi"
import { useGetAllCollectionPointsQuery } from "@/shared/services/collectionApi"

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const { toast } = useToast()
  const [page, setPage] = useState(0)
  const pageSize = 3

  const {
    data: impactData,
    isLoading: isImpactLoading,
    error: impactError,
    refetch: refetchImpact,
  } = useGetTotalImpactQuery()

  const {
    data: leaderboardData,
    isLoading: isLeaderboardLoading,
    error: leaderboardError,
    refetch: refetchLeaderboard,
  } = useGetLeaderboardQuery()

  const {
    data: announcementsData,
    isLoading: isAnnouncementsLoading,
    error: announcementsError,
    refetch: refetchAnnouncements,
  } = useGetAllAnnoncesQuery()

  const {
    data: collectionPointsData,
    isLoading: isCollectionPointsLoading,
    error: collectionPointsError,
    refetch: refetchCollectionPoints,
  } = useGetAllCollectionPointsQuery({ page, pageSize })

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const refreshAllData = () => {
    refetchImpact()
    refetchLeaderboard()
    refetchAnnouncements()
    refetchCollectionPoints()
    setLastUpdated(new Date())
    toast({
      title: "Dashboard refreshed",
      description: "All data has been updated.",
    })
  }


  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Recycle className="h-4 w-4 text-emerald-500" />
                  <span>Last updated: {lastUpdated.toLocaleString()}</span>
                </div>
                <Button variant="outline" size="sm" onClick={refreshAllData} className="flex items-center gap-1">
                  <RefreshCw className="h-3 w-3" />
                  Refresh
                </Button>
              </div>
            </div>

            <OverviewCards impactData={impactData} isLoading={isImpactLoading} error={impactError} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <RecyclingActivity
                  leaderboardData={leaderboardData}
                  isLoading={isLeaderboardLoading}
                  error={leaderboardError}
                />
                <RecentAnnouncements
                  announcements={announcementsData}
                  isLoading={isAnnouncementsLoading}
                  error={announcementsError}
                />
              </div>
              <div className="space-y-6">
                <RewardsSection />
                <NearbyLocations
                  collectionPoints={collectionPointsData?.content}
                  isLoading={isCollectionPointsLoading}
                  error={collectionPointsError}
                  totalPages={collectionPointsData?.totalPages || 1}
                  currentPage={page}
                  onPageChange={setPage}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

