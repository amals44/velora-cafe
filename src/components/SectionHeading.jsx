import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import SplitText from './SplitText.jsx'

export default function SectionHeading({ title, text, light = false }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-20">
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mb-6 block h-px w-16 origin-center bg-gold"
      />
      <h2 className={`text-[clamp(2.4rem,6.2vw,4.75rem)] ${light ? 'text-cream' : 'text-espresso'}`}>
        <SplitText inView lines={[title]} />
      </h2>
      {text && (
        <Reveal delay={0.25}>
          <p className={`mx-auto mt-5 max-w-lg text-lg ${light ? 'text-beige' : 'text-coffee/75'}`}>{text}</p>
        </Reveal>
      )}
    </div>
  )
}
