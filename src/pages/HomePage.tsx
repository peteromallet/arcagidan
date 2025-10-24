import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import ThemesSection from '@/components/ThemesSection'
import PrizeSection from '@/components/PrizeSection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <AboutSection />
      <ThemesSection />
      <PrizeSection />
      <FAQSection />
      <Footer />
    </main>
  )
}

