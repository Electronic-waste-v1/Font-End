"use client"

import { Recycle, Award, MapPin, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/shared/components/ui/card"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { Button } from "@/shared/components/ui/button"

import { useSelector } from "react-redux"
import type { RootState } from "../../../app/store"
import { useGetUserPointsQuery } from "@/features/auth/services/authApi"
import { EnvironmentalImpact } from "@/shared/types/recyclingTypes"

interface OverviewCardsProps {
  impactData?: EnvironmentalImpact
  isLoading: boolean
  error: any
}

export default function OverviewCards({ impactData, isLoading, error }: OverviewCardsProps) {
  const userId = useSelector((state: RootState) => state.auth.user?.id) || 1
  const { data: userPoints, isLoading: isPointsLoading } = useGetUserPointsQuery(userId)

 
  const availablePoints = userPoints ? userPoints.pointsTotal - userPoints.pointsUtilises : 0
  const nextRewardThreshold = 1500 
  const pointsUntilNextReward = Math.max(0, nextRewardThreshold - availablePoints)

  if (isLoading || isPointsLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="w-full">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-20 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
        <p className="text-red-800 text-sm">Failed to load environmental impact data.</p>
        <Button variant="outline" size="sm" className="mt-2 text-xs" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    )
  }
  console.log(impactData);
  

  const stats = [
    {
      title: "Total Recycled",
      value: `${impactData?.materialsRecovered.toFixed(1) || "0"} kg`,
      change: "+12% from last month",
      trend: "up",
      icon: Recycle,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Reward Points",
      value: userPoints ? availablePoints.toLocaleString() : "0",
      change:
        pointsUntilNextReward > 0 ? `${pointsUntilNextReward} points until next reward` : "Eligible for next reward!",
      trend: "neutral",
      icon: Award,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "CO₂ Reduction",
      value: `${impactData?.co2Reduction.toFixed(1) || "0"} kg`,
      change: "Saved from the atmosphere",
      trend: "up",
      icon: MapPin,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Water Saved",
      value: `${impactData?.waterSaved.toFixed(1) || "0"} L`,
      change: "Through recycling efforts",
      trend: "up",
      icon: TrendingUp,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1 text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-full`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

