import { Clock, MapPin, Phone, Mail, Info, ThumbsUp, MessageSquare, Star } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/components/ui/tabs"
import type { CollectionPointResponse } from "@/shared/types/collectionPointTypes"

interface CollectionPointDetailProps {
  point: CollectionPointResponse
}

export default function CollectionPointDetail({ point }: CollectionPointDetailProps) {
  return (
    <div className="space-y-6 bg-white">
      {/* Header with image */}
      <div className="relative h-48 rounded-lg overflow-hidden bg-gray-100">
        {point.image ? (
          <img src={point.image || "/placeholder.svg"} alt={point.nom} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-emerald-50">
            <MapPin className="h-16 w-16 text-emerald-300" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h2 className="text-white text-xl font-bold">{point.nom}</h2>
          <p className="text-white/80 text-sm">{point.adresse}</p>
        </div>
      </div>

      {/* Status and rating */}
      <div className="flex justify-between items-center">
        <Badge variant={point.status === "Open" ? "success" : "destructive"} className="px-3 py-1">
          {point.status}
        </Badge>
        {point.rating && (
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(point.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-.118L2.98 8.72c-.783-.57-.38-1.81.588-.181h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-600 font-medium">{point.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Contact information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700 flex items-center">
            <Info className="h-4 w-4 mr-2 text-emerald-500" />
            Contact Information
          </h3>
          <div className="space-y-1 text-sm">
            <p className="flex items-center text-gray-600">
              <span className="font-medium w-24">Contact:</span> {point.contact}
            </p>
            {point.phone && (
              <p className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                {point.phone}
              </p>
            )}
            {point.email && (
              <p className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                {point.email}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-gray-700 flex items-center">
            <Clock className="h-4 w-4 mr-2 text-emerald-500" />
            Hours of Operation
          </h3>
          <p className="text-sm text-gray-600">{point.hours || "Hours not specified"}</p>
        </div>
      </div>

      {/* Description */}
      {point.description && (
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700">Description</h3>
          <p className="text-sm text-gray-600">{point.description}</p>
        </div>
      )}

      {/* Accepted items */}
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">Accepted Items</h3>
        <div className="flex flex-wrap gap-2">
          {point.acceptedTypes.map((item, index) => (
            <Badge key={index} variant="outline" className="bg-emerald-50">
              {item}
            </Badge>
          ))}
        </div>
      </div>

      {/* Last visited */}
      {point.lastVisited && <div className="text-sm text-gray-500 italic">Last visited: {point.lastVisited}</div>}

      <Tabs defaultValue="reviews">
        <TabsList className="w-full">
          <TabsTrigger value="reviews" className="flex-1">
            Reviews
          </TabsTrigger>
          <TabsTrigger value="photos" className="flex-1">
            Photos
          </TabsTrigger>
          <TabsTrigger value="events" className="flex-1">
            Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="pt-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Reviews (42)</h4>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Write a Review
              </Button>
            </div>

            {/* Sample reviews */}
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="border-b pb-4">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                        {i === 1 ? "JD" : "SM"}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium">{i === 1 ? "John Doe" : "Sarah Miller"}</div>
                        <div className="text-sm text-gray-500">{i === 1 ? "2 weeks ago" : "1 month ago"}</div>
                      </div>
                    </div>
                    <div className="flex">
                      {Array(5)
                        .fill(0)
                        .map((_, j) => (
                          <Star
                            key={j}
                            className={`h-4 w-4 ${j < (i === 1 ? 5 : 4) ? "text-amber-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">
                    {i === 1
                      ? "Great recycling center! The staff was very helpful and the process was quick and easy. They accept a wide variety of electronics and other items."
                      : "Convenient location and good hours. Sometimes it gets busy on weekends, but overall a good experience. They could use more parking spaces."}
                  </p>
                  <div className="flex gap-4 mt-2">
                    <button className="text-sm text-gray-500 flex items-center">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      Helpful (3)
                    </button>
                    <button className="text-sm text-gray-500">Reply</button>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="link" className="text-emerald-600">
              View all 42 reviews
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="photos" className="pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={`/placeholder.svg?height=200&width=200&text=Photo ${i}`}
                  alt={`Collection point photo ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="pt-4">
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">E-Waste Collection Drive</h4>
                  <p className="text-sm text-gray-500 mt-1">Saturday, April 15, 2025 • 9:00 AM - 2:00 PM</p>
                </div>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  Upcoming
                </Badge>
              </div>
              <p className="mt-2 text-gray-600">
                Join us for a special e-waste collection event. Bring your old electronics and get bonus recycling
                points. We'll have experts on site to answer your questions about e-waste recycling.
              </p>
              <div className="mt-3">
                <Button size="sm">Register</Button>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Recycling Workshop</h4>
                  <p className="text-sm text-gray-500 mt-1">Tuesday, May 5, 2025 • 6:00 PM - 7:30 PM</p>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Registration Open
                </Badge>
              </div>
              <p className="mt-2 text-gray-600">
                Learn about proper recycling techniques and how to prepare your e-waste for optimal recycling. This
                workshop is perfect for beginners and those looking to improve their recycling habits.
              </p>
              <div className="mt-3">
                <Button size="sm">Register</Button>
              </div>
            </div>

            <Button variant="link" className="text-emerald-600">
              View all events
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

