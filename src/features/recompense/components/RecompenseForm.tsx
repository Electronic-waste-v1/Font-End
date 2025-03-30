"use client"

import type React from "react"

import { useState } from "react"
import { useCreateRecompenseMutation, useUpdateRecompenseMutation } from "@/shared/services/recompenseApi"
import type { Recompense } from "@/shared/types/recompenseTypes"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Label } from "@/shared/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { useToast } from "@/shared/components/ui/use-toast"

interface RecompenseFormProps {
  recompense?: Recompense
  onSuccess?: () => void
}

export default function RecompenseForm({ recompense, onSuccess }: RecompenseFormProps) {
  const [createRecompense, { isLoading: isCreating }] = useCreateRecompenseMutation()
  const [updateRecompense, { isLoading: isUpdating }] = useUpdateRecompenseMutation()
  const { toast } = useToast()

  const [formData, setFormData] = useState<Partial<Recompense>>(
    recompense || {
      description: "",
      pointsRequis: 0,
      category: "",
      merchant: "",
      expiryDays: null,
      image: "/placeholder.svg?height=100&width=100&text=Reward",
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "pointsRequis" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (recompense?.id) {
       
        await updateRecompense({
          id: recompense.id,
          recompense: formData as Recompense,
        }).unwrap()
        toast({
          title: "Reward updated",
          description: "The reward has been updated successfully.",
        })
      } else {
     
        await createRecompense(formData as Recompense).unwrap()
        toast({
          title: "Reward created",
          description: "The new reward has been created successfully.",
        })
      
        setFormData({
          description: "",
          pointsRequis: 0,
          category: "",
          merchant: "",
          expiryDays: null,
          image: "/placeholder.svg?height=100&width=100&text=Reward",
        })
      }

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your request.",
        variant: "destructive",
      })
      console.error("Error submitting form:", error)
    }
  }

  const isLoading = isCreating || isUpdating

  return (
    <Card>
      <CardHeader>
        <CardTitle>{recompense?.id ? "Edit Reward" : "Create New Reward"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Enter reward description"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pointsRequis">Points Required</Label>
            <Input
              id="pointsRequis"
              name="pointsRequis"
              type="number"
              value={formData.pointsRequis || ""}
              onChange={handleChange}
              placeholder="Enter points required"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category || ""} onValueChange={(value) => handleSelectChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Discount">Discount</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Experience">Experience</SelectItem>
                <SelectItem value="Voucher">Voucher</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="merchant">Merchant</Label>
            <Input
              id="merchant"
              name="merchant"
              value={formData.merchant || ""}
              onChange={handleChange}
              placeholder="Enter merchant name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiryDays">Expiry Days (leave empty for no expiry)</Label>
            <Input
              id="expiryDays"
              name="expiryDays"
              type="number"
              value={formData.expiryDays === null ? "" : formData.expiryDays}
              onChange={(e) => {
                const value = e.target.value === "" ? null : Number.parseInt(e.target.value)
                setFormData((prev) => ({
                  ...prev,
                  expiryDays: value,
                }))
              }}
              placeholder="Enter expiry days"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={formData.image || ""}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => onSuccess?.()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : recompense?.id ? "Update Reward" : "Create Reward"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

