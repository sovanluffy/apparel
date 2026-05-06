// src/components/layout/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NAV_LINKS } from '@/constants/navigation'

import logoDark from '@/assets/images/aboutus/logoMenu.png'
import logoLight from '@/assets/images/aboutus/logoMenu.png'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <nav
        className={`
          w-full flex items-stretch justify-between sticky top-0 z-50 h-16 md:h-20
          transition-all duration-500 ease-in-out
          ${scrolled
            ? 'bg-white shadow-[0_2px_24px_rgba(0,0,0,0.10)]'
            : 'bg-black'
          }
        `}
      >
        {/* ── Logo box ── */}
        <div
          className={`
            flex items-center justify-center px-4 md:px-6 relative z-10
            transition-all duration-500 ease-in-out
            w-[100px] md:w-[200px] rounded-br-2xl
            ${scrolled ? 'bg-[#f5d4a3]' : 'bg-white'}
          `}
          style={{ marginBottom: '-16px', paddingBottom: '20px' }}
        >
          <Link href="/" className="w-full flex items-center justify-center">
            <Image
              src={scrolled ? logoDark : logoLight}
              alt="i-Apparel"
              className="w-full h-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* ── Desktop nav links ── */}
        <ul className="hidden md:flex items-center gap-1 flex-1 px-6 lg:px-10">
          {NAV_LINKS.map((link, index) => (
            <li key={link.href} className="relative group h-full flex items-center">
              <Link
                href={link.href}
                onClick={() => setActiveIndex(index)}
                className={`
                  text-[12px] lg:text-[13px] tracking-widest uppercase px-3 lg:px-4 py-2
                  transition-all duration-200 relative whitespace-nowrap
                  ${activeIndex === index
                    ? 'text-[#F97316]'
                    : scrolled
                      ? 'text-gray-800 hover:text-[#F97316]'
                      : 'text-white hover:text-[#F97316]'
                  }
                `}
              >
                {link.label}
                <span
                  className={`
                    absolute bottom-0 left-0 h-[2px] bg-[#F97316]
                    transition-all duration-300
                    ${activeIndex === index ? 'w-full' : 'w-0 group-hover:w-full'}
                  `}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA ── */}
        <div className="hidden md:flex items-center">
          <button className="h-full px-5 lg:px-7 text-[11px] lg:text-[12px] tracking-widest uppercase font-semibold bg-[#F97316] text-white hover:bg-[#ea6c0a] transition-colors duration-300">
            <span className="hidden lg:inline">Request Profile Access</span>
            <span className="lg:hidden">Contact</span>
          </button>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-14 h-full px-4"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className={`
              block w-5 h-[1.5px] transition-all duration-300 origin-center
              ${scrolled ? 'bg-gray-800' : 'bg-white'}
              ${isOpen ? 'rotate-45 translate-y-[6.5px]' : ''}
            `}
          />
          <span
            className={`
              block w-5 h-[1.5px] transition-all duration-300
              ${scrolled ? 'bg-gray-800' : 'bg-white'}
              ${isOpen ? 'opacity-0 scale-x-0' : ''}
            `}
          />
          <span
            className={`
              block w-5 h-[1.5px] transition-all duration-300 origin-center
              ${scrolled ? 'bg-gray-800' : 'bg-white'}
              ${isOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}
            `}
          />
        </button>
      </nav>

      {/* ── Backdrop ── */}
      <div
        onClick={() => setIsOpen(false)}
        className={`
          fixed inset-0 z-40 md:hidden
          bg-black/60 backdrop-blur-sm
          transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      />

      {/* ── Right Drawer ── */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[75vw] max-w-[320px] z-50 md:hidden
          bg-[#0d0d0d] flex flex-col
          transition-transform duration-400 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{ boxShadow: '-8px 0 40px rgba(0,0,0,0.5)' }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
          <span className="text-[11px] tracking-[0.2em] uppercase text-white/40 font-semibold">
            Menu
          </span>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-200"
          >
            {/* X icon */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Orange accent line */}
        <div className="h-[2px] bg-gradient-to-r from-[#F97316] to-transparent" />

        {/* Nav links */}
        <ul className="flex flex-col flex-1 pt-4 overflow-y-auto">
          {NAV_LINKS.map((link, index) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => { setActiveIndex(index); setIsOpen(false) }}
                className={`
                  flex items-center gap-4 px-6 py-4
                  text-[12px] tracking-[0.15em] uppercase
                  transition-all duration-200 group
                  border-b border-white/5
                  ${activeIndex === index
                    ? 'text-[#F97316] bg-white/5'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {/* Active indicator dot */}
                <span
                  className={`
                    w-1 h-1 rounded-full flex-shrink-0 transition-all duration-200
                    ${activeIndex === index ? 'bg-[#F97316]' : 'bg-white/20 group-hover:bg-white/50'}
                  `}
                />
                {link.label}

                {/* Arrow on active */}
                {activeIndex === index && (
                  <span className="ml-auto text-[#F97316] text-xs">›</span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Drawer footer CTA */}
        <div className="p-5 border-t border-white/10">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full py-4 text-[12px] tracking-[0.15em] uppercase font-semibold text-white bg-[#F97316] hover:bg-[#ea6c0a] transition-colors duration-200"
          >
            Request Profile Access
          </button>
          {/* Small brand note */}
          <p className="text-center text-[10px] text-white/20 tracking-widest uppercase mt-4">
            i-Apparel © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </>
  )
}