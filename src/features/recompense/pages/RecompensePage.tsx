"use client"

import { useState } from "react"
import { Gift, Plus } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import Header from "@/features/dashboard/components/DashboardHeader"
import Sidebar from "@/features/dashboard/components/DashboardSidebar"
import RecompenseList from "../components/RecompenseList"
import RecompenseForm from "../components/RecompenseForm"

export default function RecompensePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleCreateSuccess = () => {
    setIsCreateDialogOpen(false)
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
                  <Gift className="mr-2 h-6 w-6 text-emerald-500" />
                  Rewards Management
                </h1>
                <p className="text-gray-500 mt-1">Create and manage rewards for your users</p>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Reward
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] bg-white">
                  <DialogHeader>
                    <DialogTitle>Create New Reward</DialogTitle>
                  </DialogHeader>
                  <RecompenseForm onSuccess={handleCreateSuccess} />
                </DialogContent>
              </Dialog>
            </div>

            {/* Rewards List */}
            <RecompenseList />
          </div>
        </main>
      </div>
    </div>
  )
}

