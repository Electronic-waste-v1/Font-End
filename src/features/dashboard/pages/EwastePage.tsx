"use client"

import { useState } from "react"
import Header from "../components/DashboardHeader"
import Sidebar from "../components/DashboardSidebar"
import { EwastePage as EwasteContent } from "@/features/ewaste"

export default function DashboardEwastePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <EwasteContent />
          </div>
        </main>
      </div>
    </div>
  )
}

