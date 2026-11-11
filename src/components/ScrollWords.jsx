import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return <motion.span style={{ opacity }} className="inline-block">{children}</motion.span>
}

// A statement whose words light up one by one as the reader scrolls through it.
export default function ScrollWords({ text, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.82', 'end 0.55'] })
  const words = text.split(' ')

  if (reduce) return <p ref={ref} className={className}>{text}</p>

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <Word progress={scrollYProgress} range={[i / words.length, Math.min((i + 1.6) / words.length, 1)]}>{w}</Word>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </p>
  )
}
