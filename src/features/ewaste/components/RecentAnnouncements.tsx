import { Link } from "react-router-dom"


const RecentAnnouncements = () => {

  const announcements = [
    {
      id: "1",
      title: "E-Waste Collection Drive in Central Park",
      excerpt:
        "Join us this weekend for a special e-waste collection event at Central Park. Bring your old electronics and get instant rewards.",
      date: "March 15, 2025",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "2",
      title: "New Recycling Center Opening in Downtown",
      excerpt:
        "We're excited to announce the opening of our newest recycling center in downtown. More convenient drop-off options for everyone!",
      date: "March 10, 2025",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "3",
      title: "Partnership with Tech Giant for Sustainable Recycling",
      excerpt:
        "We've partnered with a leading tech company to enhance our recycling processes and offer better rewards for your e-waste.",
      date: "March 5, 2025",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Recent Announcements</h2>
          <Link to="/announcements" className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {announcements.map((announcement) => (
                <div key={announcement.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="h-40 mb-4">
                    <img src={announcement.imageUrl} alt={announcement.title} className="w-full h-full object-cover rounded-lg" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{announcement.title}</h3>
                <p className="text-gray-600 mb-4">{announcement.excerpt}</p>
                <p className="text-sm text-gray-500">{announcement.date}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default RecentAnnouncements

