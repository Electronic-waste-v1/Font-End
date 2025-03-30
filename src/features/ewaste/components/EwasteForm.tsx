"use client"

import type React from "react"
import { useState } from "react"
import { useCreateEwasteMutation } from "@/shared/services/ewasteApi"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Alert, AlertDescription } from "@/shared/components/ui/alert"
import { Loader2 } from "lucide-react"

interface EwasteFormProps {
  userId: number
  onSuccess?: () => void
}

const CATEGORIES = ["Électronique", "Informatique", "Téléphonie", "Électroménager", "Autre"]

const ETATS = ["Reparable", "Donne", "Recycler"]

export const EwasteForm: React.FC<EwasteFormProps> = ({ userId, onSuccess }) => {
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    categorie: "",
    etat: "",
  })
  const [error, setError] = useState<string | null>(null)

  const [createEwaste, { isLoading }] = useCreateEwasteMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.nom || !formData.description || !formData.categorie || !formData.etat) {
      setError("Veuillez remplir tous les champs obligatoires")
      return
    }

    try {
      await createEwaste({
        ...formData,
        user_id: userId,
      }).unwrap()

      setFormData({
        nom: "",
        description: "",
        categorie: "",
        etat: "",
      })

 
      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      console.error("Failed to create e-waste item:", err)
      setError("Une erreur est survenue lors de la création de l'article. Veuillez réessayer.")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Déclarer un déchet électronique</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="nom" className="text-sm font-medium">
              Nom de l'article *
            </label>
            <Input
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Ex: Ordinateur portable Dell XPS 13"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description *
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Décrivez l'état et les caractéristiques de l'article"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="categorie" className="text-sm font-medium">
                Catégorie *
              </label>
              <Select value={formData.categorie} onValueChange={(value) => handleSelectChange("categorie", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="etat" className="text-sm font-medium">
                État *
              </label>
              <Select value={formData.etat} onValueChange={(value) => handleSelectChange("etat", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un état" />
                </SelectTrigger>
                <SelectContent>
                  {ETATS.map((etat) => (
                    <SelectItem key={etat} value={etat}>
                      {etat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <CardFooter className="px-0 pt-4">
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "Déclarer cet article"
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}

