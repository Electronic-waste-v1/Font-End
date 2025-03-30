"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { useAssignRecompenseMutation } from "@/shared/services/recompenseApi"
import { useGetUserPointsQuery, useUpdateUserPointsMutation } from "@/features/auth/services/authApi"
import { toast } from "@/shared/components/ui/use-toast"

import { useAppSelector } from "@/app/hooks"

interface RedeemConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  reward: any
}

export default function RedeemConfirmationModal({ isOpen, onClose, reward }: RedeemConfirmationModalProps) {
  const [isRedeeming, setIsRedeeming] = useState(false)
   const { user } = useAppSelector((state) => state.auth)
    const currentUser= user
  const { data: userPoints } = useGetUserPointsQuery(currentUser?.id || 0, {
    skip: !currentUser?.id,
  })

  const [assignRecompense] = useAssignRecompenseMutation()
  const [updateUserPoints] = useUpdateUserPointsMutation()


  const availablePoints = userPoints ? userPoints.pointsTotal - userPoints.pointsUtilises : 0
  const pointsAfterRedemption = availablePoints - (reward?.pointsRequis || 0)

  const handleConfirmRedeem = async () => {
    try {
      if (!userPoints || availablePoints < reward.pointsRequis) {
        toast({
          title: "Not enough points",
          description: "You don't have enough points to redeem this reward.",
          variant: "destructive",
        })
        return
      }

      setIsRedeeming(true)

      
      await assignRecompense({
        recompenseId: reward.id,
        userId: currentUser?.id,
      }).unwrap()

      
      await updateUserPoints({
        userId: currentUser?.id || 0,
        pointsUtilises: userPoints.pointsUtilises + reward.pointsRequis,
      }).unwrap()

      toast({
        title: "Reward Redeemed!",
        description: `You have successfully redeemed ${reward.description}`,
      })

      setIsRedeeming(false)
      onClose()
    } catch (error) {
      toast({
        title: "Redemption Failed",
        description: "There was an error processing your redemption. Please try again.",
        variant: "destructive",
      })
      setIsRedeeming(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Redemption</DialogTitle>
          <DialogDescription>You are about to redeem the following reward using your points.</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
              <img
                src={`/placeholder.svg?height=100&width=100&text=${reward?.pointsRequis}`}
                alt={reward?.description}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{reward?.description}</h3>
              <p className="text-sm text-emerald-600 font-semibold">{reward?.pointsRequis} points</p>
            </div>
          </div>

          <div className="border-t border-b py-4 my-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Your available points:</span>
              <span className="font-medium">{availablePoints} points</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Cost of reward:</span>
              <span className="font-medium">-{reward?.pointsRequis} points</span>
            </div>
            <div className="flex justify-between text-sm font-medium pt-2 border-t mt-2">
              <span>Points remaining:</span>
              <span>{pointsAfterRedemption} points</span>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-md text-sm">
            <p className="font-medium text-gray-700">Redemption Details:</p>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>• This will deduct {reward?.pointsRequis} points from your account</li>
              <li>• Redemption cannot be reversed once confirmed</li>
              <li>• You will receive confirmation details via email</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="flex flex-row gap-2 sm:justify-end">
          <Button variant="outline" onClick={onClose} disabled={isRedeeming}>
            Cancel
          </Button>
          <Button onClick={handleConfirmRedeem} disabled={isRedeeming}>
            {isRedeeming ? "Processing..." : "Confirm Redemption"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

