import React, { useState } from 'react';
import { Section } from './Section';
import { MapPin, Phone, Printer, Mail, Clock } from 'lucide-react';
import { GoogleMap } from './GoogleMap';
import { headOffice } from '../data/contact';

export const ContactPage: React.FC = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [website, setWebsite] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (website) {
            setSubmissionStatus('success');
            return;
        }

        setSubmissionStatus('submitting');

        try {
            const response = await fetch('https://formsubmit.co/ajax/info@mamadi.co.za', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    ...formState,
                    _subject: 'New website inquiry | Mamadi & Company',
                    _template: 'table',
                    _honey: website,
                }),
            });
            const result = await response.json().catch(() => null);
            const wasAccepted = response.ok && (result?.success === true || result?.success === 'true');

            if (!wasAccepted) {
                throw new Error(result?.message || 'The message could not be sent.');
            }

            setSubmissionStatus('success');
            setFormState({ name: '', email: '', subject: '', message: '' });
            setWebsite('');
        } catch (error) {
            console.error('Contact form submission failed:', error);
            setSubmissionStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (submissionStatus !== 'idle') setSubmissionStatus('idle');
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-brand-blue bg-cover bg-center pt-24 pb-36 text-white md:pb-44"
        style={{ backgroundImage: "url('/assets/officeBuilding.webp')" }}
      >
        <div className="absolute inset-0 bg-brand-blue/75" />
        <div className="container relative mx-auto px-6 md:px-12 lg:px-20 max-w-screen-2xl">
          <div className="max-w-3xl">
            <span className="text-white font-normal tracking-[0.04em] text-sm mb-4 block">Get In Touch</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 leading-tight text-white">
              Partner With Mamadi.
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
            <div className="grid items-start gap-16 lg:grid-cols-[minmax(230px,0.72fr)_minmax(0,1.28fr)] lg:gap-14 xl:gap-20">
                <aside className="border-t border-brand-gold pt-7">
                    <span className="text-sm text-brand-gold">Head office</span>
                    <h2 className="mt-3 text-3xl font-semibold leading-tight text-brand-blue">{headOffice.city}</h2>

                    <div className="mt-9 flex gap-4">
                        <ContactIcon><MapPin size={16} strokeWidth={1.5} /></ContactIcon>
                        <div>
                            <h3 className="text-sm font-medium text-brand-blue">Physical Address</h3>
                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                {headOffice.addressLines.map((line, index) => (
                                    <React.Fragment key={line}>
                                        {line}{index < headOffice.addressLines.length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 divide-y divide-gray-100 border-y border-gray-100">
                        <ContactDetail icon={<Phone size={15} strokeWidth={1.5} />} label="Telephone">
                            <a href="tel:+27115328659" className="hover:text-brand-blue">+27 11 532 8659</a>
                        </ContactDetail>
                        <ContactDetail icon={<Printer size={15} strokeWidth={1.5} />} label="Fax">
                            <span>+27 11 532 840</span>
                        </ContactDetail>
                        <ContactDetail icon={<Mail size={15} strokeWidth={1.5} />} label="Email">
                            <a href="mailto:info@mamadi.co.za" className="break-all hover:text-brand-blue">info@mamadi.co.za</a>
                        </ContactDetail>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <ContactIcon><Clock size={16} strokeWidth={1.5} /></ContactIcon>
                        <div>
                            <h3 className="text-sm font-medium text-brand-blue">Business Hours</h3>
                            <p className="mt-2 text-sm leading-6 text-gray-600">Mon – Fri: 08:00 – 17:00<br />Sat – Sun: Closed</p>
                        </div>
                    </div>

                </aside>

                <div className="border-t border-brand-gold pt-7">
                    <span className="text-sm text-brand-gold">Start a conversation</span>
                    <h2 className="mt-3 text-3xl font-semibold leading-tight text-brand-blue md:text-4xl">Send us a message.</h2>
                    <p className="mt-4 max-w-xl text-gray-500">Tell us about your project or inquiry and the right member of our team will get back to you.</p>

                    <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-7">
                                <div className="absolute -left-[10000px]" aria-hidden="true">
                                    <label htmlFor="website">Website</label>
                                    <input
                                        type="text"
                                        id="website"
                                        name="website"
                                        value={website}
                                        onChange={(event) => setWebsite(event.target.value)}
                                        tabIndex={-1}
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="name" className="text-sm font-medium text-gray-600">Full Name</label>
                                        <input 
                                            type="text" 
                                            id="name" 
                                            name="name"
                                            required
                                            value={formState.name}
                                            onChange={handleChange}
                                            className="w-full border-0 border-b border-gray-200 bg-transparent px-0 py-3 outline-none transition-colors placeholder:text-gray-400 focus:border-brand-gold focus:ring-0"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="text-sm font-medium text-gray-600">Email Address</label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            name="email"
                                            required
                                            value={formState.email}
                                            onChange={handleChange}
                                            className="w-full border-0 border-b border-gray-200 bg-transparent px-0 py-3 outline-none transition-colors placeholder:text-gray-400 focus:border-brand-gold focus:ring-0"
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="subject" className="text-sm font-medium text-gray-600">Nature of Inquiry</label>
                                    <select 
                                        id="subject" 
                                        name="subject"
                                        required
                                        value={formState.subject}
                                        onChange={handleChange}
                                        className="w-full border-0 border-b border-gray-200 bg-transparent px-0 py-3 text-gray-600 outline-none transition-colors focus:border-brand-gold focus:ring-0"
                                    >
                                        <option value="">Select an option</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Project Proposal">Project Proposal</option>
                                        <option value="Careers">Careers</option>
                                        <option value="Media">Media & Press</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="message" className="text-sm font-medium text-gray-600">Message</label>
                                    <textarea 
                                        id="message" 
                                        name="message"
                                        required
                                        rows={5}
                                        value={formState.message}
                                        onChange={handleChange}
                                        className="w-full resize-none border border-gray-200 bg-gray-50/50 p-4 outline-none transition-colors placeholder:text-gray-400 focus:border-brand-gold focus:ring-0"
                                        placeholder="How can we assist you?"
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={submissionStatus === 'submitting'}
                                    className="mt-1 w-full self-start bg-brand-blue px-10 py-4 text-sm font-semibold tracking-[0.12em] text-white transition-colors duration-300 hover:bg-brand-gold disabled:cursor-wait disabled:opacity-60 md:w-auto"
                                >
                                    {submissionStatus === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
                                </button>

                                <div aria-live="polite" className="min-h-6 text-sm">
                                    {submissionStatus === 'success' && (
                                        <p className="text-emerald-700">Thank you. Your message has been sent to the Mamadi team.</p>
                                    )}
                                    {submissionStatus === 'error' && (
                                        <p className="text-red-700">
                                            We could not send your message. Please try again or email{' '}
                                            <a href="mailto:info@mamadi.co.za" className="font-medium underline underline-offset-2">info@mamadi.co.za</a>.
                                        </p>
                                    )}
                                </div>
                    </form>
                </div>

                <div className="border-t border-gray-100 pt-8 lg:col-span-2 lg:mt-4">
                    <div className="grid gap-6 md:grid-cols-[0.72fr_1.28fr] md:items-start md:gap-14 xl:gap-20">
                        <div>
                            <span className="text-sm text-brand-gold">Our footprint</span>
                            <h3 className="mt-2 text-2xl font-semibold text-brand-blue">Global Presence</h3>
                        </div>
                        <div>
                            <p className="max-w-2xl text-sm leading-6 text-gray-500">Our international network connects project expertise across Africa, Europe, North America, the Middle East and Asia.</p>
                            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                                {[
                                    'South Africa',
                                    'Mozambique',
                                    'Zambia',
                                    'Tanzania',
                                    'Kenya',
                                    'United Kingdom',
                                    'Finland',
                                    'United Arab Emirates',
                                    'India',
                                    'Singapore',
                                    'United States of America',
                                ].map((location) => (
                                    <div key={location} className="flex items-start gap-2 text-sm font-medium leading-5 text-brand-blue">
                                        <MapPin aria-hidden="true" size={13} strokeWidth={1.7} className="mt-[0.2rem] shrink-0 text-brand-gold" />
                                        {location === 'United States of America' ? (
                                            <span>United States of<span className="lg:block"> America</span></span>
                                        ) : location}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>

        {/* Map Section */}
        <section className="relative h-[400px] w-full bg-white">
             <GoogleMap
                 address={headOffice.mapAddress}
                 lat={headOffice.coordinates.lat}
                 lng={headOffice.coordinates.lng}
             />
        </section>
      </div>
    </div>
  );
};

const ContactIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center text-brand-gold">
        {children}
    </div>
);

const ContactDetail: React.FC<{ icon: React.ReactNode; label: string; children: React.ReactNode }> = ({ icon, label, children }) => (
    <div className="grid grid-cols-[28px_1fr] items-center gap-4 py-4">
        <span className="flex h-7 w-7 items-center justify-center text-brand-gold">{icon}</span>
        <div className="min-w-0">
            <span className="block text-sm font-medium text-brand-blue">{label}</span>
            <div className="mt-0.5 text-sm text-gray-600 transition-colors">{children}</div>
        </div>
    </div>
);
