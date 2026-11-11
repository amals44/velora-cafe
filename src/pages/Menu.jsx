import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Clock, MapPin, Search, SearchX } from 'lucide-react'
import Button from '../components/Button.jsx'
import MenuItemCard from '../components/MenuItemCard.jsx'
import ParallaxImg from '../components/ParallaxImg.jsx'
import Reveal from '../components/Reveal.jsx'
import SplitText from '../components/SplitText.jsx'
import { images, menuItems } from '../data/menuItems.js'
import { contact } from '../data/contact.js'
import { ratings } from '../data/menuRatings.js'

const ease = [0.22, 1, 0.36, 1]

// The dataset keeps a single 'Beverages' category. The page splits it into the two filters below
// without editing the data: chilled drinks go to Cold Beverages, anything else to Other Beverages.
const COLD = /\b(cold|iced|chilled|shake|smoothie|juice|lemonade|frappe)/i
const groupOf = (m) => (m.category === 'Beverages' ? (COLD.test(`${m.name} ${m.desc}`) ? 'Cold Beverages' : 'Other Beverages') : m.category)

const items = menuItems.map((m) => ({ ...m, group: groupOf(m) }))
const base = ['Coffee', 'Cold Beverages', 'Burgers', 'Starters', 'Desserts', 'Other Beverages']
// Any category added to the data later still gets its own filter, so nothing becomes unreachable.
const groups = [...base, ...new Set(items.map((m) => m.group))].filter((g, i, a) => a.indexOf(g) === i)
const filters = ['All', ...groups]
const counts = Object.fromEntries(filters.map((f) => [f, f === 'All' ? items.length : items.filter((m) => m.group === f).length]))

const blurb = {
  Coffee: 'Small-batch beans, brewed to order.',
  'Cold Beverages': 'Chilled, creamy and made to cool you down.',
  Burgers: 'Char-grilled and built to order on toasted brioche.',
  Starters: 'Crisp, golden and made for sharing.',
  Desserts: 'Warm, fudgy and worth saving room for.',
  'Other Beverages': 'More to sip beyond the espresso machine.',
}

export default function Menu() {
  const [active, setActive] = useState('All')
  const [q, setQ] = useState('')
  const term = q.trim().toLowerCase()

  const matches = (m) => `${m.name} ${m.desc} ${m.group}`.toLowerCase().includes(term)
  const sections = (active === 'All' ? groups : [active])
    .map((g) => ({ group: g, items: items.filter((m) => m.group === g && matches(m)) }))
    .filter((s) => active !== 'All' || s.items.length)

  const reset = () => { setQ(''); setActive('All') }
  const toMenu = () => document.getElementById('menu-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  // If the results would start below the fold, bring them into view when a filter is chosen.
  const pick = (c) => {
    setActive(c)
    const grid = document.getElementById('menu-grid')
    if (grid && grid.getBoundingClientRect().top > window.innerHeight * 0.6) toMenu()
  }

  return (
    <div className="menu-page bg-ivory text-midnight">
      {/* Hero */}
      <section className="grain relative isolate overflow-hidden bg-midnight pb-20 pt-36 text-ivory sm:pt-44 lg:pb-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_20%,rgba(255,107,53,0.28),transparent_55%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="mb-5 flex items-center gap-3 text-sm font-bold text-tangerine">
              <span aria-hidden="true" className="h-0.5 w-10 bg-tangerine" />Our menu
            </motion.p>
            <h1 className="text-[clamp(3rem,8vw,6.5rem)] uppercase">
              <SplitText delay={0.15} stagger={0.1} lines={['Made to', { text: 'delight.', className: 'text-tangerine' }]} />
            </h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8, ease }} className="mt-7 max-w-md text-lg text-ivory/75">
              Freshly brewed coffee, delicious bites, and sweet moments.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8, ease }} className="mt-9">
              <Button variant="tangerine" size="lg" arrow onClick={toMenu} className="rounded-full">Explore the menu</Button>
            </motion.div>
          </div>

          {/* Photo collage: coffee, burger and dessert, so no single category leads */}
          <div className="relative hidden h-[30rem] lg:block">
            <ParallaxImg src={images.burger} alt="A char-grilled cheeseburger" className="absolute right-0 top-0 h-[24rem] w-[78%] rounded-[2rem]" speed={0.08} delay={0.2} />
            <ParallaxImg src={images.latte} alt="A latte with hand-poured art" className="absolute bottom-0 left-0 h-56 w-[44%] rounded-3xl border-[6px] border-midnight" speed={0.1} delay={0.4} />
            <ParallaxImg src={images.dessert} alt="A warm chocolate brownie" className="absolute -bottom-2 right-[6%] h-40 w-40 rounded-full border-[6px] border-midnight" speed={0.1} delay={0.6} />
          </div>
          <ParallaxImg src={images.latte} alt="A latte with hand-poured art" className="aspect-[16/10] w-full rounded-3xl lg:hidden" speed={0.08} delay={0.3} />
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-[60px] z-40 border-b border-sand bg-ivory/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Menu categories" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:flex-wrap lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
            {filters.map((c) => (
              <button
                key={c}
                onClick={() => pick(c)}
                aria-pressed={active === c}
                className="relative min-h-11 shrink-0 whitespace-nowrap rounded-full border border-sand px-4 text-sm font-semibold transition-colors duration-300 hover:border-tangerine aria-pressed:border-midnight"
              >
                {active === c && <motion.span layoutId="menu-chip" className="absolute inset-0 rounded-full bg-midnight" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
                <span className={`relative transition-colors duration-300 ${active === c ? 'text-ivory' : 'text-midnight'}`}>
                  {c}<span className={`ml-1.5 text-xs ${active === c ? 'text-tangerine' : 'text-midnight/55'}`}>{counts[c]}</span>
                </span>
              </button>
            ))}
          </div>
          <label className="relative w-full lg:max-w-xs">
            <span className="sr-only">Search the menu</span>
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-midnight/55" />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the menu" className="min-h-11 w-full rounded-full border border-sand bg-white/60 py-2 pl-11 pr-4 text-sm outline-none transition duration-300 placeholder:text-midnight/55 focus:border-tangerine focus:bg-white" />
          </label>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">Showing {sections.reduce((n, s) => n + s.items.length, 0)} dishes</p>

      {/* Menu: one centred section per category, three columns on desktop */}
      <section id="menu-grid" className="scroll-mt-32 pb-24 sm:pb-32">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="mx-auto max-w-7xl px-5 sm:px-8">
            {sections.map(({ group, items: list }) => (
              <div key={group} className="pt-16 sm:pt-24">
                <header className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
                  <h2 className="text-[clamp(2.4rem,6.4vw,4.75rem)] uppercase"><SplitText inView lines={[group]} /></h2>
                  <Reveal delay={0.2}><p className="mt-4 text-lg text-midnight/70">{blurb[group] ?? 'Made fresh, every day.'}</p></Reveal>
                  <span aria-hidden="true" className="mx-auto mt-6 block h-1 w-12 rounded-full bg-tangerine" />
                </header>

                {list.length ? (
                  <motion.div layout className="flex flex-wrap justify-center gap-x-6 gap-y-14">
                    <AnimatePresence mode="popLayout">
                      {list.map((item, i) => <MenuItemCard key={item.id} item={item} rating={ratings[item.id]} index={i} />)}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <div className="mx-auto max-w-sm py-8 text-center">
                    <SearchX size={44} strokeWidth={1.3} className="mx-auto text-tangerine" />
                    <h3 className="mt-5 text-2xl">{term ? 'Nothing matches yet' : 'Nothing here right now'}</h3>
                    <p className="mt-2 text-midnight/70">{term ? `No ${group.toLowerCase()} match “${q.trim()}”.` : `There are no ${group.toLowerCase()} on the menu at the moment.`}</p>
                    <div className="mt-7"><Button variant="midnight" onClick={reset} className="rounded-full">Show full menu</Button></div>
                  </div>
                )}
              </div>
            ))}

            {sections.length === 0 && (
              <div className="mx-auto max-w-sm py-24 text-center">
                <SearchX size={44} strokeWidth={1.3} className="mx-auto text-tangerine" />
                <h3 className="mt-5 text-2xl">Nothing matches yet</h3>
                <p className="mt-2 text-midnight/70">Try another word or browse every category.</p>
                <div className="mt-7"><Button variant="midnight" onClick={reset} className="rounded-full">Show full menu</Button></div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Closing band */}
      <section className="bg-tangerine text-midnight">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <h2 className="text-[clamp(2rem,5vw,3.75rem)] uppercase"><SplitText inView lines={['Come hungry.', 'Stay for the moments.']} /></h2>
          <div>
            <ul className="space-y-3 font-medium">
              <li className="flex gap-3"><MapPin size={20} className="mt-0.5 shrink-0" aria-hidden="true" />{contact.address}</li>
              {contact.hours.map((h) => <li key={h} className="flex gap-3"><Clock size={20} className="mt-0.5 shrink-0" aria-hidden="true" />{h}</li>)}
            </ul>
            <div className="mt-8"><Button to="/about" variant="midnight" arrow className="rounded-full">Our story</Button></div>
          </div>
        </div>
      </section>
    </div>
  )
}
