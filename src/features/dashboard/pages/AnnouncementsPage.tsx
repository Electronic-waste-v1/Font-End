"use client"

import { useState } from "react"
import { Megaphone, Filter, Search, Plus, Edit, Trash2, AlertCircle } from "lucide-react"
import Header from "../components/DashboardHeader"
import Sidebar from "../components/DashboardSidebar"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/shared/components/ui/dialog"
import { Textarea } from "@/shared/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  useGetAllAnnoncesQuery,
  useCreateAnnonceMutation,
  useUpdateAnnonceMutation,
  useDeleteAnnonceMutation,
  useGetAnnoncesByPriceRangeQuery,
} from "@/shared/services/annonceApi"
import type { AnnonceResponse } from "@/shared/types/annonceTypes"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"
import { toast } from "@/shared/components/ui/use-toast"


const annonceFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  prix: z.coerce.number().positive({ message: "Price must be a positive number" }),
  etat: z.string().min(1, { message: "Status is required" }),
  waste_id: z.coerce.number().optional(),
})

type AnnonceFormValues = z.infer<typeof annonceFormSchema>

export default function AnnouncementsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnonceResponse | null>(null)
  const [isAnnouncementDetailOpen, setIsAnnouncementDetailOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priceRange, setPriceRange] = useState<{ min?: string; max?: string }>({})
  const [isPriceFilterActive, setIsPriceFilterActive] = useState(false)

  const userId = useSelector((state: RootState) => state.auth.user?.id) || 1
console.log("Iddddd"+userId);


  const { data: annonces, isLoading, error, refetch } = useGetAllAnnoncesQuery()
  const { data: filteredByPrice } = useGetAnnoncesByPriceRangeQuery(
    { minPrice: priceRange.min, maxPrice: priceRange.max },
    { skip: !isPriceFilterActive },
  )
  const [createAnnonce, { isLoading: isCreating }] = useCreateAnnonceMutation()
  const [updateAnnonce, { isLoading: isUpdating }] = useUpdateAnnonceMutation()
  const [deleteAnnonce, { isLoading: isDeleting }] = useDeleteAnnonceMutation()

  const form = useForm<AnnonceFormValues>({
    resolver: zodResolver(annonceFormSchema),
    defaultValues: {
      title: "",
      description: "",
      prix: 0,
      etat: "Disponible",
      waste_id: undefined,
    },
  })

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleAnnouncementSelect = (announcement: AnnonceResponse) => {
    setSelectedAnnouncement(announcement)
    setIsAnnouncementDetailOpen(true)
  }

  const handleCreateAnnouncement = () => {
    form.reset({
      title: "",
      description: "",
      prix: 0,
      etat: "Disponible",
      waste_id: undefined,
    })
    setIsCreateDialogOpen(true)
  }

  const handleEditAnnouncement = (announcement: AnnonceResponse) => {
    form.reset({
      title: announcement.title,
      description: announcement.description,
      prix: announcement.prix,
      etat: announcement.etat,
      waste_id: announcement.waste_id,
    })
    setSelectedAnnouncement(announcement)
    setIsEditDialogOpen(true)
  }

  const handleDeleteAnnouncement = (announcement: AnnonceResponse) => {
    setSelectedAnnouncement(announcement)
    setIsDeleteDialogOpen(true)
  }

  const onSubmitCreate = async (data: AnnonceFormValues) => {
    try {
      await createAnnonce({
        ...data,
        user_id: userId,
      }).unwrap()

      setIsCreateDialogOpen(false)
      toast({
        title: "Announcement Created",
        description: "Your announcement has been created successfully.",
      })
      refetch()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create announcement. Please try again.",
        variant: "destructive",
      })
    }
  }

  const onSubmitEdit = async (data: AnnonceFormValues) => {
    if (!selectedAnnouncement) return

    try {
      await updateAnnonce({
        id: selectedAnnouncement.id,
        annonce: data,
      }).unwrap()

      setIsEditDialogOpen(false)
      toast({
        title: "Announcement Updated",
        description: "Your announcement has been updated successfully.",
      })
      refetch()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update announcement. Please try again.",
        variant: "destructive",
      })
    }
  }

  const confirmDelete = async () => {
    if (!selectedAnnouncement) return

    try {
      await deleteAnnonce(selectedAnnouncement.id).unwrap()

      setIsDeleteDialogOpen(false)
      toast({
        title: "Announcement Deleted",
        description: "Your announcement has been deleted successfully.",
      })
      refetch()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete announcement. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getFilteredAnnouncements = () => {

    const dataToFilter = isPriceFilterActive && filteredByPrice ? filteredByPrice : annonces

    if (!dataToFilter) return []

    return dataToFilter.filter((announcement) => {
 
      if (categoryFilter !== "all" && announcement.etat !== categoryFilter) {
        return false
      }

  
      if (statusFilter !== "all" && announcement.etat !== statusFilter) {
        return false
      }

   
      if (
        searchTerm &&
        !announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !announcement.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false
      }

      return true
    })
  }

  const filteredAnnouncements = getFilteredAnnouncements()


  const applyPriceFilter = () => {
    setIsPriceFilterActive(true)
  }


  const clearFilters = () => {
    setSearchTerm("")
    setCategoryFilter("all")
    setStatusFilter("all")
    setPriceRange({})
    setIsPriceFilterActive(false)
  }

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
                  <Megaphone className="mr-2 h-6 w-6 text-emerald-500" />
                  Announcements
                </h1>
                <p className="text-gray-500 mt-1">Manage your e-waste listings and announcements</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateAnnouncement}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Announcement
                </Button>
              </div>
            </div>

            {/* Filters Section */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search announcements..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Disponible">Available</SelectItem>
                        <SelectItem value="Vendu">Sold</SelectItem>
                        <SelectItem value="Réservé">Reserved</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Min €"
                        className="w-[80px]"
                        value={priceRange.min || ""}
                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      />
                      <span>-</span>
                      <Input
                        type="number"
                        placeholder="Max €"
                        className="w-[80px]"
                        value={priceRange.max || ""}
                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      />
                      <Button variant="outline" size="sm" onClick={applyPriceFilter}>
                        Apply
                      </Button>
                    </div>

                    <Button variant="outline" size="icon" onClick={clearFilters}>
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Your Announcements</h2>

              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading announcements...</p>
                </div>
              ) : error ? (
                <Card className="border-none shadow-sm">
                  <CardContent className="p-6 text-center">
                    <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
                    <p className="text-gray-700">Failed to load announcements. Please try again later.</p>
                    <Button variant="outline" className="mt-4" onClick={() => refetch()}>
                      Retry
                    </Button>
                  </CardContent>
                </Card>
              ) : filteredAnnouncements.length === 0 ? (
                <Card className="border-none shadow-sm">
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-500">No announcements found.</p>
                    {(searchTerm || statusFilter !== "all" || isPriceFilterActive) && (
                      <Button variant="outline" className="mt-4" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAnnouncements.map((announcement) => (
                 <Card
                 key={announcement.id}
                 className="border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
               >
                 <CardContent className="p-5">
                   <div className="flex flex-col gap-3">
                     {/* Status and price header */}
                     <div className="flex justify-between items-start">
                       <Badge
                         variant="outline"
                         className={`
                           ${
                             announcement.etat === "Disponible"
                               ? "bg-green-50 text-green-700 border-green-200"
                               : announcement.etat === "Vendu"
                                 ? "bg-gray-50 text-gray-700 border-gray-200"
                                 : "bg-yellow-50 text-yellow-700 border-yellow-200"
                           }
                         `}
                       >
                         {announcement.etat}
                       </Badge>
                       <span className="font-bold text-lg text-emerald-600">€{announcement.prix.toFixed(2)}</span>
                     </div>
               
                     {/* Title and description */}
                     <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                     <p className="text-gray-600 text-sm">{announcement.description}</p>
               
                     {/* Date posted */}
                     <div className="text-xs text-gray-500">
                       Posted: {new Date(announcement.created_at).toLocaleDateString()}
                     </div>
               
                     {/* Action buttons */}
                     <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                       <Button 
                         variant="outline" 
                         size="sm" 
                         onClick={() => handleAnnouncementSelect(announcement)}
                       >
                         View Details
                       </Button>
                       <div className="flex gap-2">
                         <Button 
                           variant="ghost" 
                           size="sm" 
                           className="text-gray-500 hover:text-gray-700"
                           onClick={() => handleEditAnnouncement(announcement)}
                         >
                           <Edit className="h-4 w-4 mr-2" />
                           Edit
                         </Button>
                         <Button 
                           variant="ghost" 
                           size="sm" 
                           className="text-red-500 hover:text-red-700"
                           onClick={() => handleDeleteAnnouncement(announcement)}
                         >
                           <Trash2 className="h-4 w-4 mr-2" />
                           Delete
                         </Button>
                       </div>
                     </div>
                   </div>
                 </CardContent>
               </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Announcement Detail Dialog */}
      <Dialog open={isAnnouncementDetailOpen} onOpenChange={setIsAnnouncementDetailOpen}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>Announcement Details</DialogTitle>
          </DialogHeader>
          {selectedAnnouncement && (
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <Badge
                    variant="outline"
                    className={`
                    ${
                      selectedAnnouncement.etat === "Disponible"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : selectedAnnouncement.etat === "Vendu"
                          ? "bg-gray-50 text-gray-700 border-gray-200"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                    }
                  `}
                  >
                    {selectedAnnouncement.etat}
                  </Badge>
                  <span className="font-bold text-xl text-emerald-600">€{selectedAnnouncement.prix.toFixed(2)}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedAnnouncement.title}</h2>
              </div>

              <div className="rounded-lg overflow-hidden">
                <img
                  src={`/placeholder.svg?height=300&width=600&text=${encodeURIComponent(selectedAnnouncement.title)}`}
                  alt={selectedAnnouncement.title}
                  className="w-full h-auto max-h-80 object-cover"
                />
              </div>

              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold">Description</h3>
                <p className="text-gray-700">{selectedAnnouncement.description}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-3">Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500">Status:</div>
                  <div className="font-medium">{selectedAnnouncement.etat}</div>

                  <div className="text-gray-500">Price:</div>
                  <div className="font-medium">€{selectedAnnouncement.prix.toFixed(2)}</div>

                  <div className="text-gray-500">Posted on:</div>
                  <div className="font-medium">{new Date(selectedAnnouncement.created_at).toLocaleDateString()}</div>

                  <div className="text-gray-500">Last updated:</div>
                  <div className="font-medium">{new Date(selectedAnnouncement.updated_at).toLocaleDateString()}</div>

                  {selectedAnnouncement.waste_id && (
                    <>
                      <div className="text-gray-500">Waste ID:</div>
                      <div className="font-medium">{selectedAnnouncement.waste_id}</div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => handleEditAnnouncement(selectedAnnouncement)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Announcement
                </Button>
                <Button
                  variant="outline"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => {
                    setIsAnnouncementDetailOpen(false)
                    handleDeleteAnnouncement(selectedAnnouncement)
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Announcement Dialog */}
      <Dialog  open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>Create New Announcement</DialogTitle>
            <DialogDescription>Fill in the details to create a new e-waste announcement.</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitCreate)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a title for your announcement" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your item in detail" className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (€)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField 
                control={form.control}
                name="etat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Disponible">Available</SelectItem>
                        <SelectItem value="Réservé">Reserved</SelectItem>
                        <SelectItem value="Vendu">Sold</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="waste_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-Waste ID (Optional)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Link to an existing e-waste item" {...field} />
                    </FormControl>
                    <FormDescription>
                      If this announcement is related to an existing e-waste item, enter its ID here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating}>
                  {isCreating && (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                  )}
                  Create Announcement
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Announcement Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>Edit Announcement</DialogTitle>
            <DialogDescription>Update the details of your announcement.</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitEdit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a title for your announcement" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your item in detail" className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (€)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="etat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Disponible">Available</SelectItem>
                        <SelectItem value="Réservé">Reserved</SelectItem>
                        <SelectItem value="Vendu">Sold</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="waste_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-Waste ID (Optional)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Link to an existing e-waste item" {...field} />
                    </FormControl>
                    <FormDescription>
                      If this announcement is related to an existing e-waste item, enter its ID here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating && (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                  )}
                  Update Announcement
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this announcement? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {selectedAnnouncement && (
              <div className="bg-red-50 p-4 rounded-md border border-red-100">
                <h3 className="font-medium text-red-800">{selectedAnnouncement.title}</h3>
                <p className="text-red-700 text-sm mt-1">
                  €{selectedAnnouncement.prix.toFixed(2)} - {selectedAnnouncement.etat}
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isDeleting}>
              {isDeleting && (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


function Clock(props: any) {
  return (
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
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


function MapPin(props: any) {
  return (
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
      {...props}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}


function Share2(props: any) {
  return (
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
      {...props}
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </svg>
  )
}

