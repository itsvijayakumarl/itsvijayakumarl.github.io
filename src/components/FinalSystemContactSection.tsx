import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

/** Copies text even where the async Clipboard API is missing (non-HTTPS preview, older browsers). */
async function copyText(text: string) {
  try {
    if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; }
  } catch { /* fall through */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

export default function FinalSystemContactSection() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const email = PERSONAL_INFO.email;
  const phone = PERSONAL_INFO.phone;
  const phoneHref = phone.replace(/[^+\d]/g, '');

  const handleCopyEmail = async () => {
    if (!(await copyText(email))) return;
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" data-depth="true" className="relative min-h-screen py-28 px-6 lg:px-12 z-20">
      <div className="section-content max-w-7xl mx-auto space-y-24">
        {/* The System Climax Lockup */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="eyebrow-label text-[#5C5C66] flex items-center justify-center gap-3">
            <span className="text-[#2F7BFF]">16 / CONTACT</span>
            <span className="text-white/20">/</span>
            <span>DIRECT ENGAGEMENT</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-extrabold text-[#F5F5F2] tracking-tight leading-[0.92]">
              Let&apos;s build something <br />
              <span className="font-serif-italic text-[#6EA8FF] text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-normal">
                that should exist.
              </span>
            </h2>

            <p className="text-xl sm:text-2xl font-display font-medium text-[#A1A1AA] tracking-tight pt-2">
              I didn&apos;t learn one layer. I learned <span className="text-[#F5F5F2]">the system.</span>
            </p>
          </div>

          {/* 8 Layers Locked Summary Badge */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {[
              'HARDWARE', 'NETWORKS', 'SERVERS', 'WEB',
              'CLOUD', 'AUTOMATION', 'SECURITY', 'AI'
            ].map((layer, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-white/90"
              >
                {layer}
              </span>
            ))}
          </div>
        </div>

        {/* Direct channels: Email, Phone and LinkedIn first; GitHub after */}
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="eyebrow-label text-[#2F7BFF] block">DIRECT CHANNELS</span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F5F2] tracking-tight">Immediate Reach</h3>
            <p className="text-sm sm:text-base text-[#A1A1AA] font-light leading-relaxed max-w-2xl mx-auto">
              Available for executive architecture roles, system consultations, high-agency engineering leadership,
              and high-scale platform initiatives.
            </p>
          </div>

          <ul className="contact-primary" aria-label="Primary contact channels">
            <li className="contact-card">
              <span className="contact-icon" aria-hidden="true"><Mail size={20} strokeWidth={1.8} /></span>
              <span className="contact-label">Email</span>
              <a href={`mailto:${email}`} className="contact-value" data-cursor="magnetic">{email}</a>
              <div className="contact-actions">
                <a href={`mailto:${email}`} className="contact-btn contact-btn-solid" data-cursor="magnetic">Write an email</a>
                <button type="button" onClick={handleCopyEmail} className="contact-btn" data-cursor="magnetic" aria-live="polite">
                  {copied ? <><Check size={14} aria-hidden="true" /> Copied</> : <><Copy size={14} aria-hidden="true" /> Copy</>}
                </button>
              </div>
            </li>

            <li className="contact-card">
              <span className="contact-icon" aria-hidden="true"><Phone size={20} strokeWidth={1.8} /></span>
              <span className="contact-label">Phone / WhatsApp</span>
              <a href={`tel:${phoneHref}`} className="contact-value" data-cursor="magnetic">{phone}</a>
              <div className="contact-actions">
                <a href={`tel:${phoneHref}`} className="contact-btn contact-btn-solid" data-cursor="magnetic">Call now</a>
              </div>
            </li>

            <li className="contact-card">
              <span className="contact-icon" aria-hidden="true"><Linkedin size={20} strokeWidth={1.8} /></span>
              <span className="contact-label">LinkedIn</span>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="contact-value" data-cursor="magnetic">in/vijayakumarl</a>
              <div className="contact-actions">
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="contact-btn contact-btn-solid" data-cursor="magnetic">
                  Connect <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </li>
          </ul>

          <div className="contact-secondary">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="contact-gh" data-cursor="magnetic">
              <Github size={18} strokeWidth={1.8} aria-hidden="true" />
              <span className="contact-gh-label">GitHub</span>
              <span className="contact-gh-value">github.com/risewithvj</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
