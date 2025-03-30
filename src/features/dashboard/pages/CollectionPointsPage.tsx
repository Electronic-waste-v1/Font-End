import React from 'react';
import { useState, useEffect } from "react"
import { MapPin, Search, Filter, List, MapIcon, Plus, Info } from "lucide-react"
import Header from "../components/DashboardHeader"
import Sidebar from "../components/DashboardSidebar"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { EcoBadge } from "@/shared/components/eco-badge"
import { EcoCard } from "@/shared/components/eco-card"
import { DataTable } from "@/shared/components/data-table"
import { Badge } from "@/shared/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import CollectionPointMap from "../components/CollectionPointMap"
import CollectionPointDetail from "../components/CollectionPointDetail"
import SuggestCollectionPointModal from "../components/SuggestCollectionPointModal"
import {
  useGetAllCollectionPointsQuery,
  useSearchCollectionPointsByLocationQuery,
  useFilterCollectionPointsByDeviceTypeQuery,
} from "@/shared/services/collectionApi"
import type { CollectionPointResponse } from "@/shared/types/collectionPointTypes"
import { useToast } from "@/shared/components/ui/use-toast"

export default function CollectionPointsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [viewMode, setViewMode] = useState<"map" | "list">("map")
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [suggestModalOpen, setSuggestModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [deviceTypeFilter, setDeviceTypeFilter] = useState("")
  const [sortBy, setSortBy] = useState("distance")
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const { toast } = useToast()
  const {
    data: response,
    isLoading,
    error
  } = useGetAllCollectionPointsQuery({
    page,
    pageSize
  })

  console.log(response);
  
  const collectionPoints = response?.content || [];
  const totalItems = response?.totalElements || 0;
  const totalPages = Math.ceil(totalItems / pageSize)

 
  const { data: searchResults = [] } = useSearchCollectionPointsByLocationQuery(searchTerm, {
    skip: !searchTerm,
  })


  const { data: filteredByDeviceType = [] } = useFilterCollectionPointsByDeviceTypeQuery(deviceTypeFilter, {
    skip: !deviceTypeFilter,
  })


  const displayData = searchTerm ? searchResults : deviceTypeFilter ? filteredByDeviceType : collectionPoints


  const filteredPoints = displayData.filter((point) => {
    if (filterStatus === "all") return true
    if (filterStatus === "open") return point.status === "Open"
    if (filterStatus === "closed") return point.status === "Closed"
    return true
  })

  const sortedPoints = [...filteredPoints].sort((a, b) => {
    if (sortBy === "distance") {
      return Number.parseFloat(a.distance || "0") - Number.parseFloat(b.distance || "0")
    } else if (sortBy === "name") {
      return a.nom.localeCompare(b.nom)
    } else if (sortBy === "rating") {
      return (b.rating || 0) - (a.rating || 0)
    }
    return 0
  })

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handlePointSelect = (id: number) => {
    setSelectedPoint(id)
    setDetailOpen(true)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setPage(0) 
  }

  const handleDeviceTypeFilter = (type: string) => {
    setDeviceTypeFilter(type)
    setPage(0) 
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    setPage(0) 
  }

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value))
    setPage(0) 
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

  const columns = [
    {
      key: "name",
      header: "Name",
      cell: (point: CollectionPointResponse) => <div className="font-medium">{point.nom}</div>,
      sortable: true,
    },
    {
      key: "address",
      header: "Address",
      cell: (point: CollectionPointResponse) => point.adresse,
      sortable: true,
    },
    {
      key: "distance",
      header: "Distance",
      cell: (point: CollectionPointResponse) => point.distance || "N/A",
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      cell: (point: CollectionPointResponse) => (
        <EcoBadge type={point.status === "Open" ? "success" : "error"}>{point.status}</EcoBadge>
      ),
      sortable: true,
    },
    {
      key: "actions",
      header: "Actions",
      cell: (point: CollectionPointResponse) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handlePointSelect(point.id)}>
            <Info className="h-4 w-4 mr-1" />
            Details
          </Button>
        </div>
      ),
    },
  ]

  const selectedPointData = selectedPoint ? collectionPoints.find((p) => p.id === selectedPoint) || null : null

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                  <MapPin className="mr-2 h-6 w-6 text-emerald-500" />
                  Collection Points
                </h1>
                <p className="text-gray-500 mt-1">Find and manage e-waste collection points near you</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
                <Button onClick={() => setSuggestModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Suggest New Point
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by name, address or zip code"
                  className="pl-10"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Items per page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 per page</SelectItem>
                    <SelectItem value="25">25 per page</SelectItem>
                    <SelectItem value="50">50 per page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Device Type Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={deviceTypeFilter === "" ? "default" : "outline"}
                size="sm"
                onClick={() => handleDeviceTypeFilter("")}
              >
                All Types
              </Button>
              <Button
                variant={deviceTypeFilter === "electronics" ? "default" : "outline"}
                size="sm"
                onClick={() => handleDeviceTypeFilter("electronics")}
              >
                Electronics
              </Button>
              <Button
                variant={deviceTypeFilter === "batteries" ? "default" : "outline"}
                size="sm"
                onClick={() => handleDeviceTypeFilter("batteries")}
              >
                Batteries
              </Button>
              <Button
                variant={deviceTypeFilter === "appliances" ? "default" : "outline"}
                size="sm"
                onClick={() => handleDeviceTypeFilter("appliances")}
              >
                Appliances
              </Button>
            </div>

            {/* View Toggle */}
            <Tabs defaultValue="map" onValueChange={(value) => setViewMode(value as "map" | "list")}>
              <div className="flex justify-between items-center">
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
                <div className="text-sm text-gray-500">
                  {isLoading
                    ? "Loading collection points..."
                    : `Showing ${sortedPoints.length} of ${totalItems} collection points`}
                </div>
              </div>

              {/* Map View */}
              <TabsContent value="map" className="mt-4">
                <div className="bg-white rounded-lg border shadow-sm p-4">
                  <div className="h-[500px]">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <p>Loading map data...</p>
                      </div>
                    ) : (
                      <CollectionPointMap
                        points={sortedPoints}
                        onPointSelect={handlePointSelect}
                        selectedPoint={selectedPoint}
                      />
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* List View */}
              <TabsContent value="list" className="mt-4">
                {isLoading ? (
                  <div className="bg-white rounded-lg border shadow-sm p-8 text-center">
                    <p>Loading collection points...</p>
                  </div>
                ) : (
                  <DataTable data={sortedPoints} columns={columns} searchable searchKeys={["nom", "adresse"]} />
                )}
              </TabsContent>
            </Tabs>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage(0)}
                  disabled={page === 0}
                >
                  First
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                  disabled={page === 0}
                >
                  Previous
                </Button>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-600">
                  Page {page + 1} of {totalPages}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={page >= totalPages - 1}
                >
                  Next
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPage(totalPages - 1)}
                  disabled={page >= totalPages - 1}
                >
                  Last
                </Button>
              </div>
            </div>

            {/* Collection Points Grid (for smaller screens in map view) */}
            {viewMode === "map" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {isLoading ? (
                  <div className="col-span-full text-center p-4">Loading collection points...</div>
                ) : sortedPoints.length === 0 ? (
                  <div className="col-span-full text-center p-4">No collection points found</div>
                ) : (
                  sortedPoints.slice(0, 3).map((point) => (
                    <EcoCard
                      key={point.id}
                      title={point.nom}
                      icon={<MapPin className="h-5 w-5 text-emerald-500" />}
                      variant={selectedPoint === point.id ? "highlight" : "default"}
                      footer={
                        <Button
                          variant="link"
                          className="p-0 h-auto text-emerald-600"
                          onClick={() => handlePointSelect(point.id)}
                        >
                          View Details
                        </Button>
                      }
                    >
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">{point.adresse}</p>
                        <div className="flex items-center justify-between">
                          <EcoBadge type={point.status === "Open" ? "success" : "error"}>{point.status}</EcoBadge>
                          <span className="text-sm font-medium">{point.distance || "N/A"} away</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {point.acceptedTypes.slice(0, 3).map((item, i) => (
                            <Badge key={i} variant="outline" className="bg-gray-50">
                              {item}
                            </Badge>
                          ))}
                          {point.acceptedTypes.length > 3 && (
                            <Badge variant="outline" className="bg-gray-50">
                              +{point.acceptedTypes.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </EcoCard>
                  ))
                )}
              </div>
            )}
          </div>
        </main>
      </div>

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
      <SuggestCollectionPointModal open={suggestModalOpen} onOpenChange={setSuggestModalOpen} />
    </div>
  )
}