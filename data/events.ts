export interface Event {
  id: number;
  tag: string;
  location: string;
  date: string;
  title: string;
  description: string;
  image: string;
}

export const events: Event[] = [
  {
    id: 1,
    tag: 'Upcoming',
    location: 'Gurugram, India',
    date: 'March 28, 2026',
    title: 'Launching the Global Center of Excellence for Engineering Design (GCEED)',
    description:
      'Mamadi & Company is establishing the Global Center of Excellence for Engineering Design (GCEED), based in Gurugram, India — a landmark step in our international expansion. The GCEED is designed to centralise engineering design and innovation at a world-class level, heighten adherence to international design standards, build deep engineering excellence across our disciplines, and establish globally recognised engineering practices that set the benchmark for infrastructure delivery across emerging and developed markets.',
    image: '/assets/events/india-forum.jpg',
  },
  {
    id: 2,
    tag: 'Recent',
    location: 'Nairobi, Kenya',
    date: 'February 2026',
    title: 'African Union Urban Development Summit',
    description:
      'Mamadi & Company executives participated in the AU Urban Development Summit, engaging with government stakeholders on integrated township planning and sustainable energy infrastructure across East Africa.',
    image: '/assets/events/nairobi-summit.jpg',
  },
  {
    id: 3,
    tag: 'Recent',
    location: 'Cape Town, South Africa',
    date: 'January 2026',
    title: 'Southern Africa Water & Sanitation Symposium',
    description:
      'Our environmental engineering team presented case studies on community-scale water treatment solutions, highlighting our work in underserved municipalities across the Southern African Development Community.',
    image: '/assets/events/capetown-water.jpg',
  },
];
