import type React from "react"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import { Badge } from "@/shared/components/ui/badge"
import { Award } from "lucide-react"

import { LeaderboardEntry } from "@/shared/types/recyclingTypes"

interface TopLeaderboardProps {
  users: LeaderboardEntry[]
}

export const TopLeaderboard: React.FC<TopLeaderboardProps> = ({ users }) => {
  if (users.length < 3) return null

  const topThree = users.slice(0, 3)

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-end">
      {/* 2nd Place */}
      <div className="flex flex-col items-center order-2 md:order-1">
        <Avatar className="h-16 w-16 border-2 border-gray-300">
          <AvatarFallback>
            {topThree[1].userName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="mt-2 text-center">
          <div className="font-medium">{topThree[1].userName}</div>
          <Badge className="bg-amber-100 text-amber-800 mt-1">{topThree[1].points} points</Badge>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mx-auto mt-2">
            <span className="font-bold">2</span>
          </div>
        </div>
      </div>

      {/* 1st Place */}
      <div className="flex flex-col items-center order-1 md:order-2">
        <div className="w-10 h-10 flex items-center justify-center mb-2">
          <Award className="h-10 w-10 text-amber-400" fill="currentColor" />
        </div>
        <Avatar className="h-20 w-20 border-4 border-amber-400">
          <AvatarFallback>
            {topThree[0].userName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="mt-2 text-center">
          <div className="font-bold text-lg">{topThree[0].userName}</div>
          <Badge className="bg-emerald-100 text-emerald-800 mt-1">{topThree[0].points} points</Badge>
          <div className="w-10 h-10 rounded-full bg-amber-400 text-white flex items-center justify-center mx-auto mt-2">
            <span className="font-bold">1</span>
          </div>
        </div>
      </div>

      {/* 3rd Place */}
      <div className="flex flex-col items-center order-3">
        <Avatar className="h-16 w-16 border-2 border-amber-700">
          <AvatarFallback>
            {topThree[2].userName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="mt-2 text-center">
          <div className="font-medium">{topThree[2].userName}</div>
          <Badge className="bg-amber-100 text-amber-800 mt-1">{topThree[2].points} points</Badge>
          <div className="w-8 h-8 rounded-full bg-amber-700 text-white flex items-center justify-center mx-auto mt-2">
            <span className="font-bold">3</span>
          </div>
        </div>
      </div>
    </div>
  )
}