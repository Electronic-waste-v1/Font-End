"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { Button } from "@/shared/components/ui/button"
import { AlertCircle } from "lucide-react"

import { useSelector } from "react-redux"
import type { RootState } from "../../../app/store"
import { format, subDays, startOfWeek, endOfWeek, eachDayOfInterval, parseISO } from "date-fns"
import { useGetUserActionHistoryQuery } from "@/features/auth/services/authApi"
import { Leaderboard } from "@/shared/types/recyclingTypes"

interface RecyclingActivityProps {
  leaderboardData?: Leaderboard
  isLoading: boolean
  error: any
}

export default function RecyclingActivity({ leaderboardData, isLoading, error }: RecyclingActivityProps) {
  const [activeTab, setActiveTab] = useState("weekly")
  const userId = useSelector((state: RootState) => state.auth.user?.id) || 1

  const { data: userActions, isLoading: isActionsLoading } = useGetUserActionHistoryQuery(userId)

  
  const processRecyclingData = () => {
    if (!userActions) return { weeklyData: [], monthlyData: [], yearlyData: [] }

    
    const today = new Date()
    const oneWeekAgo = subDays(today, 7)
    const oneMonthAgo = subDays(today, 30)
    const oneYearAgo = subDays(today, 365)

    
    const weekActions = userActions.filter((action) => {
      try {
        const actionDate = parseISO(action.actionDate)
        return actionDate >= oneWeekAgo && actionDate <= today
      } catch (e) {
        return false
      }
    })

    const monthActions = userActions.filter((action) => {
      try {
        const actionDate = parseISO(action.actionDate)
        return actionDate >= oneMonthAgo && actionDate <= today
      } catch (e) {
        return false
      }
    })

    const yearActions = userActions.filter((action) => {
      try {
        const actionDate = parseISO(action.actionDate)
        return actionDate >= oneYearAgo && actionDate <= today
      } catch (e) {
        return false
      }
    })

    
    const weekDays = eachDayOfInterval({
      start: startOfWeek(today),
      end: endOfWeek(today),
    })

    const weeklyData = weekDays.map((day) => {
      const dayStr = format(day, "EEE")
      const dayActions = weekActions.filter((action) => {
        try {
          return format(parseISO(action.actionDate), "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
        } catch (e) {
          return false
        }
      })

      return {
        name: dayStr,
        amount: dayActions.reduce((sum, action) => sum + (action.ewaste?.weight || 1), 0),
      }
    })

 
    const monthlyData = [
      { name: "Week 1", amount: calculateWeekAmount(monthActions, 0, 7) },
      { name: "Week 2", amount: calculateWeekAmount(monthActions, 7, 14) },
      { name: "Week 3", amount: calculateWeekAmount(monthActions, 14, 21) },
      { name: "Week 4", amount: calculateWeekAmount(monthActions, 21, 30) },
    ]

    
    const yearlyData = Array.from({ length: 12 }, (_, i) => {
      const monthName = format(new Date(2023, i, 1), "MMM")
      const monthNumber = i + 1

      const monthActions = yearActions.filter((action) => {
        try {
          const actionDate = parseISO(action.actionDate)
          return actionDate.getMonth() + 1 === monthNumber
        } catch (e) {
          return false
        }
      })

      return {
        name: monthName,
        amount: monthActions.reduce((sum, action) => sum + (action.ewaste?.weight || 1), 0),
      }
    })

    return { weeklyData, monthlyData, yearlyData }
  }

  const calculateWeekAmount = (actions, startDay, endDay) => {
    const today = new Date()
    const startDate = subDays(today, endDay)
    const endDate = subDays(today, startDay)

    const weekActions = actions.filter((action) => {
      try {
        const actionDate = parseISO(action.actionDate)
        return actionDate >= startDate && actionDate <= endDate
      } catch (e) {
        return false
      }
    })

    return weekActions.reduce((sum, action) => sum + (action.ewaste?.weight || 1), 0)
  }

  const { weeklyData, monthlyData, yearlyData } = processRecyclingData()

  const getActiveData = () => {
    switch (activeTab) {
      case "weekly":
        return weeklyData
      case "monthly":
        return monthlyData
      case "yearly":
        return yearlyData
      default:
        return weeklyData
    }
  }

  if (isLoading || isActionsLoading) {
    return (
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-8 w-32" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] mt-4">
            <Skeleton className="h-full w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recycling Activity</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-800 text-sm">Failed to load recycling activity data.</p>
            </div>
            <Button variant="outline" size="sm" className="mt-2 text-xs" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recycling Activity</CardTitle>
          <Tabs defaultValue="weekly" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 h-8">
              <TabsTrigger value="weekly" className="text-xs">
                Weekly
              </TabsTrigger>
              <TabsTrigger value="monthly" className="text-xs">
                Monthly
              </TabsTrigger>
              <TabsTrigger value="yearly" className="text-xs">
                Yearly
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getActiveData()} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickFormatter={(value) => `${value}${activeTab === "yearly" ? "" : " kg"}`}
              />
              <Tooltip
                formatter={(value) => [`${value}${activeTab === "yearly" ? " kg" : " kg"}`, "Amount"]}
                labelStyle={{ color: "#111827", fontWeight: 600 }}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                }}
              />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {getActiveData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#10b981" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

