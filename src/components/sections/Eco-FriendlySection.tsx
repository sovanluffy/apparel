// src/components/sections/EcoFriendlySection.tsx
'use client'

import { useState, useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'

type Slide = {
  id: number
  image: StaticImageData | string
  titleLine1: string
  titleHighlight: string
  titleLine2: string
  description: string
}

type EcoFriendlySectionProps = {
  slides: [Slide, Slide]
}

/* ── Arrow Button ── */
function ArrowButton({
  label,
  onClick,
  disabled,
  icon,
}: {
  label: string
  onClick: () => void
  disabled: boolean
  icon: string
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-disabled={disabled}
      className={[
        'w-11 h-11 flex items-center justify-center text-base flex-shrink-0',
        'border transition-all duration-250',
        disabled
          ? 'border-[#2c2c2c] bg-[#1a1a1a] text-[#333] cursor-not-allowed'
          : 'border-[#444] bg-transparent text-white cursor-pointer hover:bg-[#F97316] hover:border-[#F97316]',
      ].join(' ')}
    >
      {icon}
    </button>
  )
}

/* ── Main Component ── */
export default function EcoFriendlySection({ slides }: EcoFriendlySectionProps) {
  const [mounted, setMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [displayIndex, setDisplayIndex] = useState(0)

  useEffect(() => { setMounted(true) }, [])

  const goToSlide = (next: number, dir: 'left' | 'right') => {
    if (animating) return
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      setDisplayIndex(next)
      setCurrentIndex(next)
      setAnimating(false)
    }, 450)
  }

  const prev = () => { if (currentIndex !== 0) goToSlide(0, 'left') }
  const next = () => { if (currentIndex !== 1) goToSlide(1, 'right') }

  const slide = slides[displayIndex]
  const isPrevDisabled = mounted && currentIndex === 0
  const isNextDisabled = mounted && currentIndex === 1

  /* Animation classes */
  const textAnimClass = animating
    ? `opacity-0 ${direction === 'right' ? 'translate-y-4' : '-translate-y-4'}`
    : 'opacity-100 translate-y-0'

  const imgAnimClass = animating
    ? `opacity-0 ${direction === 'right' ? 'scale-105' : 'scale-95'}`
    : 'opacity-100 scale-100'

  return (
    <section className="w-full bg-[#0d0d0d] relative overflow-hidden">

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F97316] via-[#F97316] to-transparent" style={{ backgroundSize: '40% 100%', backgroundRepeat: 'no-repeat' }} />

      <div className="max-w-[1320px] mx-auto flex flex-col lg:flex-row items-stretch min-h-[560px]">

        {/* ── Image panel ── */}
        <div className="relative w-full lg:w-1/2 flex-shrink-0 overflow-hidden min-h-[300px] lg:min-h-[560px]">

          {/* Orange L-bracket */}
          <div className="absolute top-8 left-8 z-10 w-12 h-12 border-t-[3px] border-l-[3px] border-[#F97316] pointer-events-none" />

          {/* Slide counter on image */}
          <div className="absolute top-8 right-6 z-10 font-[var(--font-questrial)] text-[11px] tracking-[0.15em] text-white/35 font-semibold">
            {displayIndex === 0 ? '01' : '02'}&nbsp;/&nbsp;02
          </div>

          {/* Image */}
          <div className={`relative w-full h-full min-h-[300px] lg:min-h-[560px] transition-all duration-[450ms] ease-out ${imgAnimClass}`}>
            <Image
              src={slide.image}
              alt={slide.titleLine1}
              fill
              className="object-cover object-top"
              priority
            />
            {/* Fade to black on right edge — desktop only */}
            <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-transparent via-transparent to-[#0d0d0d]" />
            {/* Fade to black on bottom edge — mobile only */}
            <div className="absolute inset-0 lg:hidden bg-gradient-to-b from-transparent via-transparent to-[#0d0d0d]" />
          </div>
        </div>

        {/* ── Content panel ── */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 lg:py-18 relative">

          {/* Vertical orange line — desktop only */}
          <div className="absolute left-0 top-[20%] bottom-[20%] w-[2px] bg-[#F97316] opacity-60 hidden lg:block" />

          {/* Tag */}
          <div
            className={`transition-all duration-[450ms] ease-out mb-5 ${textAnimClass}`}
            style={{ transitionDelay: '0ms' }}
          >
            <span className="font-[var(--font-questrial)] text-[11px] tracking-[0.2em] uppercase text-[#F97316] font-semibold">
              Eco Initiative
            </span>
          </div>

          {/* Title */}
          <h2
            className={`transition-all duration-[450ms] ease-out font-[var(--font-questrial)] text-3xl lg:text-[clamp(28px,2.6vw,40px)] font-bold text-white leading-[1.2] tracking-[-0.01em] mb-6 ${textAnimClass}`}
            style={{ transitionDelay: '60ms' }}
          >
            {slide.titleLine1}
            <br />
            <span className="text-[#F97316]">{slide.titleHighlight}</span>
            <br />
            {slide.titleLine2}
          </h2>

          {/* Divider */}
          <div
            className={`transition-all duration-[450ms] ease-out w-10 h-px bg-[#2e2e2e] mb-6 ${textAnimClass}`}
            style={{ transitionDelay: '100ms' }}
          />

          {/* Description */}
          <p
            className={`transition-all duration-[450ms] ease-out font-[var(--font-questrial)] text-[15px] text-[#6b7280] leading-[1.9] mb-12 max-w-[380px] ${textAnimClass}`}
            style={{ transitionDelay: '120ms' }}
          >
            {slide.description}
          </p>

          {/* Arrows + progress */}
          <div
            className={`transition-all duration-[450ms] ease-out flex items-center gap-4 ${textAnimClass}`}
            style={{ transitionDelay: '150ms' }}
          >
            <ArrowButton label="Previous slide" onClick={prev} disabled={isPrevDisabled} icon="←" />
            <ArrowButton label="Next slide"     onClick={next} disabled={isNextDisabled} icon="→" />

            {/* Progress track */}
            <div className="relative h-px bg-[#1f1f1f] w-24 flex-shrink-0">
              <div
                className="absolute top-0 left-0 h-px bg-[#F97316] transition-all duration-[400ms] ease-out"
                style={{ width: displayIndex === 0 ? '50%' : '100%' }}
              />
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}