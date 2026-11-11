import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { images } from '../data/menuItems.js'
import cafeInterior from '../data/cafeInteriorData.js'

const ease = [0.22, 1, 0.36, 1]

/* Plain <img> that walks a list of sources if one fails, so the frame can never end up empty. */
function Photo({ sources, alt, className = '', priority = false }) {
  const [i, setI] = useState(0)
  if (i >= sources.length) return null
  return (
    <img
      key={sources[i]}
      src={sources[i]}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setI((n) => n + 1)}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  )
}

/**
 * Left column of the Home "More Than Just Coffee." section: a large café photograph
 * with a small roasted-beans inset. The reveal only ever scales and brightens the photo,
 * it never hides it, so a missed scroll trigger can't leave the column blank.
 */
export default function StoryVisual() {
  const reduce = useReducedMotion()
  const view = { once: true, amount: 0.05 }

  return (
    <div className="relative mx-auto w-full max-w-xl pb-6 sm:pb-10 lg:max-w-none">
      <div className="group relative aspect-[5/6] w-full overflow-hidden bg-choc shadow-2xl sm:aspect-[4/5]">
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.15 }}
          whileInView={reduce ? undefined : { scale: 1 }}
          viewport={view}
          transition={{ duration: 1.6, ease }}
        >
          <Photo
            priority
            sources={[cafeInterior, images.cafeInterior, images.interior]}
            alt="Velora Café interior"
            className="object-[50%_55%] transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.04]"
          />
        </motion.div>
        {/* Subtle grade, using existing palette tones */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/45 via-transparent to-espresso/10" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-cream/10" />
      </div>

      {/* Beans inset, kept from the original design; now also visible (smaller) on mobile */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.85 }}
        whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
        viewport={view}
        transition={{ duration: 1.1, delay: 0.4, ease }}
        className="absolute bottom-0 right-3 h-28 w-28 overflow-hidden border-[6px] border-cream bg-choc shadow-2xl sm:-right-4 sm:h-44 sm:w-44 sm:border-8 lg:-right-10"
      >
        <Photo sources={[images.beans]} alt="Roasted coffee beans" />
      </motion.div>
    </div>
  )
}
