import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-gray-900 to-emerald-900 text-white py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          <motion.div
            className="flex-1 space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Recycle Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
                E-Waste
              </span>{" "}
              for a Greener Future
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto lg:mx-0">
              Join our mission to reduce electronic waste and protect the environment. Recycle your old devices and earn
              rewards while making a positive impact.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                to="/collection-points"
                className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/30"
              >
                Find Collection Points
              </Link>
              <Link
                to="/learn-more"
                className="px-6 py-3 bg-transparent border-2 border-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-600/10 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30"
              >
                Learn More
                <ArrowRight size={20} className="inline-block" />
              </Link>
            </div>
          </motion.div>

    
          <motion.div
            className="flex-1 hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-lg mx-auto">
              <img
                src="/images/ewaste.jpg"
                alt="E-waste recycling illustration"
                className="w-full max-h-full rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-gray-900/50 rounded-xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;