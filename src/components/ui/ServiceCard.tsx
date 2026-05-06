// src/components/ui/ServiceCard.tsx
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

type ServiceCardProps = {
  image: StaticImageData
  title: string
  href?: string
}

export default function ServiceCard({ image, title, href = '#' }: ServiceCardProps) {
  return (
    <div
      className="bg-white flex flex-col"
      style={{
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        borderRadius: '2px',
        height: '100%',
      }}
    >
      {/* Image with START NOW badge */}
      <div className="relative w-full" style={{ height: '220px', flexShrink: 0 }}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <Link
          href={href}
          className="absolute bottom-0 left-0 flex items-center justify-center text-white uppercase hover:opacity-90 transition-opacity"
          style={{
            backgroundColor: 'var(--primary)',
            fontSize: '10px',
            letterSpacing: '0.15em',
            padding: '7px 16px',
            fontFamily: 'var(--font-questrial)',
            fontWeight: 600,
          }}
        >
          Start Now
        </Link>
      </div>

      {/* Title */}
      <div
        style={{
          padding: '20px 24px 24px',
          minHeight: '72px',
          display: 'flex',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-questrial)',
            fontSize: '16px',
            fontWeight: 400,
            color: '#000000',
            lineHeight: '1.4',
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>
    </div>
  )
}