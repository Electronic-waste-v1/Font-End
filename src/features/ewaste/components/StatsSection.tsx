import { Recycle, Award, Users, MapPin } from "lucide-react"

const StatsSection = () => {
  const stats = [
    {
      icon: <Recycle className="h-10 w-10 text-emerald-500" />,
      value: "50+",
      label: "Tons of E-Waste Recycled",
      description: "We've helped recycle over 50 tons of electronic waste since our inception.",
    },
    {
      icon: <Users className="h-10 w-10 text-emerald-500" />,
      value: "10,000+",
      label: "Active Users",
      description: "Join our growing community of environmentally conscious individuals.",
    },
    {
      icon: <MapPin className="h-10 w-10 text-emerald-500" />,
      value: "100+",
      label: "Collection Points",
      description: "Conveniently located collection points across the country.",
    },
    {
      icon: <Award className="h-10 w-10 text-emerald-500" />,
      value: "₹500,000+",
      label: "Rewards Distributed",
      description: "We've given back to our users through our rewards program.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Impact</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Together, we're making a significant difference in reducing e-waste and protecting our environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{stat.icon}</div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                <h4 className="text-lg font-semibold text-emerald-600 mb-2">{stat.label}</h4>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection

