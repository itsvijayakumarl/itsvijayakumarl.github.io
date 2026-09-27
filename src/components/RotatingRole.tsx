import { useEffect, useState } from 'react';

const ROLES = ['application', 'security', 'automation', 'cloud', 'AI workflow'];

/** "A {role} engineer…" — the role word swaps every 2s with a soft rise. */
export default function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % ROLES.length), 2000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="role-line">
      {/^[aeiou]/i.test(ROLES[i]) ? 'An' : 'A'} <span key={i} className="role-word font-serif-italic">{ROLES[i]}</span> engineer who owns the whole system.
    </span>
  );
}
