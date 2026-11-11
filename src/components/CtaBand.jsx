import Button from './Button.jsx'
import ParallaxImg from './ParallaxImg.jsx'
import SplitText from './SplitText.jsx'
import { images } from '../data/menuItems.js'

export default function CtaBand({ title, to, label }) {
  return (
    <section className="grain relative isolate overflow-hidden bg-espresso">
      <ParallaxImg src={images.beans} alt="" reveal={false} speed={0.1} className="absolute inset-0 -z-10 opacity-30" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-espresso via-espresso/20 to-espresso" />
      <div className="mx-auto max-w-5xl px-5 py-32 text-center sm:py-44">
        <h2 className="text-[clamp(2.2rem,6.4vw,5.5rem)] text-cream">
          <SplitText inView stagger={0.06} lines={title.split('\n')} />
        </h2>
        <div className="mt-12"><Button to={to} size="lg" arrow>{label}</Button></div>
      </div>
    </section>
  )
}
