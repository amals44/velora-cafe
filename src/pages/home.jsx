import { Coffee, Leaf, Heart, Sofa, Star } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import Button from '../components/Button.jsx'
import ParallaxImg from '../components/ParallaxImg.jsx'
import Reveal from '../components/Reveal.jsx'
import ScrollWords from '../components/ScrollWords.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import SplitText from '../components/SplitText.jsx'
import MenuCard from '../components/MenuCard.jsx'
import CtaBand from '../components/CtaBand.jsx'
import Stats from '../components/Stats.jsx'
import StoryVisual from '../components/StoryVisual.jsx'
import { images, menuItems } from '../data/menuItems.js'

const why = [
  { icon: Leaf, title: 'Fresh Ingredients', text: 'Prepared daily from produce we trust.' },
  { icon: Coffee, title: 'Specialty Coffee', text: 'Small-batch beans, roasted with care.' },
  { icon: Sofa, title: 'Cozy Atmosphere', text: 'Warm light and soft seats made for lingering.' },
  { icon: Heart, title: 'Made with Passion', text: 'Every plate and cup is made by hand.' },
]

const reviews = [
  { name: 'Ananya R.', text: 'The cappuccino is the best in the city, and the burger is just as good.', stars: 5 },
  { name: 'Mohammed S.', text: 'A calm corner for long conversations. The brownie is a must.', stars: 5 },
  { name: 'Priya K.', text: 'Warm service, beautiful space and a milkshake worth the trip.', stars: 4 },
]

export default function Home() {
  const featured = menuItems.filter((m) => m.featured)

  return (
    <>
      <Hero />

      {/* Statement: words light up as you scroll through them */}
      <section className="bg-espresso px-5 py-28 sm:px-8 sm:py-44">
        <div className="mx-auto max-w-5xl">
          <ScrollWords
            className="font-display text-[clamp(1.9rem,4.7vw,3.9rem)] leading-[1.14] tracking-[-0.015em] text-cream"
            text="We roast in small batches, grill to order and never rush a table. Come in for a coffee. Stay for the afternoon."
          />
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading title="Signature Favourites" text="Eight favourites our regulars order again and again." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item, i) => <Reveal key={item.id} delay={(i % 4) * 0.1}><MenuCard item={item} plain /></Reveal>)}
        </div>
        <Reveal className="mt-14 text-center"><Button to="/menu" variant="dark" arrow>See the full menu</Button></Reveal>
      </section>

      {/* Why */}
      <section className="bg-beige py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading title="Why Velora" />
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {why.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.1} className="group text-center">
                <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold-deep/40 text-gold-deep transition-all duration-700 ease-silk group-hover:scale-110 group-hover:border-espresso group-hover:bg-espresso group-hover:text-gold">
                  <Icon size={30} strokeWidth={1.4} />
                </span>
                <h3 className="mt-6 text-2xl">{title}</h3>
                <p className="mx-auto mt-2 max-w-[16rem] text-sm text-coffee/80">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto grid max-w-7xl items-center gap-16 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:gap-24">
        <StoryVisual />
        <Reveal delay={0.1}>
          <h2 className="text-[clamp(2.6rem,6vw,4.75rem)]"><SplitText inView lines={['More Than', 'Just Coffee.']} /></h2>
          <p className="mt-7 max-w-md text-lg text-coffee/80">At Velora, every cup and every bite is crafted to make ordinary moments extraordinary.</p>
          <div className="mt-9"><Button to="/about" variant="dark" arrow>Explore About</Button></div>
        </Reveal>
      </section>

      <section className="bg-coffee py-20 sm:py-24"><Stats /></section>

      {/* Experience: three frames drifting at different speeds */}
      <section className="overflow-hidden bg-espresso py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading light title="The Velora Experience" />
          <div className="grid gap-5 md:grid-cols-3 md:items-start">
            {[['interior', 'The atmosphere', 0.06, ''], ['latte', 'The craft', 0.1, 'md:mt-20'], ['burger', 'The food', 0.06, 'md:mt-8']].map(([k, label, speed, offset], i) => (
              <div key={k} className={`relative ${offset}`}>
                <ParallaxImg src={images[k]} alt={label} className="aspect-[3/4] w-full" speed={speed} delay={i * 0.12} />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/90 to-transparent p-6 pt-24">
                  <p className="font-display text-3xl text-cream">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading title="Kind Words" />
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1} className="group relative border border-coffee/10 bg-white/70 p-8 transition-all duration-700 ease-silk hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_28px_50px_-30px_rgba(18,11,8,0.5)] sm:p-10">
              <div className="flex gap-1 text-gold" role="img" aria-label={`${r.stars} out of 5 stars`}>
                {Array.from({ length: r.stars }, (_, n) => <Star key={n} size={18} fill="currentColor" />)}
              </div>
              <p className="mt-6 font-display text-2xl leading-snug sm:text-[1.7rem]">“{r.text}”</p>
              <p className="mt-8 text-sm font-semibold">{r.name}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand title="YOUR NEXT FAVORITE MOMENT STARTS HERE." to="/menu" label="EXPLORE OUR MENU" />
    </>
  )
}
