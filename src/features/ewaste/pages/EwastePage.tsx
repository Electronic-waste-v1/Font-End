import type React from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"
import { EwasteForm } from "../components/EwasteForm"
import { EwasteList } from "../components/EwasteList"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Recycle, ListPlus, List } from "lucide-react"

const EwastePage: React.FC = () => {

  const userId = Number(useSelector((state: RootState) => state.auth.user?.id)) || 1 

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestion des déchets électroniques</h1>
          <p className="text-gray-600 mt-1">Déclarez vos déchets électroniques et suivez leur statut</p>
        </div>
        <Recycle className="h-10 w-10 text-emerald-500" />
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            <span>Mes articles</span>
          </TabsTrigger>
          <TabsTrigger value="add" className="flex items-center gap-2">
            <ListPlus className="h-4 w-4" />
            <span>Déclarer un article</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Mes déchets électroniques</CardTitle>
              <CardDescription>Liste de tous les articles que vous avez déclarés</CardDescription>
            </CardHeader>
            <CardContent>
              <EwasteList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add" className="mt-6">
          <EwasteForm userId={userId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default EwastePage

