export const SITE = {
  name: 'NoteHub',
  description:
    'NoteHub helps you create, organize, and manage personal notes easily and efficiently.',
  baseUrl:
    (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, ''),
  ogImage: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
};