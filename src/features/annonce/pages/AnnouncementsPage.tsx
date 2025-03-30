"use client"

import { useState } from "react"
import { Search, Calendar, Tag, ChevronDown } from "lucide-react"
import Header from "@/shared/layout/Header"
import Footer from "@/shared/layout//Footer"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import AnnouncementPreview from "../components/AnnouncementPreview"
import FeaturedAnnouncement from "../components/FeaturedAnnouncement"
import NewsletterSignup from "../components/NewsletterSignup"

const announcements = [
  {
    id: "1",
    title: "E-Waste Collection Drive in Central Park",
    excerpt:
      "Join us this weekend for a special e-waste collection event at Central Park. Bring your old electronics and get instant rewards. Our team of experts will be available to answer all your recycling questions.",
    date: "March 15, 2025",
    imageUrl: "/placeholder.svg?height=400&width=800&text=E-Waste+Collection+Drive",
    category: "event",
    featured: true,
    location: "Central Park, New York",
    time: "9:00 AM - 3:00 PM",
  },
  {
    id: "2",
    title: "New Recycling Center Opening in Downtown",
    excerpt:
      "We're excited to announce the opening of our newest recycling center in downtown. More convenient drop-off options for everyone! The state-of-the-art facility will accept all types of electronic waste.",
    date: "March 10, 2025",
    imageUrl: "/placeholder.svg?height=400&width=800&text=New+Recycling+Center",
    category: "news",
    featured: true,
  },
  {
    id: "3",
    title: "Partnership with Tech Giant for Sustainable Recycling",
    excerpt:
      "We've partnered with a leading tech company to enhance our recycling processes and offer better rewards for your e-waste. This collaboration will help us implement cutting-edge recycling technologies.",
    date: "March 5, 2025",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Tech+Partnership",
    category: "news",
    featured: false,
  },
  {
    id: "4",
    title: "New Mobile App Update Available",
    excerpt:
      "Our mobile app has been updated with new features to make recycling even easier. Track your recycling history, find collection points, and redeem rewards all from your smartphone.",
    date: "February 28, 2025",
    imageUrl: "/placeholder.svg?height=400&width=800&text=App+Update",
    category: "update",
    featured: false,
  },
  {
    id: "5",
    title: "Recycling Workshop for Schools",
    excerpt:
      "We're hosting a series of workshops for local schools to educate students about the importance of e-waste recycling. Teachers can register their classes for this interactive learning experience.",
    date: "February 20, 2025",
    imageUrl: "/placeholder.svg?height=400&width=800&text=School+Workshop",
    category: "event",
    featured: false,
    location: "Various Schools",
    time: "During School Hours",
  },
  {
    id: "6",
    title: "Annual Sustainability Report Released",
    excerpt:
      "Our annual sustainability report is now available, highlighting our achievements in e-waste management and environmental impact reduction over the past year.",
    date: "February 15, 2025",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Sustainability+Report",
    category: "news",
    featured: false,
  },
  {
    id: "7",
    title: "Holiday Schedule for Collection Centers",
    excerpt:
      "Check the updated schedule for our collection centers during the upcoming holiday season. Some locations will have modified hours.",
    date: "February 10, 2025",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Holiday+Schedule",
    category: "update",
    featured: false,
  },
  {
    id: "8",
    title: "Community Cleanup Initiative",
    excerpt:
      "Join our community cleanup initiative this month. We're organizing teams to clean up electronic waste from public spaces and educate residents about proper disposal methods.",
    date: "February 5, 2025",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Community+Cleanup",
    category: "event",
    featured: false,
    location: "Multiple Locations",
    time: "Weekends, 10:00 AM - 2:00 PM",
  },
  {
    id: "9",
    title: "New Reward Partners Announced",
    excerpt:
      "We've added five new partners to our rewards program. Recycle your e-waste and earn points that can be redeemed for products and services from these eco-friendly businesses.",
    date: "January 25, 2025",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Reward+Partners",
    category: "news",
    featured: false,
  },
  {
    id: "10",
    title: "E-Waste Recycling Statistics for 2024",
    excerpt:
      "Take a look at the impact we've made together in 2024. Our community recycled over 500 tons of electronic waste, preventing harmful materials from entering landfills.",
    date: "January 15, 2025",
    imageUrl: "/placeholder.svg?height=400&width=800&text=2024+Statistics",
    category: "news",
    featured: false,
  },
]

export default function AnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [visibleCount, setVisibleCount] = useState(6)

 
  const filteredAnnouncements = announcements.filter((announcement) => {
 
    if (
      searchTerm &&
      !announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !announcement.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

  
    if (categoryFilter !== "all" && announcement.category !== categoryFilter) {
      return false
    }

   
    if (dateFilter === "recent") {
    
      return announcements.indexOf(announcement) < 5
    }

    return true
  })


  const featuredAnnouncements = filteredAnnouncements.filter((announcement) => announcement.featured)

   const regularAnnouncements =
    featuredAnnouncements.length > 0
      ? filteredAnnouncements.filter((announcement) => !announcement.featured)
      : filteredAnnouncements

  
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-emerald-600 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Announcements & Updates</h1>
              <p className="text-lg text-emerald-100">
                Stay informed about our latest e-waste collection events, recycling initiatives, and program updates.
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search announcements..."
                    className="pl-10 pr-4 py-2 w-full md:w-80"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="event">Events</SelectItem>
                      <SelectItem value="news">News</SelectItem>
                      <SelectItem value="update">Updates</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="recent">Recent (Last 30 Days)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="news">News & Updates</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Featured Announcements */}
        {featuredAnnouncements.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Featured Announcements</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredAnnouncements.slice(0, 2).map((announcement) => (
                  <FeaturedAnnouncement
                    key={announcement.id}
                    id={announcement.id}
                    title={announcement.title}
                    excerpt={announcement.excerpt}
                    date={announcement.date}
                    imageUrl={announcement.imageUrl}
                    category={announcement.category}
                    location={announcement.location}
                    time={announcement.time}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Announcements */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">All Announcements</h2>
              <div className="text-sm text-gray-500">
                Showing {Math.min(visibleCount, regularAnnouncements.length)} of {regularAnnouncements.length}{" "}
                announcements
              </div>
            </div>

            {regularAnnouncements.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500">No announcements found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("")
                    setCategoryFilter("all")
                    setDateFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularAnnouncements.slice(0, visibleCount).map((announcement) => (
                    <AnnouncementPreview
                      key={announcement.id}
                      id={announcement.id}
                      title={announcement.title}
                      excerpt={announcement.excerpt}
                      date={announcement.date}
                      imageUrl={announcement.imageUrl}
                    />
                  ))}
                </div>

                {visibleCount < regularAnnouncements.length && (
                  <div className="mt-12 text-center">
                    <Button onClick={handleLoadMore} className="px-8">
                      Load More
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <NewsletterSignup />
      </main>

      <Footer />
    </div>
  )
}

