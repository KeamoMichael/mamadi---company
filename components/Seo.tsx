import React from 'react';
import { getProjectSlug, projects } from './ProjectsPage';

type View = 'home' | 'about' | 'projects' | 'sectors' | 'contact' | 'insights' | 'vacancies' | 'application';

const siteUrl = 'https://www.mamadiinternational.com';

const pageSeo: Record<View, { path: string; title: string; description: string }> = {
  home: {
    path: '/',
    title: 'Mamadi International | Engineering & Infrastructure Consultancy',
    description: 'Mamadi International is a multidisciplinary engineering and infrastructure consultancy delivering advisory, environmental, energy and project solutions across Africa and international markets.',
  },
  about: {
    path: '/about',
    title: 'About Mamadi International | Leadership & Global Footprint',
    description: 'Learn about Mamadi International, our leadership, values and international footprint supporting sustainable infrastructure and engineering delivery.',
  },
  projects: {
    path: '/projects',
    title: 'Mamadi International Projects | Water, Energy & Sustainability',
    description: 'Explore Mamadi International projects in water and sanitation, renewable energy, environmental consulting and climate-resilient development across Africa and beyond.',
  },
  sectors: {
    path: '/sectors',
    title: 'Engineering & Infrastructure Sectors | Mamadi International',
    description: 'Explore Mamadi International expertise in transportation, water, environment, technology, energy, engineering and infrastructure management.',
  },
  contact: {
    path: '/contact',
    title: 'Contact Mamadi International | Johannesburg, South Africa',
    description: 'Contact Mamadi International for engineering, infrastructure, environmental and project advisory enquiries in South Africa and international markets.',
  },
  insights: {
    path: '/insights',
    title: 'Mamadi International Insights | Engineering & Innovation',
    description: 'Read Mamadi International news and insights on engineering, infrastructure, artificial intelligence, global partnerships and innovation.',
  },
  vacancies: {
    path: '/careers',
    title: 'Careers at Mamadi International | Current Vacancies',
    description: 'Explore career opportunities at Mamadi International and join a multidisciplinary engineering and infrastructure consulting team.',
  },
  application: {
    path: '/careers/apply',
    title: 'Apply for a Career at Mamadi International',
    description: 'Submit an application for a current career opportunity at Mamadi International.',
  },
};

const setMeta = (selector: string, attribute: string, value: string) => {
  const element = document.head.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
};

export const Seo: React.FC<{ view: View }> = ({ view }) => {
  React.useEffect(() => {
    const seo = pageSeo[view];
    const canonicalUrl = `${siteUrl}${seo.path}`;

    document.title = seo.title;
    setMeta('meta[name="description"]', 'content', seo.description);
    setMeta('meta[name="robots"]', 'content', 'index, follow, max-image-preview:large');
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    setMeta('meta[property="og:title"]', 'content', seo.title);
    setMeta('meta[property="og:description"]', 'content', seo.description);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:type"]', 'content', 'website');
    setMeta('meta[name="twitter:title"]', 'content', seo.title);
    setMeta('meta[name="twitter:description"]', 'content', seo.description);

    const structuredData = view === 'projects'
      ? {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: seo.title,
          description: seo.description,
          url: canonicalUrl,
          isPartOf: { '@id': `${siteUrl}/#website` },
          about: { '@id': `${siteUrl}/#organization` },
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: projects.length,
            itemListElement: projects.map((project, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'CreativeWork',
                name: project.title,
                url: `${siteUrl}/projects#${getProjectSlug(project.title)}`,
                genre: project.category,
                ...(project.location ? { contentLocation: project.location } : {}),
              },
            })),
          },
        }
      : null;

    let script = document.getElementById('page-structured-data') as HTMLScriptElement | null;
    if (structuredData) {
      if (!script) {
        script = document.createElement('script');
        script.id = 'page-structured-data';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    } else {
      script?.remove();
    }
  }, [view]);

  return null;
};
