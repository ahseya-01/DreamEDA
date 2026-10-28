import './globals.css';
import type { Metadata } from 'next';
import { Newsreader, Hanken_Grotesk } from 'next/font/google';
import { getSettings } from '@/lib/settings';
import { hexToRgb, publicUrl, siteUrl } from '@/lib/utils';

const display = Newsreader({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const sans = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: `${s.brand.name}: ${s.brand.tagline}`, template: `%s | ${s.brand.name}` },
    description: s.brand.description,
    icons: s.brand.favicon ? { icon: publicUrl(s.brand.favicon) } : undefined,
    openGraph: { siteName: s.brand.name, title: s.brand.name, description: s.brand.description, type: 'website' },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { theme } = await getSettings();
  const vars = {
    '--brand': hexToRgb(theme.brand), '--accent': hexToRgb(theme.accent),
    '--paper': hexToRgb(theme.paper), '--ink': hexToRgb(theme.ink),
  } as React.CSSProperties;
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} style={vars}>
      <body>{children}</body>
    </html>
  );
}
