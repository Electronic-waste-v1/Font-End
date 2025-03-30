"use client"

import type React from "react"
import { useState } from "react"
import { Label } from "@/shared/components/ui/label"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { Button } from "@/shared/components/ui/button"
import { useCreateEventMutation } from "@/shared/services/communityApi"
import type { CommunityEventRequest } from "@/shared/types/communityTypes"

interface CreateEventFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export const CreateEventForm: React.FC<CreateEventFormProps> = ({ onSuccess, onCancel }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [location, setLocation] = useState("")
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)

  const [createEvent, { isLoading }] = useCreateEventMutation()

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !date || !time || !location.trim()) return

   
    const startDate = `${date}T${time}:00`
    const endDate = `${date}T${time}:00`

    const eventData: CommunityEventRequest = {
      title,
      description,
      startDate, 
      endDate,   
      location,
      imageUrl,  
    }

    try {
      await createEvent(eventData).unwrap()
      resetForm()
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error("Failed to create event:", error)
    }
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setDate("")
    setTime("")
    setLocation("")
    setImageUrl(undefined)
  }


  const handleImageUpload = () => {
   
    setImageUrl("/placeholder.svg?height=300&width=600&text=Event+Image")
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="event-title">Event Title</Label>
        <Input
          id="event-title"
          placeholder="Enter event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="event-description">Description</Label>
        <Textarea
          id="event-description"
          placeholder="Describe your event..."
          className="min-h-[100px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="event-date">Date</Label>
          <Input id="event-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="event-time">Time</Label>
          <Input id="event-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="event-location">Location</Label>
        <Input
          id="event-location"
          placeholder="Enter event location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Event Image (Optional)</Label>
        {imageUrl ? (
          <div className="relative">
            <img src={imageUrl || "/placeholder.svg"} alt="Upload preview" className="w-full h-auto rounded-lg" />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => setImageUrl(undefined)}
            >
              Remove
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
            <Button variant="outline" size="sm" onClick={handleImageUpload}>
              Upload Image
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          onClick={handleSubmit}
          disabled={isLoading || !title.trim() || !description.trim() || !date || !time || !location.trim()}
        >
          {isLoading ? "Creating..." : "Create Event"}
        </Button>
      </div>
    </div>
  )
}