"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { X, Plus } from "lucide-react"
import { useCreateRecyclingCenterMutation, useUpdateRecyclingCenterMutation } from "../recyclingCenterApi"
import type { RecyclingCenter } from "../types"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { Badge } from "@/shared/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Label } from "@/shared/components/ui/label"
import { toast } from "@/shared/components/ui/use-toast"

interface RecyclingCenterFormProps {
  recyclingCenter?: RecyclingCenter
  onSuccess?: () => void
}

export default function RecyclingCenterForm({ recyclingCenter, onSuccess }: RecyclingCenterFormProps) {
  const [createRecyclingCenter, { isLoading: isCreating }] = useCreateRecyclingCenterMutation()
  const [updateRecyclingCenter, { isLoading: isUpdating }] = useUpdateRecyclingCenterMutation()
  const [acceptedTypes, setAcceptedTypes] = useState<string[]>(recyclingCenter?.acceptedTypes || [])
  const [newType, setNewType] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecyclingCenter>({
    defaultValues: recyclingCenter || {
      contact: "",
      nom: "",
      adresse: "",
      acceptedTypes: [],
    },
  })

  useEffect(() => {
    if (recyclingCenter) {
      reset(recyclingCenter)
      setAcceptedTypes(recyclingCenter.acceptedTypes)
    }
  }, [recyclingCenter, reset])

  const onSubmit = async (data: RecyclingCenter) => {
    try {
      if (recyclingCenter?.id) {
        await updateRecyclingCenter({
          id: recyclingCenter.id,
          recyclingCenter: { ...data, acceptedTypes },
        }).unwrap()
        toast({
          title: "Centre de recyclage mis à jour",
          description: "Le centre de recyclage a été mis à jour avec succès.",
        })
      } else {
        await createRecyclingCenter({ ...data, acceptedTypes }).unwrap()
        toast({
          title: "Centre de recyclage créé",
          description: "Le nouveau centre de recyclage a été créé avec succès.",
        })
        reset()
        setAcceptedTypes([])
      }

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'enregistrement du centre de recyclage.",
        variant: "destructive",
      })
      console.error("Error saving recycling center:", error)
    }
  }

  const addAcceptedType = () => {
    if (newType.trim() && !acceptedTypes.includes(newType.trim())) {
      setAcceptedTypes([...acceptedTypes, newType.trim()])
      setNewType("")
    }
  }

  const removeAcceptedType = (type: string) => {
    setAcceptedTypes(acceptedTypes.filter((t) => t !== type))
  }

  const isLoading = isCreating || isUpdating

  return (
    <Card>
      <CardHeader>
        <CardTitle>{recyclingCenter ? "Modifier le centre de recyclage" : "Ajouter un centre de recyclage"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nom">Nom du centre</Label>
            <Input
              id="nom"
              placeholder="Centre de Recyclage Paris"
              {...register("nom", { required: "Le nom est requis" })}
            />
            {errors.nom && <p className="text-sm text-red-500">{errors.nom.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="adresse">Adresse</Label>
            <Textarea
              id="adresse"
              placeholder="123 Rue de l'Innovation, 75010 Paris"
              {...register("adresse", { required: "L'adresse est requise" })}
            />
            {errors.adresse && <p className="text-sm text-red-500">{errors.adresse.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact</Label>
            <Input
              id="contact"
              placeholder="+33612345678"
              {...register("contact", { required: "Le contact est requis" })}
            />
            {errors.contact && <p className="text-sm text-red-500">{errors.contact.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="acceptedTypes">Types d'appareils acceptés</Label>
            <div className="flex gap-2">
              <Input
                id="newType"
                placeholder="Smartphones, Ordinateurs, etc."
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
              />
              <Button type="button" onClick={addAcceptedType} variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Ajouter
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {acceptedTypes.map((type, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {type}
                  <button
                    type="button"
                    onClick={() => removeAcceptedType(type)}
                    className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Supprimer</span>
                  </button>
                </Badge>
              ))}
              {acceptedTypes.length === 0 && <p className="text-sm text-gray-500">Aucun type d'appareil ajouté</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude (optionnel)</Label>
              <Input
                id="latitude"
                type="number"
                step="0.000001"
                placeholder="48.8566"
                {...register("latitude", {
                  valueAsNumber: true,
                  validate: (value) =>
                    !value || (value >= -90 && value <= 90) || "La latitude doit être entre -90 et 90",
                })}
              />
              {errors.latitude && <p className="text-sm text-red-500">{errors.latitude.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude (optionnel)</Label>
              <Input
                id="longitude"
                type="number"
                step="0.000001"
                placeholder="2.3522"
                {...register("longitude", {
                  valueAsNumber: true,
                  validate: (value) =>
                    !value || (value >= -180 && value <= 180) || "La longitude doit être entre -180 et 180",
                })}
              />
              {errors.longitude && <p className="text-sm text-red-500">{errors.longitude.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="openingHours">Heures d'ouverture (optionnel)</Label>
            <Textarea id="openingHours" placeholder="Lun-Ven: 9h-18h, Sam: 10h-16h" {...register("openingHours")} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset()
              if (onSuccess) onSuccess()
            }}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Enregistrement..." : recyclingCenter ? "Mettre à jour" : "Créer"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

