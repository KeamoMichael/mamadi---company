import React, { useRef, useEffect, useState } from 'react';

const stats = [
  { value: '20',  suffix: '+', label: 'Years of Excellence',  sub: 'Established in South Africa'   },
  { value: '500', suffix: '+', label: 'Projects Delivered',   sub: 'Across the continent'          },
  { value: '6',   suffix: '',  label: 'Core Disciplines',     sub: 'Multidisciplinary expertise'   },
  { value: '1',   suffix: '',  label: 'B-BBEE Level',         sub: 'Highest transformation rating' },
];

const Counter: React.FC<{ value: number; suffix: string; started: boolean }> = ({ value, suffix, started }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 1400;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [started, value]);

  return <>{count}{suffix}</>;
};

export const Stats: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-white border-y border-gray-100">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-screen-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`py-12 px-6 flex flex-col gap-2
                ${i < 2 ? 'border-b md:border-b-0' : ''}
                ${i % 2 === 0 ? 'border-r' : 'md:border-r'}
                ${i === stats.length - 1 ? 'border-r-0' : ''}
                border-gray-100`}
            >
              <span className="text-4xl md:text-5xl font-bold text-brand-blue tracking-tight">
                <Counter value={Number(stat.value)} suffix={stat.suffix} started={started} />
              </span>
              <span className="text-sm font-semibold text-brand-gold">{stat.label}</span>
              <span className="text-xs text-gray-400">{stat.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
