"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { useGetLeaderboardQuery } from "@/shared/services/recyclingApi"
import { Loader2, Trophy, Medal, Award } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default function RecyclingLeaderboard() {
  const { data: leaderboard, isLoading } = useGetLeaderboardQuery()

  const getIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 2:
        return <Medal className="h-5 w-5 text-amber-700" />
      default:
        return <Award className="h-5 w-5 text-emerald-500" />
    }
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Recycling Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          </div>
        ) : (
          <div className="space-y-4">
            {leaderboard?.entries.map((entry, index) => (
              <div
                key={entry.userId}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  index === 0
                    ? "bg-yellow-50"
                    : index === 1
                      ? "bg-gray-50"
                      : index === 2
                        ? "bg-amber-50"
                        : "bg-white border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                    {getIcon(index)}
                  </div>
                  <div>
                    <p className="font-medium">{entry.userName}</p>
                    <p className="text-xs text-gray-500">{entry.recycledCount} items recycled</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">{entry.points} pts</p>
                  <p className="text-xs text-gray-500">#{index + 1}</p>
                </div>
              </div>
            ))}

            {leaderboard && (
              <p className="text-xs text-gray-500 text-center mt-4">
                Last updated: {formatDistanceToNow(new Date(leaderboard.generatedAt), { addSuffix: true })}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

