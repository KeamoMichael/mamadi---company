import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, FileText, Upload } from 'lucide-react';
import { openings } from './CareersPage';

type CareerApplicationPageProps = {
  initialRole: string;
  onBackToVacancies: () => void;
  onContact: () => void;
};

const emptyApplication = {
  name: '',
  email: '',
  phone: '',
  currentLocation: '',
  linkedin: '',
  message: '',
};

export const CareerApplicationPage: React.FC<CareerApplicationPageProps> = ({
  initialRole,
  onBackToVacancies,
  onContact,
}) => {
  const validInitialRole = openings.some((role) => role.title === initialRole)
    ? initialRole
    : openings[0].title;
  const [selectedRole, setSelectedRole] = useState(validInitialRole);
  const [application, setApplication] = useState(emptyApplication);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [website, setWebsite] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleApplicationChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (formStatus !== 'idle') setFormStatus('idle');
    setApplication((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const updateSelectedRole = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setFormStatus('idle');
    window.history.replaceState(
      { view: 'application' },
      '',
      `/careers/apply?position=${encodeURIComponent(roleTitle)}`,
    );
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
      setFormMessage('Your application has been sent to the Mamadi International team.');
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
      <section className="bg-brand-blue py-16 text-white md:py-20">
        <div className="container mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-20">
          <a
            href="/careers"
            onClick={(event) => {
              event.preventDefault();
              onBackToVacancies();
            }}
            className="inline-flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to vacancies
          </a>
          <span className="mt-10 block text-sm tracking-[0.04em] text-brand-gold">Careers at Mamadi International</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
            Submit your application.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-gray-300 md:text-lg">
            Share your details with our recruitment team for the opportunity selected below.
          </p>
        </div>
      </section>

      <section className="bg-gray-50/60 py-20 md:py-28">
        <div className="container mx-auto grid max-w-screen-2xl gap-14 px-6 md:px-12 lg:grid-cols-[0.38fr_0.62fr] lg:gap-20 lg:px-20">
          <div>
            <span className="text-sm font-normal tracking-[0.04em] text-brand-gold">Selected Opportunity</span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-brand-blue md:text-4xl">
              Apply to Mamadi International.
            </h2>
            <p className="mt-6 text-sm leading-7 text-gray-500">
              Complete the form and attach your CV. Formal requirements and selection criteria will be communicated to suitable applicants.
            </p>
            <div className="mt-9 border-t border-brand-gold/40 pt-6">
              <p className="text-xs text-gray-400">You are applying for</p>
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
                  onChange={(event) => updateSelectedRole(event.target.value)}
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
              <span>I consent to Mamadi International processing my information for recruitment and selection purposes.</span>
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
              <button type="button" onClick={onContact} className="w-fit text-sm text-gray-500 hover:text-brand-blue">
                Need assistance?
              </button>
            </div>

            <div aria-live="polite" className="min-h-6 text-sm">
              {formStatus === 'success' && <p className="text-emerald-700">{formMessage}</p>}
              {formStatus === 'error' && (
                <p className="text-red-700">
                  {formMessage}{' '}
                  {formMessage.includes('could not send') && (
                    <a href="mailto:info@mamadi.co.za" className="font-medium underline underline-offset-2">Email Mamadi International</a>
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
