import { Coffee } from 'lucide-react'

export default function Logo() {
  return (
    <span className="flex items-center gap-3 text-cream">
      <span className="grid h-9 w-9 place-items-center rounded-full border border-gold text-gold"><Coffee size={18} strokeWidth={1.5} /></span>
      <span className="font-display text-2xl font-bold tracking-[0.16em]">VELORA<span className="ml-2 text-[0.6rem] font-semibold tracking-[0.35em] text-gold">CAFÉ</span></span>
    </span>
  )
}
