import React, { useEffect, useRef, useState } from 'react';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error' | 'timeout';

const CONNECT_STYLES = `
@font-face {
  font-family: Figtree;
  src: url('/assets/connect/figtree-regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: Figtree;
  src: url('/assets/connect/figtree-semibold.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
}
.mamadi-connect-root,
.mamadi-connect-root *,
.mamadi-connect-root *::before,
.mamadi-connect-root *::after {
  box-sizing: border-box;
}
.mamadi-connect-root {
  margin: 0;
  color: #142238;
  font: 16px/1.5 Figtree, Arial, sans-serif;
  background: linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url('/assets/connect/connect-bg.jpg') center / cover no-repeat fixed;
  min-height: 100svh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 16px;
}
.mamadi-connect-root a {
  color: inherit;
  text-decoration: none;
}
.mamadi-connect-root button,
.mamadi-connect-root input,
.mamadi-connect-root textarea {
  font: inherit;
}
.mamadi-connect-root button,
.mamadi-connect-root a {
  touch-action: manipulation;
}
.mamadi-connect-root button:focus-visible,
.mamadi-connect-root a:focus-visible,
.mamadi-connect-root input:focus-visible,
.mamadi-connect-root textarea:focus-visible {
  outline: 3px solid #c9a35d;
  outline-offset: 4px;
}
.mamadi-connect-root .profile {
  width: 100%;
  max-width: 560px;
  margin: auto;
  padding: 26px 24px 30px;
  text-align: center;
  background: #ffffff;
  border: 0;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.22);
}
.mamadi-connect-root .identity .mark {
  width: 90px;
  height: 90px;
  object-fit: contain;
  border-radius: 50%;
  background: white;
  padding: 14px;
  display: block;
  margin: 0 auto 18px;
  border: 1px solid #e8e2d6;
  box-shadow: 0 3px 18px #14223806;
}
.mamadi-connect-root h1 {
  font-size: 25px;
  line-height: 1.2;
  letter-spacing: -0.6px;
  font-weight: 600;
  margin: 0 0 13px;
}
.mamadi-connect-root .bio {
  font-size: 14px;
  line-height: 1.6;
  color: #566071;
  margin: 0 auto;
  max-width: 360px;
}
.mamadi-connect-root .socials {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 22px 0 27px;
}
.mamadi-connect-root .socials a {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9b742f;
  border-radius: 50%;
  padding: 11px;
}
.mamadi-connect-root .socials a:hover {
  background: #b58b3212;
}
.mamadi-connect-root .socials svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
}
.mamadi-connect-root .socials svg .dot {
  fill: currentColor;
  stroke: none;
}
.mamadi-connect-root .socials a:nth-child(-n+2) svg {
  fill: currentColor;
  stroke: none;
}
.mamadi-connect-root .links {
  display: grid;
  gap: 12px;
}
.mamadi-connect-root .links > a,
.mamadi-connect-root .links > button {
  width: 100%;
  min-height: 60px;
  padding: 12px 16px;
  display: grid;
  grid-template-columns: 30px 1fr 24px;
  gap: 12px;
  align-items: center;
  border: 1px solid #e2e3e4;
  background: #fff;
  box-shadow: 0 3px 9px #17243a03;
  border-radius: 10px;
  color: #17243a;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
}
.mamadi-connect-root .links > a:hover,
.mamadi-connect-root .links > button:hover {
  background: #fbfaf6;
  border-color: #b58b32;
}
.mamadi-connect-root .links > button.featured {
  background: #172a46;
  border-color: #172a46;
  color: #fff;
}
.mamadi-connect-root .links > button.featured:hover {
  background: #263e60;
}
.mamadi-connect-root .tile-icon {
  font-size: 24px;
  font-weight: 400;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mamadi-connect-root .tile-icon svg {
  width: 23px;
  height: 23px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.4;
  stroke-linejoin: round;
}
.mamadi-connect-root .arrow {
  font-size: 19px;
  font-weight: 400;
}
.mamadi-connect-root footer {
  margin-top: 35px;
  color: #667080;
}
.mamadi-connect-root .gold-rule {
  display: block;
  width: 28px;
  height: 1px;
  background: #b58b32;
  margin: 0 auto 15px;
}
.mamadi-connect-root footer p {
  font-size: 12px;
  line-height: 1.65;
  margin: 0;
}
.mamadi-connect-root footer small {
  font-size: 8px;
  letter-spacing: 2px;
  color: #8b919a;
}
.mamadi-connect-root dialog {
  border: 1px solid #e4e3de;
  background: #fff;
  color: #17243a;
  box-shadow: 0 20px 100px #17243a22;
  border-radius: 18px;
  padding: 30px 26px 24px;
  width: calc(100% - 32px);
  max-width: 450px;
  max-height: calc(100svh - 32px);
  overflow: auto;
  margin: auto;
}
.mamadi-connect-root dialog::backdrop {
  background: #17243a55;
  backdrop-filter: blur(5px);
}
.mamadi-connect-root .close {
  position: absolute;
  right: 12px;
  top: 10px;
  border: 0;
  background: none;
  color: #667080;
  width: 44px;
  height: 44px;
  font-size: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mamadi-connect-root .form-tag {
  font-size: 9px;
  letter-spacing: 2px;
  color: #9b742f;
  margin: 4px 0 15px;
}
.mamadi-connect-root h2 {
  font-size: 28px;
  line-height: 1.2;
  font-weight: 400;
  margin: 0 0 8px;
}
.mamadi-connect-root .form-intro {
  font-size: 14px;
  color: #667080;
  margin: 0 0 24px;
}
.mamadi-connect-root label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  margin: 0 0 16px;
  text-align: left;
}
.mamadi-connect-root input,
.mamadi-connect-root textarea {
  width: 100%;
  display: block;
  margin-top: 7px;
  border: 1px solid #d8dce0;
  border-radius: 6px;
  padding: 12px;
  background: #fafaf8;
  color: #17243a;
  font-size: 16px;
  min-height: 48px;
}
.mamadi-connect-root input[aria-invalid="true"],
.mamadi-connect-root textarea[aria-invalid="true"] {
  border-color: #b42318;
}
.mamadi-connect-root textarea {
  resize: vertical;
  min-height: 110px;
}
.mamadi-connect-root ::placeholder {
  color: #89919e;
}
.mamadi-connect-root .field-error {
  display: block;
  font-size: 11px;
  font-weight: 500;
  color: #b42318;
  margin-top: 5px;
}
.mamadi-connect-root .honeypot {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.mamadi-connect-root .privacy {
  font-size: 10px;
  line-height: 1.6;
  color: #77818e;
  margin: 0 0 16px;
  text-align: left;
}
.mamadi-connect-root .submit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0;
  border-radius: 6px;
  min-height: 50px;
  padding: 12px 16px;
  width: 100%;
  background: #172a46;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
.mamadi-connect-root .submit:hover:not(:disabled) {
  background: #263e60;
}
.mamadi-connect-root .submit:disabled {
  opacity: 0.65;
  cursor: wait;
}
.mamadi-connect-root #form-status {
  font-size: 12px;
  line-height: 1.5;
  color: #627854;
  margin: 12px 0 0;
  text-align: left;
}
.mamadi-connect-root #form-status.status-error {
  color: #b42318;
}
.mamadi-connect-root #form-status.status-timeout {
  color: #8a6116;
}
.mamadi-connect-root #form-status a {
  text-decoration: underline;
  text-underline-offset: 2px;
  font-weight: 600;
}
@media (min-width: 760px) {
  .mamadi-connect-root {
    padding: 32px 16px;
  }
  .mamadi-connect-root .profile {
    padding: 32px 28px;
    max-width: 560px;
    min-height: 820px;
    border: 0;
    border-radius: 24px;
    background: #ffffff;
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.25);
  }
}
@media (max-width: 350px) {
  .mamadi-connect-root .profile {
    padding-left: 20px;
    padding-right: 20px;
  }
  .mamadi-connect-root h1 {
    font-size: 23px;
  }
  .mamadi-connect-root .bio {
    font-size: 13px;
  }
  .mamadi-connect-root .links > a,
  .mamadi-connect-root .links > button {
    font-size: 14px;
    gap: 8px;
    padding: 12px;
  }
  .mamadi-connect-root .socials {
    gap: 12px;
  }
}
`;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBMISSION_TIMEOUT_MS = 15000;

export const ConnectPage: React.FC = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [status, setStatus] = useState<SubmissionState>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const previousHtmlBg = document.documentElement.style.background;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.background = '#f7f6f2';

    let themeMeta = document.head.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    const createdThemeMeta = !themeMeta;
    const previousThemeContent = themeMeta?.getAttribute('content') ?? null;

    if (!themeMeta) {
      themeMeta = document.createElement('meta');
      themeMeta.name = 'theme-color';
      document.head.appendChild(themeMeta);
    }
    themeMeta.setAttribute('content', '#f7f6f2');

    return () => {
      document.documentElement.style.background = previousHtmlBg;
      document.body.style.overflow = previousBodyOverflow;
      if (createdThemeMeta) {
        themeMeta?.remove();
      } else if (themeMeta && previousThemeContent !== null) {
        themeMeta.setAttribute('content', previousThemeContent);
      }
    };
  }, []);

  const openModal = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (dialog.open) {
      dialog.close();
    }
    document.body.style.overflow = '';
    openButtonRef.current?.focus();
  };

  const handleDialogClose = () => {
    document.body.style.overflow = '';
    openButtonRef.current?.focus();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog || event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      closeModal();
    }
  };

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== 'Tab') return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusableElements = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => el.offsetParent !== null);

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstElement || document.activeElement === dialog) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  const validateFields = () => {
    const errors: { name?: string; email?: string; message?: string } = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      errors.name = 'Please enter your name.';
    } else if (trimmedName.length > 100) {
      errors.name = 'Name must be 100 characters or fewer.';
    }

    if (!trimmedEmail) {
      errors.email = 'Please enter your email address.';
    } else if (trimmedEmail.length > 254 || !EMAIL_PATTERN.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!trimmedMessage) {
      errors.message = 'Please enter your message.';
    } else if (trimmedMessage.length < 10) {
      errors.message = 'Please enter at least 10 characters.';
    } else if (trimmedMessage.length > 4000) {
      errors.message = 'Message must be 4000 characters or fewer.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (status !== 'idle' && status !== 'submitting') {
      setStatus('idle');
      setStatusMessage('');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;

    if (!validateFields()) {
      setStatus('error');
      setStatusMessage('Please check the highlighted fields and try again.');
      return;
    }

    if (honeypot.trim() !== '') {
      setStatus('success');
      setStatusMessage(
        'Your enquiry has been accepted for delivery to info@mamadi.co.za.'
      );
      setFormData({ name: '', email: '', message: '' });
      setHoneypot('');
      return;
    }

    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      setStatus('error');
      setStatusMessage(
        'You appear to be offline. Your message has been kept above—please reconnect and try again, or email info@mamadi.co.za.'
      );
      return;
    }

    setStatus('submitting');
    setStatusMessage('Sending your enquiry...');

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, SUBMISSION_TIMEOUT_MS);

    try {
      const response = await fetch('https://formsubmit.co/ajax/info@mamadi.co.za', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          _subject: 'New Connect page enquiry | Mamadi International',
          _template: 'table',
          _honey: honeypot,
        }),
        signal: controller.signal,
      });

      window.clearTimeout(timeoutId);

      const result = await response.json().catch(() => null);
      const wasAccepted =
        response.ok && (result?.success === true || result?.success === 'true');

      if (!wasAccepted) {
        throw new Error(
          result?.message || 'The form service did not accept the enquiry.'
        );
      }

      setStatus('success');
      setStatusMessage(
        'Thank you. Your enquiry has been accepted by our form service for delivery to info@mamadi.co.za.'
      );
      setFormData({ name: '', email: '', message: '' });
      setHoneypot('');
      setFieldErrors({});
    } catch (error) {
      window.clearTimeout(timeoutId);

      if (error instanceof DOMException && error.name === 'AbortError') {
        setStatus('timeout');
        setStatusMessage(
          'The request timed out, so we cannot confirm whether your enquiry was delivered. Your text is still above—Before resending, you may also email info@mamadi.co.za directly.'
        );
        return;
      }

      console.error('Connect enquiry submission failed:', error);
      setStatus('error');
      setStatusMessage(
        'We could not send your enquiry right now. Your message has been kept above—please try again or email info@mamadi.co.za.'
      );
    }
  };

  return (
    <div className="mamadi-connect-root">
      <style>{CONNECT_STYLES}</style>
      <main className="profile">
        <div className="identity">
          <img
            className="mark"
            src="/assets/connect/mark.png"
            alt="Mamadi International"
          />
          <h1>Mamadi International</h1>
          <p className="bio">
            Engineering, sustainability and advisory solutions.
            <br />
            Rooted in Africa. Connected worldwide.
          </p>
        </div>

        <div className="socials" aria-label="Mamadi social media">
          <a
            href="https://x.com/MamadiInternati?s=20"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Mamadi International on X"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61592327621760"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Mamadi International on Facebook"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.438H7.078v-3.489h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.973h-1.513c-1.49 0-1.956.931-1.956 1.887v2.261h3.328l-.532 3.489h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/mamadi.international?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Mamadi International on Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-instagram"
              aria-hidden="true"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <a
            href="https://lnkd.in/p/dhRWE9gS"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Mamadi International on LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-linkedin"
              aria-hidden="true"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>

        <nav className="links" aria-label="Connect with Mamadi">
          <a
            href="https://www.mamadiinternational.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="tile-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a18 18 0 0 1 0 18 18 18 0 0 1 0-18Z" />
              </svg>
            </span>
            <span>Visit our website</span>
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </a>

          <button
            ref={openButtonRef}
            id="open-contact"
            type="button"
            className="featured"
            onClick={openModal}
            aria-haspopup="dialog"
            aria-controls="contact-dialog"
          >
            <span className="tile-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
              </svg>
            </span>
            <span>Get in touch</span>
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </button>

          <a href="mailto:info@mamadi.co.za">
            <span className="tile-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 6 9 7 9-7" />
              </svg>
            </span>
            <span>Email our team</span>
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </a>

          <a href="tel:+27115328659">
            <span className="tile-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.1 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z" />
              </svg>
            </span>
            <span>Call Mamadi</span>
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </nav>

        <footer>
          <p>© 2026 Mamadi International. All rights reserved.</p>
        </footer>
      </main>

      <dialog
        ref={dialogRef}
        id="contact-dialog"
        aria-labelledby="form-title"
        onClose={handleDialogClose}
        onClick={handleBackdropClick}
        onKeyDown={handleDialogKeyDown}
      >
        <button
          id="close-contact"
          type="button"
          className="close"
          aria-label="Close contact form"
          onClick={closeModal}
        >
          ×
        </button>
        <p className="form-tag">CONNECT WITH MAMADI</p>
        <h2 id="form-title">Get in touch.</h2>
        <p className="form-intro">Tell us how we can help.</p>
        <form id="enquiry" noValidate onSubmit={handleSubmit}>
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="connect-website">
              Website
              <input
                id="connect-website"
                name="_honey"
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          <label>
            Your name
            <input
              ref={nameInputRef}
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              placeholder="Full name"
              value={formData.name}
              onChange={handleFieldChange}
              aria-invalid={fieldErrors.name ? 'true' : 'false'}
              disabled={status === 'submitting'}
            />
            {fieldErrors.name && (
              <span className="field-error" role="alert">
                {fieldErrors.name}
              </span>
            )}
          </label>

          <label>
            Email address
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleFieldChange}
              aria-invalid={fieldErrors.email ? 'true' : 'false'}
              disabled={status === 'submitting'}
            />
            {fieldErrors.email && (
              <span className="field-error" role="alert">
                {fieldErrors.email}
              </span>
            )}
          </label>

          <label>
            Your message
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={4000}
              rows={4}
              placeholder="Tell us about your enquiry..."
              value={formData.message}
              onChange={handleFieldChange}
              aria-invalid={fieldErrors.message ? 'true' : 'false'}
              disabled={status === 'submitting'}
            />
            {fieldErrors.message && (
              <span className="field-error" role="alert">
                {fieldErrors.message}
              </span>
            )}
          </label>

          <p className="privacy">
            Enquiries are transmitted via FormSubmit (formsubmit.co) to{' '}
            <strong>info@mamadi.co.za</strong> so Mamadi International can respond to your
            request. Please do not submit sensitive or confidential information.
          </p>

          <button
            className="submit"
            type="submit"
            disabled={status === 'submitting'}
          >
            <span>{status === 'submitting' ? 'Sending enquiry...' : 'Send enquiry'}</span>
            <span aria-hidden="true">↗</span>
          </button>

          <p
            id="form-status"
            role="status"
            aria-live="polite"
            className={
              status === 'error'
                ? 'status-error'
                : status === 'timeout'
                ? 'status-timeout'
                : ''
            }
          >
            {statusMessage}
          </p>
        </form>
      </dialog>
    </div>
  );
};
