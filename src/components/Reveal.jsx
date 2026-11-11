import { motion } from 'framer-motion'

// Soft entrance for blocks of content. `clip` swaps the fade for a top-down wipe.
export default function Reveal({ children, className = '', delay = 0, clip = false }) {
  const hidden = clip ? { clipPath: 'inset(0 0 100% 0)' } : { opacity: 0, y: 28 }
  const shown = clip ? { clipPath: 'inset(0 0 0% 0)' } : { opacity: 1, y: 0 }
  return (
    <motion.div className={className} initial={hidden} whileInView={shown} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}
