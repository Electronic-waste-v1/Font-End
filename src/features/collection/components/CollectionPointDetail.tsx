import {
    Clock,
    MapPin,
    Star,
    Phone,
    Globe,
    Navigation,
    ThumbsUp,
    MessageSquare,
    Mail,
    ExternalLink,
  } from "lucide-react"
  import { Button } from "@/shared/components/ui/button"
  import { Badge } from "@/shared/components/ui/badge"
  import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/components/ui/tabs"
  import { EcoBadge } from "@/shared/components/eco-badge"
  
  interface CollectionPoint {
    id: string
    name: string
    address: string
    distance: string
    status: string
    hours: string
    acceptedItems: string[]
    rating: number
    lastVisited?: string
    description?: string
    coordinates: { lat: number; lng: number }
    phone?: string
    email?: string
    image?: string
  }
  
  interface CollectionPointDetailProps {
    point: CollectionPoint
  }
  
  export default function CollectionPointDetail({ point }: CollectionPointDetailProps) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column - Basic info */}
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold">{point.name}</h3>
                <p className="text-gray-500 flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {point.address}
                </p>
              </div>
              <EcoBadge type={point.status === "Open" ? "success" : "error"}>{point.status}</EcoBadge>
            </div>
  
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-amber-400 fill-current" />
                <span className="ml-1 font-medium">{point.rating}</span>
                <span className="text-gray-500 text-sm ml-1">(42 reviews)</span>
              </div>
              <div className="text-sm text-gray-500">•</div>
              <div className="text-sm text-gray-500 flex items-center">
                <Navigation className="h-3 w-3 mr-1" />
                {point.distance} away
              </div>
            </div>
  
            {point.description && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">{point.description}</p>
              </div>
            )}
  
            <div className="flex flex-wrap gap-2 mt-4">
              {point.acceptedItems.map((item, i) => (
                <Badge key={i} variant="outline" className="bg-gray-50">
                  {item}
                </Badge>
              ))}
            </div>
  
            <div className="border-t border-gray-100 pt-4">
              <h4 className="font-medium flex items-center mb-2">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                Operating Hours
              </h4>
              <p className="text-gray-600">{point.hours}</p>
            </div>
  
            <div className="border-t border-gray-100 pt-4">
              <h4 className="font-medium flex items-center mb-2">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                Contact Information
              </h4>
              {point.phone && <p className="text-gray-600">{point.phone}</p>}
              {point.email && <p className="text-gray-600">{point.email}</p>}
              <p className="text-emerald-600 hover:underline cursor-pointer flex items-center mt-1">
                <Globe className="h-4 w-4 mr-1" />
                Visit website
              </p>
            </div>
          </div>
  
          {/* Right column - Map and actions */}
          <div className="md:w-1/3 space-y-4">
            {point.image && (
              <img
                src={point.image || "/placeholder.svg"}
                alt={point.name}
                className="w-full h-40 object-cover rounded-lg"
              />
            )}
  
            <div className="bg-gray-100 rounded-lg h-48 relative overflow-hidden">
              {/* Placeholder for a small map */}
              <div className="absolute inset-0 bg-[#e8f4f8]">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #d1e6ed 1px, transparent 1px), linear-gradient(to bottom, #d1e6ed 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                ></div>
  
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <MapPin size={32} className="text-emerald-500" fill="#10b981" />
                </div>
              </div>
  
              <div className="absolute bottom-2 right-2 bg-white rounded-md shadow-md p-1">
                <Button variant="ghost" size="sm" className="h-7 px-2">
                  <Navigation className="h-3 w-3 mr-1" />
                  Directions
                </Button>
              </div>
            </div>
  
            <div className="space-y-2">
              <Button className="w-full">
                <Navigation className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
  
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </div>
            </div>
          </div>
        </div>
  
        <Tabs defaultValue="information">
          <TabsList className="w-full">
            <TabsTrigger value="information" className="flex-1">
              Information
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex-1">
              Photos
            </TabsTrigger>
          </TabsList>
  
          <TabsContent value="information" className="pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Services Offered</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="h-5 w-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3 w-3 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      Data wiping services
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-5 w-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3 w-3 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      Free recycling
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-5 w-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3 w-3 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      Certificate of recycling available
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-5 w-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3 w-3 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      Pickup service available for large items
                    </li>
                  </ul>
                </div>
  
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Additional Information</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Parking Available:</span>
                      <span>Yes</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Accessibility:</span>
                      <span>Wheelchair accessible</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Last Updated:</span>
                      <span>1 week ago</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Report Issues:</span>
                      <Button variant="link" className="h-auto p-0 text-sm">
                        Report a problem
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
  
              <div className="bg-emerald-50 p-4 rounded-lg">
                <h4 className="font-medium text-emerald-800 mb-2">Recycling Guidelines</h4>
                <p className="text-emerald-700 text-sm">
                  Please ensure all devices are wiped of personal data before recycling. Remove batteries from devices
                  when possible. Large appliances may require scheduling a pickup or special handling - please call ahead.
                </p>
                <Button variant="link" className="text-emerald-700 p-0 h-auto text-sm mt-2">
                  View complete guidelines <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </TabsContent>
  
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
                        ? "Excellent recycling center! The staff was very helpful and the process was quick and easy. They accept a wide variety of electronics and other items."
                        : "Convenient location with good operating hours. Sometimes it gets busy on weekends, but overall a good experience. They could use more parking spaces."}
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
        </Tabs>
      </div>
    )
  }
  
  