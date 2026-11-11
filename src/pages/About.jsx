import { useRef } from 'react'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import ParallaxImg from '../components/ParallaxImg.jsx'
import Reveal from '../components/Reveal.jsx'
import SplitText from '../components/SplitText.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import CtaBand from '../components/CtaBand.jsx'
import AboutIntro from '../components/AboutIntro.jsx'
import OurCoffee from '../components/OurCoffee.jsx'
import OurExperience from '../components/OurExperience.jsx'
import { images } from '../data/menuItems.js'
import { contact } from '../data/contact.js'

const food = { title: 'Our Food', img: 'burger', text: 'Burgers, starters and desserts are made fresh each day with quality ingredients. Nothing sits under a heat lamp, and nothing leaves the kitchen we would not eat ourselves.' }

export default function About() {
  const journey = useRef(null)
  const toStory = () => journey.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <>
      <section className="grain relative isolate flex min-h-[78svh] items-end overflow-hidden bg-espresso">
        <ParallaxImg src={images.interior} alt="Inside Velora Café" reveal={false} speed={0.11} className="absolute inset-0 -z-10 opacity-45" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso via-espresso/30 to-espresso/40" />
        <h1 className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-44 text-[clamp(3.2rem,10.5vw,9.5rem)] leading-[0.94] tracking-[-0.035em] text-cream sm:px-8 sm:pb-24">
          <SplitText delay={0.15} stagger={0.1} lines={['CRAFTED', { text: 'WITH PASSION.', className: 'italic text-gold' }]} />
        </h1>
      </section>

      <AboutIntro onStory={toStory} />

      <div ref={journey} className="scroll-mt-20" />
      <OurCoffee />

      <section className="bg-beige">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-20 lg:[&>*:first-child]:order-2">
          <ParallaxImg src={images[food.img]} alt={food.title} className="aspect-[4/3] w-full" speed={0.09} />
          <Reveal delay={0.12}>
            <h2 className="text-[clamp(2.6rem,5.5vw,4.25rem)]"><SplitText inView lines={[food.title]} /></h2>
            <p className="mt-5 max-w-lg text-lg text-coffee/80">{food.text}</p>
          </Reveal>
        </div>
      </section>

      <OurExperience />

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading title="Gallery" />
        <div className="grid auto-rows-[170px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 md:grid-cols-4">
          {[['latte', 'row-span-2'], ['burger', ''], ['dessert', ''], ['interior', 'md:col-span-2'], ['shake', 'row-span-2'], ['fries', ''], ['beans', 'md:col-span-2']].map(([k, cls], i) => (
            <ParallaxImg key={`${k}${i}`} src={images[k]} alt={`Velora Café ${k}`} delay={(i % 4) * 0.08} speed={0.06} className={cls} />
          ))}
        </div>
      </section>

      <section className="bg-espresso py-24 text-beige sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading light title="Find Us" />
          <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-2">
            <ul className="space-y-4">
              <li className="flex gap-3"><MapPin className="shrink-0 text-gold" size={20} />{contact.address}</li>
              <li className="flex gap-3"><Phone className="shrink-0 text-gold" size={20} />{contact.phone}</li>
              <li className="flex gap-3"><Mail className="shrink-0 text-gold" size={20} />{contact.email}</li>
            </ul>
            <ul className="space-y-4">
              {contact.hours.map((h) => <li key={h} className="flex gap-3"><Clock className="shrink-0 text-gold" size={20} />{h}</li>)}
              <li className="flex gap-3 pt-2">
                {contact.socials.map((s) => <a key={s} href="#" onClick={(e) => e.preventDefault()} className="border border-choc px-3 py-1 text-xs transition-colors duration-300 hover:border-gold hover:text-gold">{s}</a>)}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <CtaBand title={'COME FOR THE COFFEE.\nSTAY FOR THE MOMENTS.'} to="/menu" label="VIEW THE MENU" />
    </>
  )
}