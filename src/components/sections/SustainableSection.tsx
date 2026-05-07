import Image from 'next/image'
import factory from '@/assets/images/service/value added-3.jpg'
import award from '@/assets/images/icare/education-1.jpg'
import community from '@/assets/images/service/value added-2.jpg'
import Button from '@/components/ui/Button'

function ImageTag({ label }: { label: string }) {
  return (
    <span className="absolute bottom-3 left-3 bg-black/70 text-white
      text-[9px] tracking-[0.14em] uppercase px-2.5 py-1">
      {label}
    </span>
  )
}

export default function SustainableSection() {
  return (
    <section className="w-full bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">

        {/* ── Left — Text ── */}
        <div className="flex flex-col justify-center
          px-6 py-16
          sm:px-10 sm:py-16
          lg:px-16 lg:py-20
          xl:px-20">

          {/* Eyebrow */}
          <p className="text-primary uppercase text-[10px] tracking-[0.24em]
            leading-none mb-4 font-normal">
            Design Your Transition to
          </p>

          {/* Rule */}
          <div className="w-8 h-px bg-primary/30 mb-5" />

          {/* Heading */}
          <h2 className="text-foreground font-normal
            text-[36px] sm:text-[44px] lg:text-h2
            leading-[1.06] mb-3">
            Sustainable
            <br />
            <span className="text-primary">Fashion</span>
          </h2>

          {/* Subheading */}
          <p className="text-[#7A6A58] text-[15px] leading-snug mb-6 italic">
            Where responsibility meets refinement.
          </p>

          {/* Divider */}
          <div className="w-10 h-px bg-foreground/10 mb-7" />

          {/* Body copy */}
        {/* Body copy */}
          <p className="text-paragraph text-body leading-[1.9] w-full mb-10">
            Since 2010, I Apparel International Group strongly believes that
            fashion and sustainability go hand in hand and has made it our
            mission to produce eco-friendly products at our factories. A reliable
            manufacturing partner of world-famous apparel brands, we use available
            modern technologies to apply ESG standards in every work we do, from
            start to finish. Our creations celebrate our love for our planet, the
            well-being of the people making them, and ultimately the joy and safety
            of individuals wearing them, no matter their age.
          </p>

          <div>
            <Button href="/about" label="Learn More" variant="primary" size="md" />
          </div>
        </div>

        {/* ── Right — Images ── */}
        <div className="flex gap-2.5 items-stretch overflow-hidden
          px-4 py-8
          sm:px-8 sm:py-10
          lg:pl-6 lg:pr-14 lg:py-12">

          {/* Tall main image */}
          <div className="relative flex-1 min-h-[400px] lg:min-h-0">
            <Image
              src={factory}
              alt="Our production facility"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 30vw"
            />
            <ImageTag label="Production" />
          </div>

          {/* Two stacked images */}
          <div className="flex flex-col gap-2.5 w-[42%]">
            <div className="relative flex-1 min-h-[195px]">
              <Image
                src={award}
                alt="Award recognition"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 20vw"
              />
              <ImageTag label="Recognition" />
            </div>
            <div className="relative flex-1 min-h-[195px]">
              <Image
                src={community}
                alt="Community initiative"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 20vw"
              />
              <ImageTag label="Community" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}