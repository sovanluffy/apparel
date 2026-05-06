// src/constants/ecoFriendlySlides.ts
import { StaticImageData } from 'next/image'
import slide1 from '@/assets/images/landingpage/quality-control.png'
import slide2 from '@/assets/images/service/vmi-2.jpg'

export type EcoSlide = {
  id: number
  image: StaticImageData | string
  titleLine1: string
  titleHighlight: string
  titleLine2: string
  description: string
}

export const ecoFriendlySlides: [EcoSlide, EcoSlide] = [
  {
    id: 1,
    image: slide1,
    titleLine1: 'Eco-Friendly Fashion',
    titleHighlight: 'Redefining Style',
    titleLine2: 'with Sustainability',
    description:
      'Discover our commitment to eco-friendly fashion, where style meets sustainability. Explore our collection of ethically sourced and environmentally conscious apparel designed to make a positive impact on the planet.',
  },
  {
    id: 2,
    image: slide2,
    titleLine1: 'Sustainable Materials',
    titleHighlight: 'Crafting a Greener Future',
    titleLine2: 'with Conscious Choices',
    description:
      'Experience the beauty of sustainable materials in our eco-friendly fashion line. From organic cotton to recycled fabrics, we prioritize conscious choices that reduce environmental impact while delivering stylish and comfortable clothing.',
  },
]