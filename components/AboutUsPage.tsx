import React from 'react';
import { Section } from './Section';
import { Award, ShieldCheck, FileText, Users, Map, Globe } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="pt-20">
      {/* About Hero */}
      <section className="bg-brand-blue py-24 text-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-screen-2xl">
          <div className="max-w-3xl">
            <span className="text-brand-gold font-medium tracking-wider text-sm mb-4 block uppercase">// About Mamadi & Company</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 leading-tight">
              Leading with technical excellence and community impact.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Established as a multidisciplinary firm, Mamadi & Company has grown into a 
              trusted partner for infrastructure development across Africa, combining 
              international standards with deep local insights.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation for About Section (Internal) */}
      <div className="sticky top-[72px] bg-white border-b border-gray-100 z-30 overflow-x-auto">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-screen-2xl flex gap-8 whitespace-nowrap">
            {[
              { name: 'Who We Are', id: 'who-we-are' },
              { name: 'Leadership & Governance', id: 'leadership-&-governance' },
              { name: 'Geographic Footprint', id: 'geographic-footprint' },
              { name: 'Strategy & Values', id: 'strategy-&-values' }
            ].map((item) => (
                <a 
                    key={item.id}
                    href={`#${item.id}`}
                    className="py-4 text-sm font-semibold text-gray-500 hover:text-brand-gold transition-colors"
                >
                    {item.name}
                </a>
            ))}
        </div>
      </div>

      {/* Who We Are Section */}
      <div id="who-we-are">
        <Section label="// Who We Are">
            <div className="flex flex-col gap-8">
                <p className="text-lg text-brand-blue font-medium leading-relaxed max-w-3xl">
                    Mamadi & Company is an established, multidisciplinary engineering and consulting firm 
                    dedicated to delivering technical excellence and sustainable infrastructure solutions.
                </p>
                <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                    We provide a comprehensive suite of professional services, acting as a strategic partner 
                    to both public and private sectors. Our approach integrates global best practices with 
                    deep local insights, ensuring every project yields long-term socio-economic value and 
                    measurable community impact.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <div className="p-6 bg-gray-50 border-l-2 border-brand-gold">
                        <h4 className="font-bold text-brand-blue mb-2">Technical Excellence</h4>
                        <p className="text-xs text-gray-500">Rigorous engineering standards and innovative problem-solving.</p>
                    </div>
                    <div className="p-6 bg-gray-50 border-l-2 border-brand-gold">
                        <h4 className="font-bold text-brand-blue mb-2">Strategic Partnership</h4>
                        <p className="text-xs text-gray-500">Collaborating with stakeholders to achieve shared developmental goals.</p>
                    </div>
                    <div className="p-6 bg-gray-50 border-l-2 border-brand-gold">
                        <h4 className="font-bold text-brand-blue mb-2">Community Impact</h4>
                        <p className="text-xs text-gray-500">Leaving a lasting positive legacy in the environments we touch.</p>
                    </div>
                </div>
            </div>
        </Section>
      </div>

      {/* Leadership & Governance Section */}
      <div id="leadership-&-governance">
        <Section label="// Leadership & Governance">
            <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-6">
                    <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                        Our organization is anchored by a robust governance framework and strategic 
                        oversight provided by an experienced Board of Directors and Executive Management 
                        team. We uphold the highest standards of ethics, transparency, and accountability 
                        across all operations.
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                        As a Level 1 B-BBEE contributor, our leadership is committed to driving economic 
                        transformation and fostering an inclusive corporate culture that empowers the 
                        next generation of technical professionals.
                    </p>
                </div>

                <div className="bg-brand-blue p-10 text-white rounded-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">Strategic Oversight</h3>
                            <ul className="space-y-4">
                                {['Robust Governance Framework', 'Ethical Leadership', 'Transparency & Accountability', 'Risk Management'].map(point => (
                                    <li key={point} className="flex items-center gap-3 text-sm text-gray-300">
                                        <ShieldCheck size={18} className="text-brand-gold" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">Transformation</h3>
                            <p className="text-sm text-gray-300 leading-relaxed mb-6">
                                Our commitment to B-BBEE Level 1 status reflects our dedication to 
                                meaningful economic participation and the professional development 
                                of previously disadvantaged individuals.
                            </p>
                            <div className="inline-block px-4 py-2 border border-brand-gold text-brand-gold text-xs font-bold uppercase tracking-widest">
                                B-BBEE Level 1 Contributor
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
      </div>

      {/* Geographic Footprint Section */}
      <div id="geographic-footprint">
        <Section label="// Geographic Footprint">
            <div className="flex flex-col gap-16">
                <div className="flex flex-col gap-12">
                    <div className="flex flex-col gap-6 max-w-2xl">
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Headquartered in South Africa, Mamadi & Company maintains a strategic 
                            regional presence with a growing footprint across the African continent. 
                            Our ability to mobilize technical expertise across diverse territories 
                            allows us to address complex infrastructure challenges in varying 
                            regulatory and environmental contexts.
                        </p>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            We are committed to regional integration and delivering excellence 
                            wherever our clients require sophisticated engineering and consulting solutions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-5xl md:text-6xl font-bold text-brand-blue tracking-tighter">Local</h3>
                            <p className="text-sm text-brand-gold font-medium">South african roots</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="text-5xl md:text-6xl font-bold text-brand-blue tracking-tighter">Regional</h3>
                            <p className="text-sm text-brand-gold font-medium">Sadc presence</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="text-5xl md:text-6xl font-bold text-brand-blue tracking-tighter">Pan-African</h3>
                            <p className="text-sm text-brand-gold font-medium">Strategic growth</p>
                        </div>
                    </div>
                </div>

                {/* Map Area */}
                <div className="w-full aspect-video md:aspect-[21/9] bg-gray-50 border border-gray-100 rounded-sm overflow-hidden flex items-center justify-center relative group">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] opacity-[0.05] grayscale contrast-125"></div>
                    
                    <div className="text-center p-8 z-10">
                        <Globe size={48} className="text-brand-gold/20 mx-auto mb-4" />
                        <h4 className="text-brand-blue font-semibold mb-1">Continental Strategic Presence</h4>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Visualizing Mamadi's expanding reach</p>
                    </div>

                    {/* Animated markers */}
                    <div className="absolute top-[65%] left-[52%] flex flex-col items-center">
                         <div className="w-3 h-3 bg-brand-gold rounded-full animate-ping absolute" />
                         <div className="w-3 h-3 bg-brand-gold rounded-full relative" />
                    </div>
                    <div className="absolute top-[40%] left-[48%] flex flex-col items-center">
                         <div className="w-2 h-2 bg-brand-blue rounded-full opacity-50" />
                    </div>
                    <div className="absolute top-[75%] left-[55%] flex flex-col items-center">
                         <div className="w-2 h-2 bg-brand-blue rounded-full opacity-50" />
                    </div>
                    <div className="absolute top-[20%] left-[40%] flex flex-col items-center">
                         <div className="w-1.5 h-1.5 bg-brand-gold/30 rounded-full" />
                    </div>
                    <div className="absolute top-[30%] left-[60%] flex flex-col items-center">
                         <div className="w-1.5 h-1.5 bg-brand-gold/30 rounded-full" />
                    </div>
                </div>
            </div>
        </Section>
      </div>

      {/* Strategy & Values Section */}
      <div id="strategy-&-values">
        <Section label="// Strategy & Values">
            <div className="flex flex-col gap-12">
                <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                    Our strategic direction is built on a foundation of innovation, sustainability, 
                    and technical integrity. We are driven by a growth mindset that seeks to 
                    redefine consulting engineering through digital transformation and community-centric design.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: 'Integrity', desc: 'Upholding the highest ethical standards in every engagement.' },
                        { title: 'Excellence', desc: 'Striving for technical precision and superior project delivery.' },
                        { title: 'Reliability', desc: 'Being a consistent and trusted partner for our clients.' }
                    ].map((value) => (
                        <div key={value.title} className="p-8 border border-gray-100 hover:border-brand-gold transition-colors">
                            <div className="w-10 h-10 bg-brand-beige flex items-center justify-center text-brand-gold mb-6">
                                <Award size={20} />
                            </div>
                            <h4 className="text-xl font-bold text-brand-blue mb-3">{value.title}</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">{value.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-10 border border-brand-blue/10 bg-brand-beige/30 flex flex-col md:flex-row gap-8 items-center justify-between">
                    <div className="max-w-xl">
                        <h4 className="text-lg font-bold text-brand-blue mb-2">Our Vision for the Future</h4>
                        <p className="text-sm text-gray-600">
                            To be the leading African consulting firm, recognized for transforming 
                            lives through innovative and sustainable infrastructure solutions.
                        </p>
                    </div>
                    <button className="px-8 py-3 bg-brand-blue text-white hover:bg-brand-blue/90 transition-all text-sm font-semibold">
                        View Our Projects
                    </button>
                </div>
            </div>
        </Section>
      </div>
    </div>
  );
};