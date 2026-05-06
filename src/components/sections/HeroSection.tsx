'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { HERO_SLIDES } from '@/constants/hero'

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext()
    }, 4000)
    return () => clearInterval(timer)
  }, [current])

  const goToNext = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length)
      setIsAnimating(false)
    }, 300)
  }

  const goToPrev = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
      setIsAnimating(false)
    }, 300)
  }

  const goToSlide = (index: number) => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setIsAnimating(false)
    }, 300)
  }

  return (
    <section className="relative w-full h-[90vh] overflow-hidden bg-black">

      {/* Slides */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.title}
            fill
            className="object-cover object-center"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      {/* Orange accent right */}
      <div
        className="absolute top-0 right-0 w-[6px] h-full z-20"
        style={{ backgroundColor: 'var(--primary)' }}
      />

      {/* Content */}
      <div
        className={`absolute inset-0 z-20 flex flex-col justify-end px-16 pb-20 transition-opacity duration-300 ${
          isAnimating ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Brand Card */}
        <div className="bg-white/90 backdrop-blur-sm px-10 py-8 max-w-xs rounded-sm shadow-lg">
          <h2 className="text-[16px] tracking-[0.3em] uppercase text-gray-400 mb-1">
            {HERO_SLIDES[current].subtitle}
          </h2>
          <h1
            className="text-[56px] leading-none"
            style={{ color: 'var(--primary)', fontFamily: 'var(--font-questrial)' }}
          >
            i-apparel
          </h1>
          <p className="text-[14px] tracking-widest uppercase text-gray-500 mt-2">
            Modern · Sustainable · Style
          </p>
          <div
            className="w-12 h-[2px] mt-4"
            style={{ backgroundColor: 'var(--primary)' }}
          />
        </div>

        {/* Bottom tagline */}
        <div className="mt-8 flex items-center gap-6">
          <div
            className="w-12 h-[2px]"
            style={{ backgroundColor: 'var(--primary)' }}
          />
          <p className=" text-[14px] tracking-[0.2em] uppercase">
            {HERO_SLIDES[current].title}
          </p>
          <button
            className="px-8 py-3 text-[12px] tracking-widest uppercase text-white transition-all duration-200 hover:opacity-80"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Prev Arrow */}
      <button
        onClick={goToPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-black/40 text-white hover:bg-[--primary] transition-all duration-200 text-[24px]"
      >
        ‹
      </button>

      {/* Next Arrow */}
      <button
        onClick={goToNext}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-black/40 text-white hover:bg-[--primary] transition-all duration-200 text-[24px]"
      >
        ›
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === current
                ? 'w-8 h-2 bg-[--primary]'
                : 'w-2 h-2 bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>

    </section>
  )
}