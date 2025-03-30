"use client"

import type React from "react"
import { Calendar, Check, Users, X } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent } from "@/shared/components/ui/card"
import type { CommunityEvent } from "@/shared/types/communityTypes"
import { useAttendEventMutation, useUnattendEventMutation } from "@/shared/services/communityApi"

interface EventItemProps {
  event: CommunityEvent
}

export const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const [attendEvent] = useAttendEventMutation()
  const [unattendEvent] = useUnattendEventMutation()

  const handleAttendToggle = async () => {
    try {
      if (event.isAttendingByCurrentUser) {
        await unattendEvent(event.id).unwrap()
      } else {
        await attendEvent(event.id).unwrap()
      }
    } catch (error) {
      console.error("Failed to toggle attendance:", error)
    }
  }

  return (
    <Card className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <CardContent className="p-5">
      <div className="flex flex-col gap-3">
        {/* Featured badge (position adjusted for no image) */}
        {event.isFeatured && (
          <div className="self-end bg-primary text-white text-xs font-medium px-2 py-1 rounded mb-2">
            Featured
          </div>
        )}
  
        {/* Event title */}
        <h3 className="font-semibold text-lg text-gray-900">{event.title}</h3>
        
        {/* Event date and time */}
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>
            {new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}
            {event.time && ` • ${event.time}`}
          </span>
        </div>
  
        {/* Event description */}
        <p className="text-sm text-gray-600">{event.description}</p>
  
        {/* Attendees and action */}
        <div className="mt-2 pt-3 border-t border-gray-100 flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span>
              {event.attendees} {event.attendees === 1 ? 'person' : 'people'} attending
            </span>
          </div>
          <Button
            size="sm"
            variant={event.isAttendingByCurrentUser ? "outline" : "default"}
            className={event.isAttendingByCurrentUser ? "border-red-500 text-red-500 hover:bg-red-50" : ""}
            onClick={handleAttendToggle}
          >
            {event.isAttendingByCurrentUser ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                RSVP
              </>
            )}
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
  )
}

