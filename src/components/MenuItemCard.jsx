import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Img from './Img.jsx'

const ease = [0.22, 1, 0.36, 1]

// Five outline stars with a tangerine overlay clipped to the rating, so 4.7 reads as 4.7.
function Stars({ rating }) {
  const row = (cls) => (
    <span className={`flex gap-0.5 ${cls}`}>
      {[0, 1, 2, 3, 4].map((n) => <Star key={n} size={16} fill="currentColor" strokeWidth={0} className="shrink-0" />)}
    </span>
  )
  return (
    <span className="relative inline-flex" role="img" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
      {row('text-midnight/15')}
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${(rating / 5) * 100}%` }}>{row('text-tangerine')}</span>
    </span>
  )
}

// `ref` is a normal prop in React 19; AnimatePresence popLayout needs it on the DOM node.
export default function MenuItemCard({ item, rating, index = 0, ref }) {
  const delay = (index % 3) * 0.09
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ opacity: { duration: 0.7, delay }, y: { duration: 0.9, delay, ease }, layout: { duration: 0.5, ease }, scale: { duration: 0.3 } }}
      className="group w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
    >
      <div className="relative overflow-hidden rounded-[1.75rem] bg-sand shadow-[0_18px_40px_-26px_rgba(23,23,23,0.5)] transition-shadow duration-700 ease-silk group-hover:shadow-[0_36px_60px_-28px_rgba(255,107,53,0.6)]">
        <Img src={item.img} alt={item.name} className="aspect-[4/3] w-full transition-transform duration-[1400ms] ease-silk group-hover:scale-110" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/35 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      </div>

      <div className="px-1 pt-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl sm:text-[1.4rem]">{item.name}</h3>
          <span className="shrink-0 rounded-full bg-midnight px-3.5 py-1 text-sm font-bold text-tangerine">₹{item.price}</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-midnight/70">{item.desc}</p>
        {rating != null && (
          <div className="mt-3 flex items-center gap-2">
            <Stars rating={rating} />
            <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
          </div>
        )}
        <span aria-hidden="true" className="mt-5 block h-0.5 w-0 bg-tangerine transition-all duration-700 ease-silk group-hover:w-16" />
      </div>
    </motion.article>
  )
}
