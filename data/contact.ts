export const headOffice = {
  city: 'Midrand',
  addressLines: [
    'First Floor, Softbrand Building',
    'Thandanani Office Park',
    '16 Invicta Road',
    'Midrand, 1685',
    'South Africa',
  ],
  mapAddress: 'Mamadi & Company, First Floor, Softbrand Building, Thandanani Office Park, 16 Invicta Road, Midrand, 1685, South Africa',
  coordinates: {
    lat: -25.9993,
    lng: 28.1259,
  },
} as const;

export const globalOffices = [
  { country: 'South Africa', address: headOffice.addressLines.join(', ') },
  { country: 'Mauritius', address: 'Level 8C, Cyber Tower II, Ebene, Cyber City, Mauritius' },
  { country: 'United Kingdom', address: '100 Bishopsgate, London EC2M 1GT, UK' },
  { country: 'Mozambique', address: 'No 76 Bairro Mahlangalene, Germano De Magalhaes, Maputo' },
  { country: 'Tanzania', address: '196 Rose Garden Road, Mikocheni, Dar Es Salaam' },
  { country: 'USA', address: '2605 Jetstream Road, Herndon, Virginia 20171, USA' },
] as const;
