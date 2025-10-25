import { useRef, useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import ThemesSection from '@/components/ThemesSection'
import PrizeSection from '@/components/PrizeSection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'
import { usePreloader } from '@/lib/usePreloader'

export default function HomePage() {
  const aboutSectionRef = useRef<HTMLElement>(null)
  const { isLoading, progress } = usePreloader()
  const [showContent, setShowContent] = useState(false)

  const handleScrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (!isLoading) {
      // Small delay before showing content for smooth transition
      const timer = setTimeout(() => setShowContent(true), 300)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  return (
    <>
      {/* Loading Screen */}
      {!showContent && (
        <div
          className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center transition-opacity duration-500 ${
            isLoading ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-32 h-32 mb-8 overflow-hidden flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Arca Gidan Prize Logo"
              className="brightness-0 invert animate-pulse"
              style={{
                width: '140%',
                height: 'auto',
                marginTop: '-15%',
              }}
            />
          </div>
          <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white mt-4 text-sm">{Math.round(progress)}%</p>
        </div>
      )}

      {/* Main Content */}
      <main className="min-h-screen bg-black">
        <Hero onScrollClick={handleScrollToAbout} />
        <AboutSection ref={aboutSectionRef} />
        <ThemesSection />
        <PrizeSection />
        <FAQSection />
        <Footer />
      </main>
    </>
  )
}

