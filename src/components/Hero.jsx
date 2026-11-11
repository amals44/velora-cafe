import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Mouse } from 'lucide-react'
import Button from './Button.jsx'
import Img from './Img.jsx'
import SplitText from './SplitText.jsx'
import { images } from '../data/menuItems.js'

const slides = [
  { a: 'Good coffee.', b: 'Great moments.', text: 'We source, roast and brew every cup with passion, then serve it somewhere you will want to stay.' },
  { a: 'Slow mornings,', b: 'bold flavours.', text: 'Small-batch beans, fresh milk and burgers made to order, all under one warm roof.' },
  { a: 'Sip. Relax.', b: 'Enjoy.', text: 'Soft light, warm wood and good music. Come for the coffee, stay for the moment.' },
]
const bokeh = [['6%', '16%', 90], ['34%', '74%', 60], ['52%', '8%', 120], ['78%', '78%', 80], ['92%', '24%', 50]]
const ease = [0.22, 1, 0.36, 1]
// Wider crop of the existing beans photograph for the full-bleed backdrop.
const backdrop = images.beans.replace('w=1400', 'w=2000')

// Drawn stand-in, only shown if /public/hero-cup.webp fails to load.
function CupArt() {
  return (
    <svg viewBox="0 0 520 400" role="img" aria-label="Coffee cup with a splash" className="h-auto w-[min(90vw,620px)] drop-shadow-2xl">
      <defs>
        <linearGradient id="cp" x1="0" x2="1"><stop offset="0" stopColor="#F5E7D0" /><stop offset="1" stopColor="#D9C3A5" /></linearGradient>
      </defs>
      <ellipse cx="270" cy="318" rx="200" ry="46" fill="url(#cp)" />
      <ellipse cx="270" cy="312" rx="130" ry="26" fill="#D9C3A5" />
      <g transform="rotate(-16 270 200)">
        <path d="M345 150c70-12 70 82-8 88" fill="none" stroke="url(#cp)" strokeWidth="18" strokeLinecap="round" />
        <path d="M160 130h200c0 90-42 150-100 150s-100-60-100-150z" fill="url(#cp)" />
        <ellipse cx="260" cy="130" rx="100" ry="20" fill="#4A281B" />
      </g>
      <path d="M170 150C120 130 70 170 30 160c60 30 120 20 160 0z" fill="#4A281B" />
    </svg>
  )
}

// One parallax depth layer: moves with the pointer by up to `d` px (negative = opposite direction).
function useLayer(sx, sy, d) {
  return {
    x: useTransform(sx, [-0.5, 0.5], [-d, d]),
    y: useTransform(sy, [-0.5, 0.5], [-d * 0.6, d * 0.6]),
  }
}

export default function Hero() {
  const [i, setI] = useState(0)
  const [noImg, setNoImg] = useState(false)
  const reduce = useReducedMotion()
  const ref = useRef(null)

  // Pointer position (-0.5..0.5), smoothed by a spring
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 55, damping: 20 })
  const sy = useSpring(my, { stiffness: 55, damping: 20 })
  const m = reduce ? 0 : 1
  const bgL = useLayer(sx, sy, 14 * m)
  const glowL = useLayer(sx, sy, 26 * m)
  const bokehL = useLayer(sx, sy, -34 * m)
  const cupL = useLayer(sx, sy, 34 * m)
  const backBeanL = useLayer(sx, sy, 18 * m)
  const frontBeanL = useLayer(sx, sy, -78 * m)
  const tilt = useTransform(sx, [-0.5, 0.5], [-3 * m, 3 * m])

  // Scroll parallax: layers separate as the hero leaves the screen
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const k = reduce ? 0 : 1
  const bgScrollY = useTransform(scrollYProgress, [0, 1], [0, 120 * k])
  const cupScrollY = useTransform(scrollYProgress, [0, 1], [0, 190 * k])
  const cupScrollRot = useTransform(scrollYProgress, [0, 1], [0, 7 * k])
  const cupScrollScale = useTransform(scrollYProgress, [0, 1], [1, 1 + 0.1 * k])
  const frontScrollY = useTransform(scrollYProgress, [0, 1], [0, -280 * k])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100 * k])
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1 + 0.35 * k])

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 7000)
    return () => clearInterval(t)
  }, [reduce, i])

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const s = slides[i]

  return (
    <section
      ref={ref}
      onMouseMove={move}
      className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-espresso lg:block"
      style={{ backgroundImage: 'linear-gradient(115deg, #120B08 0%, #24130D 42%, #4A281B 120%)' }}
    >
      {/* Layer 1 - cinematic backdrop photograph, slowly settling in, drifting with the pointer */}
      <motion.div aria-hidden="true" style={{ x: bgL.x, y: bgL.y }} className="pointer-events-none absolute -inset-[5%]">
        <motion.div style={{ y: bgScrollY }} className="h-full w-full">
          <motion.div initial={{ opacity: 0, scale: 1.18 }} animate={{ opacity: 1, scale: 1.04 }} transition={{ duration: 3.2, ease }} className="h-full w-full">
            <Img src={backdrop} alt="" priority className="h-full w-full opacity-[0.42] saturate-[0.85] contrast-110" />
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Keeps the left (text) side deep and readable, lets the photo glow on the right */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-espresso via-espresso/75 to-espresso/10 lg:via-espresso/60" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-espresso/70 via-transparent to-espresso" />

      {/* Layer 2 - gold lighting: bloom, sweeping beam, floor glow */}
      <motion.div aria-hidden="true" style={{ x: glowL.x, y: glowL.y, scale: glowScale }} className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.55 }}
          animate={{ opacity: [0.85, 1, 0.85], scale: 1 }}
          transition={{ opacity: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }, scale: { duration: 2.4, ease } }}
          className="absolute -right-[30%] top-[22%] aspect-square w-[min(150vw,1150px)] rounded-full lg:-right-[8%] lg:top-[-12%]"
          style={{ background: 'radial-gradient(circle, rgba(232,176,86,0.78) 0%, rgba(214,160,75,0.3) 32%, rgba(214,160,75,0.08) 52%, transparent 68%)' }}
        />
        <motion.div
          initial={{ opacity: 0, rotate: 24 }}
          animate={{ opacity: 1, rotate: [24, 29, 24] }}
          transition={{ opacity: { duration: 2, delay: 1.2 }, rotate: { duration: 12, repeat: Infinity, ease: 'easeInOut' } }}
          className="absolute -top-[30%] right-[8%] hidden h-[170%] w-[26%] origin-top mix-blend-screen lg:block"
          style={{ background: 'linear-gradient(to bottom, rgba(255,214,140,0), rgba(255,214,140,0.2) 40%, rgba(214,160,75,0))', filter: 'blur(34px)' }}
        />
        <div className="absolute bottom-[3%] right-[8%] hidden h-28 w-[44%] rounded-full bg-gold/40 blur-3xl lg:block" />
      </motion.div>
      <motion.div aria-hidden="true" style={{ x: bokehL.x, y: bokehL.y }} className="pointer-events-none absolute inset-0">
        {bokeh.map(([l, t, size]) => <span key={l} className="absolute rounded-full bg-gold/20 blur-xl" style={{ left: l, top: t, width: size, height: size }} />)}
      </motion.div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at 60% 48%, transparent 48%, rgba(18,11,8,0.65) 100%)' }} />

      {/* Layer 3 - a bean drifting behind the cup */}
      <motion.div aria-hidden="true" style={{ x: backBeanL.x, y: backBeanL.y }} className="pointer-events-none absolute right-[46%] top-[17%] z-[5] hidden w-24 lg:block xl:w-32">
        <motion.img
          src="/bean-c.webp"
          alt=""
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 0.65, y: [0, -14, 0], rotate: [-8, -2, -8] }}
          transition={{ opacity: { duration: 1.4, delay: 1 }, y: { duration: 9, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 9, repeat: Infinity, ease: 'easeInOut' } }}
          className="w-full blur-[1.5px]"
        />
      </motion.div>

      {/* Text column: sits behind the cup so the splash can overlap the end of the headline */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-2 pt-28 sm:px-8 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-20 lg:pt-24">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="min-w-0 lg:max-w-[58%]">
          <h1 className="text-[clamp(2.6rem,13.6vw,5.5rem)] leading-[0.94] tracking-[-0.035em] text-cream md:text-[clamp(4rem,9vw,6rem)] lg:text-[clamp(3rem,7.5vw,8.25rem)]">
            <AnimatePresence mode="wait">
              <motion.span key={i} className="block" exit={{ opacity: 0, y: -14, transition: { duration: 0.35 } }}>
                <SplitText
                  delay={i === 0 ? 0.45 : 0.05}
                  stagger={0.09}
                  lines={[{ text: s.a, className: 'lg:whitespace-nowrap' }, { text: s.b, className: 'italic text-gold lg:whitespace-nowrap' }]}
                />
              </motion.span>
            </AnimatePresence>
          </h1>
          <AnimatePresence mode="wait">
            <motion.p key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, delay: i === 0 ? 1.2 : 0.35, ease }} className="mt-6 max-w-md text-lg text-beige lg:mt-7">{s.text}</motion.p>
          </AnimatePresence>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.4, ease }} className="mt-7 flex flex-wrap gap-3 sm:gap-4 lg:mt-9">
            <Button to="/menu" arrow>Explore Menu</Button>
            <Button to="/about" variant="outline">Our Story</Button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.7 }} className="mt-8 flex items-center gap-6 lg:mt-12" role="group" aria-label="Hero slides">
            {slides.map((_, n) => (
              <button key={n} onClick={() => setI(n)} aria-label={`Show slide ${n + 1}`} aria-current={n === i} className={`font-display transition-all duration-500 ${n === i ? 'text-3xl text-gold' : 'text-lg text-beige/70 hover:text-cream'}`}>0{n + 1}</button>
            ))}
            <span className="h-px w-20 bg-gold/40"><motion.span key={i} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduce ? 0 : 7, ease: 'linear' }} className="block h-full origin-left bg-gold" /></span>
          </motion.div>
        </motion.div>
      </div>

      <motion.svg aria-hidden="true" viewBox="0 0 120 120" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="absolute bottom-[17%] left-[30%] z-[15] hidden h-28 w-28 xl:block">
          <defs><path id="ring" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
          <text fontSize="9" letterSpacing="3" fill="#D6A04B"><textPath href="#ring">SIP · RELAX · ENJOY · VELORA CAFÉ ·</textPath></text>
        </motion.svg>

      {/* Layer 4 - the photograph. Oversized on desktop so it bleeds past the top and bottom edges. */}
      <motion.div
        style={{ y: cupScrollY, rotate: cupScrollRot, scale: cupScrollScale }}
        className="pointer-events-none relative z-20 -mt-6 flex h-[64svh] items-center justify-center pb-16 sm:h-[72svh] lg:absolute lg:-bottom-[7svh] lg:-top-[7svh] lg:right-[-5%] 2xl:right-[-9%] lg:mt-0 lg:h-auto lg:w-[60%] lg:pb-0"
      >
        <motion.div style={{ x: cupL.x, y: cupL.y, rotate: tilt }} className="flex h-full items-center justify-center">
          <motion.div animate={{ y: [0, -16, 0], rotate: [0, 1.4, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="h-full">
            <motion.div initial={{ opacity: 0, y: 100, scale: 1.18, filter: 'blur(18px)' }} animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 1.9, delay: 0.5, ease }} className="h-full">
              {noImg ? <CupArt /> : (
                <img
                  src="/hero-cup.webp"
                  alt="An iced coffee in a glass, splashing with milk, chocolate and roasted beans"
                  width="707"
                  height="1084"
                  fetchPriority="high"
                  onError={() => setNoImg(true)}
                  className="h-full w-auto max-w-none object-contain"
                  style={{ filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.55)) drop-shadow(0 0 80px rgba(214,160,75,0.28))' }}
                />
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Layer 5 - out-of-focus beans in front of everything, moving against the pointer */}
      <motion.div aria-hidden="true" style={{ x: frontBeanL.x, y: frontBeanL.y }} className="pointer-events-none absolute inset-0 z-30">
        <motion.div style={{ y: frontScrollY }} className="absolute inset-0">
          <motion.img
            src="/bean-a.webp"
            alt=""
            initial={{ opacity: 0, scale: 0.6, y: -60 }}
            animate={{ opacity: 1, scale: 1, y: [0, 16, 0], rotate: [0, 10, 0] }}
            transition={{ opacity: { duration: 1.2, delay: 1.1 }, scale: { duration: 1.6, delay: 1.1, ease }, y: { duration: 10, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 10, repeat: Infinity, ease: 'easeInOut' } }}
            className="absolute right-[3%] top-[10%] w-14 blur-[3px] sm:w-20 lg:right-[2%] lg:top-[16%] lg:w-28"
          />
          <motion.img
            src="/bean-b.webp"
            alt=""
            initial={{ opacity: 0, scale: 0.6, y: 80 }}
            animate={{ opacity: 1, scale: 1, y: [0, -20, 0], rotate: [-12, -4, -12] }}
            transition={{ opacity: { duration: 1.2, delay: 1.3 }, scale: { duration: 1.6, delay: 1.3, ease }, y: { duration: 11, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 11, repeat: Infinity, ease: 'easeInOut' } }}
            className="absolute bottom-[14%] right-[2%] hidden w-36 blur-[6px] sm:block lg:bottom-[9%] lg:right-[44%] lg:w-44 xl:w-56"
          />
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }} className="absolute inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-espresso/40 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Link to="/menu" className="group flex items-center gap-3 text-sm text-cream">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-gold text-gold transition duration-500 group-hover:bg-gold group-hover:text-espresso"><ArrowRight size={16} /></span>
            Discover the menu
          </Link>
          <span aria-hidden="true" className="hidden items-center gap-3 text-xs uppercase tracking-[0.3em] text-beige sm:flex">Scroll <Mouse size={20} strokeWidth={1.2} className="text-gold" /></span>
        </div>
      </motion.div>
    </section>
  )
}
