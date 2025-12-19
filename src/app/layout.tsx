import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Puzzle Kit',
  description: 'Interactive prototype toolkit for puzzle game UI/UX design. Build and test mobile game interfaces with smooth animations and responsive components.',
  applicationName: 'Puzzle Kit',
  keywords: ['puzzle game', 'UI/UX', 'prototype', 'mobile game', 'game design', 'interactive prototype'],
  authors: [{ name: 'Puzzle Kit Team' }],
  openGraph: {
    title: 'Puzzle Kit',
    description: 'Interactive prototype toolkit for puzzle game UI/UX design. Build and test mobile game interfaces with smooth animations.',
    type: 'website',
    siteName: 'Puzzle Kit',
  },
  twitter: {
    card: 'summary',
    title: 'Puzzle Kit',
    description: 'Interactive prototype toolkit for puzzle game UI/UX design.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

/**
 * Root layout that wraps locale-specific layouts.
 * The actual content and styling is handled by [locale]/layout.tsx
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
