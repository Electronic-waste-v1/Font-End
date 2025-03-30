"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { useGetUserImpactQuery, useGetTotalImpactQuery } from "@/shared/services/recyclingApi"
import { Loader2 } from "lucide-react"
import { useAppSelector } from "@/app/hooks"


const monthlyData = [
  { name: "Jan", amount: 25 },
  { name: "Feb", amount: 18 },
  { name: "Mar", amount: 22 },
  { name: "Apr", amount: 30 },
  { name: "May", amount: 35 },
  { name: "Jun", amount: 28 },
  { name: "Jul", amount: 32 },
  { name: "Aug", amount: 40 },
  { name: "Sep", amount: 37 },
  { name: "Oct", amount: 42 },
  { name: "Nov", amount: 38 },
  { name: "Dec", amount: 45 },
]

const quarterlyData = [
  { name: "Q1", amount: 65 },
  { name: "Q2", amount: 93 },
  { name: "Q3", amount: 109 },
  { name: "Q4", amount: 125 },
]

const yearlyData = [
  { name: "2022", amount: 280 },
  { name: "2023", amount: 350 },
  { name: "2024", amount: 420 },
  { name: "2025", amount: 392 },
]

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#6b7280"]

export default function RecyclingStats() {
  const [timeRange, setTimeRange] = useState("monthly")
  const { user } = useAppSelector((state) => state.auth)
  const userId = user?.id || 1 

  const { data: userImpact, isLoading: isUserImpactLoading } = useGetUserImpactQuery(userId)
  const { data: totalImpact, isLoading: isTotalImpactLoading } = useGetTotalImpactQuery()

  const getActiveData = () => {
    switch (timeRange) {
      case "monthly":
        return monthlyData
      case "quarterly":
        return quarterlyData
      case "yearly":
        return yearlyData
      default:
        return monthlyData
    }
  }

  
  const materialData = userImpact
    ? [
        { name: "Electronics", value: userImpact.recycledDevicesCount * 0.8 },
        { name: "Batteries", value: userImpact.recycledDevicesCount * 0.15 },
        { name: "Appliances", value: userImpact.recycledDevicesCount * 0.3 },
        { name: "Light Bulbs", value: userImpact.recycledDevicesCount * 0.05 },
        { name: "Other", value: userImpact.recycledDevicesCount * 0.05 },
      ]
    : [
        { name: "Electronics", value: 45 },
        { name: "Batteries", value: 15 },
        { name: "Appliances", value: 30 },
        { name: "Light Bulbs", value: 5 },
        { name: "Other", value: 5 },
      ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recycling Over Time</CardTitle>
            <Tabs defaultValue="monthly" onValueChange={setTimeRange}>
              <TabsList className="grid grid-cols-3 h-8">
                <TabsTrigger value="monthly" className="text-xs">
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="quarterly" className="text-xs">
                  Quarterly
                </TabsTrigger>
                <TabsTrigger value="yearly" className="text-xs">
                  Yearly
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getActiveData()} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickFormatter={(value) => `${value} kg`}
                />
                <Tooltip
                  formatter={(value) => [`${value} kg`, "Amount"]}
                  labelStyle={{ color: "#111827", fontWeight: 600 }}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  }}
                />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]} fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Material Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={materialData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {materialData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} kg`, "Amount"]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Environmental Impact</CardTitle>
        </CardHeader>
        <CardContent>
          {isUserImpactLoading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">
                  {userImpact ? userImpact.co2Reduction.toFixed(1) : "0"} kg
                </div>
                <div className="text-sm text-gray-500">CO₂ Emissions Saved</div>
                <div className="text-xs text-gray-400 mt-1">
                  Equivalent to planting {userImpact ? Math.round(userImpact.co2Reduction / 20) : 0} trees
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {userImpact ? userImpact.waterSaved.toFixed(0) : "0"} L
                </div>
                <div className="text-sm text-gray-500">Water Saved</div>
                <div className="text-xs text-gray-400 mt-1">
                  Enough for {userImpact ? Math.round(userImpact.waterSaved / 60) : 0} days of personal use
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-4xl font-bold text-amber-600 mb-2">
                  {userImpact ? (userImpact.materialsRecovered * 420).toFixed(0) : "0"} kWh
                </div>
                <div className="text-sm text-gray-500">Energy Saved</div>
                <div className="text-xs text-gray-400 mt-1">
                  Powers a home for {userImpact ? Math.round(userImpact.materialsRecovered * 14) : 0} days
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

