import React, { useState } from 'react';
import { Section } from './Section';
import { FadeIn } from './FadeIn';
import { MapPin, Phone, Printer, Mail, Clock } from 'lucide-react';
import { WorldMap } from './WorldMap';

export const ContactPage: React.FC = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formState);
        alert('Thank you for your message. We will get back to you shortly.');
        setFormState({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-brand-blue pt-24 pb-36 md:pb-44 text-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-screen-2xl">
          <div className="max-w-3xl">
            <span className="text-white font-normal tracking-[0.04em] text-sm mb-4 block">Get In Touch</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 leading-tight text-white">
              Partner with us for sustainable solutions.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Whether you have a project inquiry, need expert consultation, or want to join our team, 
              we are here to assist. Connect with our offices across the continent.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-gray-50/30">
        <Section className="py-20 md:py-32">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                
                {/* Contact Information */}
                <div className="lg:w-1/3 flex flex-col gap-12">
                    <FadeIn>
                        <div className="flex flex-col gap-8">
                            <h2 className="text-3xl font-semibold text-brand-blue">Head Office</h2>
                            
                            <div className="flex gap-4">
                                <ContactIcon>
                                    <MapPin size={16} strokeWidth={1.5} />
                                </ContactIcon>
                                <div className="flex flex-col gap-1">
                                    <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Physical Address</h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        22 Invicta Road<br />
                                        Thandanani Office Park<br />
                                        Midview, Carlswald<br />
                                        1685
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <ContactIcon>
                                    <Phone size={16} strokeWidth={1.5} />
                                </ContactIcon>
                                <div className="flex flex-col gap-1">
                                    <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Telephone</h4>
                                    <a href="tel:+27115328659" className="text-gray-600 hover:text-brand-blue transition-colors">
                                        Tel | +27 11 532 8659
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <ContactIcon>
                                    <Printer size={16} strokeWidth={1.5} />
                                </ContactIcon>
                                <div className="flex flex-col gap-1">
                                    <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Fax</h4>
                                    <p className="text-gray-600">
                                        Fax | +27 11 532 840
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <ContactIcon>
                                    <Mail size={16} strokeWidth={1.5} />
                                </ContactIcon>
                                <div className="flex flex-col gap-1">
                                    <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Email</h4>
                                    <a href="mailto:info@mamadi.co.za" className="text-gray-600 hover:text-brand-blue transition-colors">
                                        info@mamadi.co.za
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <ContactIcon>
                                    <Clock size={16} strokeWidth={1.5} />
                                </ContactIcon>
                                <div className="flex flex-col gap-1">
                                    <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Business Hours</h4>
                                    <p className="text-gray-600">
                                        Mon - Fri: 08:00 - 17:00<br />
                                        Sat - Sun: Closed
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={200}>
                        <div className="bg-brand-blue p-8 text-white rounded-sm mt-8">
                            <h3 className="text-xl font-semibold mb-4">Regional Presence</h3>
                            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                                We have operational offices in key regions across South Africa and the SADC region.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm font-medium">
                                    <div className="w-1.5 h-1.5 bg-brand-gold rounded-full"></div>
                                    Limpopo
                                </div>
                                <div className="flex items-center gap-3 text-sm font-medium">
                                    <div className="w-1.5 h-1.5 bg-brand-gold rounded-full"></div>
                                    KwaZulu-Natal
                                </div>
                                <div className="flex items-center gap-3 text-sm font-medium">
                                    <div className="w-1.5 h-1.5 bg-brand-gold rounded-full"></div>
                                    Eastern Cape
                                </div>
                                <div className="flex items-center gap-3 text-sm font-medium">
                                    <div className="w-1.5 h-1.5 bg-brand-gold rounded-full"></div>
                                    Mozambique (Maputo)
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Contact Form */}
                <div className="lg:w-2/3">
                    <FadeIn delay={100}>
                        <div className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm">
                            <h2 className="text-3xl font-semibold text-brand-blue mb-2">Send us a Message</h2>
                            <p className="text-gray-500 mb-8">Complete the form below and our team will respond to your inquiry.</p>
                            
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-gray-500">Full Name</label>
                                        <input 
                                            type="text" 
                                            id="name" 
                                            name="name"
                                            required
                                            value={formState.name}
                                            onChange={handleChange}
                                            className="w-full p-4 bg-gray-50 border border-gray-200 focus:border-brand-gold focus:ring-0 outline-none transition-colors"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Address</label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            name="email"
                                            required
                                            value={formState.email}
                                            onChange={handleChange}
                                            className="w-full p-4 bg-gray-50 border border-gray-200 focus:border-brand-gold focus:ring-0 outline-none transition-colors"
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-gray-500">Nature of Inquiry</label>
                                    <select 
                                        id="subject" 
                                        name="subject"
                                        value={formState.subject}
                                        onChange={handleChange}
                                        className="w-full p-4 bg-gray-50 border border-gray-200 focus:border-brand-gold focus:ring-0 outline-none transition-colors text-gray-600"
                                    >
                                        <option value="">Select an option</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Project Proposal">Project Proposal</option>
                                        <option value="Careers">Careers</option>
                                        <option value="Media">Media & Press</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-gray-500">Message</label>
                                    <textarea 
                                        id="message" 
                                        name="message"
                                        required
                                        rows={6}
                                        value={formState.message}
                                        onChange={handleChange}
                                        className="w-full p-4 bg-gray-50 border border-gray-200 focus:border-brand-gold focus:ring-0 outline-none transition-colors resize-none"
                                        placeholder="How can we assist you?"
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full md:w-auto px-10 py-4 bg-brand-blue text-white font-bold text-sm tracking-widest hover:bg-brand-gold transition-colors duration-300 mt-4 self-start"
                                >
                                    SEND MESSAGE
                                </button>
                            </form>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </Section>

        {/* Map Section */}
        <section className="h-[400px] w-full bg-gray-200 relative">
             <iframe 
                src="https://www.google.com/maps?q=22%20Invicta%20Road%2C%20Thandanani%20Office%20Park%2C%20Midview%2C%20Carlswald%2C%201685&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(100%) contrast(1.2)' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
             <div className="absolute inset-0 bg-brand-blue/10 pointer-events-none mix-blend-multiply"></div>
        </section>
      </div>
    </div>
  );
};

const ContactIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-gold/25 text-brand-gold">
        {children}
    </div>
);
