import React from 'react';
import { Section } from './Section';
import { Plus } from 'lucide-react';
import { TeamMember } from '../types';

const team: TeamMember[] = [
  {
    name: "Sean Wesley",
    role: "PARTNER",
    // Using unspash source for realistic placeholder portraits
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=700"
  },
  {
    name: "Christian Squire",
    role: "PARTNER",
    image: "https://images.unsplash.com/photo-1534030347209-7147fd694c12?auto=format&fit=crop&q=80&w=600&h=700"
  },
  {
    name: "Daniel Roe",
    role: "ASSOCIATE PARTNER",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600&h=700"
  },
  {
    name: "Rory Uwins",
    role: "ASSOCIATE PARTNER",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=700"
  }
];

export const KeyPeople: React.FC = () => {
  return (
    <Section label="// Key People">
      <div className="flex flex-col gap-16">
        {/* Intro Text */}
        <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
          Our team comprises seasoned professionals with extensive experience in the
          industry. We bring a wealth of knowledge and a proven track record in 
          strategic consulting. Meet our dedicated team members who
          are committed to delivering exceptional results.
        </p>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((person, index) => (
            <div key={index} className="flex flex-col group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                <img 
                  src={person.image} 
                  alt={person.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gold Plus Button Overlay */}
                <div className="absolute bottom-4 right-4 bg-brand-gold p-1.5 transition-opacity duration-300">
                  <Plus strokeWidth={1.5} size={16} className="text-white" />
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="w-1 h-1 bg-brand-gold rounded-full"></span>
                    <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold">{person.role}</span>
                </div>
                <h3 className="text-lg font-medium text-brand-blue">{person.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};