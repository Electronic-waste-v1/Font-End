import { ChevronLeft, ChevronRight, ExternalLink, MapPin, Navigation } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Skeleton } from "@/shared/components/ui/skeleton"

interface CollectionPointResponse {
  id: number
  name: string
  address: string
  isOpen: boolean
  distance?: number
  contact?: string
  acceptedTypes?: string[]
  coordinates?: { lat: number; lng: number }
  status?: string
  hours?: string
  description?: string
  phone?: string
  email?: string
  image?: string
  rating?: number | null
  lastVisited?: string | null
}

interface NearbyLocationsProps {
  collectionPoints?: CollectionPointResponse[]
  isLoading: boolean
  error: any
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

export default function NearbyLocations({
  collectionPoints,
  isLoading,
  error,
  totalPages,
  currentPage,
  onPageChange,
}: NearbyLocationsProps) {
  if (isLoading) {
    return (
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-8 w-24" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-3 border border-gray-100 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="flex justify-between items-center mt-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-7 w-20" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Nearby Collection Points</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800 text-sm">Failed to load collection points.</p>
            <Button variant="outline" size="sm" className="mt-2 text-xs" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Nearby Collection Points</CardTitle>
          <Button variant="outline" size="sm" className="h-8 px-2">
            <MapPin className="mr-1 h-4 w-4" />
            View Map
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {collectionPoints && collectionPoints.length > 0 ? (
          <>
            <div className="space-y-3">
              {collectionPoints.map((location) => {
     
                const isOpen = location.status === "Open"
                const name = location.nom || location.name || "Unnamed Location"
                const address = location.adresse || location.address || "Address not available"
                
                return (
                  <div key={location.id} className="p-3 border border-gray-100 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{name}</p>
                        <p className="text-sm text-gray-500">{address}</p>
                      </div>
                      <div
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {isOpen ? "Open" : "Closed"}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center text-sm text-gray-500">
                        <Navigation className="mr-1 h-4 w-4" />
                        {location.distance ? `${location.distance} km away` : "Distance unavailable"}
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Directions
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-4 space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-500">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
                  disabled={currentPage === totalPages - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No collection points found nearby.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}