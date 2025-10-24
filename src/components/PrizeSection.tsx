import { Trophy, Building2, Award } from 'lucide-react'

export default function PrizeSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#12202f] via-[#11202d] to-[#12202f] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-bl from-yellow-500/5 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Main Title */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-6 font-bodar">
            The Prize
          </h2>
          
          {/* Main Prize Description */}
          <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 border border-yellow-500/30 rounded-2xl p-12 mb-16">
            <p className="text-3xl md:text-4xl text-white leading-relaxed text-center mb-2">
              Four winners fly to LA to show their work{' '}
              <a 
                href="https://ados.events/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-300 underline transition-colors"
              >
                ADOS LA
              </a>
            </p>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed text-center">
              at the legendary{' '}
              <span className="text-yellow-400">Mack Sennett Studios</span>
            </p>
            <div className="mt-8 flex items-center justify-center gap-3 md:gap-6 text-gray-300">
              <span className="text-lg">Flights</span>
              <span className="text-gray-500">|</span>
              <span className="text-lg">Accommodation</span>
              <span className="text-gray-500">|</span>
              <span className="text-lg">Expenses Stipend</span>
            </div>
          </div>
        </div>

        {/* Winner Categories */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Top Two Overall */}
          <div className="bg-white/5 border border-white/20 rounded-xl p-8">
            <h3 className="text-2xl md:text-3xl text-white mb-4 text-center font-bodar">
              Top two overall
            </h3>
            <p className="text-gray-300 text-center text-lg">
              By public vote + judges
            </p>
          </div>

          {/* Top 2 by Tool */}
          <div className="bg-white/5 border border-white/20 rounded-xl p-8">
            <h3 className="text-2xl md:text-3xl text-white mb-4 text-center font-bodar">
              Top 2 by Tool
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-300">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <a 
                  href="https://www.comfy.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-base md:text-lg hover:text-yellow-400 transition-colors underline"
                >
                  Comfy
                </a>
              </div>
              <span className="hidden md:inline text-gray-500">|</span>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <a 
                  href="http://reigh.art/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-base md:text-lg hover:text-yellow-400 transition-colors underline"
                >
                  Reigh
                </a>
              </div>
              <span className="hidden md:inline text-gray-500">|</span>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <a 
                  href="mailto:peter@omalley.io?subject=I'd%20like%20to%20sponsor%20a%20prize%20for%20my%20tool" 
                  className="text-base md:text-lg hover:text-yellow-400 transition-colors underline"
                >
                  Your Tool?
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Toblerone Prize */}
        <div className="text-center mb-20">
          <p className="text-gray-300 text-xl">
            Winners will also each receive 1{' '}
            <span className="relative inline-block group cursor-help">
              <span className="underline decoration-dotted decoration-yellow-400/50">giant Toblerone</span>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <img 
                  src="/toblerone.webp" 
                  alt="Giant Toblerone" 
                  className="rounded-lg shadow-2xl border-2 border-yellow-400/30"
                  style={{ maxWidth: '200px', height: 'auto' }}
                />
              </span>
            </span>
            {' '}as their trophy
          </p>
        </div>

        {/* Sponsors Section */}
        <div className="text-center">
          <h3 className="text-2xl text-gray-400 mb-8 font-bodar">
            Sponsored by
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <a 
              href="https://www.comfy.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-36 h-[4.5rem] flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <img 
                src="/comfyui.png" 
                alt="ComfyUI" 
                className="max-w-full max-h-full object-contain"
              />
            </a>
            <a 
              href="https://banodoco.ai/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-48 h-24 flex items-center justify-center hover:opacity-80 transition-opacity mt-[10px]"
            >
              <img 
                src="/banodoco.png" 
                alt="Banodoco" 
                className="max-w-full max-h-full object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

