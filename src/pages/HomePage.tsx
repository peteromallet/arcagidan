import { useRef } from 'react'
import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import ThemesSection from '@/components/ThemesSection'
import PrizeSection from '@/components/PrizeSection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  const aboutSectionRef = useRef<HTMLElement>(null)

  const handleScrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-black">
      <Hero onScrollClick={handleScrollToAbout} />
      <AboutSection ref={aboutSectionRef} />
      <ThemesSection />
      <PrizeSection />
      <FAQSection />
      <Footer />
    </main>
  )
}

