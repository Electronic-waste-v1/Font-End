import type React from "react"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import { Badge } from "@/shared/components/ui/badge"
import type { LeaderboardEntry } from "@/shared/types/recyclingTypes"

interface LeaderboardTableProps {
  users: LeaderboardEntry[]
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ users }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left">Rank</th>
            <th className="px-4 py-2 text-left">User</th>
            <th className="px-4 py-2 text-left">Points</th>
            <th className="px-4 py-2 text-left">Items Recycled</th>
            <th className="px-4 py-2 text-left">Badge</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.userId} className="border-b">
              {/* Rank */}
              <td className="px-4 py-3">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className={`font-medium ${index + 1 <= 3 ? "text-amber-600" : ""}`}>{index + 1}</span>
                </div>
              </td>

              {/* User */}
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback>
                      {user.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.userName}</span>
                </div>
              </td>

              {/* Points */}
              <td className="px-4 py-3 font-medium text-emerald-600">{user.points}</td>

              {/* Items Recycled */}
              <td className="px-4 py-3">{user.recycledCount}</td>

              {/* Badge */}
              <td className="px-4 py-3">
                <Badge
                  className={`
                    ${user.points >= 1000 ? "bg-slate-200 text-slate-800" : ""}
                    ${user.points >= 500 && user.points < 1000 ? "bg-amber-100 text-amber-800" : ""}
                    ${user.points >= 100 && user.points < 500 ? "bg-gray-200 text-gray-800" : ""}
                    ${user.points < 100 ? "bg-amber-700 text-white" : ""}
                  `}
                >
                  {user.points >= 1000
                    ? "Platinum"
                    : user.points >= 500
                    ? "Gold"
                    : user.points >= 100
                    ? "Silver"
                    : "Bronze"}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}