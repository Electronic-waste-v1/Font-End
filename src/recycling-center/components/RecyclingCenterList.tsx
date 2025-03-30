"use client"

import { useState } from "react"
import { Edit, Trash2, MapPin, Phone, Search, Filter } from "lucide-react"
import {
  useGetAllRecyclingCentersQuery,
  useDeleteRecyclingCenterMutation,
  useSearchRecyclingCentersByLocationQuery,
  useFilterRecyclingCentersByDeviceTypeQuery,
} from "../recyclingCenterApi"
import type { RecyclingCenter } from "../types"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Badge } from "@/shared/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { toast } from "@/shared/components/ui/use-toast"
import { EcoBadge } from "@/shared/components/eco-badge"

interface RecyclingCenterListProps {
  onEdit: (recyclingCenter: RecyclingCenter) => void
}

export default function RecyclingCenterList({ onEdit }: RecyclingCenterListProps) {
  const [searchType, setSearchType] = useState<"all" | "location" | "device">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [centerToDelete, setCenterToDelete] = useState<RecyclingCenter | null>(null)

  const {
    data: allCenters,
    isLoading: isLoadingAll,
    refetch: refetchAll,
  } = useGetAllRecyclingCentersQuery(undefined, { skip: searchType !== "all" })

  const { data: locationCenters, isLoading: isLoadingLocation } = useSearchRecyclingCentersByLocationQuery(
    searchQuery,
    {
      skip: searchType !== "location" || !searchQuery,
    },
  )

  const { data: deviceCenters, isLoading: isLoadingDevice } = useFilterRecyclingCentersByDeviceTypeQuery(searchQuery, {
    skip: searchType !== "device" || !searchQuery,
  })


  const [deleteRecyclingCenter, { isLoading: isDeleting }] = useDeleteRecyclingCenterMutation()

  const centers =
    searchType === "location" && searchQuery
      ? locationCenters
      : searchType === "device" && searchQuery
        ? deviceCenters
        : allCenters || []

  const isLoading = isLoadingAll || isLoadingLocation || isLoadingDevice || isDeleting

  const handleSearch = () => {
    if (searchType === "all") {
      refetchAll()
    }
  }

  const confirmDelete = (center: RecyclingCenter) => {
    setCenterToDelete(center)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!centerToDelete?.id) return

    try {
      await deleteRecyclingCenter(centerToDelete.id).unwrap()
      toast({
        title: "Centre supprimé",
        description: "Le centre de recyclage a été supprimé avec succès.",
      })
      setDeleteDialogOpen(false)
      setCenterToDelete(null)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la suppression du centre.",
        variant: "destructive",
      })
      console.error("Error deleting recycling center:", error)
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Centres de recyclage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 flex gap-2">
              <Select
                value={searchType}
                onValueChange={(value) => setSearchType(value as "all" | "location" | "device")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type de recherche" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les centres</SelectItem>
                  <SelectItem value="location">Par localisation</SelectItem>
                  <SelectItem value="device">Par type d'appareil</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder={
                    searchType === "location"
                      ? "Rechercher par ville..."
                      : searchType === "device"
                        ? "Rechercher par type d'appareil..."
                        : "Rechercher..."
                  }
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={searchType === "all"}
                />
              </div>

              <Button onClick={handleSearch} disabled={isLoading}>
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
          ) : centers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Aucun centre de recyclage trouvé</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Adresse</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Types acceptés</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {centers.map((center) => (
                    <TableRow key={center.id}>
                      <TableCell className="font-medium">{center.nom}</TableCell>
                      <TableCell>
                        <div className="flex items-start gap-1">
                          <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                          <span>{center.adresse}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>{center.contact}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {center.acceptedTypes.slice(0, 2).map((type, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-50">
                              {type}
                            </Badge>
                          ))}
                          {center.acceptedTypes.length > 2 && (
                            <Badge variant="outline" className="bg-gray-50">
                              +{center.acceptedTypes.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <EcoBadge type={center.status === "active" ? "success" : "error"}>
                          {center.status === "active" ? "Actif" : "Inactif"}
                        </EcoBadge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => onEdit(center)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Modifier</span>
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => confirmDelete(center)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Supprimer</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer le centre de recyclage "{centerToDelete?.nom}" ? Cette action est
              irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={isDeleting}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Suppression..." : "Supprimer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

