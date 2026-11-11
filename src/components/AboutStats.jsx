import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { Leaf, Smile, Star, Award } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

const stats = [
  { icon: Smile, to: 12000, suffix: '+', label: 'Happy Customers', note: 'Served every month' },
  { icon: Star, to: 4.9, decimals: 1, suffix: '', label: 'Customer Rating', note: 'Average guest review', stars: true },
  { icon: Award, to: 8, suffix: '', label: 'Years of Experience', note: 'Of honest craft' },
  { icon: Leaf, to: 100, suffix: '%', label: 'Fresh Ingredients', note: 'Prepared daily' },
]

const fmt = (v, decimals) => (decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-US'))

function CountUp({ to, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView || !ref.current) return
    if (reduce) { ref.current.textContent = fmt(to, decimals) + suffix; return }
    const controls = animate(0, to, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => { if (ref.current) ref.current.textContent = fmt(v, decimals) + suffix },
    })
    return () => controls.stop()
  }, [inView, reduce, to, decimals, suffix])

  return <span ref={ref}>{fmt(0, decimals)}{suffix}</span>
}

const panel = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }
const cell = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } } }

export default function AboutStats() {
  return (
    <motion.ul
      aria-label="Velora Café in numbers"
      variants={panel}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      // 1px gaps over a gold tint draw the dividers, so they stay correct when the grid wraps.
      className="relative mt-20 grid list-none p-0 grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-gold/25 bg-gold/15 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] sm:mt-24 lg:grid-cols-4"
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-10 top-0 z-10 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      {stats.map(({ icon: Icon, to, decimals, suffix, label, note, stars }) => (
        <motion.li key={label} variants={cell} className="group relative flex flex-col items-center bg-coffee px-4 py-9 text-center transition-colors duration-500 hover:bg-choc/50 sm:px-6 sm:py-11">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/40 text-gold transition-all duration-700 ease-silk group-hover:-translate-y-1 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:text-espresso">
            <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
          </span>
          <div className="mt-5 font-display text-[clamp(2.3rem,4.4vw,3.4rem)] leading-none text-gold">
            <CountUp to={to} decimals={decimals} suffix={suffix} />
          </div>
          {stars && (
            <span aria-hidden="true" className="mt-2 flex gap-0.5 text-gold">
              {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={12} fill="currentColor" strokeWidth={0} />)}
            </span>
          )}
          <p className="mt-3 text-sm font-semibold tracking-wide text-cream">{label}</p>
          <p className="mt-1 text-xs text-beige/70">{note}</p>
          <span aria-hidden="true" className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gold transition-all duration-700 ease-silk group-hover:w-3/5" />
        </motion.li>
      ))}
    </motion.ul>
  )
}
