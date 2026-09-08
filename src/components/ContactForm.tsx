import { useState } from 'react';
import type { FormEvent } from 'react';

const FORMSPREE_ID = import.meta.env.PUBLIC_FORMSPREE_ID as string | undefined;
const EMAIL = 'hello@terrell-lombardi.de';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const field =
  'w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  // No endpoint configured yet — hand off to the mail client instead.
  if (!FORMSPREE_ID) {
    return (
      <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <p className="text-sm leading-relaxed text-[var(--color-fg-soft)]">
          The quickest way to reach me is email. Tell me a little about the
          business and what you're trying to build, and I'll reply within a day or
          two.
        </p>
        <a
          href={`mailto:${EMAIL}?subject=Project%20enquiry`}
          className="mt-4 inline-block rounded-full bg-[var(--color-cta)] px-6 py-3 text-sm font-medium text-[var(--color-cta-fg)] transition-opacity hover:opacity-90"
        >
          {EMAIL}
        </a>
      </div>
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus('submitting');
    setError('');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        const body = await res.json().catch(() => null);
        setError(body?.errors?.[0]?.message ?? 'Something went wrong. Try email instead.');
        setStatus('error');
      }
    } catch {
      setError('Network error. Try email instead.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <p className="font-display text-lg">Thanks — that's come through.</p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-soft)]">
          I'll get back to you at the email you gave, usually within a day or two.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="text-xs font-semibold tracking-wide text-[var(--color-fg-soft)]">Name</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="grid gap-1.5">
          <span className="text-xs font-semibold tracking-wide text-[var(--color-fg-soft)]">Email</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="grid gap-1.5">
        <span className="text-xs font-semibold tracking-wide text-[var(--color-fg-soft)]">
          About the project
        </span>
        <textarea name="message" required rows={5} className={field} />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded-full bg-[var(--color-cta)] px-6 py-3 text-sm font-medium text-[var(--color-cta-fg)] transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </button>
        {status === 'error' && (
          <p className="text-sm text-[var(--color-accent)]">{error}</p>
        )}
      </div>
    </form>
  );
}
