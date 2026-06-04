'use client'

import Image from 'next/image'

// Client logos - add new logos here and they'll automatically appear in the marquee
const clientLogos = [
  { src: '/images/logos/Sydney-metro-scafs.png', alt: 'Sydney Metro Scaffolds' },
  { src: '/images/logos/Safe-hire.png', alt: 'Safe Hire' },
  { src: '/images/logos/Excel-events.png', alt: 'Excel Event Equipment Hire' },
  { src: '/images/logos/Red-star-fence.png', alt: 'Red Star Fence' },
  { src: '/images/logos/Micro-rentals.png', alt: 'Micro Rentals' },
  { src: '/images/logos/AlexiCam.png', alt: 'AlexiCam' },
  { src: '/images/logos/All Fence You Rent.png', alt: 'All Fence You Rent' },
  { src: '/images/logos/Earth Communications.png', alt: 'Earth Communications' },
  { src: '/images/logos/Event Services International.png', alt: 'Event Services International' },
  { src: '/images/logos/Complete Rentals.png', alt: 'Complete Rentals' },
  { src: '/images/logos/HireRite Temporary Fence.png', alt: 'HireRite Temporary Fence' },
  { src: '/images/logos/Stevens Equipment Rentals.png', alt: 'Stevens Equipment Rentals' },
  { src: '/images/logos/I Hire 2 U.png', alt: 'I Hire 2 U' },
  { src: '/images/logos/JCP.png', alt: 'JCP' },
  { src: '/images/logos/Consolidated Group.png', alt: 'Consolidated Group' },
]

export function LogoMarquee() {
  return (
    <div className="w-full">
      <p className="mb-6 text-center text-sm text-white/50">
        Trusted by hire & rental businesses worldwide
      </p>

      {/* Marquee container */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#0e0b14] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#0e0b14] to-transparent" />

        {/* Scrolling track - duplicated for seamless loop */}
        <div className="group flex w-max animate-marquee hover:[animation-play-state:paused]">
          {/* First set */}
          {clientLogos.map((logo, i) => (
            <div
              key={`a-${i}`}
              className="mx-3 flex h-20 w-40 flex-shrink-0 items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={200}
                height={100}
                loading="lazy"
                className="h-20 w-auto max-w-[180px] object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {clientLogos.map((logo, i) => (
            <div
              key={`b-${i}`}
              className="mx-3 flex h-20 w-40 flex-shrink-0 items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={200}
                height={100}
                loading="lazy"
                className="h-20 w-auto max-w-[180px] object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LogoMarquee
