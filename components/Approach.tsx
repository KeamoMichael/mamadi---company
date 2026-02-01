import React from 'react';
import { Section } from './Section';
import { ApproachStep } from '../types';

const steps: ApproachStep[] = [
  {
    title: "Strategic Planning",
    description: "We conduct feasibility studies and master planning to ensure project viability."
  },
  {
    title: "Design & Engineering",
    description: "Our team delivers comprehensive civil, structural, and environmental design solutions."
  },
  {
    title: "Project Management",
    description: "We oversee construction and implementation with strict adherence to timeline and budget."
  },
  {
    title: "Lifecycle Maintenance",
    description: "We provide operational support and maintenance strategies for long-term infrastructure health."
  }
];

export const Approach: React.FC = () => {
  return (
    <Section label="// Our Methodology" className="pb-32">
      <div className="flex flex-col gap-16">
        {/* Intro Text */}
        <div className="flex justify-end">
            <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
            Our project methodology ensures precision from concept to commissioning. 
            We integrate technical expertise with local insights to overcome complex 
            infrastructure challenges.
            </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          {/* Left: 3D Image */}
          <div className="w-full lg:w-5/12 aspect-square bg-brand-beige overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" 
              alt="Architectural Planning" 
              className="w-full h-full object-cover grayscale opacity-80 sepia-[.2]"
            />
            {/* Adding a subtle overlay to match the warm beige look */}
            <div className="absolute inset-0 bg-brand-beige/30 mix-blend-multiply"></div>
          </div>

          {/* Right: Steps List */}
          <div className="w-full lg:w-7/12 flex flex-col gap-10 pt-4">
            {steps.map((step, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                <h4 className="text-sm font-semibold text-brand-blue">{step.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};