// src/components/sections/ServiceSection.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import ServiceCard from '@/components/ui/ServiceCard'
import { services } from '@/constants/services'

const getItemsPerPage = () => {
  if (typeof window === 'undefined') return 6
  if (window.innerWidth < 640) return 3   // mobile: 3 cards (1 col × 3)
  if (window.innerWidth < 1024) return 4  // tablet: 4 cards (2 col × 2)
  return 6                                 // desktop: 6 cards (3 col × 2)
}

const AUTO_INTERVAL = 30000

export default function ServiceSection() {
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [displayPage, setDisplayPage] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Recalculate items per page on resize
  useEffect(() => {
    const update = () => {
      const next = getItemsPerPage()
      setItemsPerPage(next)
      setCurrentPage(0)
      setDisplayPage(0)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const totalPages = Math.ceil(services.length / itemsPerPage)

  const goToPage = (next: number, dir: 'left' | 'right') => {
    if (animating) return
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      setDisplayPage(next)
      setCurrentPage(next)
      setAnimating(false)
    }, 380)
  }

  const prev = () => {
    if (currentPage === 0) return
    goToPage(currentPage - 1, 'left')
    resetTimer()
  }

  const next = () => {
    if (currentPage === totalPages - 1) return
    goToPage(currentPage + 1, 'right')
    resetTimer()
  }

  const goToDot = (i: number) => {
    if (i === currentPage || animating) return
    goToPage(i, i > currentPage ? 'right' : 'left')
    resetTimer()
  }

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setDirection('right')
      setAnimating(true)
      setTimeout(() => {
        setCurrentPage((p) => {
          const n = (p + 1) % totalPages
          setDisplayPage(n)
          return n
        })
        setAnimating(false)
      }, 380)
    }, AUTO_INTERVAL)
  }

  useEffect(() => {
    resetTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [totalPages])

  const paginated = services.slice(
    displayPage * itemsPerPage,
    displayPage * itemsPerPage + itemsPerPage
  )

  const isPrevDisabled = currentPage === 0
  const isNextDisabled = currentPage === totalPages - 1

  return (
    <section className="w-full bg-[#F3F4F6] py-16 md:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-10 md:mb-14 relative">
          {/* Skewed background accent */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -skew-x-12 w-48 md:w-72 h-16 md:h-24 bg-red-100 opacity-50 z-0 pointer-events-none"
          />
          <h2
            className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-normal text-black mb-3"
            style={{ fontFamily: 'var(--font-questrial)' }}
          >
            Our Services
          </h2>
          <p
            className="relative z-10 text-sm md:text-base text-[var(--color-paragraph)]"
            style={{ fontFamily: 'var(--font-questrial)' }}
          >
            <span className="text-[var(--primary)] font-medium">I Apparel</span>{' '}
            has the best professionals in the industry to handle all your garment needs
          </p>
        </div>

        {/* ── Grid + Arrows ── */}
        <div className="relative flex items-center gap-2 sm:gap-0 sm:px-12">

          {/* Left Arrow */}
          <button
            onClick={prev}
            aria-label="Previous page"
            className={`
              flex-shrink-0 sm:absolute sm:left-0
              flex items-center justify-center
              w-9 h-9 sm:w-10 sm:h-10
              transition-all duration-300
              ${isPrevDisabled
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[var(--primary)] text-white cursor-pointer hover:scale-110 active:scale-95'
              }
            `}
          >
            ←
          </button>

          {/* Cards grid */}
          <div
            className="flex-1 min-w-0"
            style={{
              transform: animating
                ? `translateX(${direction === 'right' ? '-48px' : '48px'})`
                : 'translateX(0)',
              opacity: animating ? 0 : 1,
              transition: 'transform 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.38s ease',
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {paginated.map((service, index) => (
                <div
                  key={`${displayPage}-${service.id}`}
                  style={{
                    opacity: animating ? 0 : 1,
                    transform: animating ? 'translateY(8px)' : 'translateY(0)',
                    transition: `opacity 0.38s ease ${index * 35}ms, transform 0.38s ease ${index * 35}ms`,
                  }}
                >
                  <ServiceCard
                    image={service.image}
                    title={service.title}
                    href={service.href}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={next}
            aria-label="Next page"
            className={`
              flex-shrink-0 sm:absolute sm:right-0
              flex items-center justify-center
              w-9 h-9 sm:w-10 sm:h-10
              transition-all duration-300
              ${isNextDisabled
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[var(--primary)] text-white cursor-pointer hover:scale-110 active:scale-95'
              }
            `}
          >
            →
          </button>

        </div>

        {/* ── Dots + page counter ── */}
        <div className="flex flex-col items-center gap-3 mt-8 md:mt-10">

          {/* Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToDot(i)}
                aria-label={`Go to page ${i + 1}`}
                className="transition-all duration-350"
                style={{
                  width: i === currentPage ? '36px' : '24px',
                  height: '5px',
                  transform: 'skewX(-20deg)',
                  backgroundColor: i === currentPage ? 'var(--primary)' : '#D1D5DB',
                  cursor: 'pointer',
                  border: 'none',
                  padding: 0,
                  transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                }}
              />
            ))}
          </div>

          {/* Page counter — mobile only */}
          <p className="sm:hidden text-[12px] text-gray-400 tracking-widest">
            {currentPage + 1} / {totalPages}
          </p>

        </div>

      </div>
    </section>
  )
}