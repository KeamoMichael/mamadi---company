import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { Mission } from './components/Mission';
import { Values } from './components/Values';
import { KeyPeople } from './components/KeyPeople';
import { Approach } from './components/Approach';
import { Engagements } from './components/Engagements';
import { Stats } from './components/Stats';
import { Footer } from './components/Footer';
import { AboutUsPage } from './components/AboutUsPage';
import { ProjectsPage } from './components/ProjectsPage';
import { ContactPage } from './components/ContactPage';
import { InsightsPage } from './components/InsightsPage';

function App() {
  const [view, setView] = useState<'home' | 'about' | 'projects' | 'contact' | 'insights'>('home');

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });
    
    return () => {
       // Lenis doesn't have a destroy method on the instance in recent versions, 
       // but it cleans up automatically or we can stop it if needed.
       // For this simple setup, no explicit cleanup is strictly required beyond what autoRaf handles,
       // but stopping it is good practice if unmounting.
       lenis.stop(); 
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen bg-white text-brand-blue font-sans selection:bg-brand-gold selection:text-white">
      <Navbar setView={setView} currentView={view} />
      
      {view === 'home' && (
        <>
          <HeroSection setView={setView} />
          <Mission />
          <Stats />
          <Values />
          <KeyPeople />
          <Approach />
          <Engagements setView={setView} />
        </>
      )}

      {view === 'about' && <AboutUsPage />}
      
      {view === 'projects' && <ProjectsPage />}

      {view === 'contact' && <ContactPage />}

      {view === 'insights' && <InsightsPage />}

      <Footer setView={setView} />
    </div>
  );
}

export default App;