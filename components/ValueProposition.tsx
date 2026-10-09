import React from 'react';
import { valueProposition } from '../data/companyProfile';

export const ValueProposition: React.FC = () => (
  <div>
    <p className="max-w-4xl text-xl font-medium leading-relaxed text-brand-blue md:text-2xl">
      Rooted locally and connected worldwide, Mamadi brings complex infrastructure together through one accountable platform.
    </p>
    <ul className="mt-9 grid gap-x-10 gap-y-8 sm:grid-cols-2">
      {valueProposition.map(({ title, description }) => (
        <li key={title} className="border-t border-brand-gold/45 pt-5">
          <h3 className="text-lg font-semibold leading-snug text-brand-blue">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">{description}</p>
        </li>
      ))}
    </ul>
    <p className="mt-9 text-sm font-semibold tracking-wide text-brand-gold">Innovative infrastructure. Sustainable impact.</p>
  </div>
);
