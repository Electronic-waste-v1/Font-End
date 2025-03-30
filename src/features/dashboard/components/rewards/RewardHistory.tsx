"use client"

import React from "react"

import { useState } from "react"
import { Search, Download, ExternalLink, Calendar, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table"
import { EcoBadge } from "@/shared/components/eco-badge"
import { Badge } from "@/shared/components/ui/badge"


const rewardHistory = [
  {
    id: "rh1",
    rewardTitle: "10% Discount Coupon",
    pointsSpent: 500,
    redeemDate: "March 15, 2025",
    expiryDate: "June 15, 2025",
    status: "Active",
    code: "ECO10-ABCD-1234",
    category: "Discount",
  },
  {
    id: "rh2",
    rewardTitle: "Plant a Tree Certificate",
    pointsSpent: 800,
    redeemDate: "February 28, 2025",
    expiryDate: null,
    status: "Completed",
    code: null,
    category: "Experience",
  },
  {
    id: "rh3",
    rewardTitle: "Eco-Friendly Water Bottle",
    pointsSpent: 1000,
    redeemDate: "February 10, 2025",
    expiryDate: null,
    status: "Shipped",
    trackingCode: "ECO123456789",
    category: "Product",
  },
  {
    id: "rh4",
    rewardTitle: "$10 Shopping Voucher",
    pointsSpent: 750,
    redeemDate: "January 5, 2025",
    expiryDate: "April 5, 2025",
    status: "Expired",
    code: "SHOP10-EFGH-5678",
    category: "Voucher",
  },
  {
    id: "rh5",
    rewardTitle: "Movie Tickets (2)",
    pointsSpent: 1500,
    redeemDate: "December 15, 2024",
    expiryDate: "February 15, 2025",
    status: "Used",
    code: "MOVIE-IJKL-9012",
    category: "Entertainment",
  },
]

export default function RewardHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const toggleRowExpand = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id)
  }

  const filteredHistory = rewardHistory.filter((item) => {
 
    if (
      searchTerm &&
      !item.rewardTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !item.id.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

   
    if (statusFilter !== "all" && item.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false
    }

    return true
  })

  const getStatusBadgeType = (status: string): "success" | "warning" | "error" | "info" => {
    switch (status.toLowerCase()) {
      case "active":
        return "success"
      case "shipped":
      case "processing":
        return "info"
      case "expired":
        return "error"
      case "used":
      case "completed":
        return "warning"
      default:
        return "info"
    }
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg font-semibold">Reward History</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search history..."
                className="pl-9 h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] h-9">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="used">Used</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="h-9">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reward</TableHead>
                <TableHead>Points</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                    No reward history found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredHistory.map((item) => (
                  <React.Fragment key={item.id}>
                    <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => toggleRowExpand(item.id)}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{item.rewardTitle}</p>
                          <p className="text-xs text-gray-500">ID: {item.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-emerald-600">{item.pointsSpent}</span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{item.redeemDate}</TableCell>
                      <TableCell>
                        <EcoBadge type={getStatusBadgeType(item.status)}>{item.status}</EcoBadge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedRow === item.id && (
                      <TableRow>
                        <TableCell colSpan={5} className="bg-gray-50 p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-sm mb-2">Reward Details</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">Category:</span>
                                  <Badge variant="outline">{item.category}</Badge>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">Points Spent:</span>
                                  <span className="font-medium">{item.pointsSpent}</span>
                                </div>
                                {item.code && (
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Code:</span>
                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{item.code}</code>
                                  </div>
                                )}
                                {item.trackingCode && (
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Tracking Code:</span>
                                    <span className="font-medium">{item.trackingCode}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm mb-2">Dates</h4>
                              <div className="space-y-2">
                                <div className="flex items-center text-sm">
                                  <Calendar className="h-3 w-3 mr-2 text-gray-400" />
                                  <span className="text-gray-500">Redeemed:</span>
                                  <span className="ml-auto font-medium">{item.redeemDate}</span>
                                </div>
                                {item.expiryDate && (
                                  <div className="flex items-center text-sm">
                                    <Clock className="h-3 w-3 mr-2 text-gray-400" />
                                    <span className="text-gray-500">Expires:</span>
                                    <span
                                      className={`ml-auto font-medium ${
                                        item.status === "Expired" ? "text-red-500" : ""
                                      }`}
                                    >
                                      {item.expiryDate}
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="flex gap-2 mt-4 justify-end">
                                {item.status === "Active" && (
                                  <>
                                    <Button size="sm" variant="outline">
                                      <Download className="h-3 w-3 mr-1" />
                                      Download
                                    </Button>
                                    <Button size="sm">
                                      <ExternalLink className="h-3 w-3 mr-1" />
                                      Use Now
                                    </Button>
                                  </>
                                )}
                                {item.status === "Shipped" && (
                                  <Button size="sm" variant="outline">
                                    Track Shipment
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

