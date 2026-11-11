import { useState } from 'react'

// Falls back to a tasteful gradient if a remote image fails, so nothing is ever "broken".
export default function Img({ src, alt, className = '', priority = false }) {
  const [bad, setBad] = useState(!src)
  if (bad) return <div role="img" aria-label={alt} className={`bg-gradient-to-br from-choc to-espresso ${className}`} />
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setBad(true)}
      className={`object-cover ${className}`}
    />
  )
}
