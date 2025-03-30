"use client"

import { Megaphone, Calendar, ChevronRight, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { Link } from "react-router-dom"
import { format } from "date-fns"
import { AnnonceResponse } from "@/shared/types/annonceTypes"


interface RecentAnnouncementsProps {
  announcements?: AnnonceResponse[]
  isLoading: boolean
  error: any
}

export default function RecentAnnouncements({ announcements, isLoading, error }: RecentAnnouncementsProps) {
  const getTypeStyles = (type: string) => {
    switch (type?.toLowerCase()) {
      case "event":
        return "bg-blue-100 text-blue-800"
      case "news":
        return "bg-purple-100 text-purple-800"
      case "update":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy")
    } catch (e) {
      return "Invalid date"
    }
  }

  if (isLoading) {
    return (
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-8 w-24" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="flex-shrink-0 w-10 h-10 rounded-full" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-4 w-full mt-1" />
                  <Skeleton className="h-4 w-3/4 mt-1" />
                  <Skeleton className="h-3 w-24 mt-1" />
                </div>
              </div>
            ))}
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
            <CardTitle className="text-lg font-semibold">Recent Announcements</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-800 text-sm">Failed to load announcements.</p>
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
          <CardTitle className="text-lg font-semibold">Recent Announcements</CardTitle>
          <Link to="/dashboard/announcements">
            <Button variant="ghost" size="sm" className="text-emerald-600 h-8 px-2">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {announcements && announcements.length > 0 ? (
          <div className="space-y-4">
            {announcements.slice(0, 3).map((announcement) => (
              <div key={announcement.id} className="flex gap-4">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getTypeStyles(announcement.type || "news")}`}
                >
                  <Megaphone className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900 truncate">{announcement.title}</h4>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${getTypeStyles(announcement.type || "news")}`}
                    >
                      {announcement.type || "news"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">{announcement.content}</p>
                  <div className="flex items-center text-xs text-gray-400 mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(announcement.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No announcements available.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

