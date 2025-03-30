import { Calendar, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

interface AnnouncementPreviewProps {
  id: string
  title: string
  excerpt: string
  date: string
  imageUrl?: string
}

const AnnouncementPreview = ({ id, title, excerpt, date, imageUrl }: AnnouncementPreviewProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {imageUrl && <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />}
      <div className="p-6">
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <Calendar size={16} className="mr-2" />
          <span>{date}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <Link
          to={`/announcements/${id}`}
          className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors flex items-center gap-1"
        >
          Read More
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}

export default AnnouncementPreview

