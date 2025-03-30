"use client"

import type React from "react"
import { useState } from "react"
import { Label } from "@/shared/components/ui/label"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { Button } from "@/shared/components/ui/button"
import { useCreateChallengeMutation } from "@/shared/services/communityApi"
import type { CommunityChallengeRequest } from "@/shared/types/communityTypes"

interface CreateChallengeFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export const CreateChallengeForm: React.FC<CreateChallengeFormProps> = ({ onSuccess, onCancel }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [reward, setReward] = useState("")
  const [targetGoal, setTargetGoal] = useState<number>(50) 
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)

  const [startDateError, setStartDateError] = useState<string | null>(null)
  const [endDateError, setEndDateError] = useState<string | null>(null)

  const [createChallenge, { isLoading }] = useCreateChallengeMutation()

  const validateDates = () => {
    const now = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (start <= now) {
      setStartDateError("Start date must be in the future.")
      return false
    } else {
      setStartDateError(null)
    }

    if (end <= now) {
      setEndDateError("End date must be in the future.")
      return false
    } else {
      setEndDateError(null)
    }

    if (start >= end) {
      setStartDateError("Start date must be before end date.")
      return false
    } else {
      setStartDateError(null)
    }

    return true
  }

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !startDate || !endDate || !reward.trim()) return

    if (!validateDates()) return

    const challengeData: CommunityChallengeRequest = {
      title,
      description,
      startDate: new Date(startDate).toISOString(), 
      endDate: new Date(endDate).toISOString()
      reward,
      targetGoal,
      imageUrl,
    }

    try {
      await createChallenge(challengeData).unwrap()
      resetForm()
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error("Failed to create challenge:", error)
    }
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setStartDate("")
    setEndDate("")
    setReward("")
    setTargetGoal(50)
    setImageUrl(undefined)
    setStartDateError(null)
    setEndDateError(null)
  }

  
  const handleImageUpload = () => {
    
    setImageUrl("http://example.com/image.jpg")
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="challenge-title">Challenge Title</Label>
        <Input
          id="challenge-title"
          placeholder="Enter challenge title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="challenge-description">Description</Label>
        <Textarea
          id="challenge-description"
          placeholder="Describe your challenge..."
          className="min-h-[100px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="challenge-start-date">Start Date</Label>
          <Input
            id="challenge-start-date"
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          {startDateError && <p className="text-sm text-red-500">{startDateError}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="challenge-end-date">End Date</Label>
          <Input
            id="challenge-end-date"
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          {endDateError && <p className="text-sm text-red-500">{endDateError}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="challenge-reward">Reward</Label>
          <Input
            id="challenge-reward"
            placeholder="What will participants earn?"
            value={reward}
            onChange={(e) => setReward(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="challenge-target-goal">Target Goal</Label>
          <Input
            id="challenge-target-goal"
            type="number"
            min="1"
            value={targetGoal}
            onChange={(e) => setTargetGoal(Number.parseInt(e.target.value) || 50)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Challenge Image (Optional)</Label>
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
          disabled={isLoading || !title.trim() || !description.trim() || !startDate || !endDate || !reward.trim()}
        >
          {isLoading ? "Creating..." : "Create Challenge"}
        </Button>
      </div>
    </div>
  )
}