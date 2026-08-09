import React, { useMemo, useRef, useState } from 'react';
import { ArrowRight, BriefcaseBusiness, CheckCircle2, FileText, MapPin, Upload } from 'lucide-react';

type CareersPageProps = {
  setView: (view: 'home' | 'about' | 'projects' | 'contact' | 'insights' | 'vacancies') => void;
};

type Region = 'Europe' | 'Africa' | 'Asia';

type Opening = {
  title: string;
  division: string;
  location: string;
  region: Region;
  reportsTo: string;
  summary: string;
};

const openings: Opening[] = [
  {
    title: 'Chief Executive Officer',
    division: 'Mamadi Finland',
    location: 'Finland',
    region: 'Europe',
    reportsTo: 'Executive Chairman: Global',
    summary: 'Lead Mamadi’s Finnish operations and advance the company’s market presence, partnerships and delivery capability in the region.',
  },
  {
    title: 'Regional Director: North Africa',
    division: 'Regional Leadership',
    location: 'Morocco',
    region: 'Africa',
    reportsTo: 'Operations Director: Africa',
    summary: 'Provide regional leadership for Mamadi’s North Africa platform and strengthen strategic relationships and project delivery from Morocco.',
  },
  {
    title: 'Technology & Innovation Specialist',
    division: 'Technology and Innovation',
    location: 'Singapore',
    region: 'Asia',
    reportsTo: 'Operations Director: Africa',
    summary: 'Support Mamadi’s technology and innovation agenda through specialist insight, international collaboration and practical digital solutions.',
  },
  {
    title: 'Procurement Specialist',
    division: 'Group Operations',
    location: 'Africa operations · Location to be confirmed',
    region: 'Africa',
    reportsTo: 'Operations Director: Africa',
    summary: 'Strengthen procurement planning, supplier coordination and commercially sound sourcing across Mamadi’s project and operational requirements.',
  },
];

const emptyApplication = {
  name: '',
  email: '',
  phone: '',
  currentLocation: '',
  linkedin: '',
  message: '',
};

export const CareersPage: React.FC<CareersPageProps> = ({ setView }) => {
  const [activeRegion, setActiveRegion] = useState<'All' | Region>('All');
  const [selectedRole, setSelectedRole] = useState(openings[0].title);
  const [application, setApplication] = useState(emptyApplication);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [website, setWebsite] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');
  const applicationRef = useRef<HTMLElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredOpenings = useMemo(
    () => activeRegion === 'All' ? openings : openings.filter((role) => role.region === activeRegion),
    [activeRegion],
  );

  const chooseRole = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setFormStatus('idle');
    requestAnimationFrame(() => applicationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const handleApplicationChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (formStatus !== 'idle') setFormStatus('idle');
    setApplication((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleApplicationSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (website) {
      setFormStatus('success');
      return;
    }

    if (!cvFile) {
      setFormStatus('error');
      setFormMessage('Please attach your CV before submitting your application.');
      return;
    }

    if (cvFile.size > 10 * 1024 * 1024) {
      setFormStatus('error');
      setFormMessage('Your CV must be 10 MB or smaller.');
      return;
    }

    setFormStatus('submitting');
    setFormMessage('');

    const payload = new FormData();
    payload.append('Position Applied For', selectedRole);
    payload.append('Name', application.name);
    payload.append('email', application.email);
    payload.append('Phone', application.phone);
    payload.append('Current Location', application.currentLocation);
    if (application.linkedin) payload.append('LinkedIn Profile', application.linkedin);
    payload.append('Supporting Message', application.message);
    payload.append('attachment', cvFile);
    payload.append('_subject', `New careers application | ${selectedRole}`);
    payload.append('_template', 'table');
    payload.append('_honey', website);

    try {
      const response = await fetch('https://formsubmit.co/ajax/info@mamadi.co.za', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload,
      });
      const result = await response.json().catch(() => null);
      const wasAccepted = response.ok && (result?.success === true || result?.success === 'true');

      if (!wasAccepted) throw new Error(result?.message || 'Application submission failed.');

      setFormStatus('success');
      setFormMessage('Your application has been sent to the Mamadi team.');
      setApplication(emptyApplication);
      setCvFile(null);
      setWebsite('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.error('Careers application failed:', error);
      setFormStatus('error');
      setFormMessage('We could not send your application. Please try again or email your CV to info@mamadi.co.za.');
    }
  };

  return (
    <main className="pt-20">
      <section
        className="relative overflow-hidden bg-brand-blue bg-cover bg-center pt-24 pb-36 text-white md:pb-44"
        style={{ backgroundImage: "url('/assets/Hero Section Images/Vacancies-Hero Section.jpeg')" }}
      >
        <div className="absolute inset-0 bg-brand-blue/70" />
        <div className="container relative mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl">
            <span className="mb-4 block text-sm font-normal tracking-[0.04em] text-white">Careers</span>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              Vacancies
            </h1>
            <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-gray-300 md:text-lg">
              Join the people extending Mamadi’s engineering, leadership and innovation capability across our global operations.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-20">
          <div className="grid gap-10 border-b border-gray-100 pb-12 lg:grid-cols-[0.42fr_0.58fr] lg:items-end lg:gap-20">
            <div>
              <span className="text-sm font-normal tracking-[0.04em] text-brand-gold">Open Opportunities</span>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-brand-blue md:text-5xl">
                Build the next chapter with Mamadi.
              </h2>
            </div>
            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-sm leading-7 text-gray-500">
                These positions reflect the vacant roles in Mamadi International’s current organisational structure. Applications are reviewed on a rolling basis until the positions are filled.
              </p>
              <div className="mt-7 flex items-center gap-3 text-sm text-brand-blue">
                <BriefcaseBusiness size={17} className="text-brand-gold" />
                <span>{openings.length} open positions across {new Set(openings.map((role) => role.region)).size} regions</span>
              </div>
            </div>
          </div>

          <div className="flex gap-7 overflow-x-auto border-b border-gray-100 py-7 scrollbar-none">
            {(['All', 'Africa', 'Europe', 'Asia'] as const).map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setActiveRegion(region)}
                className={`whitespace-nowrap border-b pb-2 text-sm transition-colors ${
                  activeRegion === region
                    ? 'border-brand-gold text-brand-blue'
                    : 'border-transparent text-gray-400 hover:text-brand-blue'
                }`}
              >
                {region === 'All' ? 'All Openings' : region}
              </button>
            ))}
          </div>

          <div className="divide-y divide-gray-100">
            {filteredOpenings.map((role, index) => (
              <article key={role.title} className="grid gap-7 py-10 md:py-12 lg:grid-cols-[72px_1fr_0.72fr_auto] lg:items-start lg:gap-10">
                <span className="text-sm text-brand-gold">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <p className="text-xs font-medium text-brand-gold">{role.division}</p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-brand-blue md:text-3xl">{role.title}</h3>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-500">{role.summary}</p>
                </div>
                <div className="space-y-4 text-sm text-gray-500">
                  <p className="flex items-start gap-3">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-brand-gold" />
                    <span>{role.location}</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <BriefcaseBusiness size={16} className="mt-0.5 shrink-0 text-brand-gold" />
                    <span>Reports to {role.reportsTo}</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-gold" />
                    <span>Open vacancy · Rolling applications</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => chooseRole(role.title)}
                  className="group inline-flex w-fit items-center gap-2 bg-brand-blue px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-gold"
                >
                  Apply Now
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section ref={applicationRef} className="scroll-mt-32 bg-gray-50/60 py-20 md:py-28">
        <div className="container mx-auto grid max-w-screen-2xl gap-14 px-6 md:px-12 lg:grid-cols-[0.38fr_0.62fr] lg:gap-20 lg:px-20">
          <div>
            <span className="text-sm font-normal tracking-[0.04em] text-brand-gold">Apply to Mamadi</span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-brand-blue md:text-4xl">
              Submit your application.
            </h2>
            <p className="mt-6 text-sm leading-7 text-gray-500">
              Select a role and share your details with our recruitment team. Formal requirements and selection criteria will be communicated to suitable applicants.
            </p>
            <div className="mt-9 border-t border-brand-gold/40 pt-6">
              <p className="text-xs text-gray-400">Applications are currently being accepted for</p>
              <p className="mt-2 text-lg font-semibold text-brand-blue">{selectedRole}</p>
            </div>
          </div>

          <form onSubmit={handleApplicationSubmit} encType="multipart/form-data" className="grid gap-7">
            <div className="absolute -left-[10000px]" aria-hidden="true">
              <label htmlFor="careers-website">Website</label>
              <input
                id="careers-website"
                name="website"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField label="Position" htmlFor="application-role">
                <select
                  id="application-role"
                  value={selectedRole}
                  onChange={(event) => {
                    setSelectedRole(event.target.value);
                    setFormStatus('idle');
                  }}
                  className="w-full border-0 border-b border-gray-200 bg-transparent px-0 py-3 text-gray-700 outline-none focus:border-brand-gold focus:ring-0"
                >
                  {openings.map((role) => <option key={role.title}>{role.title}</option>)}
                </select>
              </FormField>
              <FormField label="Full Name" htmlFor="application-name">
                <input
                  id="application-name"
                  name="name"
                  required
                  value={application.name}
                  onChange={handleApplicationChange}
                  className="w-full border-0 border-b border-gray-200 bg-transparent px-0 py-3 outline-none focus:border-brand-gold focus:ring-0"
                  placeholder="Enter your full name"
                />
              </FormField>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField label="Email Address" htmlFor="application-email">
                <input
                  type="email"
                  id="application-email"
                  name="email"
                  required
                  value={application.email}
                  onChange={handleApplicationChange}
                  className="w-full border-0 border-b border-gray-200 bg-transparent px-0 py-3 outline-none focus:border-brand-gold focus:ring-0"
                  placeholder="you@example.com"
                />
              </FormField>
              <FormField label="Phone Number" htmlFor="application-phone">
                <input
                  type="tel"
                  id="application-phone"
                  name="phone"
                  required
                  value={application.phone}
                  onChange={handleApplicationChange}
                  className="w-full border-0 border-b border-gray-200 bg-transparent px-0 py-3 outline-none focus:border-brand-gold focus:ring-0"
                  placeholder="Include your country code"
                />
              </FormField>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField label="Current Location" htmlFor="application-location">
                <input
                  id="application-location"
                  name="currentLocation"
                  required
                  value={application.currentLocation}
                  onChange={handleApplicationChange}
                  className="w-full border-0 border-b border-gray-200 bg-transparent px-0 py-3 outline-none focus:border-brand-gold focus:ring-0"
                  placeholder="City, country"
                />
              </FormField>
              <FormField label="LinkedIn Profile (Optional)" htmlFor="application-linkedin">
                <input
                  type="url"
                  id="application-linkedin"
                  name="linkedin"
                  value={application.linkedin}
                  onChange={handleApplicationChange}
                  className="w-full border-0 border-b border-gray-200 bg-transparent px-0 py-3 outline-none focus:border-brand-gold focus:ring-0"
                  placeholder="https://linkedin.com/in/..."
                />
              </FormField>
            </div>

            <FormField label="Supporting Message" htmlFor="application-message">
              <textarea
                id="application-message"
                name="message"
                required
                rows={5}
                value={application.message}
                onChange={handleApplicationChange}
                className="w-full resize-none border border-gray-200 bg-white p-4 outline-none focus:border-brand-gold focus:ring-0"
                placeholder="Briefly tell us why you are interested in this role."
              />
            </FormField>

            <div>
              <label htmlFor="application-cv" className="mb-3 block text-sm font-medium text-gray-600">Curriculum Vitae</label>
              <label
                htmlFor="application-cv"
                className="flex cursor-pointer flex-col items-center justify-center border border-dashed border-gray-300 bg-white px-6 py-8 text-center transition-colors hover:border-brand-gold"
              >
                {cvFile ? <FileText size={24} className="text-brand-gold" /> : <Upload size={24} className="text-brand-gold" />}
                <span className="mt-3 text-sm font-medium text-brand-blue">{cvFile?.name || 'Choose your CV'}</span>
                <span className="mt-1 text-xs text-gray-400">PDF, DOC or DOCX · Maximum 10 MB</span>
              </label>
              <input
                ref={fileInputRef}
                type="file"
                id="application-cv"
                name="attachment"
                required
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(event) => {
                  setCvFile(event.target.files?.[0] || null);
                  setFormStatus('idle');
                }}
                className="sr-only"
              />
            </div>

            <label className="flex items-start gap-3 text-xs leading-5 text-gray-500">
              <input type="checkbox" required className="mt-1 accent-brand-blue" />
              <span>I consent to Mamadi processing my information for recruitment and selection purposes.</span>
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="inline-flex w-full items-center justify-center gap-3 bg-brand-blue px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-gold disabled:cursor-wait disabled:opacity-60 sm:w-auto"
              >
                {formStatus === 'submitting' ? 'Submitting...' : 'Submit Application'}
                {formStatus !== 'submitting' && <ArrowRight size={16} />}
              </button>
              <button
                type="button"
                onClick={() => setView('contact')}
                className="w-fit text-sm text-gray-500 hover:text-brand-blue"
              >
                Need assistance?
              </button>
            </div>

            <div aria-live="polite" className="min-h-6 text-sm">
              {formStatus === 'success' && <p className="text-emerald-700">{formMessage}</p>}
              {formStatus === 'error' && (
                <p className="text-red-700">
                  {formMessage}{' '}
                  {formMessage.includes('could not send') && (
                    <a href="mailto:info@mamadi.co.za" className="font-medium underline underline-offset-2">Email Mamadi</a>
                  )}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

const FormField: React.FC<{ label: string; htmlFor: string; children: React.ReactNode }> = ({ label, htmlFor, children }) => (
  <div>
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-gray-600">{label}</label>
    {children}
  </div>
);
