"use client"

import { useState, useEffect } from "react"
import { MapPin, Filter, List, MapIcon, Info, Navigation, Clock } from "lucide-react"
import Header from "@/shared/layout/Header"
import Footer from "@/shared/layout/Footer"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Badge } from "@/shared/components/ui/badge"
import { Card, CardContent } from "@/shared/components/ui/card"
import { EcoBadge } from "@/shared/components/eco-badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import CollectionPointMap from "../components/CollectionPointMap"
import CollectionPointDetail from "../components/CollectionPointDetail"
import {
  useGetAllCollectionPointsQuery,
  useSearchCollectionPointsByLocationQuery,
  useFilterCollectionPointsByDeviceTypeQuery,
} from "@/shared/services/collectionApi"

import { useToast } from "@/shared/components/ui/use-toast"
import { Skeleton } from "@/shared/components/ui/skeleton"

export default function CollectionPointsPage() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map")
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [acceptedItemFilter, setAcceptedItemFilter] = useState<string>("all")
  const [page, setPage] = useState(0)
  const [pageSize] = useState(6)
  const { toast } = useToast()


  const {
    data: response,
    isLoading,
    error,
  } = useGetAllCollectionPointsQuery({
    page,
    pageSize,
  })

  const { data: searchResults = [] } = useSearchCollectionPointsByLocationQuery(searchTerm, {
    skip: !searchTerm,
  })

  const { data: filteredByDeviceType = [] } = useFilterCollectionPointsByDeviceTypeQuery(acceptedItemFilter, {
    skip: !acceptedItemFilter || acceptedItemFilter === "all",
  })


  const displayData = searchTerm 
    ? searchResults 
    : acceptedItemFilter && acceptedItemFilter !== "all" 
      ? filteredByDeviceType 
      : response?.content || []

  const filteredPoints = displayData.filter((point) => {
    if (filterStatus === "all") return true
    if (filterStatus === "open") return point.status === "Open"
    if (filterStatus === "closed") return point.status === "Closed"
    return true
  })

  const totalItems = response?.totalElements || 0
  const totalPages = Math.ceil(totalItems / pageSize)

  const handlePointSelect = (id: string) => {
    setSelectedPoint(id)
    setDetailOpen(true)
  }


  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading collection points",
        description: "There was a problem loading the collection points. Please try again later.",
        variant: "destructive",
      })
    }
  }, [error, toast])


  const uniqueAcceptedItems = Array.from(
    new Set((response?.content || []).flatMap((point) => point.acceptedTypes))
  ).sort()

  const selectedPointData = selectedPoint 
    ? (response?.content || []).find((p) => p.id === selectedPoint) 
    : null

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">E-Waste Collection Points</h1>
              <p className="text-lg text-emerald-100">
                Find convenient locations to drop off your electronic waste and contribute to a cleaner, more
                sustainable environment.
              </p>
              <div className="mt-8 max-w-md mx-auto relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Enter your address or zip code"
                  className="pl-10 py-6 bg-white text-gray-800 rounded-full shadow-lg"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />
                <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full py-5">
                  Find Near Me
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="bg-white py-6 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-gray-500" />
                  <span className="text-gray-700 font-medium">Filter:</span>
                </div>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={acceptedItemFilter} onValueChange={setAcceptedItemFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Accepted Items" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items</SelectItem>
                    {uniqueAcceptedItems.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Tabs defaultValue="map" onValueChange={(value) => setViewMode(value as "map" | "list")}>
                  <TabsList>
                    <TabsTrigger value="map" className="flex items-center">
                      <MapIcon className="h-4 w-4 mr-2" />
                      Map View
                    </TabsTrigger>
                    <TabsTrigger value="list" className="flex items-center">
                      <List className="h-4 w-4 mr-2" />
                      List View
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* Map View */}
        {viewMode === "map" && (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Map area */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg border shadow-sm p-4 h-[500px]">
                    {isLoading ? (
                      <Skeleton className="h-full w-full" />
                    ) : (
                      <CollectionPointMap
                        points={filteredPoints}
                        onPointSelect={handlePointSelect}
                        selectedPoint={selectedPoint}
                      />
                    )}
                  </div>
                </div>

                {/* List of points */}
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Collection Points</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {isLoading ? "Loading..." : `Showing ${filteredPoints.length} locations`}
                    </p>
                    {searchTerm && <p className="text-xs text-gray-500">Search results for: "{searchTerm}"</p>}
                  </div>

                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {isLoading ? (
                      Array(3).fill(0).map((_, i) => (
                        <Skeleton key={i} className="h-32 w-full" />
                      ))
                    ) : filteredPoints.length === 0 ? (
                      <div className="bg-white p-6 rounded-lg border text-center">
                        <p className="text-gray-500">No collection points match your filters.</p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => {
                            setSearchTerm("")
                            setFilterStatus("all")
                            setAcceptedItemFilter("all")
                          }}
                        >
                          Clear Filters
                        </Button>
                      </div>
                    ) : (
                      filteredPoints.map((point) => (
                        <Card
                          key={point.id}
                          className={`border hover:shadow-md transition-shadow cursor-pointer ${selectedPoint === point.id ? "border-emerald-500 shadow-md" : ""}`}
                          onClick={() => handlePointSelect(point.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium text-gray-900">{point.nom}</h3>
                                <p className="text-sm text-gray-600 mt-1">{point.adresse}</p>

                                <div className="flex flex-wrap gap-1 mt-2">
                                  {point.acceptedTypes.slice(0, 3).map((item, i) => (
                                    <Badge key={i} variant="outline" className="bg-gray-50 text-xs">
                                      {item}
                                    </Badge>
                                  ))}
                                  {point.acceptedTypes.length > 3 && (
                                    <Badge variant="outline" className="bg-gray-50 text-xs">
                                      +{point.acceptedTypes.length - 3} more
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              <EcoBadge type={point.status === "Open" ? "success" : "error"}>{point.status}</EcoBadge>
                            </div>

                            <div className="flex items-center justify-between mt-3 pt-3 border-t text-sm">
                              <div className="flex items-center text-gray-500">
                                <Clock size={14} className="mr-1" />
                                {point.hours || "Mon-Fri: 9AM-5PM"}
                              </div>

                              <Button variant="outline" size="sm" className="h-8">
                                <Info size={14} className="mr-1" />
                                Details
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Pagination */}
              {!isLoading && filteredPoints.length > 0 && (
                <div className="flex justify-between items-center mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-gray-600">
                    Page {page + 1} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPage(p => p + 1)}
                    disabled={page >= totalPages - 1}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="bg-white rounded-lg border p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">All Collection Points</h2>
                  <div className="text-sm text-gray-500">
                    {isLoading ? "Loading..." : `Showing ${filteredPoints.length} of ${totalItems} locations`}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {isLoading ? (
                    Array(6).fill(0).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-40 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    ))
                  ) : filteredPoints.length === 0 ? (
                    <div className="col-span-full p-6 text-center">
                      <p className="text-gray-500">No collection points match your filters.</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          setSearchTerm("")
                          setFilterStatus("all")
                          setAcceptedItemFilter("all")
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  ) : (
                    filteredPoints.map((point) => (
                      <Card key={point.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-40 overflow-hidden bg-gray-100 flex items-center justify-center">
                          <MapPin className="h-12 w-12 text-gray-400" />
                        </div>

                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-gray-900">{point.nom}</h3>
                            <EcoBadge type={point.status === "Open" ? "success" : "error"}>{point.status}</EcoBadge>
                          </div>

                          <p className="text-sm text-gray-600 mt-1">{point.adresse}</p>

                          <div className="flex items-center text-xs text-gray-500 mt-2">
                            <Clock size={14} className="mr-1" />
                            {point.hours || "Mon-Fri: 9AM-5PM"}
                          </div>

                          <div className="flex flex-wrap gap-1 mt-3">
                            {point.acceptedTypes.map((item, i) => (
                              <Badge key={i} variant="outline" className="bg-gray-50 text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between mt-4 pt-3 border-t">
                            <Button variant="outline" size="sm" onClick={() => handlePointSelect(point.id)}>
                              <Info size={14} className="mr-1" />
                              Details
                            </Button>

                            <Button variant="outline" size="sm">
                              <Navigation size={14} className="mr-1" />
                              Directions
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>

                {/* Pagination */}
                {!isLoading && filteredPoints.length > 0 && (
                  <div className="flex justify-between items-center mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setPage(p => Math.max(0, p - 1))}
                      disabled={page === 0}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-gray-600">
                      Page {page + 1} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setPage(p => p + 1)}
                      disabled={page >= totalPages - 1}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Information Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">How Our Collection Works</h2>
              <p className="text-gray-600">
                Recycling your e-waste is simple, convenient, and rewarding. Follow these steps to dispose of your
                electronic waste responsibly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Find a Collection Point</h3>
                <p className="text-gray-600">
                  Use our map to locate the nearest e-waste collection point to your location. Filter by accepted items
                  to find the right place for your electronics.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Check Hours & Prepare</h3>
                <p className="text-gray-600">
                  Check the operating hours and prepare your e-waste. Remember to back up your data and remove personal
                  information from devices before recycling.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Recycle className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Drop Off & Earn Points</h3>
                <p className="text-gray-600">
                  Drop off your e-waste at the collection point and earn recycling points that can be redeemed for
                  rewards through our program.
                </p>
              </div>
            </div>

            <div className="text-center mt-10">
              <Button className="bg-emerald-500 hover:bg-emerald-600">Learn More About Our Recycling Process</Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-emerald-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Can't Make It to a Collection Point?</h2>
              <p className="text-lg text-emerald-100 mb-8">
                We offer pickup services for larger items or multiple devices. Schedule a convenient time and our team
                will collect your e-waste directly from your location.
              </p>
              <Button className="bg-white text-emerald-700 hover:bg-emerald-50">Schedule a Pickup</Button>
            </div>
          </div>
        </section>
      </main>

      {/* Collection Point Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Collection Point Details</DialogTitle>
            <DialogDescription>View detailed information about this collection point</DialogDescription>
          </DialogHeader>
          {selectedPointData && <CollectionPointDetail point={selectedPointData} />}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}

const Recycle = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
    <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
    <path d="m14 16-3 3 3 3" />
    <path d="M8.293 13.596 4.875 9.5l3.326-4.05" />
    <path d="m10.045 9.5-3.326-4.05A1.895 1.895 0 0 1 6.683 4a1.885 1.885 0 0 1 1.032-.382h5.292" />
    <path d="m14 5 3-3-3-3" />
    <path d="M13.585 16.194 16.5 19l3.39-4.138" />
    <path d="M19.891 14.862 16.5 19l-3.326-4.05a1.885 1.885 0 0 1 .166-2.573l.963-.933" />
  </svg>
)