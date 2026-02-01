import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HeroImage } from './components/HeroImage';
import { Mission } from './components/Mission';
import { Values } from './components/Values';
import { KeyPeople } from './components/KeyPeople';
import { Approach } from './components/Approach';
import { Footer } from './components/Footer';
import { AboutUsPage } from './components/AboutUsPage';

function App() {
  const [view, setView] = useState<'home' | 'about'>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen bg-white text-brand-blue font-sans selection:bg-brand-gold selection:text-white">
      <Navbar setView={setView} currentView={view} />
      
      {view === 'home' ? (
        <>
          <Hero />
          <HeroImage />
          <Mission />
          <Values />
          <KeyPeople />
          <Approach />
        </>
      ) : (
        <AboutUsPage />
      )}
      
      <Footer />
    </div>
  );
}

export default App;