import { CheckCircle2, Search, Recycle, Gift } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Search className="h-10 w-10 text-white" />,
      title: "Find a Collection Point",
      description: "Locate the nearest e-waste collection point using our interactive map.",
    },
    {
      icon: <Recycle className="h-10 w-10 text-white" />,
      title: "Drop Off Your E-Waste",
      description: "Bring your old electronics to the collection point for proper recycling.",
    },
    {
      icon: <CheckCircle2 className="h-10 w-10 text-white" />,
      title: "Get Verified",
      description: "Our team will verify your contribution and update your account.",
    },
    {
      icon: <Gift className="h-10 w-10 text-white" />,
      title: "Earn Rewards",
      description: "Collect points for each item recycled and redeem them for rewards.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="text-lg text-emerald-100 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            Recycling your e-waste with us is simple and rewarding. Follow these easy steps:
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
            >
              <div className="bg-emerald-700/90 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 p-4 bg-emerald-800 rounded-full shadow-md">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-emerald-100">{step.description}</p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-8 w-16 h-1 bg-emerald-400 z-10"></div>
              )}

              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-lg shadow-md">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;