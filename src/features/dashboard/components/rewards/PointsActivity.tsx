"use client"

import { useState } from "react"
import { Calendar, LineChartIcon, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { Input } from "@/shared/components/ui/input"
import { Badge } from "@/shared/components/ui/badge"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { Label } from "@/shared/components/ui/label"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"


const pointsActivity = [
  {
    id: "pa1",
    date: "March 15, 2025",
    action: "Recycled E-Waste",
    details: "Dropped off electronics at Central Park Collection Center",
    points: 320,
    type: "earned",
  },
  {
    id: "pa2",
    date: "March 10, 2025",
    action: "Redeemed Reward",
    details: "10% Discount Coupon",
    points: 500,
    type: "spent",
  },
  {
    id: "pa3",
    date: "March 5, 2025",
    action: "Completed Survey",
    details: "Monthly recycling habits survey",
    points: 50,
    type: "earned",
  },
  {
    id: "pa4",
    date: "February 28, 2025",
    action: "Referral Bonus",
    details: "Friend signed up using your referral code",
    points: 200,
    type: "earned",
  },
  {
    id: "pa5",
    date: "February 20, 2025",
    action: "Recycled E-Waste",
    details: "Scheduled pickup of old refrigerator",
    points: 500,
    type: "earned",
  },
  {
    id: "pa6",
    date: "February 15, 2025",
    action: "Redeemed Reward",
    details: "Plant a Tree Certificate",
    points: 800,
    type: "spent",
  },
  {
    id: "pa7",
    date: "February 10, 2025",
    action: "Completed Challenge",
    details: "Winter Recycling Challenge",
    points: 350,
    type: "earned",
  },
  {
    id: "pa8",
    date: "February 5, 2025",
    action: "Weekly Bonus",
    details: "Consistent recycling for 4 weeks",
    points: 100,
    type: "earned",
  },
]


const pointsChartData = [
  { name: "Jan", earned: 750, spent: 250, balance: 500 },
  { name: "Feb", earned: 1200, spent: 800, balance: 900 },
  { name: "Mar", earned: 600, spent: 500, balance: 1000 },
  { name: "Apr", earned: 850, spent: 300, balance: 1550 },
  { name: "May", earned: 700, spent: 600, balance: 1650 },
  { name: "Jun", earned: 950, spent: 400, balance: 2200 },
]

export default function PointsActivity() {
  const [activeTab, setActiveTab] = useState("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [typeFilters, setTypeFilters] = useState({ earned: true, spent: true })

  const filteredActivity = pointsActivity.filter((activity) => {
 
    if (activeTab === "earned" && activity.type !== "earned") return false
    if (activeTab === "spent" && activity.type !== "spent") return false

   
    if (!typeFilters[activity.type as keyof typeof typeFilters]) return false

    return true
  })

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-lg font-semibold">Points Balance Over Time</CardTitle>
            <Button variant="outline" size="sm">
              <LineChartIcon className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pointsChartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(value) => [`${value} points`, ""]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#10b981"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="earned"
                  stroke="#3b82f6"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="spent"
                  stroke="#f59e0b"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center mt-4 gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Balance</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Earned</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Spent</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <CardTitle className="text-lg font-semibold">Points Activity</CardTitle>
              <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-fit">
                <TabsList>
                  <TabsTrigger value="all">All Activity</TabsTrigger>
                  <TabsTrigger value="earned">Points Earned</TabsTrigger>
                  <TabsTrigger value="spent">Points Spent</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
              <div className="flex items-center gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="filterEarned"
                    checked={typeFilters.earned}
                    onCheckedChange={(checked) => setTypeFilters({ ...typeFilters, earned: checked as boolean })}
                  />
                  <Label htmlFor="filterEarned" className="text-sm">
                    Earned
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="filterSpent"
                    checked={typeFilters.spent}
                    onCheckedChange={(checked) => setTypeFilters({ ...typeFilters, spent: checked as boolean })}
                  />
                  <Label htmlFor="filterSpent" className="text-sm">
                    Spent
                  </Label>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative w-28">
                  <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="date"
                    placeholder="From"
                    className="pl-8 h-9"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </div>
                <span className="text-gray-400">-</span>
                <div className="relative w-28">
                  <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="date"
                    placeholder="To"
                    className="pl-8 h-9"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivity.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No activity found matching your filters.</p>
              </div>
            ) : (
              filteredActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-3 border rounded-lg">
                  <div className={`p-3 rounded-full ${activity.type === "earned" ? "bg-emerald-100" : "bg-amber-100"}`}>
                    {activity.type === "earned" ? (
                      <ArrowUpRight className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-amber-600" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap justify-between gap-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{activity.action}</h3>
                        <p className="text-sm text-gray-600">{activity.details}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          <Badge variant={activity.type === "earned" ? "success" : "warning"} className="mr-2">
                            {activity.type === "earned" ? "Earned" : "Spent"}
                          </Badge>
                          <span
                            className={`font-bold ${
                              activity.type === "earned" ? "text-emerald-600" : "text-amber-600"
                            }`}
                          >
                            {activity.type === "earned" ? "+" : "-"}
                            {activity.points}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {filteredActivity.length > 0 && (
            <div className="mt-4 text-center">
              <Button variant="outline">Load More</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

