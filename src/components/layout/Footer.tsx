// src/components/layout/Footer.tsx
import { SOCIAL_LINKS } from '@/constants/social'

const LOCATIONS = [
  {
    country: 'Singapore',
    flag: '🇸🇬',
    address: '7 Kallang place #02-08',
    addressHref: 'https://maps.google.com/?q=7+Kallang+Place+Singapore',
    phone: '+65 6292 9339',
    phoneHref: 'tel:+6562929339',
  },
  {
    country: 'Cambodia',
    flag: '🇰🇭',
    address: 'Kandal Steung District',
    addressHref: 'https://maps.google.com/?q=Kandal+Steung+District+Cambodia',
    phone: '+855 1789 2177',
    phoneHref: 'tel:+85517892177',
  },
  {
    country: 'Hong Kong',
    flag: '🇭🇰',
    address: 'Hung To Road, Kwun Tong',
    addressHref: 'https://maps.google.com/?q=Hung+To+Road+Kwun+Tong+Hong+Kong',
    phone: '+852 2793 3681',
    phoneHref: 'tel:+85227933681',
  },
]

export default function Footer() {
  return (
    <footer className="w-full bg-[#0d0d0d] text-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-16 pb-10">

        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
          style={{ fontFamily: 'var(--font-questrial)' }}
        >
          Contact Us<br />Now!
        </h2>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-10" />

        {/* Location columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/10 mb-12">
          {LOCATIONS.map((loc) => (
            <div key={loc.country} className="flex flex-col gap-3 px-0 sm:px-8 first:pl-0 last:pr-0 py-6 sm:py-0">

              {/* Country + flag */}
              <div className="flex items-center gap-2">
                <span className="text-2xl leading-none">{loc.flag}</span>
                <span
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: 'var(--font-questrial)' }}
                >
                  {loc.country}
                </span>
              </div>

              {/* Address */}
              <a
                href={loc.addressHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-[13px] text-[#F97316] hover:text-[#ea6c0a] transition-colors duration-200 group"
              >
                <span className="mt-[2px] flex-shrink-0">•</span>
                <span className="underline underline-offset-2 decoration-[#F97316]/40 group-hover:decoration-[#F97316]">
                  {loc.address}
                </span>
              </a>

              {/* Phone */}
              <a
                href={loc.phoneHref}
                className="flex items-center gap-2 text-[13px] text-[#F97316] hover:text-[#ea6c0a] transition-colors duration-200 group"
              >
                <span className="flex-shrink-0">•</span>
                <span className="underline underline-offset-2 decoration-[#F97316]/40 group-hover:decoration-[#F97316]">
                  {loc.phone}
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* Social icons — centered */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-10 h-10 flex items-center justify-center border border-[#F97316]/60 text-white/60 hover:text-white hover:border-[#F97316] hover:bg-[#F97316]/10 transition-all duration-200"
            >
              <span className="text-[11px] font-semibold tracking-wide uppercase">
                {social.label.slice(0, 2)}
              </span>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px]">
          <p className="text-white/30 tracking-wide">
            © {new Date().getFullYear()} iApparel International Group PTE., LTD. All Rights Reserved.
          </p>
          <div className="flex items-center gap-1 text-white/30">
            <a
              href="mailto:enquiry@iapparelintl.com"
              className="text-[#F97316] hover:text-[#ea6c0a] transition-colors duration-200"
            >
              Email Us
            </a>
            <span className="mx-2">|</span>
            <span>Inquiries :</span>
            <a
              href="mailto:enquiry@iapparelintl.com"
              className="ml-1 hover:text-white transition-colors duration-200"
            >
              enquiry@iapparelintl.com
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}