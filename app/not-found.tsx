import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/config';
import css from './Home.module.css';

export const metadata: Metadata = {
  title: 'Page not found — NoteHub',
  description: 'This page does not exist in NoteHub.',
  openGraph: {
    title: 'Page not found — NoteHub',
    description: 'This page does not exist in NoteHub.',
    url: `${SITE.baseUrl}/not-found`,
    images: [{ url: SITE.ogImage }],
  },
};

export default function NotFoundPage() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">Go home</Link>
    </main>
  );
}