import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { southAfricaWebsite } from '../data/contact';

export const SouthAfricaFeature: React.FC = () => (
  <section aria-labelledby="south-africa-heading" className="bg-white py-20 md:py-28">
    <div className="container mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-20">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <FadeIn variant="subtle">
          <span className="mb-6 block text-sm tracking-[0.04em] text-brand-gold">Mamadi South Africa</span>
          <h2 id="south-africa-heading" className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-brand-blue md:text-5xl">
            Local expertise.<br />Global perspective.
          </h2>
          <p className="mt-7 max-w-lg text-base leading-relaxed text-gray-600">
            Get to know Mamadi &amp; Company in South Africa. Explore our local divisions,
            project portfolio and career opportunities on our South African website.
          </p>
          <a
            href={southAfricaWebsite}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Mamadi South Africa (opens in a new tab)"
            className="group mt-9 inline-flex items-center gap-5 bg-brand-blue px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
          >
            Visit Mamadi South Africa
            <ArrowUpRight size={19} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </FadeIn>
        <FadeIn variant="subtle" delay={120}>
        <img
          src="/assets/officeBuilding.webp"
          alt="Modern glass building exterior"
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full object-cover object-center"
        />
        </FadeIn>
      </div>
    </div>
  </section>
);
