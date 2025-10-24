import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Play, MessageCircle } from 'lucide-react'

export default function Footer() {
  // Deadline: Sunday, November 2, 2025 at 6:00 PM UTC
  const getDeadline = () => {
    return new Date(Date.UTC(2025, 10, 2, 18, 0, 0)) // Month is 0-indexed, so 10 = November, 18 = 6pm
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = +getDeadline() - +new Date()
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <footer className="py-16 px-6 bg-gradient-to-b from-[#11202d] via-[#0e1922] to-[#08111a] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Countdown Timer */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl text-white mb-2 font-bodar">
            Submission Deadline
          </h3>
          <p className="text-gray-400 text-lg mb-8">
            Sunday, November 2 at 6:00 PM UTC
          </p>
          
          <div className="flex justify-center gap-4 md:gap-8 mb-12">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col items-center">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 md:p-6 min-w-[80px] md:min-w-[100px]">
                  <span className="text-3xl md:text-5xl text-white tabular-nums">
                    {unit.value.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="text-gray-400 text-sm md:text-base mt-2">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6"
              onClick={() => window.open('#', '_blank')}
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Trailer
            </Button>
            <Button
              size="lg"
              className="bg-white/10 text-white border border-white/30 hover:bg-white/20 text-lg px-8 py-6"
              onClick={() => window.open('https://discord.gg/Yj7DRvckRu', '_blank')}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Join Discord
            </Button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center pt-8 border-t border-white/10">
          <p className="text-gray-400 text-sm mb-2">
            © 2025 Arca Gidan Prize. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Celebrating innovation in open source AI art
          </p>
        </div>
      </div>
    </footer>
  )
}

