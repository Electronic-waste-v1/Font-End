"use client"

import { useParams, Link } from "react-router-dom"
import { Calendar, ArrowLeft, MapPin, Clock, Share2, Printer, Download, Tag } from "lucide-react"
import Header from "@/shared/layout//Header"
import Footer from "@/shared/layout/Footer"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import AnnouncementPreview from "../components/AnnouncementPreview"
import NewsletterSignup from "../components/NewsletterSignup"


const announcements = [
  {
    id: "1",
    title: "E-Waste Collection Drive in Central Park",
    excerpt:
      "Join us this weekend for a special e-waste collection event at Central Park. Bring your old electronics and get instant rewards. Our team of experts will be available to answer all your recycling questions.",
    content: `
      <p>We're excited to announce our upcoming E-Waste Collection Drive at Central Park on March 15, 2025. This event is part of our ongoing commitment to responsible electronic waste management and environmental sustainability.</p>
      
      <h3>What to Bring</h3>
      <p>We accept all types of electronic waste, including:</p>
      <ul>
        <li>Computers, laptops, and tablets</li>
        <li>Mobile phones and accessories</li>
        <li>Televisions and monitors</li>
        <li>Printers and scanners</li>
        <li>Small household appliances</li>
        <li>Batteries and light bulbs</li>
      </ul>
      
      <h3>Rewards Program</h3>
      <p>As a thank you for your contribution to a greener planet, you'll receive recycling points for each item you bring. These points can be redeemed for various rewards through our app or website.</p>
      
      <h3>Why Recycle E-Waste?</h3>
      <p>Electronic waste contains hazardous materials that can harm the environment if not disposed of properly. By recycling your e-waste, you're helping to:</p>
      <ul>
        <li>Prevent toxic materials from entering landfills</li>
        <li>Conserve natural resources</li>
        <li>Reduce energy consumption</li>
        <li>Support the circular economy</li>
      </ul>
      
      <p>We hope to see you at the event! Together, we can make a significant impact on reducing electronic waste and protecting our environment for future generations.</p>
    `,
    date: "March 15, 2025",
    imageUrl: "/placeholder.svg?height=600&width=1200&text=E-Waste+Collection+Drive",
    category: "event",
    featured: true,
    location: "Central Park, New York",
    time: "9:00 AM - 3:00 PM",
    author: "EcoRecycle Team",
    tags: ["collection drive", "e-waste", "recycling", "rewards"],
  },
  {
    id: "2",
    title: "New Recycling Center Opening in Downtown",
    excerpt:
      "We're excited to announce the opening of our newest recycling center in downtown. More convenient drop-off options for everyone! The state-of-the-art facility will accept all types of electronic waste.",
    content: `
      <p>We are thrilled to announce the grand opening of our newest recycling center in downtown New York. This state-of-the-art facility represents a significant milestone in our mission to make e-waste recycling accessible to everyone.</p>
      
      <h3>About the New Center</h3>
      <p>The downtown recycling center features:</p>
      <ul>
        <li>Extended operating hours (7 AM - 7 PM, Monday through Saturday)</li>
        <li>Drive-through drop-off service</li>
        <li>Advanced sorting and processing equipment</li>
        <li>Knowledgeable staff to assist with your recycling needs</li>
        <li>Educational displays about the recycling process</li>
      </ul>
      
      <h3>Grand Opening Event</h3>
      <p>Join us for the grand opening celebration on March 10, 2025, from 10 AM to 2 PM. The event will include:</p>
      <ul>
        <li>Ribbon-cutting ceremony at 10:30 AM</li>
        <li>Facility tours throughout the day</li>
        <li>Refreshments and giveaways</li>
        <li>Double recycling points for all items dropped off during the event</li>
      </ul>
      
      <h3>Location and Access</h3>
      <p>The new center is conveniently located at 123 Main Street, with easy access from major public transportation routes. Parking is available on-site for those dropping off larger items.</p>
      
      <p>We look forward to serving the downtown community and making responsible e-waste disposal more convenient than ever before.</p>
    `,
    date: "March 10, 2025",
    imageUrl: "/placeholder.svg?height=600&width=1200&text=New+Recycling+Center",
    category: "news",
    featured: true,
    location: "123 Main Street, Downtown",
    author: "EcoRecycle Team",
    tags: ["recycling center", "grand opening", "e-waste", "downtown"],
  },

]


const relatedAnnouncements = [
  {
    id: "3",
    title: "Partnership with Tech Giant for Sustainable Recycling",
    excerpt:
      "We've partnered with a leading tech company to enhance our recycling processes and offer better rewards for your e-waste.",
    date: "March 5, 2025",
    imageUrl: "/placeholder.svg?height=200&width=400&text=Tech+Partnership",
  },
  {
    id: "4",
    title: "New Mobile App Update Available",
    excerpt:
      "Our mobile app has been updated with new features to make recycling even easier. Track your recycling history, find collection points, and redeem rewards all from your smartphone.",
    date: "February 28, 2025",
    imageUrl: "/placeholder.svg?height=200&width=400&text=App+Update",
  },
  {
    id: "5",
    title: "Recycling Workshop for Schools",
    excerpt:
      "We're hosting a series of workshops for local schools to educate students about the importance of e-waste recycling.",
    date: "February 20, 2025",
    imageUrl: "/placeholder.svg?height=200&width=400&text=School+Workshop",
  },
]

export default function AnnouncementDetailPage() {
  const { id } = useParams<{ id: string }>()

  const announcement = announcements.find((a) => a.id === id)


  if (!announcement) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Announcement Not Found</h1>
            <p className="text-gray-600 mb-8">The announcement you're looking for doesn't exist or has been removed.</p>
            <Link to="/announcements">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Announcements
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "event":
        return <Badge className="bg-blue-500">Event</Badge>
      case "news":
        return <Badge className="bg-purple-500">News</Badge>
      case "update":
        return <Badge className="bg-amber-500">Update</Badge>
      default:
        return <Badge>Other</Badge>
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-emerald-600 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-4">
              <Link to="/announcements" className="text-emerald-100 hover:text-white flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Announcements
              </Link>
            </div>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                {getCategoryBadge(announcement.category)}
                <div className="flex items-center text-emerald-100">
                  <Calendar size={16} className="mr-2" />
                  <span>{announcement.date}</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{announcement.title}</h1>
              {announcement.author && <p className="text-emerald-100">By {announcement.author}</p>}
            </div>
          </div>
        </section>

        {/* Announcement Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {/* Featured Image */}
                <div className="mb-8">
                  <img
                    src={announcement.imageUrl || "/placeholder.svg"}
                    alt={announcement.title}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>

                {/* Event Details (if applicable) */}
                {(announcement.location || announcement.time) && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-8">
                    <h3 className="font-medium text-lg mb-3">Event Details</h3>
                    {announcement.location && (
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin size={18} className="mr-2 text-emerald-500" />
                        <span>{announcement.location}</span>
                      </div>
                    )}
                    {announcement.time && (
                      <div className="flex items-center text-gray-600">
                        <Clock size={18} className="mr-2 text-emerald-500" />
                        <span>{announcement.time}</span>
                      </div>
                    )}

                    <div className="mt-4">
                      <Button className="bg-emerald-500 hover:bg-emerald-600">Add to Calendar</Button>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="prose max-w-none mb-8">
                  <div dangerouslySetInnerHTML={{ __html: announcement.content }} />
                </div>

                {/* Tags */}
                {announcement.tags && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Tag size={16} className="text-gray-500" />
                      {announcement.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share Buttons */}
                <div className="flex items-center gap-3 border-t border-b py-4 my-8">
                  <span className="text-gray-500 text-sm">Share:</span>
                  <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                    <Share2 size={16} />
                    <span className="sr-only">Share</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                    <Printer size={16} />
                    <span className="sr-only">Print</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                    <Download size={16} />
                    <span className="sr-only">Download</span>
                  </Button>
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <div className="bg-gray-50 rounded-lg p-6 mb-8 sticky top-4">
                  <h3 className="font-bold text-lg mb-4">Related Announcements</h3>
                  <div className="space-y-4">
                    {relatedAnnouncements.map((related) => (
                      <div key={related.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <Link to={`/announcements/${related.id}`} className="group">
                          <h4 className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
                            {related.title}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">{related.date}</p>
                        </Link>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link to="/announcements">
                      <Button variant="outline" className="w-full">
                        View All Announcements
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Announcements (Mobile) */}
        <section className="py-8 bg-gray-50 lg:hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Related Announcements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedAnnouncements.slice(0, 2).map((announcement) => (
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
          </div>
        </section>

        {/* Newsletter Section */}
        <NewsletterSignup />
      </main>

      <Footer />
    </div>
  )
}

