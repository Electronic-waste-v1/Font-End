import Header from "../../../shared/layout/Header"
import Footer from "../../../shared/layout/Footer"
import HeroSection from "../components/HeroSection"
import FeaturesSection from "../components/FeaturesSection"
import StatsSection from "../components/StatsSection"
import HowItWorksSection from "../components/HowItWorksSection"
import RecentAnnouncements from "../components/RecentAnnouncements"
import CTASection from "../components/CTASection"

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <HowItWorksSection />
        <RecentAnnouncements />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage

