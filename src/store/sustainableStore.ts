// src/store/sustainableStore.ts
import { create } from 'zustand'

interface SustainableStore {
  isHovered: boolean
  setHovered: (val: boolean) => void
}

export const useSustainableStore = create<SustainableStore>((set) => ({
  isHovered: false,
  setHovered: (val) => set({ isHovered: val }),
}))