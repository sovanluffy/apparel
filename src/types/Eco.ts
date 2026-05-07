// src/types/Eco.ts
import type { StaticImageData } from 'next/image'

export type Slide = {
  id: number
  image: StaticImageData | string
  titleLine1: string
  titleHighlight: string
  titleLine2: string
  description: string
}

export type EcoFriendlySectionProps = {
  slides: [Slide, Slide]
}