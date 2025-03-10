import { Link } from "react-router-dom"
import {  Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import EwateLogo from "../components/EwateLogo"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    
          <div>
            <div className="flex items-center gap-2 mb-4">
              <EwateLogo width={40} height={40} />
              <span className="text-xl font-bold text-white">E-Waste</span>
            </div>
            <p className="text-gray-300 mb-4">
              Making e-waste recycling accessible and rewarding for everyone. Join us in creating a sustainable future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/collection-points" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Collection Points
                </Link>
              </li>
              <li>
                <Link to="/rewards" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Rewards Program
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

         
         
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/e-waste-collection" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  E-Waste Collection
                </Link>
              </li>
              <li>
                <Link to="/corporate-recycling" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Corporate Recycling
                </Link>
              </li>
              <li>
                <Link to="/data-destruction" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Data Destruction
                </Link>
              </li>
              <li>
                <Link to="/recycling-education" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Recycling Education
                </Link>
              </li>
            </ul>
          </div>

      
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5" />
                <span className="text-gray-300">123 Green Street, Eco City, EC 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-300">contact@ecorecycle.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} EcoRecycle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

