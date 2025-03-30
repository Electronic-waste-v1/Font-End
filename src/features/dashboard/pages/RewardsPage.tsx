"use client"

import { useState } from "react"
import { Gift, Award, History, TrendingUp } from "lucide-react"
import Header from "../components/DashboardHeader"
import Sidebar from "../components/DashboardSidebar"
import { Button } from "@/shared/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/components/ui/tabs"
import { StatCard } from "@/shared/components/stat-card"
import AvailableRewards from "../components/rewards/AvailableRewards"
import RewardHistory from "../components/rewards/RewardHistory"
import RewardTiers from "../components/rewards/RewardTiers"
import PointsActivity from "../components/rewards/PointsActivity"
import EarnMorePoints from "../components/rewards/EarnMorePoints"
import RedeemConfirmationModal from "../components/rewards/RedeemConfirmationModal"

import { useGetRecompensesQuery } from "@/shared/services/recompenseApi"
import { useGetUserPointsQuery } from "@/features/auth/services/authApi"

import { Skeleton } from "@/shared/components/ui/skeleton"
import { useAppSelector } from "@/app/hooks"

export default function RewardsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedReward, setSelectedReward] = useState<any>(null)
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false)

  const { user } = useAppSelector((state) => state.auth)
  const currentUser= user

  
  
  const { data: userPoints, isLoading: isLoadingPoints } = useGetUserPointsQuery(currentUser?.id || 0, {
    skip: !currentUser?.id,
  })
 
  const { isLoading: isLoadingRewards } = useGetRecompensesQuery()

  const isLoading = isLoadingPoints || isLoadingRewards

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleRedeemReward = (reward: any) => {
    setSelectedReward(reward)
    setIsRedeemModalOpen(true)
  }

  // Calculate user points from UserPoints entity
  const availablePoints = userPoints ? userPoints.pointsTotal - userPoints.pointsUtilises : 0
  const totalPoints = userPoints?.pointsTotal || 0

  // Determine user tier based on total points
  const currentTier = totalPoints >= 2000 ? "Gold" : totalPoints >= 1000 ? "Silver" : "Bronze"
  const pointsToNextTier =
    currentTier === "Gold" ? 0 : currentTier === "Silver" ? 2000 - totalPoints : 1000 - totalPoints

    console.log(userPoints);
    
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                  <Gift className="mr-2 h-6 w-6 text-emerald-500" />
                  Rewards
                </h1>
                <p className="text-gray-500 mt-1">Redeem points and track your rewards</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <History className="h-4 w-4 mr-2" />
                  View History
                </Button>
                <Button>
                  <Gift className="h-4 w-4 mr-2" />
                  Redeem Points
                </Button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {isLoading ? (
                <>
                  <Skeleton className="h-32" />
                  <Skeleton className="h-32" />
                  <Skeleton className="h-32" />
                </>
              ) : (
                <>
                  <StatCard
                    title="Available Points"
                    value={availablePoints.toString()}
                    icon={<Award className="h-5 w-5 text-emerald-500" />}
                    change={{ value: `${userPoints?.pointsUtilises || 0} points used`, type: "neutral" }}
                  />
                  <StatCard
                    title="Total Points Earned"
                    value={totalPoints.toString()}
                    icon={<History className="h-5 w-5 text-emerald-500" />}
                    change={{ value: "Lifetime earnings", type: "neutral" }}
                  />
                  <StatCard
                    title="Current Tier"
                    value={currentTier}
                    icon={<TrendingUp className="h-5 w-5 text-emerald-500" />}
                    change={{
                      value:
                        pointsToNextTier > 0
                          ? `${pointsToNextTier} points to ${currentTier === "Bronze" ? "Silver" : "Gold"}`
                          : "Highest tier reached",
                      type: "neutral",
                    }}
                  />
                </>
              )}
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="available" className="space-y-4">
              <TabsList className="grid grid-cols-4 md:w-auto">
                <TabsTrigger value="available">Available Rewards</TabsTrigger>
                <TabsTrigger value="history">Reward History</TabsTrigger>
                <TabsTrigger value="tiers">Reward Tiers</TabsTrigger>
                <TabsTrigger value="activity">Points Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="available" className="space-y-4">
                <AvailableRewards onRedeemReward={handleRedeemReward} />
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <RewardHistory />
              </TabsContent>

              <TabsContent value="tiers" className="space-y-4">
                <RewardTiers />
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <PointsActivity />
              </TabsContent>
            </Tabs>

            {/* Ways to Earn More Points */}
            <EarnMorePoints />
          </div>
        </main>
      </div>

      {/* Redeem Confirmation Modal */}
      {selectedReward && (
        <RedeemConfirmationModal
          isOpen={isRedeemModalOpen}
          onClose={() => setIsRedeemModalOpen(false)}
          reward={selectedReward}
        />
      )}
    </div>
  )
}

