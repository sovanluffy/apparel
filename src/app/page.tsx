// src/app/page.tsx
import HeroSection from '@/components/sections/HeroSection'
import SustainableSection from '@/components/sections/SustainableSection'
import ServiceSection from '@/components/sections/ServiceSection'
import EcoFriendlySection from '@/components/sections/Eco-FriendlySection'
import { ecoFriendlySlides } from '@/constants/ecoFriendlySlides'

export default function Home() {
  return (
    <main className="flex flex-col bg-white">

      {/* Hero — full-bleed, no top margin */}
      <HeroSection />

      {/* Sustainable — breathing room below hero */}
        <SustainableSection />
  

      {/* Service — distinct band, slightly tighter */}
      <div className="">
        <ServiceSection />
      </div>

      {/* Eco-Friendly — flush, self-contained dark section */}
      <div className="mt-16 lg:mt-24">
        <EcoFriendlySection slides={ecoFriendlySlides} />
      </div>

    </main>
  )
}