import React from 'react';
import { Section } from './Section';

export const Mission: React.FC = () => {
  return (
    <Section label="// Our Mission" dark className="py-32">
      <h2 className="text-2xl md:text-3xl lg:text-4xl leading-snug font-light text-gray-100 max-w-4xl">
        Our mission is to create lasting value through innovative engineering 
        solutions that empower communities, protect the environment, and 
        drive economic growth across the continent.
      </h2>
    </Section>
  );
};