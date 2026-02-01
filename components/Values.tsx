import React from 'react';
import { Section } from './Section';
import { Plus } from 'lucide-react';
import { ValueItem } from '../types';

const values: ValueItem[] = [
  {
    title: "Technical Excellence",
    description: "We adhere to rigorous engineering standards, ensuring safety, durability, and innovation in every project we undertake.",
    bgColor: "white"
  },
  {
    title: "Stewardship",
    description: "We are committed to environmental stewardship and sustainable development practices that benefit future generations.",
    bgColor: "gold"
  },
  {
    title: "Partnership",
    description: "We build enduring partnerships with public and private sector clients to deliver integrated infrastructure solutions.",
    bgColor: "beige"
  }
];

export const Values: React.FC = () => {
  return (
    <Section label="// Our Core Values">
      <div className="flex flex-col gap-12">
        {/* Intro Text */}
        <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
          Our core values define our engineering approach, anchoring our 
          commitment to technical excellence, environmental stewardship, and 
          the collaborative partnerships that drive sustainable development.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 w-full border-t border-gray-200 md:border-none">
        {values.map((value, index) => (
          <div 
            key={index}
            className={`
              relative p-8 h-80 flex flex-col justify-between border-b md:border-b-0 border-gray-200 md:border-r last:border-r-0
              ${value.bgColor === 'gold' ? 'bg-brand-gold text-white' : ''}
              ${value.bgColor === 'beige' ? 'bg-brand-beige text-brand-blue' : ''}
              ${value.bgColor === 'white' ? 'bg-white text-brand-blue' : ''}
            `}
          >
            {/* Plus Icon */}
            <div className={`font-thin mb-4 ${value.bgColor === 'gold' ? 'text-white/80' : 'text-brand-gold'}`}>
              <Plus strokeWidth={1} size={24} />
            </div>

            {/* Content */}
            <div className="mt-auto">
              <h3 className={`text-xl font-medium mb-4 ${value.bgColor === 'gold' ? 'text-white' : 'text-brand-blue'}`}>
                {value.title}
              </h3>
              <p className={`text-sm leading-relaxed ${value.bgColor === 'gold' ? 'text-white/90' : 'text-gray-600'}`}>
                {value.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </Section>
  );
};