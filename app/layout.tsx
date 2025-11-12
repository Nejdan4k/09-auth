import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { SITE } from '@/lib/config';
import { TanStackProvider } from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
  metadataBase: new URL(SITE.baseUrl),
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.baseUrl,
    images: [{ url: SITE.ogImage }],
    siteName: SITE.name,
    type: 'website',
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#f8f9fa',
            }}
          >
            <Header />
            <main style={{ flex: 1, position: 'relative' }}>
              {children}
              {modal}
            </main>
            <Footer />
          </div>
        </TanStackProvider>
      </body>
    </html>
  );
}