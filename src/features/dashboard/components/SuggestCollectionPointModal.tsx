"use client"

import type React from "react"
import { useState } from "react"
import { MapPin, X, Clock, Info, Phone, Image, Tag } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { useCreateCollectionPointMutation } from "@/shared/services/collectionApi"
import { useToast } from "@/shared/components/ui/use-toast"
import dynamic from "next/dynamic"


const Map = dynamic(() => import("@/shared/components/Map"), { ssr: false })

const deviceTypes = [
  { id: "electronics", label: "Electronics" },
  { id: "batteries", label: "Batteries" },
  { id: "lightBulbs", label: "Light Bulbs" },
  { id: "appliances", label: "Appliances" },
  { id: "inkCartridges", label: "Ink Cartridges" },
  { id: "cables", label: "Cables & Wires" },
  { id: "phones", label: "Mobile Phones" },
  { id: "computers", label: "Computers" },
]

export default function SuggestCollectionPointModal({ open, onOpenChange }: SuggestCollectionPointModalProps) {
  const [formData, setFormData] = useState({
    contact: "",
    nom: "",
    adresse: "",
    acceptedTypes: [] as string[],
    coordinates: {
      lat: 0.0,
      lng: 0.0,
    },
    status: "",
    hours: "",
    description: "",
    phone: "",
    email: "",
    image: "",
  })

  const [createCollectionPoint, { isLoading }] = useCreateCollectionPointMutation()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }))
  }

  const handleDeviceTypeChange = (id: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      acceptedTypes: checked ? [...prev.acceptedTypes, id] : prev.acceptedTypes.filter((type) => type !== id),
    }))
  }

  const handleMapClick = (lat: number, lng: number) => {
    setFormData((prev) => ({
      ...prev,
      coordinates: { lat, lng },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await createCollectionPoint(formData).unwrap()

      toast({
        title: "Collection point suggested",
        description: "Thank you for your suggestion. It will be reviewed by our team.",
      })

      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error submitting suggestion",
        description: "There was a problem submitting your suggestion. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] bg-white overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-emerald-500" />
            Suggest a Collection Point
          </DialogTitle>
          <DialogDescription>
            Help us expand our network by suggesting a new e-waste collection point.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700 flex items-center">
              <Info className="h-4 w-4 mr-2 text-emerald-500" />
              Basic Information
            </h3>

            <div className="space-y-2">
              <Label htmlFor="nom">Collection Point Name *</Label>
              <Input
                id="nom"
                name="nom"
                placeholder="E.g., City Recycling Center"
                required
                value={formData.nom}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adresse">Address *</Label>
              <Input
                id="adresse"
                name="adresse"
                placeholder="Full address including city and zip code"
                required
                value={formData.adresse}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact Person/Organization *</Label>
              <Input
                id="contact"
                name="contact"
                placeholder="Name of person or organization managing this point"
                required
                value={formData.contact}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700 flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-emerald-500" />
              Location Coordinates
            </h3>

            <div className="h-64 rounded-lg overflow-hidden">
              <Map
                initialCenter={{ lat: 40.712776, lng: -74.005974 }} 
                onClick={handleMapClick}
                markerPosition={
                  formData.coordinates.lat && formData.coordinates.lng
                    ? { lat: formData.coordinates.lat, lng: formData.coordinates.lng }
                    : undefined
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lat">Latitude</Label>
                <Input
                  id="lat"
                  name="lat"
                  type="number"
                  placeholder="Latitude"
                  value={formData.coordinates.lat}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      coordinates: { ...prev.coordinates, lat: parseFloat(e.target.value) },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lng">Longitude</Label>
                <Input
                  id="lng"
                  name="lng"
                  type="number"
                  placeholder="Longitude"
                  value={formData.coordinates.lng}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      coordinates: { ...prev.coordinates, lng: parseFloat(e.target.value) },
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700 flex items-center">
              <Clock className="h-4 w-4 mr-2 text-emerald-500" />
              Operating Details
            </h3>

            <div className="space-y-2">
              <Label htmlFor="hours">Operating Hours</Label>
              <Input
                id="hours"
                name="hours"
                placeholder="E.g., Mon-Fri: 9AM-5PM, Sat: 10AM-3PM"
                value={formData.hours}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700 flex items-center">
              <Tag className="h-4 w-4 mr-2 text-emerald-500" />
              Accepted E-Waste Types
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {deviceTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={type.id}
                    checked={formData.acceptedTypes.includes(type.id)}
                    onCheckedChange={(checked) => handleDeviceTypeChange(type.id, checked as boolean)}
                  />
                  <Label htmlFor={type.id} className="text-sm cursor-pointer">
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700 flex items-center">
              <Phone className="h-4 w-4 mr-2 text-emerald-500" />
              Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Contact phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Contact email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700 flex items-center">
              <Image className="h-4 w-4 mr-2 text-emerald-500" />
              Additional Details
            </h3>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide any additional details about this collection point"
                rows={3}
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL (optional)</Label>
              <Input
                id="image"
                name="image"
                placeholder="URL to an image of this collection point"
                value={formData.image || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Submitting...
                </>
              ) : (
                "Submit Collection Point"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}