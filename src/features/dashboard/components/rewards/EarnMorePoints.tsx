import { ArrowUpRight, RefreshCw, CalendarCheck, Share2, Users, Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"


const earnPoints = [
  {
    title: "Recycle E-Waste",
    description: "Recycle your electronic devices at collection points or schedule a pickup",
    points: "Up to 500",
    icon: RefreshCw,
    action: "Schedule Pickup",
    linkTo: "/dashboard/recycling",
  },
  {
    title: "Complete Weekly Challenges",
    description: "Participate in weekly recycling challenges to earn bonus points",
    points: "50-200",
    icon: Trophy,
    action: "View Challenges",
    linkTo: "/dashboard/challenges",
  },
  {
    title: "Refer Friends",
    description: "Invite friends to join EcoRecycle and earn points when they sign up",
    points: "200 per friend",
    icon: Users,
    action: "Invite Friends",
    linkTo: "/dashboard/referrals",
  },
  {
    title: "Participate in Events",
    description: "Join local e-waste collection drives and recycling events",
    points: "100-300",
    icon: CalendarCheck,
    action: "Find Events",
    linkTo: "/dashboard/events",
  },
  {
    title: "Share on Social Media",
    description: "Share your recycling achievements on social platforms",
    points: "50",
    icon: Share2,
    action: "Share Now",
    linkTo: "#",
  },
]

export default function EarnMorePoints() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Ways to Earn More Points</CardTitle>
          <Button variant="link" className="text-emerald-600">
            View All <ArrowUpRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {earnPoints.map((item) => (
            <div
              key={item.title}
              className="border rounded-lg p-4 hover:border-emerald-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-50 rounded-full">
                  <item.icon className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{item.title}</h3>
                  <div className="text-sm text-emerald-600 font-medium mt-1">{item.points} points</div>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  <Button variant="link" className="text-emerald-600 p-0 h-auto mt-2 text-sm">
                    {item.action}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

