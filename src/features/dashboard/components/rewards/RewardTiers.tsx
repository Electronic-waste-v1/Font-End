import { Award, CheckCircle, Lock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Progress } from "@/shared/components/ui/progress"
import { Button } from "@/shared/components/ui/button"

// Sample tier data
const tiers = [
  {
    name: "Bronze",
    pointsRequired: 0,
    benefits: ["Access to basic rewards", "Email notifications for new rewards", "Monthly recycling report"],
    unlocked: true,
    current: false,
  },
  {
    name: "Silver",
    pointsRequired: 1000,
    benefits: [
      "All Bronze benefits",
      "Exclusive discount coupons",
      "Priority customer support",
      "Early access to special events",
    ],
    unlocked: true,
    current: true,
  },
  {
    name: "Gold",
    pointsRequired: 2500,
    benefits: [
      "All Silver benefits",
      "Premium rewards selection",
      "Free shipping on physical rewards",
      "Quarterly bonus points",
      "Personalized recycling coach",
    ],
    unlocked: false,
    current: false,
  },
  {
    name: "Platinum",
    pointsRequired: 5000,
    benefits: [
      "All Gold benefits",
      "VIP rewards collection",
      "Double points on special events",
      "Exclusive partner benefits",
      "Annual sustainability certificate",
      "Dedicated account manager",
    ],
    unlocked: false,
    current: false,
  },
]

export default function RewardTiers() {

  const totalPoints = 1250
  const currentTier = "Silver"
  const nextTier = tiers.find((tier) => !tier.unlocked)


  const progress = nextTier ? Math.min(100, Math.round((totalPoints / nextTier.pointsRequired) * 100)) : 100


  const pointsToNextTier = nextTier ? nextTier.pointsRequired - totalPoints : 0

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Your Reward Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 rounded-full">
                  <Award className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Tier</p>
                  <p className="text-xl font-bold text-gray-900">{currentTier}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              {nextTier ? (
                <>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Progress to {nextTier.name}</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-gray-500 mt-1">
                    You need <span className="font-medium text-emerald-600">{pointsToNextTier} more points</span> to
                    reach {nextTier.name} tier
                  </p>
                </>
              ) : (
                <div className="bg-emerald-50 text-emerald-800 p-3 rounded-md">
                  <p className="font-medium">Congratulations! You've reached the highest tier.</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiers.map((tier) => (
          <Card key={tier.name} className={`border ${tier.current ? "border-emerald-500 shadow-md" : ""}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">{tier.name}</CardTitle>
                {tier.unlocked ? (
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                ) : (
                  <Lock className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <div className="text-sm text-gray-500">
                {tier.pointsRequired > 0 ? `${tier.pointsRequired} points required` : "No points required"}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tier.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <CheckCircle
                      className={`h-4 w-4 mt-0.5 mr-2 ${tier.unlocked ? "text-emerald-500" : "text-gray-300"}`}
                    />
                    <span className={tier.unlocked ? "text-gray-700" : "text-gray-400"}>{benefit}</span>
                  </li>
                ))}
              </ul>

              {tier.current && (
                <div className="mt-4 bg-emerald-50 text-emerald-800 p-2 rounded text-sm text-center">
                  Your current tier
                </div>
              )}

              {!tier.unlocked && !tier.current && (
                <Button variant="outline" className="w-full mt-4" disabled>
                  Locked
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

