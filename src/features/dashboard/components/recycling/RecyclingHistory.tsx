"use client"

import { useState } from "react"
import { Calendar, Package, Search, ChevronDown, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { EcoBadge } from "@/shared/components/eco-badge"
import { Badge } from "@/shared/components/ui/badge"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { useGetUserActionHistoryQuery } from "@/features/auth/services/authApi"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"
import { format, parseISO } from "date-fns"

export default function RecyclingHistory() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<string>("all")


  const userId = useSelector((state: RootState) => state.auth.user?.id) || 1

  
  const { data: recyclingActions, isLoading, error } = useGetUserActionHistoryQuery(userId)

  const toggleExpand = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id)
  }

  const filteredActions =
    recyclingActions?.filter((action) => {
      if (filterType === "all") return true
      return action.actionType.toLowerCase() === filterType.toLowerCase()
    }) || []

  
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMMM d, yyyy")
    } catch (e) {
      return dateString
    }
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg font-semibold">Recycling History</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search history..." className="pl-9 h-9" />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px] h-9">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="recycle">Recycling</SelectItem>
                <SelectItem value="dropoff">Drop-offs</SelectItem>
                <SelectItem value="pickup">Pickups</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            
            Array(3)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="border rounded-lg overflow-hidden p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex items-start gap-3">
                      <Skeleton className="h-9 w-9 rounded-full" />
                      <div>
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 sm:mt-0">
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </div>
                </div>
              ))
          ) : error ? (
           
            <div className="text-center py-8">
              <p className="text-red-500">Error loading recycling history. Please try again later.</p>
              <Button variant="outline" className="mt-2" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          ) : filteredActions.length === 0 ? (
       
            <div className="text-center py-8">
              <p className="text-gray-500">No recycling history found.</p>
            </div>
          ) : (
           
            filteredActions.map((action) => (
              <div key={action.id} className="border rounded-lg overflow-hidden transition-all duration-200">
                <div
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleExpand(action.id.toString())}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        action.actionType === "RECYCLE"
                          ? "bg-emerald-100"
                          : action.actionType === "DROPOFF"
                            ? "bg-blue-100"
                            : "bg-amber-100"
                      }`}
                    >
                      <Package
                        className={`h-5 w-5 ${
                          action.actionType === "RECYCLE"
                            ? "text-emerald-600"
                            : action.actionType === "DROPOFF"
                              ? "text-blue-600"
                              : "text-amber-600"
                        }`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">{action.actionType}</h3>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm text-gray-500">{formatDate(action.actionDate)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{action.ewaste?.nom || action.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3 sm:mt-0">
                    <div className="text-right">
                      <p className="text-sm font-medium">{action.ewaste?.categorie || "Electronics"}</p>
                      <p className="text-xs text-gray-500">Category</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">+{action.pointsGained}</p>
                      <p className="text-xs text-gray-500">Points</p>
                    </div>
                    <EcoBadge type="success" className="ml-2">
                      Completed
                    </EcoBadge>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform ${
                        expandedItem === action.id.toString() ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                {expandedItem === action.id.toString() && (
                  <div className="p-4 bg-gray-50 border-t">
                    <h4 className="font-medium text-sm mb-2">Item Details:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center bg-white p-2 rounded border">
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2">
                            {action.ewaste?.categorie || "Electronics"}
                          </Badge>
                          <span>{action.ewaste?.nom || "Recycled Item"}</span>
                        </div>
                        <span className="text-sm font-medium">{action.ewaste?.etat || "Recycled"}</span>
                      </div>
                      {action.ewaste?.description && (
                        <div className="bg-white p-2 rounded border">
                          <p className="text-sm text-gray-600">{action.ewaste.description}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between mt-4 pt-2 border-t">
                      <Button variant="outline" size="sm" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        Add to Calendar
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Download className="h-3 w-3 mr-1" />
                        Download Receipt
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="mt-4 text-center">
          <Button variant="link" className="text-emerald-600">
            View All History
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

