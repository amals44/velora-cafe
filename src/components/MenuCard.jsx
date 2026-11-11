import { motion } from 'framer-motion'
import Img from './Img.jsx'

// `ref` is a normal prop in React 19; AnimatePresence popLayout needs it on the DOM node.
// `plain` skips the card's own enter/exit animation when a parent (e.g. Reveal) already handles it.
export default function MenuCard({ item, ref, plain = false }) {
  const spotlight = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <motion.article
      ref={ref}
      layout={!plain}
      initial={plain ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={plain ? undefined : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={spotlight}
      className="group relative isolate aspect-[5/4] overflow-hidden sm:aspect-[4/5] bg-espresso shadow-[0_1px_0_rgba(18,11,8,0.04)] transition-shadow duration-700 hover:shadow-[0_30px_60px_-24px_rgba(18,11,8,0.55)]"
    >
      <Img src={item.img} alt={item.name} className="absolute inset-0 h-full w-full transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.09]" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/75 to-transparent to-80%" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(214,160,75,0.26), transparent 62%)' }}
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-4 border border-gold/0 transition-all duration-700 ease-silk group-hover:inset-3 group-hover:border-gold/70" />

      <p className="absolute left-6 top-6 bg-espresso/70 px-3 py-1 text-xs font-semibold text-gold backdrop-blur-sm">{item.category}</p>

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-2xl text-cream sm:text-[1.7rem]">{item.name}</h3>
          <span className="font-display text-xl text-gold">₹{item.price}</span>
        </div>
        {/* Hover-capable devices reveal the description on hover; touch devices always show it.
            (Class names are written out in full so Tailwind can detect them.) */}
        <div className="grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-700 ease-silk [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100">
          <p className="overflow-hidden pt-3 text-sm leading-relaxed text-beige">{item.desc}</p>
        </div>
        <span aria-hidden="true" className="mt-5 block h-px w-10 bg-gold transition-all duration-700 ease-silk group-hover:w-full" />
      </div>
    </motion.article>
  )
}
