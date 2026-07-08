import type { Metadata } from 'next';
import { Bricolage_Grotesque, Archivo, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['500', '800'], variable: '--font-display' });
const body = Archivo({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://cfranci.github.io'),
  title: {
    default: 'Chase Francis — Everything here is live',
    template: '%s · Chase Francis',
  },
  description:
    'Chase Francis builds and ships products fast: hospitality platforms for Miami\'s biggest venues, logistics software for modern freight, desktop and mobile apps, automations, and tools people use every day. Every project on this page is live.',
  keywords: [
    'Chase Francis', 'Miami developer', 'full stack developer', 'Next.js', 'Cloudflare Workers',
    'Supabase', 'product engineer', 'hospitality software', 'freight software', 'Electron apps',
    'Swift macOS apps', 'automations', 'Chrome extensions',
  ],
  authors: [{ name: 'Chase Francis', url: 'https://github.com/cfranci' }],
  creator: 'Chase Francis',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://cfranci.github.io',
    title: 'Chase Francis — Everything here is live',
    description:
      '8 live sites, desktop and mobile apps, automations, private platforms, and open-source kits. Every screenshot links to a working product, and the page checks its own links while you read it.',
    siteName: 'Chase Francis',
    images: [{ url: '/assets/og.png', width: 1200, height: 630, alt: 'Chase Francis — Everything here is live' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chase Francis — Everything here is live',
    description: '8 live sites, desktop and mobile apps, automations, and open-source kits. Every claim on the page checks out in your browser.',
    images: ['/assets/og.png'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\'%3E%3Crect width=\'32\' height=\'32\' rx=\'7\' fill=\'%23211E2B\'/%3E%3Ccircle cx=\'16\' cy=\'16\' r=\'7\' fill=\'%23FF7A1A\'/%3E%3C/svg%3E',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
