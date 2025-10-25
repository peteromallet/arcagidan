import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

interface VideoPanel {
  id: number
  title: string
  titleHighlight: { before: string; highlight: string; after: string }
  description: string
  videoUrl: string
  posterUrl: string
}

interface HeroProps {
  onScrollClick: () => void
}

const videoPanels: VideoPanel[] = [
  {
    id: 1,
    title: 'Francesco Petrarca',
    titleHighlight: { before: 'Francesco Petr', highlight: 'ar', after: 'ca' },
    description: 'Father of Humanism. Rediscoverer of classical texts. Believer in human potential. Master of introspective poetry.',
    videoUrl: '/10217.mp4',
    posterUrl: '/10217-poster.jpg',
  },
  {
    id: 2,
    title: 'Arnolfo di Cambio',
    titleHighlight: { before: 'Arnolfo di ', highlight: 'Ca', after: 'mbio' },
    description: 'Architect of legends. Designer of the Florence Cathedral and Palazzo Vecchio. Builder of foundations that shaped a city.',
    videoUrl: '/10219.mp4',
    posterUrl: '/10219-poster.jpg',
  },
      {
        id: 3,
        title: 'Giotto di Bondone',
        titleHighlight: { before: '', highlight: 'Gi', after: 'otto di Bondone' },
        description: 'Father of Renaissance painting. First to break from medieval tradition. Pioneer of depicting human emotion, naturalism, and dimensional space in art.',
        videoUrl: '/102110.mp4',
        posterUrl: '/102110-poster.jpg',
      },
  {
    id: 4,
    title: 'Jean Buridan',
    titleHighlight: { before: 'Jean Buri', highlight: 'dan', after: '' },
    description: 'Revolutionary philosopher. Pioneer of the theory of impetus. Challenger of Aristotle. Forerunner to modern physics.',
    videoUrl: '/102111.mp4',
    posterUrl: '/102111-poster.jpg',
  },
]

export default function Hero({ onScrollClick }: HeroProps) {
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null)
  // Initialize isMobile synchronously to prevent flash on mount
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' && window.innerWidth < 768
  )
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({})

  useEffect(() => {
    // Use matchMedia for more efficient mobile detection
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches)
    }
    
    // Set initial value
    handleChange(mediaQuery)
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (hoveredPanel !== null && videoRefs.current[hoveredPanel]) {
      videoRefs.current[hoveredPanel]?.play()
    }
    
    // Pause all other videos
    Object.keys(videoRefs.current).forEach((key) => {
      const id = parseInt(key)
      if (id !== hoveredPanel && videoRefs.current[id]) {
        videoRefs.current[id]?.pause()
      }
    })
  }, [hoveredPanel])

  return (
    <section className="relative w-full overflow-hidden" style={{ height: isMobile ? '100dvh' : '100vh' }}>
      {/* Video Panels Grid */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-1">
        {videoPanels.map((panel) => (
          <div
            key={panel.id}
            className="relative overflow-hidden group cursor-pointer"
            style={{ WebkitTapHighlightColor: 'transparent' }}
            onMouseEnter={() => !isMobile && setHoveredPanel(panel.id)}
            onMouseLeave={() => !isMobile && setHoveredPanel(null)}
            onClick={() => {
              if (isMobile) {
                // On mobile, just play/pause the video without changing hover state
                const video = videoRefs.current[panel.id]
                if (video) {
                  if (video.paused) {
                    video.play()
                  } else {
                    video.pause()
                  }
                }
              }
            }}
          >
            {/* Video Background */}
            <video
              ref={(el) => (videoRefs.current[panel.id] = el)}
              className={cn(
                'absolute inset-0 w-full h-full object-cover',
                isMobile 
                  ? 'brightness-[0.3]' 
                  : cn(
                      'transition-all duration-500',
                      hoveredPanel === panel.id
                        ? 'brightness-100 scale-105'
                        : 'brightness-[0.3] scale-100'
                    )
              )}
              src={panel.videoUrl}
              poster={panel.posterUrl}
              loop
              muted
              playsInline
            />

            {/* Hover Overlay Background - Hidden on mobile */}
            {!isMobile && (
              <div
                className={cn(
                  'absolute left-0 right-0 bottom-0 transition-opacity duration-300 z-10',
                  hoveredPanel === panel.id ? 'opacity-100' : 'opacity-0'
                )}
                style={{ top: '47%', background: 'rgba(255, 255, 255, 0.45)' }}
              />
            )}

            {/* Hover Overlay Text - Hidden on mobile */}
            {!isMobile && (
              <div
                className={cn(
                  'absolute left-0 right-0 flex flex-col items-center px-8 transition-opacity duration-300 z-20',
                  hoveredPanel === panel.id ? 'opacity-100' : 'opacity-0'
                )}
                style={{ top: '50%' }}
              >
                <h3 className="text-2xl md:text-3xl mb-3 font-bodar text-center">
                  <span className="text-black">{panel.titleHighlight.before}</span>
                  <span className="text-black font-bold">{panel.titleHighlight.highlight}</span>
                  <span className="text-black">{panel.titleHighlight.after}</span>
                </h3>
                <p className="text-black text-sm md:text-base font-semibold text-center max-w-md leading-relaxed">
                  {panel.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Logo at top center */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
        <div className="w-24 h-24 md:w-28 md:h-28 overflow-hidden flex items-center justify-center">
          <img
            src="/logo.png"
            alt="Arca Gidan Prize Logo"
            className="brightness-0 invert"
            style={{ 
              width: '140%',
              height: 'auto',
              marginTop: '-15%'
            }}
          />
        </div>
      </div>

          {/* Title - Centered over entire section */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {/* Stacked version - shown when not hovering */}
            <div className={cn(
              "absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-out"
            )}>
              <div className={cn(
                "text-white text-2xl md:text-3xl lg:text-4xl font-bodar tracking-[0.5em] -mr-[0.5em] text-center whitespace-nowrap mb-4 transition-all duration-500 ease-out",
                hoveredPanel !== null ? "opacity-0 -translate-y-8" : "opacity-100 translate-y-0"
              )}>
                THE
              </div>
              <h1 className={cn(
                "text-5xl md:text-6xl lg:text-7xl font-bodar text-center whitespace-nowrap flex gap-6 transition-all duration-500 ease-out",
                hoveredPanel !== null ? "opacity-0 scale-95" : "opacity-100 scale-100"
              )}>
                <div className="flex">
                  <span className="tracking-widest text-white">AR</span>
                  <span className="tracking-widest text-white">CA</span>
                </div>
                <div className="flex">
                  <span className="tracking-widest text-white">GI</span>
                  <span className="tracking-widest text-white">DAN</span>
                </div>
              </h1>
              <div className={cn(
                "text-white text-2xl md:text-3xl lg:text-4xl font-bodar tracking-[0.5em] -mr-[0.5em] text-center whitespace-nowrap mt-4 transition-all duration-500 ease-out",
                hoveredPanel !== null ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
              )}>
                PRIZE
              </div>
            </div>
            
            {/* Horizontal version - shown when hovering, words over quadrants */}
            <div className={cn(
              "absolute inset-0 grid grid-cols-4 items-center -translate-y-16 transition-all duration-500 ease-out",
              hoveredPanel !== null ? "opacity-100" : "opacity-0"
            )}>
              {/* THE - over first quadrant */}
              <div className={cn(
                "flex justify-center transition-all duration-500 ease-out",
                hoveredPanel !== null ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              )}>
                <span className="text-white text-5xl md:text-6xl lg:text-7xl font-bodar tracking-widest whitespace-nowrap">
                  THE
                </span>
              </div>
              
              {/* ARCA - over second quadrant */}
              <div className={cn(
                "flex justify-center transition-all duration-500 ease-out",
                hoveredPanel !== null ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              )}>
                <div className="flex">
                  <span className={cn(
                    "text-5xl md:text-6xl lg:text-7xl font-bodar tracking-widest transition-all duration-300",
                    hoveredPanel === 1 ? "text-yellow-300 scale-110" : "text-white"
                  )}>AR</span>
                  <span className={cn(
                    "text-5xl md:text-6xl lg:text-7xl font-bodar tracking-widest transition-all duration-300",
                    hoveredPanel === 2 ? "text-yellow-300 scale-110" : "text-white"
                  )}>CA</span>
                </div>
              </div>
              
              {/* GIDAN - over third quadrant */}
              <div className={cn(
                "flex justify-center transition-all duration-500 ease-out",
                hoveredPanel !== null ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              )}>
                <div className="flex">
                  <span className={cn(
                    "text-5xl md:text-6xl lg:text-7xl font-bodar tracking-widest transition-all duration-300",
                    hoveredPanel === 3 ? "text-yellow-300 scale-110" : "text-white"
                  )}>GI</span>
                  <span className={cn(
                    "text-5xl md:text-6xl lg:text-7xl font-bodar tracking-widest transition-all duration-300",
                    hoveredPanel === 4 ? "text-yellow-300 scale-110" : "text-white"
                  )}>DAN</span>
                </div>
              </div>
              
              {/* PRIZE - over fourth quadrant */}
              <div className={cn(
                "flex justify-center transition-all duration-500 ease-out",
                hoveredPanel !== null ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              )}>
                <span className="text-white text-5xl md:text-6xl lg:text-7xl font-bodar tracking-widest whitespace-nowrap">
                  PRIZE
                </span>
              </div>
            </div>
          </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-0 right-0 z-20 animate-bounce flex justify-center cursor-pointer"
        onClick={(e) => {
          e.stopPropagation()
          onScrollClick()
        }}
      >
        {isMobile ? (
          <ChevronDown className="w-8 h-8 text-white" />
        ) : (
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full"></div>
          </div>
        )}
      </div>
    </section>
  )
}

