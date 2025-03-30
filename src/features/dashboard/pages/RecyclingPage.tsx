"use client"

import { useState } from "react"
import { Recycle, Calendar, TrendingUp, Award, Leaf, Plus } from "lucide-react"
import Header from "../components/DashboardHeader"
import Sidebar from "../components/DashboardSidebar"
import { Button } from "@/shared/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/components/ui/tabs"
import { StatCard } from "@/shared/components/stat-card"
import { EcoCard } from "@/shared/components/eco-card"
import { EcoBadge } from "@/shared/components/eco-badge"
import RecyclingHistory from "../components/recycling/RecyclingHistory"
import RecyclingStats from "../components/recycling/RecyclingStats"
import MaterialBreakdown from "../components/recycling/MaterialBreakdown"
import RecyclingGoals from "../components/recycling/RecyclingGoals"
import RecyclingTips from "../components/recycling/RecyclingTips"
import RecyclingLeaderboard from "../components/recycling/RecyclingLeaderboard"
import SchedulePickupModal from "../components/recycling/SchedulePickupModal"
import { useGetUserImpactQuery, useGetUserStatisticsQuery } from "@/shared/services/recyclingApi"
import { useAppSelector } from "@/app/hooks"

export default function RecyclingPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false)
  const { user } = useAppSelector((state) => state.auth)

  const userId = user?.id || 1 

  const { data: userImpact } = useGetUserImpactQuery(userId)
  const { data: userStats } = useGetUserStatisticsQuery(userId)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

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
                  <Recycle className="mr-2 h-6 w-6 text-emerald-500" />
                  My Recycling
                </h1>
                <p className="text-gray-500 mt-1">Track your recycling activity and environmental impact</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Calendar
                </Button>
                <Button onClick={() => setIsPickupModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Pickup
                </Button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Recycled"
                value={`${userStats?.recycledDevicesCount || 0} items`}
                icon={<Recycle className="h-5 w-5 text-emerald-500" />}
                change={{ value: "+12% from last month", type: "increase" }}
              />
              <StatCard
                title="Environmental Impact"
                value={`${userImpact?.co2Reduction.toFixed(1) || 0} kg CO₂`}
                icon={<Leaf className="h-5 w-5 text-emerald-500" />}
                change={{ value: "Saved from the atmosphere", type: "neutral" }}
              />
              <StatCard
                title="Recycling Streak"
                value="8 weeks"
                icon={<TrendingUp className="h-5 w-5 text-emerald-500" />}
                change={{ value: "Keep it up!", type: "increase" }}
              />
              <StatCard
                title="Reward Points"
                value={userStats?.totalPoints.toString() || "0"}
                icon={<Award className="h-5 w-5 text-emerald-500" />}
                change={{ value: `${userStats?.availablePoints || 0} available`, type: "neutral" }}
              />
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="history" className="space-y-4">
              <TabsList className="grid grid-cols-4 md:w-auto">
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="stats">Statistics</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
              </TabsList>

              <TabsContent value="history" className="space-y-4">
                <RecyclingHistory />
              </TabsContent>

              <TabsContent value="stats" className="space-y-4">
                <RecyclingStats />
              </TabsContent>

              <TabsContent value="materials" className="space-y-4">
                <MaterialBreakdown />
              </TabsContent>

              <TabsContent value="goals" className="space-y-4">
                <RecyclingGoals />
              </TabsContent>
            </Tabs>

            {/* Recycling Tips, Leaderboard and Next Pickup */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecyclingTips />
              </div>
              <div>
                <RecyclingLeaderboard />
              </div>
            </div>

            {/* Next Pickup */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">{/* This space can be used for additional content */}</div>
              <div>
                <EcoCard
                  title="Next Scheduled Pickup"
                  icon={<Calendar className="h-5 w-5 text-emerald-500" />}
                  variant="highlight"
                  footer={
                    <Button variant="outline" className="w-full" onClick={() => setIsPickupModalOpen(true)}>
                      Reschedule Pickup
                    </Button>
                  }
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-medium">Friday, April 15, 2025</p>
                        <p className="text-sm text-gray-500">Between 9:00 AM - 12:00 PM</p>
                      </div>
                      <EcoBadge type="success">Confirmed</EcoBadge>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-sm font-medium">Items for pickup:</p>
                      <ul className="text-sm text-gray-600 mt-1 space-y-1">
                        <li className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                          Old laptop and accessories
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                          Broken smartphone
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                          Used batteries
                        </li>
                      </ul>
                    </div>
                  </div>
                </EcoCard>
              </div>
            </div>
          </div>
        </main>
      </div>

      <SchedulePickupModal isOpen={isPickupModalOpen} onClose={() => setIsPickupModalOpen(false)} />
    </div>
  )
}

