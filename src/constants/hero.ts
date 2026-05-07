import journey2022 from '@/assets/images/icare/education-1.jpg'
import journey2021 from '@/assets/images/aboutus/journey-2021.jpg'
import journey2023 from '@/assets/images/media/2021/responding to covid-19 thumbnail-1.jpg'
import heroVideo from '@/assets/images/video/banner-main1.mp4'

export type SlideType = 'image' | 'video'

export interface HeroSlide {
  src: any
  type: SlideType
  title: string
  subtitle: string
  poster?: any  
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    src: journey2022,
    type: 'image',
    title: 'New Collection',
    subtitle: 'Discover the latest arrivals',
  },
  {
    src: journey2021,
    type: 'image',
    title: 'Sustainable Fashion',
    subtitle: 'Eco-friendly materials',
  },
  {
    src: journey2023,
    type: 'image',
    title: 'Modern Apparel',
    subtitle: 'Crafted for every occasion',
  },
  {
    src: heroVideo,
    type: 'video',
    title: 'Our Story',
    subtitle: 'See what drives us forward',
    poster: journey2022,
  },
]