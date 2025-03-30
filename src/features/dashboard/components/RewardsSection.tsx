import { Gift, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Button } from "../../../shared/components/ui/button"
import { Progress } from "../../../shared/components/ui/progress"

export default function RewardsSection() {
  const rewards = [
    {
      title: "10% Discount Coupon",
      points: 1500,
      icon: "🏷️",
      progress: 83,
    },
    {
      title: "Eco-Friendly Water Bottle",
      points: 2500,
      icon: "🍶",
      progress: 50,
    },
    {
      title: "Plant a Tree Certificate",
      points: 3000,
      icon: "🌳",
      progress: 42,
    },
  ]

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Available Rewards</CardTitle>
          <Button variant="ghost" size="sm" className="text-emerald-600 h-8 px-2">
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rewards.map((reward) => (
            <div key={reward.title} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl">{reward.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{reward.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={reward.progress} className="h-2" />
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {reward.progress}% ({Math.round((reward.points * reward.progress) / 100)}/{reward.points} pts)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
            <Gift className="mr-2 h-4 w-4" />
            Redeem Points
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

