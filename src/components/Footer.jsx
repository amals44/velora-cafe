import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import Logo from './Logo.jsx'
import { contact } from '../data/contact.js'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-espresso text-beige">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-5 font-display text-xl italic text-gold">Sip • Relax • Enjoy</p>
        </div>
        <nav aria-label="Footer">
          <h3 className="mb-4 text-xl text-cream">Explore</h3>
          <ul className="space-y-2">
            {[['/', 'Home'], ['/menu', 'Menu'], ['/about', 'About']].map(([to, l]) => (
              <li key={to}><Link className="transition-colors duration-300 hover:text-gold" to={to}>{l}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <h3 className="mb-4 text-xl text-cream">Visit us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-gold" />{contact.address}</li>
            <li className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0 text-gold" />{contact.phone}</li>
            <li className="flex gap-2"><Mail size={16} className="mt-0.5 shrink-0 text-gold" />{contact.email}</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-xl text-cream">Opening hours</h3>
          <ul className="space-y-3 text-sm">
            {contact.hours.map((h) => <li key={h} className="flex gap-2"><Clock size={16} className="mt-0.5 shrink-0 text-gold" />{h}</li>)}
          </ul>
          <div className="mt-5 flex gap-3">
            {contact.socials.map((s) => (
              <a key={s} href="#" onClick={(e) => e.preventDefault()} className="border border-choc px-3 py-1 text-xs hover:border-gold hover:text-gold">{s}</a>
            ))}
          </div>
        </div>
      </div>
      <p className="border-t border-choc py-5 text-center text-xs">© {year} Velora Café. All rights reserved.</p>
    </footer>
  )
}