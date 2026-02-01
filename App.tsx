import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HeroImage } from './components/HeroImage';
import { Mission } from './components/Mission';
import { Values } from './components/Values';
import { KeyPeople } from './components/KeyPeople';
import { Approach } from './components/Approach';

function App() {
  return (
    <div className="min-h-screen bg-white text-brand-blue font-sans selection:bg-brand-gold selection:text-white">
      <Navbar />
      <Hero />
      <HeroImage />
      <Mission />
      <Values />
      <KeyPeople />
      <Approach />
      
      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
             <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Mamadi & Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;