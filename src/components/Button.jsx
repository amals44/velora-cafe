import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const variants = {
  gold: { base: 'bg-gold text-espresso', fill: 'bg-cream' },
  outline: { base: 'border border-gold text-gold hover:text-espresso focus-visible:text-espresso', fill: 'bg-gold' },
  dark: { base: 'bg-coffee text-cream hover:text-espresso focus-visible:text-espresso', fill: 'bg-gold' },
  // Menu page theme
  tangerine: { base: 'bg-tangerine text-midnight', fill: 'bg-ivory' },
  midnight: { base: 'bg-midnight text-ivory hover:text-midnight focus-visible:text-midnight', fill: 'bg-ivory' },
}
const sizes = { sm: 'px-5 py-2.5 text-sm', md: 'px-7 py-3.5', lg: 'px-9 py-4' }

/**
 * Button/link with a colour wipe rising from the bottom edge and a rolling label.
 * Pass `to` for a router link, otherwise it renders a <button>.
 */
export default function Button({ to, onClick, variant = 'gold', size = 'md', arrow = false, className = '', children, ...rest }) {
  const v = variants[variant]
  const Comp = to ? Link : 'button'
  const props = to ? { to } : { type: 'button', onClick }
  const roll = 'transition-transform duration-500 ease-silk group-hover:-translate-y-full group-focus-visible:-translate-y-full'
  return (
    <Comp {...props} {...rest} className={`group relative isolate inline-flex items-center justify-center gap-3 overflow-hidden font-semibold tracking-wide transition-colors duration-500 ${sizes[size]} ${v.base} ${className}`}>
      <span aria-hidden="true" className={`absolute inset-0 -z-10 translate-y-[101%] transition-transform duration-500 ease-silk group-hover:translate-y-0 group-focus-visible:translate-y-0 ${v.fill}`} />
      <span className="relative block overflow-hidden">
        <span className={`block ${roll}`}>{children}</span>
        <span aria-hidden="true" className={`absolute inset-x-0 top-full block ${roll}`}>{children}</span>
      </span>
      {arrow && <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-500 ease-silk group-hover:translate-x-1.5" />}
    </Comp>
  )
}
