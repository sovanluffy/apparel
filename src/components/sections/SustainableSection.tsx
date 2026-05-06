// src/components/sections/SustainableSection.tsx
import Image from 'next/image'
import factory from '@/assets/images/service/value added-3.jpg'
import award from '@/assets/images/icare/education-1.jpg'
import community from '@/assets/images/service/value added-2.jpg'
import Button from '@/components/ui/Button'

export default function SustainableSection() {
  return (
    <section className="w-full bg-white">
      <div className="grid grid-cols-2" style={{ minHeight: '600px' }}>

        {/* Left 50% - Text */}
        <div
          className="flex flex-col justify-center"
          style={{ padding: '80px 64px' }}
        >
          <p
            className="uppercase mb-5"
            style={{
              color: 'var(--primary)',
              fontSize: '12px',
              letterSpacing: '0.25em',
              lineHeight: '1',
            }}
          >
            Design Your Transition to
          </p>

          <h2
            className="font-light mb-8"
            style={{
              fontSize: '54px',
              lineHeight: '1.05',
              color: '#171717',
            }}
          >
            Sustainable<br />Fashion
          </h2>

          <p
            className="mb-12"
            style={{
              fontSize: '15px',
              lineHeight: '1.9',
              color: '#6B7280',
            }}
          >
            Since 2010, I Apparel International Group strongly believes that
            fashion and sustainability goes hand in hand and has made it our
            mission to produce eco-friendly products at our factories. A reliable
            manufacturing partner of world-famous apparel brands, we use available
            modern technologies to apply ESG standards in every work we do, from
            start to finish. Our creations celebrate our love for our planet, the
            well-being of the people making them, and ultimately the joy and safety
            of individuals wearing them, no matter their age.
          </p>

          <Button
            href="/about"
            label="Learn More"
            variant="primary"
            size="md"
            
          />
        </div>

        {/* Right 50% - Images */}
        <div
          className="flex items-center gap-3"
          style={{ padding: '40px 64px 40px 32px' }}
        >

          {/* Large left image */}
          <div className="relative flex-1 h-full" style={{ minHeight: '480px' }}>
            <Image
              src={factory}
              alt="Factory"
              fill
              className="object-cover"
            />
          </div>

          {/* Two stacked images */}
          <div className="flex flex-col gap-3" style={{ width: '45%' }}>
            <div className="relative" style={{ height: '270px' }}>
              <Image
                src={award}
                alt="Award"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative" style={{ height: '270px' }}>
              <Image
                src={community}
                alt="Community"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}