import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Img from './Img.jsx'

const ease = [0.22, 1, 0.36, 1]

/**
 * Image frame with a wipe-and-settle reveal and a gentle scroll parallax inside the frame.
 * The inner image is 30% taller than the frame so it can drift without ever exposing an edge.
 * speed: 0 to ~0.11 (fraction of the frame the image drifts either way).
 */
export default function ParallaxImg({ src, alt, className = '', speed = 0.08, reveal = true, delay = 0 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const range = reduce ? 0 : Math.min(speed, 0.11) * 100
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`])
  const wipe = reveal && !reduce
  // Only add `relative` when the caller hasn't positioned the frame itself (e.g. `absolute inset-0`).
  const positioned = /(^|\s)(absolute|fixed|sticky|relative)(\s|$)/.test(className)

  return (
    <motion.div
      ref={ref}
      className={`${positioned ? '' : 'relative'} overflow-hidden ${className}`}
      initial={wipe ? { clipPath: 'inset(100% 0 0 0)' } : false}
      whileInView={wipe ? { clipPath: 'inset(0% 0 0 0)' } : undefined}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.25, delay, ease }}
    >
      <motion.div
        className="absolute inset-x-0 -inset-y-[15%]"
        initial={wipe ? { scale: 1.28 } : false}
        whileInView={wipe ? { scale: 1 } : undefined}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.8, delay, ease }}
      >
        <motion.div style={{ y }} className="h-full w-full">
          <Img src={src} alt={alt} className="h-full w-full" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
