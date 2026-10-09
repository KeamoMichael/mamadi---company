import React from 'react';
import { Section } from './Section';

export const Mission: React.FC = () => {
  return (
    <Section label="Our Mission" dark className="py-32">
      <h2 className="text-2xl md:text-3xl lg:text-4xl leading-snug font-light text-gray-100 max-w-4xl">
        Transforming lives through delivering world-class infrastructure solutions.
      </h2>
    </Section>
  );
};
