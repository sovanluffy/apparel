// src/constants/offices.ts

export interface Office {
  country: string
  flag: string
  address: string
  addressHref: string
  phone: string
}

export const OFFICES: Office[] = [
  {
    country: 'Singapore',
    flag: '🇸🇬',
    address: '7 Kallang place #02-08',
    addressHref: 'https://maps.google.com/?q=7+Kallang+place+Singapore',
    phone: '+65 6292 9339',
  },
  {
    country: 'Cambodia',
    flag: '🇰🇭',
    address: 'Kandal Steung District',
    addressHref: 'https://maps.google.com/?q=Kandal+Steung+District+Cambodia',
    phone: '+855 1789 2177',
  },
  {
    country: 'Hong Kong',
    flag: '🇭🇰',
    address: 'HUNG TO ROAD, KWUN TONG',
    addressHref: 'https://maps.google.com/?q=Hung+To+Road+Kwun+Tong+Hong+Kong',
    phone: '+852 2793 3681',
  },
]