import React, { useRef, useEffect, useState } from 'react';
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

const Step: React.FC<{ step: ApproachStep; index: number }> = ({ step, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      {
        rootMargin: "-40% 0px -40% 0px", // Active when in the middle 20% of the screen
        threshold: 0
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className="flex flex-col md:flex-row py-12 border-b border-gray-100 gap-6 md:gap-12 transition-all duration-500"
    >
      {/* Left: Number & Title */}
      <div className="md:w-5/12 flex items-baseline gap-6 shrink-0">
        <span className={`text-lg font-medium transition-colors duration-500 ${isActive ? 'text-brand-blue/40' : 'text-gray-200'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className={`text-xl md:text-2xl font-medium transition-colors duration-500 ${isActive ? 'text-brand-blue' : 'text-gray-300'}`}>
          {step.title}
        </h3>
      </div>

      {/* Right: Description */}
      <div className="md:w-7/12 flex items-center">
        <p className={`text-sm leading-relaxed max-w-lg transition-colors duration-500 ${isActive ? 'text-gray-500' : 'text-gray-200'}`}>
          {step.description}
        </p>
      </div>
    </div>
  );
};

export const Approach: React.FC = () => {
  return (
    <Section label="// Our Methodology" className="pb-32">
      <div className="flex flex-col gap-16">
        {/* Intro Text */}
        <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
          We provide end-to-end solutions in engineering, sustainability, and technology, 
          distinguishing ourselves through technical excellence and innovative, award-winning results.
        </p>

        {/* List */}
        <div className="flex flex-col border-t border-gray-100">
          {steps.map((step, index) => (
            <Step key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};