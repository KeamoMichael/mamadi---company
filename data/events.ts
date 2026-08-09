export interface Event {
  id: number;
  tag: string;
  location: string;
  date: string;
  title: string;
  description: string;
  image: string;
  imagePosition?: string;
}

export const events: Event[] = [
  {
    id: 1,
    tag: 'Global Expansion',
    location: 'Washington, D.C., United States',
    date: 'July 2026',
    title: 'Mamadi has launched in the United States',
    description:
      'Mamadi International has officially launched in Washington, D.C., extending its global footprint into the United States. The new presence creates a platform for cross-border partnerships, engineering collaboration and infrastructure advisory work connecting the United States, Africa and Mamadi’s wider international network.',
    image: '/Insights/July/07%20July/BG%20Image.webp',
    imagePosition: 'center',
  },
  {
    id: 2,
    tag: 'Digital Infrastructure',
    location: 'Global',
    date: 'July 2026',
    title: 'Engineering the infrastructure behind artificial intelligence',
    description:
      'Mamadi is strengthening its engineering offering for AI-ready and compute-intensive data centres. The work brings together multidisciplinary design, utilities, power, cooling and infrastructure coordination—from early concept development through commissioning.',
    image: '/Insights/Data%20Centres.webp',
    imagePosition: 'center',
  },
  {
    id: 3,
    tag: 'International Partnership',
    location: 'Mikkeli, Finland',
    date: 'June 2026',
    title: 'Building an innovation and technology partnership in Finland',
    description:
      'Mamadi leadership met with Finnish catalytic organisations in Mikkeli to advance cooperation around innovation, technology and sustainable infrastructure. The engagement supports Mamadi’s ambition to connect international expertise with infrastructure opportunities across its operating markets.',
    image: '/Insights/June/08%20June/Finland%20Photos/WhatsApp%20Image%202026-06-09%20at%2020.29.15.webp',
    imagePosition: 'center 42%',
  },
  {
    id: 4,
    tag: 'Centre of Excellence',
    location: 'Gurgaon, India',
    date: 'March 2026',
    title: 'Mamadi India advances its Global Centre of Excellence',
    description:
      'The Gurgaon-based centre is being developed as a specialist platform for engineering design, artificial intelligence and robotics. It is intended to deepen technical capability, strengthen international design standards and connect multidisciplinary expertise across Mamadi’s global operations.',
    image: '/Insights/Gurgaon%20India.webp',
    imagePosition: 'center',
  },
  {
    id: 5,
    tag: 'Innovation',
    location: 'Singapore',
    date: 'March 2026',
    title: 'Establishing an AI and robotics innovation centre in Singapore',
    description:
      'Mamadi’s Singapore initiative focuses on applied artificial intelligence and robotics for engineering and infrastructure. The centre extends the company’s innovation network into Asia and supports the development of technology-led solutions for complex project environments.',
    image: '/Insights/Singapore.webp',
    imagePosition: 'center',
  },
];
