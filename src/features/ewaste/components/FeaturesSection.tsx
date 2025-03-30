import { Megaphone, Trash2, Gift } from "lucide-react"
import { Link } from "react-router-dom"

const FeaturesSection = () => {
  const features = [
    {
      icon: <Megaphone className="h-12 w-12 text-emerald-500" />,
      title: "Announcements",
      description:
        "Stay updated with the latest news, collection drives, and e-waste management initiatives in your area.",
      link: "/announcements",
      linkText: "View Announcements",
    },
    {
      icon: <Trash2 className="h-12 w-12 text-emerald-500" />,
      title: "E-Waste Collection",
      description: "Find convenient drop-off locations or schedule a pickup for your electronic waste items.",
      link: "/collection-points",
      linkText: "Find Collection Points",
    },
    {
      icon: <Gift className="h-12 w-12 text-emerald-500" />,
      title: "Rewards Program",
      description: "Earn points for every item you recycle and redeem them for exciting rewards and discounts.",
      link: "/rewards",
      linkText: "Explore Rewards",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We make e-waste recycling easy, accessible, and rewarding for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-emerald-50 rounded-full">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <Link
                  to={feature.link}
                  className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                >
                  {feature.linkText} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

