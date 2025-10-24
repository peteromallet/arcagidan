export default function AboutSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#0f1922] via-[#11212c] to-[#12202f] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="animate-fade-in">
          <h2 className="text-3xl md:text-4xl text-gray-300 mb-12 text-left font-bodar">
            An excuse to push yourself and open models
          </h2>
          
          <div className="space-y-8 text-gray-200 text-lg leading-relaxed">
            <p className="text-xl">
              We're on the verge of a significant time in human history.
            </p>

            <p className="text-xl">
              If you're here, you probably believe that <strong>open source AI should be an important part of this future.</strong> However, you may also feel powerless to influence this.
            </p>

            <p className="text-xl">
              Art has a power to win hearts and minds, and the open AI art ecosystem <strong>needs people who push its models to their limits</strong> - those who combine the latest cutting edge technology with raw human effort to create things that leverage the unique control that open models offer.
            </p>

            <p className="text-xl">
              While the power of the individual may be limited, the <strong>power of many people creating and sharing increasingly ambitious and deep art</strong> over years should not be underestimated.
            </p>

            <p className="text-xl">
              The Arca Gidan prize aims to provide people within the open source AI art ecosystem with <strong>a reason to try to make something better than anything they've made before.</strong> Over the years, we hope that it nudges people down the road towards making legitimate masterpieces.
            </p>

            <p className="text-xl">
              In doing so, we hope to <strong>honour those whose work and passion preceded the Renaissance</strong> in the hopes that our collected art and struggle over the years might increase the odds that we have a flourishing ecosystem of open models.
            </p>

            <p className="text-xl">
              Our first edition is humble, but we hope you'll participate.
            </p>

            <p className="text-xl">
              Winners will be <strong>invited to present their work at ADOS LA</strong>, hosted at the legendary Mack Sennett studios in Hollywood.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

