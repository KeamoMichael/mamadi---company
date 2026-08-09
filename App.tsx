import React, { useCallback, useState, useEffect } from 'react';
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
import { CareersPage } from './components/CareersPage';
import { SectorsPage } from './components/SectorsPage';
import { Seo } from './components/Seo';

type View = 'home' | 'about' | 'projects' | 'sectors' | 'contact' | 'insights' | 'vacancies';

const viewPaths: Record<View, string> = {
  home: '/',
  about: '/about',
  projects: '/projects',
  sectors: '/sectors',
  contact: '/contact',
  insights: '/insights',
  vacancies: '/careers',
};

const getViewFromPath = (): View => {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  return (Object.entries(viewPaths).find(([, route]) => route === path)?.[0] as View) || 'home';
};

function App() {
  const [view, setCurrentView] = useState<View>(getViewFromPath);

  const setView = useCallback((nextView: View) => {
    const nextPath = viewPaths[nextView];
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ view: nextView }, '', nextPath);
    }
    setCurrentView(nextView);
  }, []);

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

  useEffect(() => {
    const handlePopState = () => setCurrentView(getViewFromPath());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen bg-white text-brand-blue font-sans selection:bg-brand-gold selection:text-white">
      <Seo view={view} />
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

      {view === 'about' && <AboutUsPage setView={setView} />}
      
      {view === 'projects' && <ProjectsPage />}

      {view === 'sectors' && <SectorsPage />}

      {view === 'contact' && <ContactPage />}

      {view === 'insights' && <InsightsPage />}

      {view === 'vacancies' && <CareersPage setView={setView} />}

      <Footer setView={setView} />
    </div>
  );
}

export default App;
