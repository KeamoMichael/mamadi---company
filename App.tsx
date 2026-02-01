import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HeroImage } from './components/HeroImage';
import { Mission } from './components/Mission';
import { Values } from './components/Values';
import { KeyPeople } from './components/KeyPeople';
import { Approach } from './components/Approach';
import { Footer } from './components/Footer';

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
      <Footer />
    </div>
  );
}

export default App;