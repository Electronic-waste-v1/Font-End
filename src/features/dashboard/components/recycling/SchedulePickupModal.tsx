"use client"

import { useState } from "react"
import { Calendar, Clock, Package } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Textarea } from "@/shared/components/ui/textarea"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { EcoAlert } from "@/shared/components/eco-alert"

interface SchedulePickupModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SchedulePickupModal({ isOpen, onClose }: SchedulePickupModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    date: "",
    timeSlot: "",
    address: "",
    items: "",
    specialInstructions: "",
    termsAccepted: false,
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = () => {
    
    console.log("Submitting pickup request:", formData)

   
    setFormData({
      date: "",
      timeSlot: "",
      address: "",
      items: "",
      specialInstructions: "",
      termsAccepted: false,
    })
    setStep(1)
    onClose()
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Schedule E-Waste Pickup</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="date">Pickup Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  id="date"
                  type="date"
                  className="pl-10"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeSlot">Preferred Time Slot</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Select value={formData.timeSlot} onValueChange={(value) => handleChange("timeSlot", value)}>
                  <SelectTrigger id="timeSlot" className="pl-10">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12:00 PM - 3:00 PM)</SelectItem>
                    <SelectItem value="evening">Evening (3:00 PM - 6:00 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Pickup Address</Label>
              <Textarea
                id="address"
                placeholder="Enter your full address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>

            <EcoAlert
              type="info"
              title="Pickup Service Information"
              description="Our pickup service is available within city limits. There is no charge for pickups of items weighing more than 10kg in total."
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="items">Items for Pickup</Label>
              <div className="relative">
                <Package className="absolute left-3 top-3 text-gray-500 h-4 w-4" />
                <Textarea
                  id="items"
                  placeholder="List the items you want to recycle (e.g., 1 laptop, 2 smartphones, etc.)"
                  className="pl-10 min-h-[100px]"
                  value={formData.items}
                  onChange={(e) => handleChange("items", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
              <Textarea
                id="specialInstructions"
                placeholder="Any special instructions for the pickup team"
                value={formData.specialInstructions}
                onChange={(e) => handleChange("specialInstructions", e.target.value)}
              />
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="terms"
                checked={formData.termsAccepted}
                onCheckedChange={(checked) => handleChange("termsAccepted", checked as boolean)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="terms" className="text-sm font-normal leading-snug text-gray-600">
                  I confirm that all items are prepared for recycling (data backed up, factory reset performed,
                  batteries removed where applicable).
                </Label>
              </div>
            </div>

            <EcoAlert
              type="warning"
              title="Important"
              description="Please ensure all personal data is backed up and devices are factory reset before recycling. We are not responsible for data loss."
            />
          </div>
        )}

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {step === 1 ? (
            <>
              <Button variant="outline" onClick={onClose} className="sm:order-1">
                Cancel
              </Button>
              <Button
                onClick={nextStep}
                className="sm:order-2"
                disabled={!formData.date || !formData.timeSlot || !formData.address}
              >
                Next Step
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={prevStep} className="sm:order-1">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="sm:order-2"
                disabled={!formData.items || !formData.termsAccepted}
              >
                Schedule Pickup
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

