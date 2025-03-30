"use client"

import { useState, useEffect, useMemo } from "react"
import { Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Badge } from "@/shared/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Progress } from "@/shared/components/ui/progress"

import { useGetRecompensesQuery, useAssignRecompenseMutation } from "@/shared/services/recompenseApi"
import { useGetUserPointsQuery } from "@/features/auth/services/authApi"
import { toast } from "@/shared/components/ui/use-toast"
import { Skeleton } from "@/shared/components/ui/skeleton"

import { useAppSelector } from "@/app/hooks"


interface AvailableRewardsProps {
  onRedeemReward: (reward: any) => void
}

export default function AvailableRewards({ onRedeemReward }: AvailableRewardsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortOption, setSortOption] = useState("points-low")

  const { user } = useAppSelector((state) => state.auth)
   const currentUser= user
  const { data: userPoints, isLoading: isLoadingPoints } = useGetUserPointsQuery(currentUser?.id || 0, {
    skip: !currentUser?.id,
  })
  console.log(userPoints);
  

  const availablePoints = userPoints ? userPoints.pointsTotal - userPoints.pointsUtilises : 0

  const { data: recompenses, isLoading, error } = useGetRecompensesQuery()
  const [assignRecompense, { isLoading: isAssigning }] = useAssignRecompenseMutation()

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load rewards. Please try again later.",
        variant: "destructive",
      })
    }
  }, [error])

 
  const filteredRewards = useMemo(() => {
    if (!recompenses) return []

    return recompenses
      .filter((reward) => {
      
        if (searchTerm && !reward.description.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false
        }


        if (categoryFilter !== "all") {
        
        }

        return true
      })
      .sort((a, b) => {
    
        if (sortOption === "points-low") {
          return a.pointsRequis - b.pointsRequis
        } else if (sortOption === "points-high") {
          return b.pointsRequis - a.pointsRequis
        }
        return 0
      })
  }, [recompenses, searchTerm, categoryFilter, sortOption])


  const handleRedeemReward = async (reward: any) => {
    try {
      if (!userPoints || availablePoints < reward.pointsRequis) {
        toast({
          title: "Not enough points",
          description: `You need ${reward.pointsRequis - availablePoints} more points to redeem this reward.`,
          variant: "destructive",
        })
        return
      }

      await assignRecompense({
        recompenseId: reward.id,
        userId: currentUser?.id,
      }).unwrap()

    
      toast({
        title: "Success!",
        description: `You have successfully redeemed ${reward.description}`,
      })

    
      onRedeemReward(reward)
    } catch (err) {
      toast({
        title: "Redemption failed",
        description: "There was an error redeeming your reward. Please try again.",
        variant: "destructive",
      })
    }
  }


  const uniqueCategories = ["all"]

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg font-semibold">Available Rewards</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search rewards..."
                className="pl-9 h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px] h-9">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map(
                  (category) =>
                    category !== "all" && (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ),
                )}
              </SelectContent>
            </Select>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[150px] h-9">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="points-low">Points: Low to High</SelectItem>
                <SelectItem value="points-high">Points: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading || isLoadingPoints ? (
    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border rounded-lg overflow-hidden p-4">
                <div className="flex items-start gap-4">
                  <Skeleton className="w-16 h-16 rounded-md" />
                  <div className="flex-1">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-9 w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredRewards.length === 0 ? (
          <div className="col-span-3 text-center py-10">
            <p className="text-gray-500">No rewards found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRewards.map((reward) => (
             <div key={reward.id} className="border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
             <div className="p-5">
               <div className="flex flex-col gap-3">
                
                 <div className="flex justify-between items-start">
                   <div>
                     <h3 className="font-semibold text-lg text-gray-900">{reward.description}</h3>
                     <Badge variant="outline" className="mt-1 bg-blue-50 text-blue-600 border-blue-100">
                       Reward
                     </Badge>
                   </div>
                   <span className="font-bold text-blue-600 text-xl">{reward.pointsRequis} pts</span>
                 </div>
           
                 {/* Reward description */}
                 <p className="text-gray-600 text-sm">{reward.description}</p>
           
                 {/* Points and action section */}
                 <div className="mt-4 pt-3 border-t border-gray-100">
                   <div className="flex justify-between items-center">
                     <div className="flex-1">
                       {availablePoints < reward.pointsRequis && (
                         <div className="space-y-1">
                           <div className="flex items-center justify-between text-xs">
                             <span className="text-gray-500">
                               Your points: {availablePoints}/{reward.pointsRequis}
                             </span>
                             <span className="font-medium">
                               {Math.round((availablePoints / reward.pointsRequis) * 100)}%
                             </span>
                           </div>
                           <Progress 
                             value={(availablePoints / reward.pointsRequis) * 100} 
                             className="h-2 bg-gray-100"
                           />
                         </div>
                       )}
                     </div>
                     
                     <Button
                       variant={availablePoints >= reward.pointsRequis ? "default" : "outline"}
                       size="sm"
                       className="ml-4 min-w-[100px]"
                       disabled={availablePoints < reward.pointsRequis || isAssigning}
                       onClick={() => handleRedeemReward(reward)}
                     >
                       {isAssigning
                         ? "Processing..."
                         : availablePoints >= reward.pointsRequis
                           ? "Redeem Now"
                           : "Need More Points"}
                     </Button>
                   </div>
                 </div>
               </div>
             </div>
           </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

