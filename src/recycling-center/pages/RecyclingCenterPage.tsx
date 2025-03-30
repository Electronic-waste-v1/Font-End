"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import type { RecyclingCenter } from "../types"
import RecyclingCenterForm from "../components/RecyclingCenterForm"
import RecyclingCenterList from "../components/RecyclingCenterList"
import Header from "@/features/dashboard/components/DashboardHeader"
import Sidebar from "@/features/dashboard/components/DashboardSidebar"
import { Button } from "@/shared/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"

export default function RecyclingCenterPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [selectedCenter, setSelectedCenter] = useState<RecyclingCenter | undefined>(undefined)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleAddNew = () => {
    setSelectedCenter(undefined)
    setFormDialogOpen(true)
  }

  const handleEdit = (center: RecyclingCenter) => {
    setSelectedCenter(center)
    setFormDialogOpen(true)
  }

  const handleFormSuccess = () => {
    setFormDialogOpen(false)
    setSelectedCenter(undefined)
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
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Centres de Recyclage</h1>
                <p className="text-gray-500 mt-1">Gérez les centres de recyclage disponibles sur la plateforme</p>
              </div>
              <Button onClick={handleAddNew}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un centre
              </Button>
            </div>

            {/* Main Content */}
            <RecyclingCenterList onEdit={handleEdit} />
          </div>
        </main>
      </div>

      {/* Form Dialog */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedCenter ? "Modifier le centre de recyclage" : "Ajouter un centre de recyclage"}
            </DialogTitle>
          </DialogHeader>
          <RecyclingCenterForm recyclingCenter={selectedCenter} onSuccess={handleFormSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

