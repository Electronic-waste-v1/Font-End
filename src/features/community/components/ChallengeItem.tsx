"use client"

import type React from "react"
import { Card, CardContent } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Progress } from "@/shared/components/ui/progress"
import type { CommunityChallenge } from "@/shared/types/communityTypes"
import { useJoinChallengeMutation, useLeaveChallengeMutation } from "@/shared/services/communityApi"
import { log } from "console"
import { Award, CalendarDays, Plus, Users, X } from "lucide-react"

interface ChallengeItemProps {
  challenge: CommunityChallenge
}

export const ChallengeItem: React.FC<ChallengeItemProps> = ({ challenge }) => {
  const [joinChallenge] = useJoinChallengeMutation()
  const [leaveChallenge] = useLeaveChallengeMutation()

  const handleJoinToggle = async () => {
    try {
      console.log("ChallengeItem handleJoinToggle", { challenge })
      if (challenge.isParticipatingByCurrentUser) {

        console.log("Leaving challenge", { challenge });
        
        await leaveChallenge(challenge.id).unwrap()
      } else {
        await joinChallenge(challenge.id).unwrap()
      }
    } catch (error) {
      console.error("Failed to toggle challenge participation:", error)
    }
  }

  console.log("ChallengeItem render", { challenge })

  return (
    <Card className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <CardContent className="p-5">
      <div className="flex flex-col gap-4">
   
        <div className="flex gap-4 items-start">
          <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
            <img
              src={challenge.image || "/placeholder.svg?height=100&width=200&text=Challenge"}
              alt={challenge.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-gray-900 truncate">{challenge.title}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <CalendarDays
             className="h-4 w-4 mr-1.5 flex-shrink-0" />
              <span>Ends {new Date(challenge.endDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
  
        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">{challenge.description}</p>
  
        {/* Community progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Community Progress</span>
            <span className="font-medium text-gray-700">{challenge.progress}%</span>
          </div>
          <Progress value={challenge.progress} className="h-2 bg-gray-100" />
          <div className="flex justify-between text-xs text-gray-500">
            <span className="flex items-center">
              <Users className="h-3.5 w-3.5 mr-1.5" />
              {challenge.participantsCount} {challenge.participantsCount === 1 ? "participant" : "participants"}
            </span>
            <span className="flex items-center">
              <Award className="h-3.5 w-3.5 mr-1.5" />
              {challenge.reward}
            </span>
          </div>
        </div>
  
        {/* User participation section */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
          {challenge.userProgress && (
            <div className="space-y-1">
              <span className="text-sm text-gray-700">
                Your progress: {challenge.userProgress.current}/{challenge.userProgress.target}
              </span>
              <Progress 
                value={(challenge.userProgress.current / challenge.userProgress.target) * 100} 
                className="h-1.5 bg-gray-100"
              />
            </div>
          )}
          <Button
            size="sm"
            variant={challenge.isParticipatingByCurrentUser ? "outline" : "default"}
            className={challenge.isParticipatingByCurrentUser ? "border-red-500 text-red-500 hover:bg-red-50" : ""}
            onClick={handleJoinToggle}
          >
            {challenge.isParticipatingByCurrentUser ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Leave Challenge
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Join Challenge
              </>
            )}
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
  )
}