import { useRef, useState, useEffect } from 'react'

interface Theme {
  title: string
  description: string
  video: string
}

const themes: Theme[] = [
  {
    title: 'The way I see it...',
    description: 'Your unique perspective on the world through AI art. Show us your vision.',
    video: '/way-i-see-it.mp4',
  },
  {
    title: 'Fernweh',
    description: 'Reimagine the past through the lens of tomorrow. Memory meets machine.',
    video: '/fernweh.mp4',
  },
  {
    title: 'In the year 2085,',
    description: 'Paint the future. What will our world look like? How will art evolve?',
    video: '/2085.mp4',
  },
]

export default function ThemesSection() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === hoveredIndex) {
          video.play()
        } else {
          video.pause()
          video.currentTime = 0
        }
      }
    })
  }, [hoveredIndex])

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#12202f] via-[#13222f] to-[#12202f] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl text-white mb-4 text-center font-bodar">
          Themes
        </h2>
        <p className="text-gray-400 text-xl mb-16 text-center">
          Choose one theme to explore with your work
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {themes.map((theme, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all duration-300 group-hover:scale-105 h-full">
                <div className="flex gap-6">
                  {/* Video Square */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden border border-white/20 flex-shrink-0">
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={theme.video}
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-2xl md:text-3xl text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all font-bodar">
                      {theme.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mt-4">
                  {theme.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

