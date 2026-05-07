// src/components/sections/EcoFriendlySection.tsx
'use client'

import { useState, useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'
import { EcoFriendlySectionProps ,  Slide} from '@/types/Eco'



export default function EcoFriendlySection({ slides }: EcoFriendlySectionProps) {
  const [mounted, setMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [displayIndex, setDisplayIndex] = useState(0)

  useEffect(() => { setMounted(true) }, [])

  const goToSlide = (next: number, dir: 'left' | 'right') => {
    if (animating || next === currentIndex) return
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      setDisplayIndex(next)
      setCurrentIndex(next)
      setAnimating(false)
    }, 400)
  }

  const prev = () => goToSlide(0, 'left')
  const next = () => goToSlide(1, 'right')

  const slide = slides[displayIndex]
  const isPrevDisabled = !mounted || currentIndex === 0
  const isNextDisabled = !mounted || currentIndex === 1

  const fadeClass = animating
    ? `opacity-0 ${direction === 'right' ? 'translate-y-3' : '-translate-y-3'}`
    : 'opacity-100 translate-y-0'

  const imgClass = animating
    ? 'opacity-0 scale-[1.03]'
    : 'opacity-100 scale-100'

  return (
    <section className="w-full bg-[#0F0E0C] relative overflow-hidden">

      {/* Top accent bar */}
      <div className="h-[2px] bg-primary w-[40%]" />

      <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">

        {/* ── Image panel ── */}
        <div className="relative overflow-hidden min-h-[300px] lg:min-h-[560px] bg-[#1A1814]">

          {/* L-bracket corner */}
          <div className="absolute top-6 left-6 z-10 w-10 h-10
            border-t-2 border-l-2 border-primary pointer-events-none" />

          {/* Slide counter */}
          <div className="absolute top-6 right-5 z-10
            text-[10px] tracking-[0.16em] text-white/25">
            {String(displayIndex + 1).padStart(2, '0')} / 02
          </div>

          {/* Image */}
          <div className={`relative w-full h-full min-h-[300px] lg:min-h-[560px]
            transition-all duration-[400ms] ease-out ${imgClass}`}>
            <Image
              src={slide.image}
              alt={slide.titleLine1}
              fill
              className="object-cover object-top"
              priority
            />
            {/* Fade to bg on right — desktop */}
            <div className="absolute inset-0 hidden lg:block
              bg-gradient-to-r from-transparent via-transparent to-[#0F0E0C]" />
            {/* Fade to bg on bottom — mobile */}
            <div className="absolute inset-0 lg:hidden
              bg-gradient-to-b from-transparent via-transparent to-[#0F0E0C]" />
          </div>
        </div>

        {/* ── Content panel ── */}
        <div className="flex flex-col bg-[#0F0E0C]">

          {/* Folder tabs */}
          <div className="flex px-6 pt-8 sm:px-10 lg:px-16">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goToSlide(i, i > currentIndex ? 'right' : 'left')}
                className={`
                  px-5 py-2.5 text-[10px] tracking-[0.16em] uppercase
                  transition-all duration-200 font-questrial
                  ${i === currentIndex
                    ? 'text-primary border border-primary border-b-[#0F0E0C] -mb-px bg-[#0F0E0C] relative z-10'
                    : 'text-white/30 border border-transparent hover:text-white/60'
                  }
                `}
              >
                Initiative {String(i + 1).padStart(2, '0')}
              </button>
            ))}
          </div>

          {/* Folder content box */}
          <div className="flex-1 px-6 pb-10 sm:px-10 lg:px-16 lg:pb-14">
            <div className="h-full border border-primary/60 border-t-primary
              p-8 lg:p-10 flex flex-col justify-center relative">

              {/* Vertical accent line */}
              <div className="absolute left-0 top-[20%] bottom-[20%]
                w-[2px] bg-primary opacity-50 hidden lg:block" />

              {/* Eyebrow */}
              <div className={`transition-all duration-[400ms] ease-out mb-4 ${fadeClass}`}
                style={{ transitionDelay: '0ms' }}>
                <span className="text-[10px] tracking-[0.22em] uppercase text-primary">
                  Eco Initiative
                </span>
              </div>

              {/* Heading */}
              <h2
                className={`transition-all duration-[400ms] ease-out
                  text-[28px] sm:text-[32px] lg:text-[36px]
                  font-normal text-[#F5F0E8] leading-[1.15] mb-5 ${fadeClass}`}
                style={{ transitionDelay: '50ms' }}
              >
                {slide.titleLine1}
                <br />
                <span className="text-primary">{slide.titleHighlight}</span>
                <br />
                {slide.titleLine2}
              </h2>

              {/* Divider */}
              <div
                className={`transition-all duration-[400ms] ease-out
                  w-8 h-px bg-white/10 mb-5 ${fadeClass}`}
                style={{ transitionDelay: '80ms' }}
              />

              {/* Description */}
              <p
                className={`transition-all duration-[400ms] ease-out
                  text-[14px] text-paragraph leading-[1.9] mb-8
                  max-w-[360px] ${fadeClass}`}
                style={{ transitionDelay: '100ms' }}
              >
                {slide.description}
              </p>

              {/* Arrows + progress */}
              <div
                className={`transition-all duration-[400ms] ease-out
                  flex items-center gap-0.5 ${fadeClass}`}
                style={{ transitionDelay: '130ms' }}
              >
                <button
                  onClick={prev}
                  aria-label="Previous slide"
                  disabled={isPrevDisabled}
                  className={`
                    w-11 h-11 flex items-center justify-center text-[15px]
                    border transition-all duration-200
                    ${isPrevDisabled
                      ? 'border-white/10 text-white/15 cursor-not-allowed'
                      : 'border-white/20 text-white/50 cursor-pointer hover:bg-primary hover:border-primary hover:text-white'
                    }
                  `}
                >
                  ←
                </button>
                <button
                  onClick={next}
                  aria-label="Next slide"
                  disabled={isNextDisabled}
                  className={`
                    w-11 h-11 flex items-center justify-center text-[15px]
                    border transition-all duration-200
                    ${isNextDisabled
                      ? 'border-white/10 text-white/15 cursor-not-allowed'
                      : 'border-white/20 text-white/50 cursor-pointer hover:bg-primary hover:border-primary hover:text-white'
                    }
                  `}
                >
                  →
                </button>

                {/* Progress track */}
                <div className="relative h-px bg-white/10 w-20 ml-4 flex-shrink-0">
                  <div
                    className="absolute top-0 left-0 h-px bg-primary transition-all duration-[400ms] ease-out"
                    style={{ width: displayIndex === 0 ? '50%' : '100%' }}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}