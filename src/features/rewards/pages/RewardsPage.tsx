"use client"

import { useState } from "react"
import { Gift, Recycle, Star, CheckCircle, Users, Calendar, Zap } from "lucide-react"
import Header from "@/shared/layout/Header"
import Footer from "@/shared/layout/Footer"
import { Button } from "@/shared/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/components/ui/tabs"
import { Card, CardContent } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Progress } from "@/shared/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/shared/components/ui/dialog"
import { useToast } from "@/shared/components/ui/use-toast"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"
import { useGetRecompensesQuery, useAssignRecompenseMutation } from "@/shared/services/recompenseApi"
import RewardDetail from "../components/RewardDetail"
import NewsletterSignup from "../../../features/annonce/components/NewsletterSignup"


const rewardTiers = [
  {
    name: "Bronze",
    pointsRequired: 0,
    benefits: ["Access to basic rewards", "Email notifications for new rewards", "Monthly recycling report"],
    color: "amber-600",
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
    color: "gray-400",
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
    color: "amber-400",
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
    color: "slate-300",
  },
]


const earningMethods = [
  {
    title: "Recycle Electronics",
    description: "Earn points based on the weight and type of electronics you recycle",
    pointsRange: "10-500 points",
    icon: Recycle,
    examples: [
      { item: "Smartphone", points: 50 },
      { item: "Laptop", points: 150 },
      { item: "TV/Monitor", points: 200 },
      { item: "Small Appliance", points: 100 },
    ],
  },
  {
    title: "Refer Friends",
    description:
      "Invite friends to join EcoRecycle and earn points when they sign up and complete their first recycling",
    pointsRange: "200 points per referral",
    icon: Users,
    examples: [
      { item: "Friend signs up", points: 50 },
      { item: "Friend completes first recycling", points: 150 },
    ],
  },
  {
    title: "Participate in Events",
    description: "Join our recycling events and educational workshops to earn bonus points",
    pointsRange: "100-300 points",
    icon: Calendar,
    examples: [
      { item: "Attend recycling drive", points: 100 },
      { item: "Participate in workshop", points: 150 },
      { item: "Volunteer at event", points: 300 },
    ],
  },
  {
    title: "Complete Challenges",
    description: "Take on monthly recycling challenges to earn extra points and badges",
    pointsRange: "50-500 points",
    icon: Zap,
    examples: [
      { item: "Weekly recycling streak", points: 50 },
      { item: "Monthly challenge", points: 200 },
      { item: "Seasonal special challenge", points: 500 },
    ],
  },
]


const successStories = [
  {
    name: "Sarah Johnson",
    image: "/placeholder.svg?height=100&width=100&text=SJ",
    story:
      "I've recycled over 20 electronic devices and earned enough points to get a new eco-friendly water bottle and plant 3 trees. It feels great to make a positive impact!",
    pointsEarned: 2500,
    rewardsRedeemed: 3,
  },
  {
    name: "Michael Chen",
    image: "/placeholder.svg?height=100&width=100&text=MC",
    story:
      "The rewards program motivated me to properly dispose of all my old electronics. I've reached Gold tier and love the exclusive rewards available at this level.",
    pointsEarned: 3800,
    rewardsRedeemed: 5,
  },
  {
    name: "Emily Rodriguez",
    image: "/placeholder.svg?height=100&width=100&text=ER",
    story:
      "I organized an e-waste collection drive at my office and earned bonus points. Used my points for movie tickets and shopping vouchers. Great incentive to recycle!",
    pointsEarned: 4200,
    rewardsRedeemed: 7,
  },
]

export default function RewardsPage() {
  const [selectedReward, setSelectedReward] = useState<any>(null)
  const [isRewardDetailOpen, setIsRewardDetailOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("rewards")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const { toast } = useToast()

 
  const user = useSelector((state: RootState) => state.auth.user)

  
  const userPoints = user?.points || 0
  const isAuthenticated = !!user

  
  const { data: recompenses, isLoading, error } = useGetRecompensesQuery()
  const [assignRecompense, { isLoading: isAssigning }] = useAssignRecompenseMutation()


  const transformRecompense = (recompense: any) => ({
    id: recompense.id,
    title: recompense.description,
    description: recompense.description,
    pointsCost: recompense.pointsRequis,
    category: recompense.category || "Product",
    merchant: recompense.merchant || "EcoStore",
    expiryDays: recompense.expiryDays,
    popularity: "Medium",
    image:
      recompense.image || `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(recompense.description)}`,
    featured: recompense.featured || false,
  })

 
  const filteredRewards = recompenses
    ? recompenses
        .map(transformRecompense)
        .filter((reward) => categoryFilter === "all" || reward.category.toLowerCase() === categoryFilter.toLowerCase())
    : []

  
  const featuredRewards = filteredRewards.filter((reward) => reward.featured).slice(0, 3)

 
  const displayedFeaturedRewards = featuredRewards.length > 0 ? featuredRewards : filteredRewards.slice(0, 3)

  const handleRewardSelect = (reward: any) => {
    setSelectedReward(reward)
    setIsRewardDetailOpen(true)
  }

  const handleRedeemReward = async (reward: any) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to redeem rewards",
        variant: "destructive",
      })
      return
    }

    if (userPoints < reward.pointsCost) {
      toast({
        title: "Not Enough Points",
        description: `You need ${reward.pointsCost - userPoints} more points to redeem this reward`,
        variant: "destructive",
      })
      return
    }

    try {
      const result = await assignRecompense({
        userId: user.id,
        recompenseId: reward.id,
      }).unwrap()

      toast({
        title: "Reward Redeemed!",
        description: `You've successfully redeemed ${reward.title}`,
        variant: "default",
      })

  
      setIsRewardDetailOpen(false)
    } catch (error) {
      toast({
        title: "Redemption Failed",
        description: "There was an error redeeming your reward. Please try again.",
        variant: "destructive",
      })
    }
  }

  const uniqueCategories =
    filteredRewards.length > 0 ? [...new Set(filteredRewards.map((reward) => reward.category.toLowerCase()))] : []

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-6">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Recycle and Get Rewarded</h1>
              <p className="text-lg text-emerald-100 mb-8">
                Turn your e-waste into rewards! Earn points every time you recycle electronics and redeem them for
                eco-friendly products, discounts, and experiences.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {!isAuthenticated ? (
                  <Button className="bg-white text-emerald-600 hover:bg-emerald-50" asChild>
                    <a href="/login">Sign In</a>
                  </Button>
                ) : (
                  <Button className="bg-white text-emerald-600 hover:bg-emerald-50" asChild>
                    <a href="/dashboard/rewards">My Rewards</a>
                  </Button>
                )}
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn How It Works
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Navigation */}
        <section className="bg-white border-b sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="rewards" className="w-full" onValueChange={setActiveTab} value={activeTab}>
              <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
                <TabsTrigger value="tiers">Reward Tiers</TabsTrigger>
                <TabsTrigger value="earning">Earning Points</TabsTrigger>
                <TabsTrigger value="stories">Success Stories</TabsTrigger>
              </TabsList>

              {/* Move all TabsContent components here */}
              <div className="mt-6">
                {/* Featured Rewards Section */}
                <TabsContent value="rewards">
                  <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                      <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Featured Rewards</h2>
                        <p className="text-gray-600">
                          Check out these popular rewards that our users love. From eco-friendly products to exclusive
                          experiences, there's something for everyone.
                        </p>
                      </div>

                      {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                          {[1, 2, 3].map((i) => (
                            <Card key={i} className="overflow-hidden">
                              <div className="h-48 overflow-hidden">
                                <Skeleton className="w-full h-full" />
                              </div>
                              <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                  <Skeleton className="h-6 w-32" />
                                  <Skeleton className="h-5 w-16 rounded-full" />
                                </div>
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-3/4 mb-4" />
                                <div className="flex justify-between items-center">
                                  <Skeleton className="h-5 w-20" />
                                  <Skeleton className="h-8 w-24 rounded" />
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : error ? (
                        <div className="text-center py-8">
                          <p className="text-red-500 mb-4">Failed to load rewards. Please try again later.</p>
                          <Button onClick={() => window.location.reload()}>Retry</Button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                          {displayedFeaturedRewards.length === 0 ? (
                            <div className="col-span-3 text-center py-8">
                              <p className="text-gray-500">No featured rewards available at the moment.</p>
                            </div>
                          ) : (
                            displayedFeaturedRewards.map((reward) => (
                              <Card
                                key={reward.id}
                                className="overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                                onClick={() => handleRewardSelect(reward)}
                              >
                                <div className="h-48 overflow-hidden">
                                  <img
                                    src={reward.image || "/placeholder.svg"}
                                    alt={reward.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <CardContent className="p-6">
                                  <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg">{reward.title}</h3>
                                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                                      {reward.category}
                                    </Badge>
                                  </div>
                                  <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
                                  <div className="flex justify-between items-center">
                                    <span className="font-bold text-emerald-600">{reward.pointsCost} points</span>
                                    <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                                      View Details
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  </section>

                  {/* All Rewards Section */}
                  <section className="py-12">
                    <div className="container mx-auto px-4">
                      <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold">All Available Rewards</h2>
                        <div className="flex gap-2">
                          <select
                            className="px-3 py-2 border rounded-md text-sm"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                          >
                            <option value="all">All Categories</option>
                            {uniqueCategories.map((category) => (
                              <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <Card key={i} className="overflow-hidden">
                              <div className="h-40 overflow-hidden">
                                <Skeleton className="w-full h-full" />
                              </div>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <Skeleton className="h-5 w-24" />
                                  <Skeleton className="h-4 w-16 rounded-full" />
                                </div>
                                <Skeleton className="h-3 w-full mb-1" />
                                <Skeleton className="h-3 w-3/4 mb-3" />
                                <div className="flex justify-between items-center">
                                  <Skeleton className="h-4 w-16" />
                                  <Skeleton className="h-7 w-16 rounded" />
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : error ? (
                        <div className="text-center py-8">
                          <p className="text-red-500 mb-4">Failed to load rewards. Please try again later.</p>
                          <Button onClick={() => window.location.reload()}>Retry</Button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          {filteredRewards.length === 0 ? (
                            <div className="col-span-4 text-center py-8">
                              <p className="text-gray-500">No rewards available matching your criteria.</p>
                            </div>
                          ) : (
                            filteredRewards.map((reward) => (
                              <Card
                                key={reward.id}
                                className="hover:shadow-md transition-all cursor-pointer"
                                onClick={() => handleRewardSelect(reward)}
                              >
                                <div className="h-40 overflow-hidden">
                                  <img
                                    src={reward.image || "/placeholder.svg"}
                                    alt={reward.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-medium">{reward.title}</h3>
                                    <Badge variant="outline" className="text-xs">
                                      {reward.category}
                                    </Badge>
                                  </div>
                                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{reward.description}</p>
                                  <div className="flex justify-between items-center">
                                    <span className="font-bold text-emerald-600">{reward.pointsCost} pts</span>
                                    <Button size="sm" variant="ghost" className="h-8 text-emerald-600">
                                      Details
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))
                          )}
                        </div>
                      )}

                      <div className="text-center mt-10">
                        {!isAuthenticated ? (
                          <Button className="bg-emerald-500 hover:bg-emerald-600" asChild>
                            <a href="/login">Sign In to Start Earning</a>
                          </Button>
                        ) : (
                          <Button className="bg-emerald-500 hover:bg-emerald-600" asChild>
                            <a href="/dashboard">Go to Dashboard</a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </section>
                </TabsContent>

                {/* Reward Tiers Section */}
                <TabsContent value="tiers">
                  <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                      <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Reward Tiers</h2>
                        <p className="text-gray-600">
                          The more you recycle, the more benefits you unlock. Progress through our tier system to access
                          exclusive rewards and privileges.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {rewardTiers.map((tier, index) => (
                          <Card key={tier.name} className="overflow-hidden">
                            <div className={`h-2 bg-${tier.color}`}></div>
                            <CardContent className="p-6">
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-xl">{tier.name}</h3>
                                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100">
                                  <Star className={`h-6 w-6 text-${tier.color}`} fill="currentColor" />
                                </div>
                              </div>

                              <div className="mb-4">
                                <p className="text-sm text-gray-500 mb-1">Points Required</p>
                                <p className="font-bold text-lg">{tier.pointsRequired.toLocaleString()} pts</p>
                              </div>

                              <div className="space-y-2 mb-4">
                                <p className="font-medium text-sm">Benefits:</p>
                                <ul className="space-y-2">
                                  {tier.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-gray-700">{benefit}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {isAuthenticated && index < rewardTiers.length - 1 && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-500">Your progress:</span>
                                    <span className="font-medium">
                                      {userPoints >= tier.pointsRequired &&
                                      userPoints < rewardTiers[index + 1].pointsRequired
                                        ? "Current tier"
                                        : userPoints >= rewardTiers[index + 1].pointsRequired
                                          ? "Completed"
                                          : `${rewardTiers[index + 1].pointsRequired - userPoints} more points needed`}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                                    <span>{tier.pointsRequired} pts</span>
                                    <span>{rewardTiers[index + 1].pointsRequired} pts</span>
                                  </div>
                                  <Progress
                                    value={Math.min(
                                      100,
                                      ((userPoints - tier.pointsRequired) /
                                        (rewardTiers[index + 1].pointsRequired - tier.pointsRequired)) *
                                        100,
                                    )}
                                    className="h-1.5"
                                  />
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <div className="max-w-3xl mx-auto mt-12 bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="font-bold text-lg mb-4">How to Progress Through Tiers</h3>
                        <div className="space-y-4">
                          <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                              <span className="font-bold text-emerald-600">1</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Sign Up for an Account</h4>
                              <p className="text-gray-600 text-sm">
                                Create your free EcoRecycle account to start tracking your recycling activities and
                                points.
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                              <span className="font-bold text-emerald-600">2</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Recycle E-Waste Regularly</h4>
                              <p className="text-gray-600 text-sm">
                                Bring your electronic waste to our collection points or schedule pickups to earn points.
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                              <span className="font-bold text-emerald-600">3</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Participate in Additional Activities</h4>
                              <p className="text-gray-600 text-sm">
                                Earn bonus points by referring friends, attending events, and completing challenges.
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                              <span className="font-bold text-emerald-600">4</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Unlock Higher Tiers</h4>
                              <p className="text-gray-600 text-sm">
                                As you accumulate points, you'll automatically progress to higher tiers with better
                                benefits.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </TabsContent>

                {/* Earning Points Section */}
                <TabsContent value="earning">
                  <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                      <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Earn Points</h2>
                        <p className="text-gray-600">
                          There are multiple ways to earn recycling points. The more you participate, the more rewards
                          you can unlock!
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {earningMethods.map((method) => (
                          <Card key={method.title} className="overflow-hidden">
                            <CardContent className="p-6">
                              <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                  <method.icon className="h-6 w-6 text-emerald-600" />
                                </div>
                                <div>
                                  <h3 className="font-bold text-lg">{method.title}</h3>
                                  <p className="text-emerald-600 font-medium text-sm mb-2">{method.pointsRange}</p>
                                  <p className="text-gray-600 text-sm mb-4">{method.description}</p>

                                  <div className="bg-gray-50 p-3 rounded-md">
                                    <p className="font-medium text-sm mb-2">Examples:</p>
                                    <div className="space-y-1">
                                      {method.examples.map((example, i) => (
                                        <div key={i} className="flex justify-between text-sm">
                                          <span className="text-gray-600">{example.item}</span>
                                          <span className="font-medium">{example.points} points</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <div className="max-w-3xl mx-auto mt-12 bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="font-bold text-lg mb-4 text-center">Points Calculation</h3>
                        <p className="text-gray-600 text-center mb-6">
                          Points are calculated based on the type, weight, and condition of the electronics you recycle.
                          Here's a simplified breakdown:
                        </p>

                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="border px-4 py-2 text-left">Device Category</th>
                                <th className="border px-4 py-2 text-left">Points Range</th>
                                <th className="border px-4 py-2 text-left">Calculation Method</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border px-4 py-2">
                                  Small Electronics
                                  <br />
                                  <span className="text-xs text-gray-500">(phones, tablets, etc.)</span>
                                </td>
                                <td className="border px-4 py-2">30-100 points</td>
                                <td className="border px-4 py-2">Per device</td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2">
                                  Medium Electronics
                                  <br />
                                  <span className="text-xs text-gray-500">(laptops, monitors, etc.)</span>
                                </td>
                                <td className="border px-4 py-2">100-200 points</td>
                                <td className="border px-4 py-2">Per device</td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2">
                                  Large Electronics
                                  <br />
                                  <span className="text-xs text-gray-500">(TVs, appliances, etc.)</span>
                                </td>
                                <td className="border px-4 py-2">200-500 points</td>
                                <td className="border px-4 py-2">Per device</td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2">Batteries</td>
                                <td className="border px-4 py-2">5-20 points</td>
                                <td className="border px-4 py-2">Per pound</td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2">
                                  Accessories
                                  <br />
                                  <span className="text-xs text-gray-500">(cables, chargers, etc.)</span>
                                </td>
                                <td className="border px-4 py-2">5-15 points</td>
                                <td className="border px-4 py-2">Per pound</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <p className="text-sm text-gray-500 mt-4 text-center">
                          Note: Bonus points may be awarded for devices in working condition that can be refurbished.
                        </p>
                      </div>
                    </div>
                  </section>
                </TabsContent>

                {/* Success Stories Section */}
                <TabsContent value="stories">
                  <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                      <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Success Stories</h2>
                        <p className="text-gray-600">
                          Hear from our users who have made a positive impact on the environment while earning great
                          rewards.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {successStories.map((story) => (
                          <Card key={story.name} className="overflow-hidden">
                            <CardContent className="p-6">
                              <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                                  <img
                                    src={story.image || "/placeholder.svg"}
                                    alt={story.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <h3 className="font-bold text-lg mb-1">{story.name}</h3>
                                <div className="flex gap-2 mb-4">
                                  <Badge className="bg-emerald-100 text-emerald-800">
                                    {story.pointsEarned} points earned
                                  </Badge>
                                  <Badge className="bg-purple-100 text-purple-800">
                                    {story.rewardsRedeemed} rewards
                                  </Badge>
                                </div>
                                <p className="text-gray-600 text-sm italic">"{story.story}"</p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <div className="max-w-3xl mx-auto mt-12 bg-white p-6 rounded-lg shadow-sm text-center">
                        <h3 className="font-bold text-lg mb-4">Share Your Story</h3>
                        <p className="text-gray-600 mb-6">
                          Have you had a positive experience with our rewards program? We'd love to hear about it and
                          potentially feature your story!
                        </p>
                        <Button className="bg-emerald-500 hover:bg-emerald-600">Submit Your Story</Button>
                      </div>
                    </div>
                  </section>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg mb-2">How do I start earning points?</h3>
                  <p className="text-gray-600">
                    To start earning points, simply create an account and bring your e-waste to any of our collection
                    points. You'll receive points based on the type and quantity of electronics you recycle.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg mb-2">How long do points last before they expire?</h3>
                  <p className="text-gray-600">
                    Points are valid for 12 months from the date they are earned. We'll send you reminders when your
                    points are approaching expiration so you can redeem them for rewards.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg mb-2">Can I transfer my points to someone else?</h3>
                  <p className="text-gray-600">
                    Yes, you can transfer points to family members or friends who are also registered users. Simply go
                    to your account dashboard and select the "Transfer Points" option.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg mb-2">How do I redeem my rewards?</h3>
                  <p className="text-gray-600">
                    You can redeem rewards through your account dashboard. Select the reward you want, confirm the
                    redemption, and follow the instructions provided. Digital rewards are delivered instantly, while
                    physical items may take 7-10 business days to arrive.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg mb-2">What happens if a reward is out of stock?</h3>
                  <p className="text-gray-600">
                    Popular rewards may occasionally be out of stock. You can choose to be notified when the item
                    becomes available again, or select a different reward.
                  </p>
                </div>
              </div>

              <div className="text-center mt-8">
                <Button variant="outline" className="text-emerald-600 border-emerald-600">
                  View All FAQs
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-emerald-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Earning Rewards?</h2>
              <p className="text-lg text-emerald-100 mb-8">
                Join thousands of environmentally conscious individuals who are making a difference while earning great
                rewards.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {!isAuthenticated ? (
                  <Button className="bg-white text-emerald-700 hover:bg-emerald-50" asChild>
                    <a href="/login">Sign Up Now</a>
                  </Button>
                ) : (
                  <Button className="bg-white text-emerald-700 hover:bg-emerald-50" asChild>
                    <a href="/dashboard/collection-points">Find Collection Points</a>
                  </Button>
                )}
                <Button variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <a href="/collection-points">Find Collection Points</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <NewsletterSignup />
      </main>

      {/* Reward Detail Dialog */}
      <Dialog open={isRewardDetailOpen} onOpenChange={setIsRewardDetailOpen}>
      <DialogContent className="max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden overflow-y-auto max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Reward Details</DialogTitle>
            <DialogDescription>Learn more about this reward and how to redeem it</DialogDescription>
          </DialogHeader>
          {selectedReward && (
            <RewardDetail
              reward={selectedReward}
              onRedeem={() => handleRedeemReward(selectedReward)}
              userPoints={userPoints}
              isRedeeming={isAssigning}
              isAuthenticated={isAuthenticated}
            />
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}

