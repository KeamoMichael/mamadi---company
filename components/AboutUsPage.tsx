import React from 'react';
import { Section } from './Section';
import { KeyPeople } from './KeyPeople';
import { Award, ShieldCheck, FileText, Users } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const overviewPages = [
    '2', '3', '4', '5', '6', '7', '8', '9', '16', '17', '18', '19', '20'
  ];

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
            {['Company Overview', 'Leadership', 'B-BBEE Status', 'Accreditations'].map((item) => (
                <a 
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="py-4 text-sm font-semibold text-gray-500 hover:text-brand-gold transition-colors"
                >
                    {item}
                </a>
            ))}
        </div>
      </div>

      {/* Company Overview Section */}
      <div id="company-overview">
        <Section label="// Company Overview">
            <div className="flex flex-col gap-12">
                <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                    Our company profile outlines our journey, capabilities, and the strategic vision 
                    that drives our engineering and consulting services. Browse through our 
                    latest corporate overview below.
                </p>
                
                <div className="flex flex-col gap-4 bg-gray-50 p-4 md:p-8 rounded-sm">
                    {overviewPages.map((page) => (
                        <div key={page} className="w-full bg-white shadow-sm border border-gray-100">
                            <img 
                                src={`/About Us/CO - Page ${page}.jpg`} 
                                alt={`Company Overview Page ${page}`}
                                className="w-full h-auto"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Section>
      </div>

      {/* Leadership Section */}
      <div id="leadership">
        <KeyPeople />
      </div>

      {/* B-BBEE Section */}
      <div id="b-bbee-status">
        <Section label="// B-BBEE Status">
            <div className="flex flex-col gap-12">
                <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                    Mamadi & Company is committed to broad-based black economic empowerment 
                    and social transformation in South Africa. We maintain a strong B-BBEE 
                    rating that reflects our commitment to equity and inclusivity.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-brand-beige p-10 flex flex-col gap-6">
                        <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center text-white">
                            <Users size={32} />
                        </div>
                        <h3 className="text-2xl font-semibold text-brand-blue">B-BBEE Level 1 Contributor</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            We are proud to be a Level 1 B-BBEE contributor, demonstrating our 
                            leadership in economic transformation and our commitment to 
                            empowering previously disadvantaged individuals and communities.
                        </p>
                        <ul className="space-y-3">
                            {['135% Procurement Recognition', 'Black Owned & Managed', 'Skills Development Focused', 'Enterprise Development Partner'].map(point => (
                                <li key={point} className="flex items-center gap-3 text-sm text-brand-blue font-medium">
                                    <ShieldCheck size={18} className="text-brand-gold" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border border-gray-100 p-10 flex flex-col justify-center gap-6">
                        <h4 className="font-semibold text-brand-blue">Download Certificate</h4>
                        <p className="text-sm text-gray-500">
                            Our latest B-BBEE verification certificate is available for download 
                            to our clients and partners.
                        </p>
                        <button className="flex items-center gap-3 w-fit px-6 py-3 border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-all rounded-sm text-sm font-semibold">
                            <FileText size={18} />
                            View B-BBEE Certificate
                        </button>
                    </div>
                </div>
            </div>
        </Section>
      </div>

      {/* Accreditations Section */}
      <div id="accreditations">
        <Section label="// Accreditations">
            <div className="flex flex-col gap-12">
                <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                    Our technical excellence is backed by industry-leading certifications and 
                    memberships in professional bodies, ensuring we adhere to the highest 
                    global standards.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { name: 'ECSA', desc: 'Engineering Council of SA' },
                        { name: 'ISO 9001', desc: 'Quality Management' },
                        { name: 'ISO 14001', desc: 'Environmental Mngmt' },
                        { name: 'ISO 45001', desc: 'Health & Safety' },
                        { name: 'CESA', desc: 'Consulting Engineers SA' },
                        { name: 'SAICE', desc: 'Civil Engineering' },
                        { name: 'SABTACO', desc: 'Black Technical Orgs' },
                        { name: 'SACPCMP', desc: 'Project Management' }
                    ].map((acc) => (
                        <div key={acc.name} className="p-6 border border-gray-100 flex flex-col gap-2 hover:border-brand-gold transition-colors group">
                            <Award size={24} className="text-brand-gold mb-2" />
                            <h4 className="font-bold text-brand-blue">{acc.name}</h4>
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">{acc.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
      </div>
    </div>
  );
};