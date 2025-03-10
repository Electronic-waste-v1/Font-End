"use client"

import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import EwateLogo from "../components/EwateLogo"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
         <EwateLogo width={40} height={40} />
          <span className="text-xl font-bold text-emerald-600">E-Waste</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/announcements" className="text-gray-600 hover:text-emerald-500 transition-colors">
            Announcements
          </Link>
          <Link to="/collection-points" className="text-gray-600 hover:text-emerald-500 transition-colors">
            Collection Points
          </Link>
          <Link to="/rewards" className="text-gray-600 hover:text-emerald-500 transition-colors">
            Rewards
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-emerald-500 transition-colors">
            About Us
          </Link>
          <Link
            to="/login"
            className="ml-4 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
          >
            Login
          </Link>
        </nav>

      
        <button className="md:hidden text-gray-500" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2 flex flex-col">
            <Link
              to="/announcements"
              className="py-2 text-gray-600 hover:text-emerald-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Announcements
            </Link>
            <Link
              to="/collection-points"
              className="py-2 text-gray-600 hover:text-emerald-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Collection Points
            </Link>
            <Link
              to="/rewards"
              className="py-2 text-gray-600 hover:text-emerald-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Rewards
            </Link>
            <Link
              to="/about"
              className="py-2 text-gray-600 hover:text-emerald-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/login"
              className="mt-2 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors inline-block w-fit"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

