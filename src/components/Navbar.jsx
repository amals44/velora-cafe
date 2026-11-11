import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from './Logo.jsx'
import Button from './Button.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > 40)
  const [open, setOpen] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40))

  const linkClass = ({ isActive }) =>
    `relative py-1 text-sm font-medium tracking-wide after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-gold after:transition-transform after:duration-500 after:ease-silk ${
      isActive ? 'text-gold after:scale-x-100' : 'text-cream after:scale-x-0 hover:after:scale-x-100'
    }`

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-silk ${scrolled || open ? 'bg-espresso/90 py-3 shadow-lg backdrop-blur-md' : 'bg-transparent py-6'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" aria-label="Velora Café home" onClick={() => setOpen(false)}><Logo /></Link>
        <nav className="hidden items-center gap-10 md:flex" aria-label="Main">
          {links.map((l) => <NavLink key={l.to} to={l.to} end className={linkClass}>{l.label}</NavLink>)}
          <Button to="/menu" size="sm">Order Now</Button>
        </nav>
        <button className="p-2 text-cream md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden md:hidden" aria-label="Mobile">
            <div className="flex flex-col gap-1 px-5 pb-6 pt-3">
              {links.map((l, n) => (
                <motion.div key={l.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + n * 0.06, duration: 0.5 }}>
                  <NavLink to={l.to} end onClick={() => setOpen(false)} className={({ isActive }) => `block py-3 font-display text-3xl ${isActive ? 'text-gold' : 'text-cream'}`}>{l.label}</NavLink>
                </motion.div>
              ))}
              <Button to="/menu" onClick={() => setOpen(false)} className="mt-4">Order Now</Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <motion.div style={{ scaleX: progress }} className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-gold" />
    </header>
  )
}
