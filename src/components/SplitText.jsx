import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

/**
 * Masked word-by-word reveal. Each word slides up out of its own clipping box,
 * staggered across the whole block.
 *
 * lines: array of strings or { text, className } (one entry per visual line).
 * inView: trigger on scroll into view instead of on mount.
 */
export default function SplitText({ lines, className = '', delay = 0, stagger = 0.07, duration = 0.95, inView = false }) {
  const parent = { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }
  const word = { hidden: { y: '115%' }, show: { y: '0%', transition: { duration, ease } } }
  const trigger = inView
    ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-60px' } }
    : { initial: 'hidden', animate: 'show' }

  return (
    <motion.span className={`block ${className}`} variants={parent} {...trigger}>
      {lines.map((line, li) => {
        const { text, className: lineClass = '' } = typeof line === 'string' ? { text: line } : line
        const words = text.split(' ')
        return (
          <span key={li} className={`block ${lineClass}`}>
            {words.map((w, wi) => (
              <span key={wi}>
                <span className="inline-block overflow-hidden whitespace-nowrap align-bottom -mb-[0.16em] -mt-[0.1em] pb-[0.16em] pt-[0.1em]">
                  <motion.span variants={word} className="inline-block pr-[0.06em]">{w}</motion.span>
                </span>
                {wi < words.length - 1 && ' '}
              </span>
            ))}
          </span>
        )
      })}
    </motion.span>
  )
}
