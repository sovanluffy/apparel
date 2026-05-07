'use client'

import { useState, useEffect, useRef } from 'react'
import ServiceCard from '@/components/ui/ServiceCard'
import { services } from '@/constants/services'

const getItemsPerPage = () => {
  if (typeof window === 'undefined') return 6
  if (window.innerWidth < 640) return 3
  if (window.innerWidth < 1024) return 4
  return 6
}

const AUTO_INTERVAL = 30000

export default function ServiceSection() {
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [displayPage, setDisplayPage] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const update = () => {
      setItemsPerPage(getItemsPerPage())
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
    }, 350)
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
      }, 350)
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
    <section className="w-full bg-[#FAFAF8] py-16 md:py-20 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between
          gap-6 mb-12 md:mb-14">

          {/* Left — title block */}
          <div>
            <p className="text-primary uppercase text-[10px] tracking-[0.24em]
              leading-none mb-3 font-normal">
              What We Offer
            </p>
            <div className="w-8 h-px bg-primary/30 mb-4" />
            <h2 className="text-foreground font-normal
              text-[32px] sm:text-[38px] lg:text-h2
              leading-[1.1] mb-3">
              Our{' '}
              <span className="text-primary">Services</span>
            </h2>
            <p className="text-paragraph text-[14px] leading-[1.7] max-w-[400px]">
              <span className="text-primary">I Apparel</span>{' '}
              has the best professionals in the industry to handle all your garment needs
            </p>
          </div>

          {/* Right — arrow controls */}
          <div className="flex gap-0.5 shrink-0">
            <button
              onClick={prev}
              aria-label="Previous page"
              className={`
                w-11 h-11 flex items-center justify-center text-[15px]
                transition-all duration-200
                ${isPrevDisabled
                  ? 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                  : 'bg-primary text-white hover:opacity-90 active:scale-95 cursor-pointer'
                }
              `}
            >
              ←
            </button>
            <button
              onClick={next}
              aria-label="Next page"
              className={`
                w-11 h-11 flex items-center justify-center text-[15px]
                transition-all duration-200
                ${isNextDisabled
                  ? 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                  : 'bg-primary text-white hover:opacity-90 active:scale-95 cursor-pointer'
                }
              `}
            >
              →
            </button>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${direction === 'right' ? '-32px' : '32px'})`
              : 'translateX(0)',
            transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {paginated.map((service, index) => (
            <div
              key={`${displayPage}-${service.id}`}
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? 'translateY(6px)' : 'translateY(0)',
                transition: `opacity 0.35s ease ${index * 30}ms,
                             transform 0.35s ease ${index * 30}ms`,
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

        {/* ── Dots + counter ── */}
        <div className="flex flex-col items-center gap-2.5 mt-10">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToDot(i)}
                aria-label={`Go to page ${i + 1}`}
                style={{
                  height: '4px',
                  width: i === currentPage ? '32px' : '20px',
                  background: i === currentPage ? 'var(--primary)' : '#D1D5DB',
                  transform: 'skewX(-18deg)',
                  border: 'none',
                  padding: 0,
                  cursor: i === currentPage ? 'default' : 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                }}
              />
            ))}
          </div>
          <p className="text-[11px] tracking-[0.12em] text-[#9CA3AF] sm:hidden">
            {currentPage + 1} / {totalPages}
          </p>
        </div>

      </div>
    </section>
  )
}