"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Progress } from "@/shared/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/components/ui/tabs"
import { Badge } from "@/shared/components/ui/badge"
import { useGetUserStatisticsQuery } from "@/shared/services/recyclingApi"
import { useAppSelector } from "@/app/hooks"
import { Loader2 } from "lucide-react"

export default function MaterialBreakdown() {
  const { user } = useAppSelector((state) => state.auth)
  const userId = user?.id || 1 

  const { data: userStats, isLoading } = useGetUserStatisticsQuery(userId)

  
  const calculateMaterialCategories = () => {
    if (!userStats) return defaultMaterialCategories

    const totalDevices = userStats.recycledDevicesCount + userStats.donatedDevicesCount + userStats.repairedDevicesCount

    if (totalDevices === 0) return defaultMaterialCategories

    return [
      {
        name: "Electronics",
        items: [
          { name: "Smartphones", weight: 1.2, count: Math.round(userStats.recycledDevicesCount * 0.3) },
          { name: "Laptops", weight: 5.5, count: Math.round(userStats.recycledDevicesCount * 0.2) },
          { name: "Tablets", weight: 1.8, count: Math.round(userStats.recycledDevicesCount * 0.2) },
          { name: "Monitors", weight: 12.0, count: Math.round(userStats.recycledDevicesCount * 0.1) },
          { name: "Keyboards", weight: 1.6, count: Math.round(userStats.recycledDevicesCount * 0.1) },
          { name: "Mice", weight: 0.4, count: Math.round(userStats.recycledDevicesCount * 0.1) },
        ],
        totalWeight: userStats.recycledDevicesCount * 2.5,
        percentage: Math.round((userStats.recycledDevicesCount / totalDevices) * 100),
        color: "emerald",
      },
      {
        name: "Donated Devices",
        items: [
          { name: "Working Electronics", weight: 2.5, count: Math.round(userStats.donatedDevicesCount * 0.6) },
          { name: "Appliances", weight: 5.0, count: Math.round(userStats.donatedDevicesCount * 0.4) },
        ],
        totalWeight: userStats.donatedDevicesCount * 3.5,
        percentage: Math.round((userStats.donatedDevicesCount / totalDevices) * 100),
        color: "blue",
      },
      {
        name: "Repaired Devices",
        items: [
          { name: "Smartphones", weight: 0.5, count: Math.round(userStats.repairedDevicesCount * 0.4) },
          { name: "Laptops", weight: 2.5, count: Math.round(userStats.repairedDevicesCount * 0.3) },
          { name: "Other Electronics", weight: 1.5, count: Math.round(userStats.repairedDevicesCount * 0.3) },
        ],
        totalWeight: userStats.repairedDevicesCount * 1.5,
        percentage: Math.round((userStats.repairedDevicesCount / totalDevices) * 100),
        color: "amber",
      },
    ]
  }


  const defaultMaterialCategories = [
    {
      name: "Electronics",
      items: [
        { name: "Smartphones", weight: 1.2, count: 3 },
        { name: "Laptops", weight: 5.5, count: 2 },
        { name: "Tablets", weight: 1.8, count: 2 },
        { name: "Monitors", weight: 12.0, count: 2 },
        { name: "Keyboards", weight: 1.6, count: 2 },
        { name: "Mice", weight: 0.4, count: 2 },
      ],
      totalWeight: 22.5,
      percentage: 45,
      color: "emerald",
    },
    {
      name: "Batteries",
      items: [
        { name: "AA Batteries", weight: 0.5, count: 20 },
        { name: "AAA Batteries", weight: 0.3, count: 15 },
        { name: "Lithium-ion Batteries", weight: 1.2, count: 4 },
        { name: "Button Batteries", weight: 0.1, count: 10 },
      ],
      totalWeight: 2.1,
      percentage: 15,
      color: "blue",
    },
    {
      name: "Appliances",
      items: [
        { name: "Refrigerator", weight: 45.0, count: 1 },
        { name: "Microwave", weight: 15.0, count: 1 },
        { name: "Toaster", weight: 2.0, count: 1 },
        { name: "Coffee Maker", weight: 3.0, count: 1 },
      ],
      totalWeight: 65.0,
      percentage: 30,
      color: "amber",
    },
    {
      name: "Light Bulbs",
      items: [
        { name: "LED Bulbs", weight: 0.3, count: 5 },
        { name: "Fluorescent Tubes", weight: 0.8, count: 3 },
        { name: "CFL Bulbs", weight: 0.4, count: 4 },
      ],
      totalWeight: 1.5,
      percentage: 5,
      color: "purple",
    },
    {
      name: "Other",
      items: [
        { name: "Cables", weight: 1.2, count: 10 },
        { name: "Ink Cartridges", weight: 0.5, count: 5 },
        { name: "Miscellaneous", weight: 0.8, count: 8 },
      ],
      totalWeight: 2.5,
      percentage: 5,
      color: "gray",
    },
  ]

  const materialCategories = calculateMaterialCategories()

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Material Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          </div>
        ) : (
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Detailed Breakdown</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {materialCategories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full bg-${category.color}-500 mr-2`}></div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">{category.totalWeight.toFixed(1)} kg</span>
                      <span className="text-gray-500 ml-2">({category.percentage}%)</span>
                    </div>
                  </div>
                  <Progress
                    value={category.percentage}
                    className={`h-2 bg-${category.color}-100`}
                  
                    style={
                      {
                        "--progress-background": `var(--${category.color}-100)`,
                        "--progress-foreground": `var(--${category.color}-500)`,
                      } as React.CSSProperties
                    }
                  />
                </div>
              ))}

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Total Recycled:</span>
                  <span className="font-medium text-gray-900">
                    {userStats ? userStats.recycledDevicesCount : 0} devices
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>User Ranking:</span>
                  <span className="font-medium text-gray-900">#{userStats ? userStats.userRanking : "-"}</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              {materialCategories.map((category) => (
                <div key={category.name} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">{category.name}</h3>
                    <Badge variant="outline" className={`bg-${category.color}-50 text-${category.color}-700`}>
                      {category.totalWeight.toFixed(1)} kg
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {category.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded text-sm">
                        <div className="flex items-center">
                          <span>{item.name}</span>
                          <span className="text-gray-500 ml-2">x{item.count}</span>
                        </div>
                        <span className="font-medium">{item.weight} kg</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}

