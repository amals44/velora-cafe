import { motion, useReducedMotion } from 'framer-motion'
import { Heart, Leaf, Smile } from 'lucide-react'
import Img from './Img.jsx'
import { images } from '../data/menuItems.js'

const ease = [0.22, 1, 0.36, 1]
const view = { once: true, margin: '-100px' }

const cards = [
  { icon: Heart, title: 'Cozy Atmosphere', text: 'Soft light, warm wood and good music, a corner that feels like yours.' },
  { icon: Smile, title: 'Friendly Service', text: 'Warm, attentive hosts who remember your order and your name.' },
  { icon: Leaf, title: 'Fresh Flavours', text: 'Made fresh each day with quality ingredients, never rushed.' },
]

export default function OurExperience() {
  const reduce = useReducedMotion()

  const group = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.13, delayChildren: reduce ? 0 : 0.1 } } }
  const item = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.9, ease } },
  }
  const word = {
    hidden: reduce ? { y: '0%' } : { y: '115%' },
    show: { y: '0%', transition: { duration: reduce ? 0 : 0.95, ease } },
  }
  const hover = reduce ? undefined : { y: -10 }

  return (
    <section aria-labelledby="our-experience-heading" className="grain relative isolate overflow-hidden bg-espresso">
      {/* Cinematic background: existing café interior, darkened */}
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { scale: 1.15 }}
        whileInView={reduce ? undefined : { scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease }}
        className="absolute inset-0 -z-20"
      >
        <Img src={images.interior} alt="" className="h-full w-full" />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-espresso/75" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-espresso/80 via-transparent to-espresso/90" />

      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:py-36">
        <motion.div variants={group} initial="hidden" whileInView="show" viewport={view} className="mx-auto max-w-3xl text-center">
          <motion.div variants={item} className="flex items-center justify-center gap-4">
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">Our Experience</p>
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
          </motion.div>

          <motion.h2 id="our-experience-heading" variants={group} className="mt-6 text-[clamp(2.8rem,7vw,5.5rem)] leading-[1] tracking-[-0.03em] text-cream">
            {['Stay', 'a', 'Little'].map((w) => (
              <span key={w} className="inline-block overflow-hidden whitespace-nowrap pb-[0.16em] align-bottom">
                <motion.span variants={word} className="inline-block pr-[0.2em]">{w}</motion.span>
              </span>
            ))}
            <span className="inline-block overflow-hidden whitespace-nowrap pb-[0.16em] align-bottom">
              <motion.span variants={word} className="inline-block pr-[0.06em] italic text-gold">Longer.</motion.span>
            </span>
          </motion.h2>

          <motion.p variants={item} className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-cream/80">
            Soft light, warm wood and good music. Whether you come to work, meet a friend or sit alone with a book, we want you to stay as long as you like.
          </motion.p>
        </motion.div>

        <motion.ul variants={group} initial="hidden" whileInView="show" viewport={view} className="mt-14 grid gap-5 sm:mt-20 md:grid-cols-3 md:gap-6">
          {cards.map(({ icon: Icon, title, text }) => (
            <motion.li
              key={title}
              variants={item}
              whileHover={hover}
              transition={{ duration: 0.5, ease }}
              className="group relative overflow-hidden rounded-3xl border border-cream/15 bg-espresso/55 p-8 text-center backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-500 hover:border-gold/60 hover:bg-espresso/75 hover:shadow-[0_30px_60px_-25px_rgba(214,160,75,0.35)] sm:p-9"
            >
              <span aria-hidden="true" className="absolute inset-x-8 top-0 h-px origin-center scale-x-0 bg-gold transition-transform duration-700 ease-silk group-hover:scale-x-100" />
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/50 bg-gold/10 text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-espresso">
                <Icon size={24} aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-2xl text-cream">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">{text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
