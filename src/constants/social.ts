export interface SocialLink {
  label: string
  href: string
  svgPath: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    svgPath: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    svgPath: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7.55 3h8.9A4.55 4.55 0 0 1 21 7.55v8.9A4.55 4.55 0 0 1 16.45 21H7.55A4.55 4.55 0 0 1 3 16.45V7.55A4.55 4.55 0 0 1 7.55 3z',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    svgPath: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  },
]