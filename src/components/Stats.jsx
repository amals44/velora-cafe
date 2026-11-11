import { useEffect, useRef } from 'react'
import { animate, useInView } from 'framer-motion'

const stats = [[12000, '+', 'Cups served every month'], [4.9, '', 'Average guest rating'], [25, '+', 'Dishes made fresh daily'], [8, '', 'Years of craft']]

function Count({ to, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => { if (ref.current) ref.current.textContent = (to % 1 ? v.toFixed(1) : Math.round(v).toLocaleString()) + suffix },
    })
    return () => c.stop()
  }, [inView, to, suffix])
  return <span ref={ref}>{to.toLocaleString()}{suffix}</span>
}

export default function Stats() {
  return (
    <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 sm:px-8 lg:grid-cols-4">
      {stats.map(([n, s, label]) => (
        <div key={label} className="border-l border-gold/40 pl-6">
          <dd className="font-display text-5xl text-gold sm:text-6xl"><Count to={n} suffix={s} /></dd>
          <dt className="mt-2 text-sm text-beige">{label}</dt>
        </div>
      ))}
    </dl>
  )
}
