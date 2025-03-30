"use client"

import type React from "react"
import { useState } from "react"
import { useGetAllEwastesQuery, useDeleteEwasteMutation } from "@/shared/services/ewasteApi"
import type { EwasteResponse } from "@/shared/types/Ewaste/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Loader2, Trash2, Edit, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import { Alert, AlertDescription } from "@/shared/components/ui/alert"
import { Input } from "@/shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"

export const EwasteList: React.FC = () => {
  const { data: ewastes, isLoading, isError, refetch } = useGetAllEwastesQuery()
  const [deleteEwaste, { isLoading: isDeleting }] = useDeleteEwasteMutation()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("")
  const [stateFilter, setStateFilter] = useState<string>("")
  const [selectedEwaste, setSelectedEwaste] = useState<EwasteResponse | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      try {
        await deleteEwaste(id).unwrap()
      } catch (error) {
        console.error("Failed to delete e-waste:", error)
      }
    }
  }

  const handleViewDetails = (ewaste: EwasteResponse) => {
    setSelectedEwaste(ewaste)
    setShowDetailsDialog(true)
  }

  const filteredEwastes = ewastes?.filter((ewaste) => {
    const matchesSearch =
      searchTerm === "" ||
      ewaste.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ewaste.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "" || ewaste.categorie === categoryFilter
    const matchesState = stateFilter === "" || ewaste.etat === stateFilter

    return matchesSearch && matchesCategory && matchesState
  })


  const categories = [...new Set(ewastes?.map((e) => e.categorie) || [])]
  const states = [...new Set(ewastes?.map((e) => e.etat) || [])]

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    )
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Une erreur est survenue lors du chargement des déchets électroniques.
          <Button variant="outline" className="ml-2" onClick={() => refetch()}>
            Réessayer
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="État" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les états</SelectItem>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredEwastes?.length === 0 ? (
        <div className="text-center py-10 text-gray-500">Aucun déchet électronique trouvé.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEwastes?.map((ewaste) => (
            <Card key={ewaste.id} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{ewaste.nom}</CardTitle>
                  <Badge
                    variant={
                      ewaste.etat === "Fonctionnel"
                        ? "default"
                        : ewaste.etat === "Reparable"
                          ? "outline"
                          : ewaste.etat === "Pièces détachées"
                            ? "secondary"
                            : "destructive"
                    }
                  >
                    {ewaste.etat}
                  </Badge>
                </div>
                <CardDescription>{ewaste.categorie}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-gray-600 line-clamp-3">{ewaste.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => handleViewDetails(ewaste)}>
                  <Eye className="h-4 w-4 mr-1" /> Détails
                </Button>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(ewaste.id)} disabled={isDeleting}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>{selectedEwaste?.nom}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Catégorie</h4>
              <p>{selectedEwaste?.categorie}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">État</h4>
              <Badge
                variant={
                  selectedEwaste?.etat === "Fonctionnel"
                    ? "default"
                    : selectedEwaste?.etat === "Reparable"
                      ? "outline"
                      : selectedEwaste?.etat === "Pièces détachées"
                        ? "secondary"
                        : "destructive"
                }
              >
                {selectedEwaste?.etat}
              </Badge>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Description</h4>
              <p className="text-sm">{selectedEwaste?.description}</p>
            </div>

            {selectedEwaste?.created_at && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Date de déclaration</h4>
                <p className="text-sm">{new Date(selectedEwaste.created_at).toLocaleDateString()}</p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Fermer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

