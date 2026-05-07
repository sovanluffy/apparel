'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { HERO_SLIDES } from '@/constants/hero'

const SLIDE_DURATION = 5000

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(Date.now())

  const goTo = useCallback((index: number) => {
    setVisible(false)
    setTimeout(() => {
      setCurrent(index)
      setProgress(0)
      startTimeRef.current = Date.now()
      setVisible(true)
    }, 250)
  }, [])

  const goToNext = useCallback(() => {
    goTo((current + 1) % HERO_SLIDES.length)
  }, [current, goTo])

  const goToPrev = useCallback(() => {
    goTo((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }, [current, goTo])

  useEffect(() => {
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100)
      setProgress(pct)
      if (pct >= 100) goToNext()
    }, 16)
    return () => {
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [goToNext])

  return (
    <section
      className="relative w-full overflow-hidden bg-[#0C0B09]"
      style={{ height: 'min(90vh, 720px)' }}
    >
      {/* Progress bar */}
      <div
        className="absolute top-0 left-0 h-[2px] z-20 transition-none"
        style={{ width: `${progress}%`, backgroundColor: 'var(--primary)' }}
      />

      {/* Slide number — desktop only */}
      <div className="absolute top-6 right-6 z-20 text-[11px] tracking-[0.14em] text-white/30 hidden sm:block">
        {String(current + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
      </div>

      {/* Slides */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
        {slide.type === 'video' ? (
  <video
    src={slide.src}
    autoPlay
    muted
    loop
    playsInline
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
  />
) : (
  <Image src={slide.src} alt={slide.title} fill />
)}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Content */}
      <div
        className="absolute inset-0 z-20 flex flex-col justify-end
          px-5 pb-24
          sm:px-10 sm:pb-12
          lg:px-16 lg:pb-14"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}
      >
        <p
          className="text-[10px] tracking-[0.22em] uppercase mb-2"
          style={{ color: 'var(--primary)' }}
        >
          {HERO_SLIDES[current].subtitle}
        </p>

        <h1
          className="mb-2
            text-[30px] leading-[1.1]
            sm:text-[48px] sm:leading-[1.08]
            lg:text-[60px]"
          style={{
            fontFamily: 'var(--font-display)',
            color: '#F5F0E8',
            fontWeight: 400,
          }}
        >
          {HERO_SLIDES[current].title}
        </h1>

        <h4 className="text-[10px] tracking-[0.18em] uppercase text-white/60 mb-6 sm:mb-7">
          Modern · Sustainable · Style
        </h4>

        <div className="flex items-center gap-4 flex-wrap">
          <button
            className="text-[11px] tracking-[0.14em] uppercase font-medium
              px-6 py-3 min-h-[44px]
              transition-opacity duration-200 hover:opacity-85"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#0C0B09',
              fontFamily: 'var(--font-body)',
            }}
          >
            Shop Now
          </button>
          <button
            className="text-[11px] tracking-[0.14em] uppercase text-white/50
              border-b border-white/25 pb-0.5 min-h-[44px]
              transition-colors duration-200 hover:text-white hover:border-white/60"
            style={{ fontFamily: 'var(--font-body)', background: 'transparent' }}
          >
            View Lookbook
          </button>
        </div>
      </div>

      {/* Vertical dot indicators — desktop only */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col gap-2">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="transition-all duration-300 rounded-sm"
            style={{
              width: '5px',
              height: index === current ? '20px' : '5px',
              borderRadius: index === current ? '3px' : '50%',
              backgroundColor:
                index === current ? 'var(--primary)' : 'rgba(255,255,255,0.25)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Arrow controls — desktop */}
      <div
        className="absolute z-30 hidden sm:flex gap-px"
        style={{ bottom: '3.5rem', right: '5rem' }}
      >
        <button
          onClick={goToPrev}
          aria-label="Previous slide"
          className="w-10 h-10 flex items-center justify-center text-[18px] text-white/50
            transition-all duration-200 hover:text-[--primary]"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '0.5px solid rgba(255,255,255,0.12)',
          }}
        >
          ‹
        </button>
        <button
          onClick={goToNext}
          aria-label="Next slide"
          className="w-10 h-10 flex items-center justify-center text-[18px] text-white/50
            transition-all duration-200 hover:text-[--primary]"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '0.5px solid rgba(255,255,255,0.12)',
          }}
        >
          ›
        </button>
      </div>

      {/* Mobile bottom bar — dots + arrows together */}
      <div className="absolute bottom-5 left-0 right-0 z-30 flex items-center justify-between px-5 sm:hidden">
        {/* Prev arrow */}
        <button
          onClick={goToPrev}
          aria-label="Previous slide"
          className="w-11 h-11 flex items-center justify-center text-[20px] text-white/50"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '0.5px solid rgba(255,255,255,0.12)',
          }}
        >
          ‹
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-[6px]">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              style={{
                width: index === current ? '18px' : '5px',
                height: '5px',
                borderRadius: index === current ? '3px' : '50%',
                backgroundColor:
                  index === current ? 'var(--primary)' : 'rgba(255,255,255,0.3)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>

        {/* Next arrow */}
        <button
          onClick={goToNext}
          aria-label="Next slide"
          className="w-11 h-11 flex items-center justify-center text-[20px] text-white/50"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '0.5px solid rgba(255,255,255,0.12)',
          }}
        >
          ›
        </button>
      </div>
    </section>
  )
}