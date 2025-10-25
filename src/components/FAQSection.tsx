import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'Who can participate in the Arca Gidan Prize?',
    answer: 'Any artist working with open source AI art models is welcome to participate - or even those who are looking for a reason to start creating.',
  },
  {
    question: 'How are winners determined?',
    answer: (
      <>
        Winners are determined through a combination of public voting with judge input. All voters can vote at least five times.{' '}
        <a 
          href="https://banodoco.ai/pages/ownership.html" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-yellow-400 hover:text-yellow-300 underline transition-colors"
        >
          Banadoco owners
        </a>
        {' '}- long-time contributors and artists in the space - will receive a voting multiplier. We retain the discretion to eliminate votes that appear to be spam or made with poor intent, based on factors such as Discord account age and voting patterns. While this is subjective, it aims to ensure a fair and authentic voting process.
      </>
    ),
  },
  {
    question: 'What models qualify as "open source AI art models"?',
    answer: 'Open source AI art models are models with open weights, such as Stable Diffusion, Flux, and similar models. The weights must be publicly available. We\'re looking for work that leverages the unique control and customization that open models offer.',
  },
  {
    question: 'Can I use closed models at all?',
    answer: 'While we won\'t strictly enforce, we have a gentleman\'s agreement that at least 75% is with open models.',
  },
  {
    question: 'What are the requirements?',
    answer: (
      <>
        Your entry must follow these general guidelines:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Length: 1–3 minutes.</li>
          <li>Mostly use open models: While you can use closed models for specific parts of your workflow, the majority of your work should leverage open source AI models.</li>
          <li>You take responsibility for content: Ensure your submission doesn't violate laws or contain inappropriate content.</li>
          <li>No porn, non-pornographic nudity okay</li>
          <li>Must follow one theme reasonably closely</li>
        </ul>
      </>
    ),
  },
  {
    question: 'How do I submit my work?',
    answer: (
      <>
        Submissions will open soon. You'll be able to upload your artwork along with a description of your creative process, the tools and models used, and how you pushed them to their limits.{' '}
        <a 
          href="https://discord.gg/Yj7DRvckRu" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-yellow-400 hover:text-yellow-300 underline transition-colors"
        >
          Join our Discord
        </a>
        {' '}to be notified when submissions open.
      </>
    ),
  },
  {
    question: 'What are the themes?',
    answer: 'See above!',
  },
  {
    question: 'Can I submit multiple entries?',
    answer: 'Yes! You can submit multiple works, though each should represent a distinct artistic exploration. We encourage you to choose your strongest pieces that best represent your vision and push the boundaries of what\'s possible.',
  },
  {
    question: 'Is there an entry fee?',
    answer: 'No, the Arca Gidan Prize is completely free to enter.',
  },
  {
    question: 'What tools can I use?',
    answer: 'You can use any tool - the \'open source\' requirement is on the underlying models. The tool-specific prizes will be awarded to the best work created primarily with ComfyUI or Reigh, with the overall prizes going to the best work regardless of tool used.',
  },
  {
    question: 'What if I can\'t fly to LA on those dates?',
    answer: 'We\'ll instead invite you to show it at our next event in Paris, most likely in Spring.',
  },
]

export default function FAQSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#12202f] via-[#13212f] to-[#11202d] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl text-white mb-12 text-center font-bodar">
          Frequently Asked Questions
        </h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
              <AccordionTrigger className="text-left text-white text-lg hover:text-gray-300">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

