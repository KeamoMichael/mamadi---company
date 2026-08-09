import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Mouse } from 'lucide-react';

const QUOTE_LINES = [
  "The people who are crazy enough",
  "to think they can change the world",
  "are the ones who do.",
];
const ATTRIBUTION = "— Steve Jobs";

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

const getHeroMediaHeight = () => {
  if (window.innerWidth >= 768) {
    // Always use 25% of viewport height on desktop — white section = ~75%
    return Math.round(window.innerHeight * 0.25);
  }

  if (window.innerHeight <= 570) return 60;
  if (window.innerHeight <= 720) return 60;
  return 120;
};


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
  const slowScrollRef    = useRef<number | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(true);
  const [scrollButtonOnDark, setScrollButtonOnDark] = useState(false);

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
    const baseH      = getHeroMediaHeight();
    const scrollable = container.offsetHeight - viewportH; // 600px
    if (scrollable <= 0) return;

    const rect      = container.getBoundingClientRect();
    const scrolled  = -rect.top;
    const progress  = clamp(scrolled / scrollable);
    setShowScrollButton(rect.top < viewportH && rect.bottom >= viewportH - 4);

    // Phase 1: expansion (progress 0 → 0.5) — quartic ease holds near-zero longer
    const expandT = clamp(progress / 0.5);
    const eased   = quartEaseInOut(expandT);
    const videoH  = baseH + (viewportH - baseH) * eased;
    const buttonOffsetFromBottom = window.innerWidth >= 768 ? 32 : 24;
    setScrollButtonOnDark(videoH > buttonOffsetFromBottom + 64);

    if (videoContainerRef.current) {
      videoContainerRef.current.style.height = `${videoH}px`;
    }

    // Hero content fades out bottom → top, quickly before parallax is visible
    applyHeroFade(heroBtnsRef, 0.00, 0.18, expandT);
    applyHeroFade(heroPRef,    0.08, 0.26, expandT);
    applyHeroFade(heroH1Ref,   0.16, 0.36, expandT);

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

  const stopSlowScroll = useCallback(() => {
    if (slowScrollRef.current) {
      cancelAnimationFrame(slowScrollRef.current);
      slowScrollRef.current = null;
    }
  }, []);

  const scrollPastHero = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    stopSlowScroll();

    const startY = window.scrollY;
    const targetY = startY + container.getBoundingClientRect().bottom;
    const distance = targetY - startY;
    const duration = 9000;
    const startedAt = performance.now();
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (now: number) => {
      const t = clamp((now - startedAt) / duration);
      window.scrollTo(0, startY + distance * easeInOutCubic(t));

      if (t < 1) {
        slowScrollRef.current = requestAnimationFrame(step);
      } else {
        slowScrollRef.current = null;
        setShowScrollButton(false);
      }
    };

    slowScrollRef.current = requestAnimationFrame(step);
  }, [stopSlowScroll]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update(); // set initial state on mount
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      stopSlowScroll();
    };
  }, [onScroll, stopSlowScroll, update]);

  useEffect(() => {
    const cancelOnUserInput = () => stopSlowScroll();

    window.addEventListener('wheel', cancelOnUserInput, { passive: true });
    window.addEventListener('touchstart', cancelOnUserInput, { passive: true });
    window.addEventListener('keydown', cancelOnUserInput);

    return () => {
      window.removeEventListener('wheel', cancelOnUserInput);
      window.removeEventListener('touchstart', cancelOnUserInput);
      window.removeEventListener('keydown', cancelOnUserInput);
    };
  }, [stopSlowScroll]);

  return (
    // Outer scroll driver — 100vh (pinned scene) + 900px (larger zone = slower, more cinematic)
    <div ref={containerRef} style={{ height: 'calc(100vh + 900px)' }} className="relative">

      {/* Sticky scene — always 100vh, white background fills behind hero text */}
      <div
        className="sticky top-0 overflow-hidden bg-white"
        style={{ height: '100vh' }}
      >
        <button
          type="button"
          onClick={scrollPastHero}
          aria-label="Click to scroll"
          className={`fixed left-1/2 bottom-6 md:bottom-8 z-40 -translate-x-1/2 flex flex-col items-center justify-center gap-1.5 transition-all duration-500 hover:text-brand-gold focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold ${
            showScrollButton ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
          } ${scrollButtonOnDark ? 'text-white' : 'text-brand-blue'}`}
        >
          <Mouse className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.6} />
          <span className="text-[9px] font-semibold uppercase leading-none tracking-[0.16em] md:text-[10px]">
            click to scroll
          </span>
        </button>

        {/* Hero text — fills white space above video, vertically centred */}
        {/* top-16 clears the fixed navbar on mobile; md:top-0 on desktop has enough room */}
        <div
          className="absolute top-28 [@media(max-width:767px)_and_(max-height:720px)]:top-20 md:top-28 [@media(min-width:1024px)_and_(max-height:720px)]:top-36 left-0 right-0 flex flex-col items-center justify-center pb-14 [@media(max-width:767px)_and_(max-height:720px)]:pb-8 md:pb-0"
          style={{ bottom: `${getHeroMediaHeight()}px` }}
        >
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h1
              ref={heroH1Ref}
              className="text-4xl md:text-5xl font-semibold tracking-tight mb-5 md:mb-10 [@media(min-width:1024px)_and_(max-height:720px)]:mb-6 leading-tight text-brand-blue"
            >
              Engineering the Future of <br className="hidden md:block" />
              <span className="text-brand-gold">Infrastructure</span> in Africa and Beyond
            </h1>
            <p
              ref={heroPRef}
              className="text-sm md:text-base text-gray-500 max-w-3xl mx-auto mb-6 md:mb-14 [@media(min-width:1024px)_and_(max-height:720px)]:mb-8 leading-relaxed font-normal"
            >
              Mamadi International is a multidisciplinary consulting firm delivering world-class
              engineering, environmental, and project management solutions. We bridge the gap
              between technical excellence and sustainable community development.
            </p>
            <div ref={heroBtnsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <a
                href="/projects"
                onClick={(event) => {
                  event.preventDefault();
                  setView('projects');
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-brand-gold hover:bg-brand-blue text-white font-semibold tracking-wide transition-all duration-300 rounded-sm text-sm">
                Our Expertise
              </a>
              <a
                href="/contact"
                onClick={(event) => {
                  event.preventDefault();
                  setView('contact');
                }}
                className="w-full sm:w-auto px-8 py-3.5 border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-semibold tracking-wide transition-all duration-300 rounded-sm text-sm">
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Video container — anchored at bottom, grows upward from 300/400px → 100vh */}
        <div
          ref={videoContainerRef}
          className="absolute bottom-0 left-0 right-0 overflow-hidden"
          style={{ height: `${getHeroMediaHeight()}px` }}
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
                className="text-white font-normal text-left text-3xl md:text-3xl lg:text-4xl w-full max-w-2xl leading-tight tracking-tight md:tracking-[0.01em]"
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
