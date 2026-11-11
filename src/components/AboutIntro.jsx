import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Button from './Button.jsx'
import Img from './Img.jsx'
import AboutStats from './AboutStats.jsx'
import { images } from '../data/menuItems.js'

const ease = [0.22, 1, 0.36, 1]

/* ---------- text stagger ---------- */
const group = { hidden: {}, show: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } } }
const item = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } } }
const headline = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const word = { hidden: { y: '115%' }, show: { y: '0%', transition: { duration: 0.95, ease } } }

function Word({ children, accent = false }) {
  return (
    <span className="inline-block overflow-hidden whitespace-nowrap align-bottom -mb-[0.16em] -mt-[0.1em] pb-[0.16em] pt-[0.1em]">
      <motion.span variants={word} className={`inline-block pr-[0.06em] ${accent ? 'italic text-gold' : ''}`}>{children}</motion.span>
    </span>
  )
}

/* ---------- image collage (left) ---------- */
/* Plain <img> with a fallback chain: local file, then remote photo, then the gradient frame behind it. */
function MainPhoto() {
  const chain = [images.cafeInterior, images.interior]
  const [i, setI] = useState(0)
  if (i >= chain.length) return null
  return (
    <img
      key={chain[i]}
      src={chain[i]}
      alt="The warm, softly lit interior of Velora Café"
      loading="eager"
      decoding="async"
      fetchPriority="high"
      onError={() => setI((n) => n + 1)}
      className="absolute inset-0 block h-full w-full object-cover object-[50%_55%] transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.05]"
    />
  )
}

function Collage() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Each layer drifts at its own pace, so the collage gains depth as you scroll.
  const mainInner = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '6%'])
  const latteInner = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['7%', '-7%'])
  const latteLift = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [26, -26])
  const frameShift = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [10, -10])
  const wipe = !reduce
  const view = { once: true, margin: '-80px' }

  return (
    <div ref={ref} className="relative mx-auto aspect-[5/6] w-full max-w-[34rem] sm:aspect-[6/6.4] lg:max-w-none lg:aspect-[5/5.8]">
      {/* Offset gold frame behind the main photograph */}
      <motion.div
        aria-hidden="true"
        style={{ y: frameShift }}
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={view}
        transition={{ duration: 1.2, delay: 0.5, ease }}
        className="absolute left-0 top-0 h-[84%] w-[80%] rounded-[2rem] border border-gold/45"
      />

      {/* Main photograph: cinematic café interior.
          Reveal lives on this always-visible outer frame (opacity + scale), not on a clipped child,
          so the photo can never get stuck hidden. */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.94 }}
        whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 1.3, ease }}
        className="group absolute left-[4%] top-[3.5%] h-[84%] w-[80%] overflow-hidden rounded-[2rem] bg-choc shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]"
      >
        <motion.div style={{ y: mainInner }} className="absolute -top-[8%] left-0 h-[116%] w-full">
          <MainPhoto />
        </motion.div>
        {/* Warm grade so the photo sits inside the dark palette */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/55 via-transparent to-espresso/10" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gold/[0.07] mix-blend-soft-light" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-cream/10" />
      </motion.div>

      {/* Overlapping latte photograph */}
      <motion.div style={{ y: latteLift }} className="absolute bottom-[2%] right-0 z-10 h-[42%] w-[46%]">
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={view}
          transition={{ duration: 1.1, delay: 0.55, ease }}
          whileHover={{ y: -8, rotate: -1.5 }}
          className="group h-full w-full rounded-[1.7rem] border-[6px] border-espresso bg-espresso shadow-[0_0_0_1px_rgba(214,160,75,0.55),0_36px_60px_-24px_rgba(0,0,0,0.9)]"
        >
          <motion.div
            initial={wipe ? { clipPath: 'inset(0 0 0 100%)' } : false}
            whileInView={wipe ? { clipPath: 'inset(0 0 0 0%)' } : undefined}
            viewport={view}
            transition={{ duration: 1.2, delay: 0.7, ease }}
            className="relative h-full w-full overflow-hidden rounded-[1.25rem]"
          >
            <motion.div style={{ y: latteInner }} className="absolute inset-x-0 -inset-y-[10%]">
              <Img src={images.latte} alt="A freshly poured latte with hand-poured art" className="h-full w-full transition-transform duration-[1200ms] ease-silk group-hover:scale-110" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Handwritten tagline */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={view}
        transition={{ duration: 1, delay: 1.0, ease }}
        className="absolute bottom-0 left-0 flex items-center gap-4"
      >
        <span aria-hidden="true" className="hidden h-px w-10 bg-gold/70 sm:block" />
        <div className="-rotate-3">
          <p className="font-script text-[clamp(1.7rem,3.4vw,2.35rem)] leading-none text-gold">Sip. Relax. Enjoy.</p>
          <svg aria-hidden="true" viewBox="0 0 200 12" className="mt-1 h-2.5 w-full text-gold/70" fill="none">
            <motion.path
              d="M2 8 C 40 2, 90 12, 130 5 S 185 4, 198 7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={view}
              transition={{ duration: 1.2, delay: 1.5, ease }}
            />
          </svg>
        </div>
      </motion.div>
    </div>
  )
}

/* ---------- section ---------- */
export default function AboutIntro({ onStory }) {
  return (
    <section aria-labelledby="about-heading" className="grain relative isolate overflow-hidden bg-espresso">
      {/* Ambient warm glow, kept faint so the dark background stays dominant */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-24 -z-10 h-[34rem] w-[34rem] rounded-full bg-gold/10 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 bottom-10 -z-10 h-[30rem] w-[30rem] rounded-full bg-choc/50 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 pb-24 pt-20 sm:px-8 sm:pb-28 sm:pt-28 lg:pt-32">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20 xl:gap-28">
          <Collage />

          <motion.div variants={group} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }}>
            <motion.div variants={item} className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-10 bg-gold" />
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">About Velora</p>
            </motion.div>

            <motion.h2 id="about-heading" variants={headline} className="mt-6 text-[clamp(2.9rem,6.2vw,5.4rem)] leading-[0.98] tracking-[-0.03em] text-cream">
              <span className="block"><Word>More</Word> <Word>Than</Word></span>
              <span className="block"><Word>Just</Word> <Word accent>Coffee.</Word></span>
            </motion.h2>

            <motion.p variants={item} className="mt-8 max-w-xl text-lg leading-relaxed text-cream/80">
              Velora began with a simple idea: a café where good coffee, honest food and unhurried time belong together. We built a space that feels like a favourite corner, with warm wood, soft light and a table that is always ready for you.
            </motion.p>
            <motion.p variants={item} className="mt-5 max-w-xl leading-relaxed text-cream/65">
              Our beans are roasted in small batches and every cup is brewed to order. Our kitchen cooks fresh each day, so what reaches your table is made with care and nothing less.
            </motion.p>

            <motion.blockquote variants={item} className="mt-9 max-w-xl border-l-2 border-gold/70 pl-6">
              <p className="font-display text-[clamp(1.35rem,2.4vw,1.75rem)] italic leading-snug text-cream">
                &ldquo;A great café doesn&rsquo;t rush you. It simply makes the moment taste better.&rdquo;
              </p>
              <footer className="mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold/90">The Velora promise</footer>
            </motion.blockquote>

            <motion.div variants={item} className="mt-10">
              <Button variant="outline" size="lg" arrow onClick={onStory}>Our Story</Button>
            </motion.div>
          </motion.div>
        </div>

        <AboutStats />
      </div>
    </section>
  )
}
