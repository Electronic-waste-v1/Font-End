import { Gift, Calendar, Store, Info, ArrowRight } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/components/ui/tabs"

interface RewardDetailProps {
  reward: {
    id: string
    title: string
    description: string
    pointsCost: number
    category: string
    merchant: string
    expiryDays: number | null
    popularity: string
    image?: string
  }
}

export default function RewardDetail({ reward }: RewardDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column - Image */}
        <div className="md:w-1/3">
          <div className="rounded-lg overflow-hidden">
            <img src={reward.image || "/placeholder.svg"} alt={reward.title} className="w-full h-auto object-cover" />
          </div>
        </div>

        {/* Right column - Details */}
        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold">{reward.title}</h3>
              <p className="text-gray-500 flex items-center mt-1">
                <Store className="h-4 w-4 mr-1" />
                Provided by {reward.merchant}
              </p>
            </div>
            <Badge className="bg-emerald-100 text-emerald-800">{reward.category}</Badge>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">{reward.description}</p>
          </div>

          <div className="flex items-center justify-between bg-emerald-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Gift className="h-5 w-5 text-emerald-600 mr-2" />
              <span className="font-bold text-emerald-700 text-lg">{reward.pointsCost} points</span>
            </div>
            <Button className="bg-emerald-500 hover:bg-emerald-600">Sign Up to Redeem</Button>
          </div>

          {reward.expiryDays && (
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Reward expires {reward.expiryDays} days after redemption</span>
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList className="w-full">
          <TabsTrigger value="details" className="flex-1">
            Details
          </TabsTrigger>
          <TabsTrigger value="terms" className="flex-1">
            Terms & Conditions
          </TabsTrigger>
          <TabsTrigger value="redeem" className="flex-1">
            How to Redeem
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="pt-4">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium mb-2">Reward Details</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-500">Category:</span>
                  <span>{reward.category}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Provider:</span>
                  <span>{reward.merchant}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Point Cost:</span>
                  <span>{reward.pointsCost} points</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Popularity:</span>
                  <span>{reward.popularity}</span>
                </li>
                {reward.expiryDays && (
                  <li className="flex justify-between">
                    <span className="text-gray-500">Validity:</span>
                    <span>{reward.expiryDays} days after redemption</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium mb-2">About {reward.merchant}</h4>
              <p className="text-gray-600 text-sm">
                {reward.merchant} is a trusted partner committed to sustainability and eco-friendly practices. They
                offer high-quality products and services that align with our mission of environmental conservation.
              </p>
              <Button variant="link" className="text-emerald-600 p-0 h-auto text-sm mt-2">
                Learn more about {reward.merchant} <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-emerald-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-emerald-800">Did you know?</h4>
                  <p className="text-emerald-700 text-sm">
                    By recycling e-waste and redeeming rewards, you're contributing to a circular economy that reduces
                    waste and conserves natural resources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="terms" className="pt-4">
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium mb-4">Terms & Conditions</h4>
            <div className="space-y-3 text-gray-600 text-sm">
              <p>1. This reward is available to registered EcoRecycle users only.</p>
              <p>2. Points will be deducted from your account upon redemption.</p>
              <p>
                3.{" "}
                {reward.expiryDays
                  ? `This reward expires ${reward.expiryDays} days after redemption.`
                  : "This reward does not expire after redemption."}
              </p>
              <p>4. Rewards cannot be exchanged for cash or transferred to another user after redemption.</p>
              <p>5. EcoRecycle reserves the right to modify or discontinue rewards at any time.</p>
              <p>6. Additional terms may apply based on the specific reward and merchant policies.</p>
              <p>7. For physical items, shipping is available only within the country.</p>
              <p>8. Please allow 7-10 business days for delivery of physical rewards.</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="redeem" className="pt-4">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium mb-4">How to Redeem This Reward</h4>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-emerald-600">1</span>
                  </div>
                  <div>
                    <h5 className="font-medium">Sign Up or Log In</h5>
                    <p className="text-gray-600 text-sm">
                      Create an account or log in to your existing EcoRecycle account.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-emerald-600">2</span>
                  </div>
                  <div>
                    <h5 className="font-medium">Earn Enough Points</h5>
                    <p className="text-gray-600 text-sm">
                      Recycle e-waste and participate in activities to earn at least {reward.pointsCost} points.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-emerald-600">3</span>
                  </div>
                  <div>
                    <h5 className="font-medium">Select This Reward</h5>
                    <p className="text-gray-600 text-sm">
                      Go to the Rewards section in your dashboard and select this reward.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-emerald-600">4</span>
                  </div>
                  <div>
                    <h5 className="font-medium">Confirm Redemption</h5>
                    <p className="text-gray-600 text-sm">
                      Review the details and confirm your redemption. Points will be deducted from your account.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-emerald-600">5</span>
                  </div>
                  <div>
                    <h5 className="font-medium">Receive Your Reward</h5>
                    <p className="text-gray-600 text-sm">
                      {reward.category === "Product"
                        ? "Your physical reward will be shipped to your registered address within 7-10 business days."
                        : "Digital rewards will be sent to your email or available in your account immediately."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg">
              <h4 className="font-medium text-emerald-800 mb-2">Need Help?</h4>
              <p className="text-emerald-700 text-sm">
                If you have any questions about redeeming this reward, please contact our support team.
              </p>
              <Button variant="link" className="text-emerald-700 p-0 h-auto text-sm mt-2">
                Contact Support
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

