import React, { useRef, useEffect, useCallback } from 'react';

const QUOTE_LINES = [
  "The people who are crazy enough",
  "to think they can change the world",
  "are the ones who do.",
];
const ATTRIBUTION = "— Steve Jobs";

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

// Quartic ease — holds near-zero velocity much longer than cubic for a more premium feel
const quartEaseInOut = (t: number) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

interface HeroSectionProps {
  setView: (view: 'home' | 'about' | 'projects' | 'contact') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setView }) => {
  const containerRef      = useRef<HTMLDivElement>(null);
  const heroH1Ref         = useRef<HTMLHeadingElement>(null);
  const heroPRef          = useRef<HTMLParagraphElement>(null);
  const heroBtnsRef       = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef         = useRef<HTMLVideoElement>(null);
  const lineFillRef      = useRef<HTMLDivElement>(null);
  const lineTrackRef     = useRef<HTMLDivElement>(null);
  const line1Ref         = useRef<HTMLParagraphElement>(null);
  const line2Ref         = useRef<HTMLParagraphElement>(null);
  const line3Ref         = useRef<HTMLParagraphElement>(null);
  const attrRef          = useRef<HTMLParagraphElement>(null);
  const rafRef           = useRef<number | null>(null);

  const applyHeroFade = (
    ref: React.RefObject<HTMLElement>,
    start: number,
    end: number,
    expandT: number
  ) => {
    if (!ref.current) return;
    const p = clamp((expandT - start) / (end - start));
    ref.current.style.opacity = `${1 - p}`;
  };

  const applyLine = (
    ref: React.RefObject<HTMLElement>,
    start: number,
    dur: number,
    fullProgress: number
  ) => {
    if (!ref.current) return;
    const t = clamp((fullProgress - start) / dur);
    ref.current.style.opacity   = `${t}`;
    ref.current.style.filter    = `blur(${((1 - t) * 10).toFixed(2)}px)`;
    ref.current.style.transform = `translateY(${(1 - t) * 16}px)`;
  };

  const update = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const viewportH  = window.innerHeight;
    const baseH      = window.innerWidth >= 768 ? 400 : 200;
    const scrollable = container.offsetHeight - viewportH; // 600px
    if (scrollable <= 0) return;

    const scrolled  = -container.getBoundingClientRect().top;
    const progress  = clamp(scrolled / scrollable);

    // Phase 1: expansion (progress 0 → 0.5) — quartic ease holds near-zero longer
    const expandT = clamp(progress / 0.5);
    const eased   = quartEaseInOut(expandT);
    const videoH  = baseH + (viewportH - baseH) * eased;

    if (videoContainerRef.current) {
      videoContainerRef.current.style.height = `${videoH}px`;
    }

    // Hero content fades out part by part, top → bottom, each with blur
    applyHeroFade(heroH1Ref,   0.00, 0.42, expandT);
    applyHeroFade(heroPRef,    0.18, 0.56, expandT);
    applyHeroFade(heroBtnsRef, 0.34, 0.68, expandT);

    // Subtle video parallax drift
    if (videoRef.current) {
      videoRef.current.style.transform = `translateY(${progress * 5}%)`;
    }

    // Phase 2: full-screen quote phase (progress 0.5 → 1.0)
    const fullProgress = expandT >= 1
      ? clamp((progress - 0.5) / 0.5)
      : 0;

    // Progress line — direct DOM, no CSS transition
    if (lineFillRef.current) {
      lineFillRef.current.style.height = `${fullProgress * 100}%`;
    }
    // Track fades in as expansion nears completion
    if (lineTrackRef.current) {
      lineTrackRef.current.style.opacity = `${clamp((eased - 0.7) / 0.3)}`;
    }

    // Quote lines — fully reversible, driven by fullProgress each frame
    applyLine(line1Ref, 0.10, 0.14, fullProgress);
    applyLine(line2Ref, 0.38, 0.14, fullProgress);
    applyLine(line3Ref, 0.63, 0.14, fullProgress);
    applyLine(attrRef,  0.83, 0.10, fullProgress);
  }, []);

  const onScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(update);
  }, [update]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    update(); // set initial state on mount
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll, update]);

  return (
    // Outer scroll driver — 100vh (pinned scene) + 900px (larger zone = slower, more cinematic)
    <div ref={containerRef} style={{ height: 'calc(100vh + 900px)' }} className="relative">

      {/* Sticky scene — always 100vh, white background fills behind hero text */}
      <div
        className="sticky top-0 overflow-hidden bg-white"
        style={{ height: '100vh' }}
      >

        {/* Hero text — fills white space above video, vertically centred */}
        {/* top-16 clears the fixed navbar on mobile; md:top-0 on desktop has enough room */}
        <div className="absolute top-24 md:top-16 left-0 right-0 bottom-[200px] md:bottom-[400px] flex flex-col items-center justify-center">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h1
              ref={heroH1Ref}
              className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight mb-6 md:mb-8 leading-tight text-brand-blue"
            >
              Engineering the Future of <br className="hidden md:block" />
              <span className="text-brand-gold">Infrastructure</span> in Africa and Beyond
            </h1>
            <p
              ref={heroPRef}
              className="text-sm md:text-xl text-gray-500 max-w-3xl mx-auto mb-6 md:mb-12 leading-relaxed font-light"
            >
              Mamadi &amp; Company is a multidisciplinary consulting firm delivering world-class
              engineering, environmental, and project management solutions. We bridge the gap
              between technical excellence and sustainable community development.
            </p>
            <div ref={heroBtnsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <button
                onClick={() => setView('projects')}
                className="w-full sm:w-auto px-8 py-3.5 bg-brand-gold hover:bg-brand-blue text-white font-semibold tracking-wide transition-all duration-300 rounded-sm text-sm">
                Our Expertise
              </button>
              <button
                onClick={() => setView('contact')}
                className="w-full sm:w-auto px-8 py-3.5 border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-semibold tracking-wide transition-all duration-300 rounded-sm text-sm">
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Video container — anchored at bottom, grows upward from 300/400px → 100vh */}
        <div
          ref={videoContainerRef}
          className="absolute bottom-0 left-0 right-0 overflow-hidden"
          style={{ height: window.innerWidth >= 768 ? '400px' : '200px' }}
        >
          {/* Video always 100vh tall, anchored at bottom — container clips upper portion */}
          <video
            ref={videoRef}
            className="absolute bottom-0 left-0 w-full object-cover brightness-75"
            style={{ height: '100vh', willChange: 'transform' }}
            autoPlay loop muted playsInline
          >
            <source src="/assets/hf_20260214_081729_8360f762-d0b8-4561-9ce9-4f60000eb638.mp4" type="video/mp4" />
          </video>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-brand-blue/55" />

          {/* Quote lines — centered, each line driven by fullProgress */}
          <div className="absolute inset-0 flex flex-col items-start md:items-center justify-center px-16 md:px-20 gap-0 md:gap-1.5">
            {[line1Ref, line2Ref, line3Ref].map((ref, i) => (
              <p
                key={i}
                ref={ref}
                className="text-white font-light text-left text-3xl md:text-3xl lg:text-4xl w-full max-w-2xl leading-tight tracking-tight md:tracking-[0.01em]"
                style={{ opacity: 0, transform: 'translateY(16px)', filter: 'blur(10px)' }}
              >
                {QUOTE_LINES[i]}
              </p>
            ))}
            <p
              ref={attrRef}
              className="text-brand-gold text-xs tracking-widest uppercase mt-4 md:mt-5 text-left w-full max-w-2xl"
              style={{ opacity: 0, transform: 'translateY(16px)', filter: 'blur(10px)' }}
            >
              {ATTRIBUTION}
            </p>
          </div>

          {/* Left-edge progress line */}
          <div
            ref={lineTrackRef}
            className="absolute left-6"
            style={{
              top: '42%',
              bottom: '42%',
              width: '3px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              opacity: 0,
            }}
          >
            <div
              ref={lineFillRef}
              className="absolute top-0 left-0 w-full bg-white"
              style={{ height: '0%' }}
            />
          </div>

        </div>
      </div>
    </div>
  );
};
