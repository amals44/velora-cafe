import { motion, useReducedMotion } from 'framer-motion'
import { Award, Coffee, Flame } from 'lucide-react'
import Img from './Img.jsx'
import { images } from '../data/menuItems.js'

const ease = [0.22, 1, 0.36, 1]
const view = { once: true, margin: '-100px' }

const features = [
  { icon: Flame, title: 'Freshly Roasted', text: 'Small batches, roasted often, so every bag arrives at its aromatic best.' },
  { icon: Coffee, title: 'Carefully Brewed', text: 'Each cup is brewed to order, with careful extraction and fresh milk.' },
  { icon: Award, title: 'Quality Beans', text: 'Specialty beans, sourced with care and chosen for depth and balance.' },
]

export default function OurCoffee() {
  const reduce = useReducedMotion()

  // With reduced motion, everything simply appears: no travel, no scaling, no stagger.
  const group = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.1 } } }
  const item = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.9, ease } },
  }

  return (
    <section aria-labelledby="our-coffee-heading" className="grain relative isolate overflow-hidden bg-coffee">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-1/3 -z-10 h-[30rem] w-[30rem] rounded-full bg-gold/10 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-20">
        {/* Image: fade + scale reveal */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
          viewport={view}
          transition={{ duration: 1.3, ease }}
          className="group relative mx-auto w-full max-w-[34rem] lg:max-w-none"
        >
          <div aria-hidden="true" className="absolute -bottom-4 -left-4 hidden h-[86%] w-[72%] rounded-[2rem] border border-gold/40 sm:block" />
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)] sm:aspect-[5/5.4] lg:aspect-[4/4.6]">
            <motion.div
              initial={reduce ? false : { scale: 1.25 }}
              whileInView={reduce ? undefined : { scale: 1 }}
              viewport={view}
              transition={{ duration: 1.9, ease }}
              className="absolute inset-0"
            >
              <Img src={images.beans} alt="Freshly roasted specialty coffee beans" className="h-full w-full transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.05]" />
            </motion.div>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-espresso/10" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-cream/10" />
            <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-full border border-gold/40 bg-espresso/70 px-4 py-2 backdrop-blur-md">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.26em] text-cream">Small-batch roasted</span>
            </div>
          </div>
        </motion.div>

        {/* Copy: staggered */}
        <motion.div variants={group} initial="hidden" whileInView="show" viewport={view}>
          <motion.div variants={item} className="flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">Our Coffee</p>
          </motion.div>

          <motion.h2 id="our-coffee-heading" variants={item} className="mt-6 text-[clamp(2.6rem,5.5vw,4.5rem)] leading-[1] tracking-[-0.03em] text-cream">
            Every Cup Has <span className="italic text-gold">a Story.</span>
          </motion.h2>

          <motion.p variants={item} className="mt-7 max-w-xl text-lg leading-relaxed text-cream/80">
            We source specialty beans, roast them in small batches and brew each cup to order. Careful extraction and fresh milk mean every cappuccino tastes the way it should.
          </motion.p>

          <ul className="mt-10 space-y-3">
            {features.map(({ icon: Icon, title, text }) => (
              <motion.li
                key={title}
                variants={item}
                className="group/f flex items-start gap-5 rounded-2xl border border-cream/10 bg-cream/[0.03] p-5 transition-colors duration-500 hover:border-gold/50 hover:bg-gold/[0.06]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/50 bg-gold/10 text-gold transition-colors duration-500 group-hover/f:bg-gold group-hover/f:text-espresso">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-xl text-cream">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-cream/65">{text}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
