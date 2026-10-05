import type { Metadata } from 'next';
import { Navigation, Footer } from '@/components/portfolio';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  title: { default: 'Khánh Trân — Product Designer & Material Explorer', template: '%s — Khánh Trân' },
  description: 'Trần Huỳnh Khánh Trân is a product designer based in Ho Chi Minh City, working across physical products, material R&D, illustration, and sculpture.',
  openGraph: { type: 'website', locale: 'en_US', siteName: 'Khánh Trân — Selected Portfolio', title: 'Khánh Trân — Ideas into objects', description: 'Product design, material exploration, and imagined worlds. Selected work by Trần Huỳnh Khánh Trân.', images: [{ url: '/images/p4-1.webp', width: 1600, height: 1600, alt: 'Homo Sapiens chess set by Khánh Trân' }] },
  twitter: { card: 'summary_large_image' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body id="top"><a className="skip-link" href="#main">Skip to content</a><Navigation /><main id="main">{children}</main><Footer /></body></html>;
}
