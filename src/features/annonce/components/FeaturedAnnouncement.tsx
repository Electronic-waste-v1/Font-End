import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"

interface FeaturedAnnouncementProps {
  id: string
  title: string
  excerpt: string
  date: string
  imageUrl?: string
  category: string
  location?: string
  time?: string
}

export default function FeaturedAnnouncement({
  id,
  title,
  excerpt,
  date,
  imageUrl,
  category,
  location,
  time,
}: FeaturedAnnouncementProps) {
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        {imageUrl && <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-64 object-cover" />}
        <div className="absolute top-4 left-4">{getCategoryBadge(category)}</div>
      </div>

      <div className="p-6">
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <Calendar size={16} className="mr-2" />
          <span>{date}</span>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>

        {(location || time) && (
          <div className="bg-gray-50 p-3 rounded-md mb-4">
            {location && (
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <MapPin size={16} className="mr-2 text-emerald-500" />
                <span>{location}</span>
              </div>
            )}
            {time && (
              <div className="flex items-center text-sm text-gray-600">
                <Clock size={16} className="mr-2 text-emerald-500" />
                <span>{time}</span>
              </div>
            )}
          </div>
        )}

        <Link to={`/announcements/${id}`} className="inline-block">
          <Button className="bg-emerald-500 hover:bg-emerald-600">
            Read More
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

