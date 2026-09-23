import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { getSiteUrl } from '@/lib/utils/site-url';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
  weight: ['300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Valmora — Biens à louer en France',
    template: '%s | Valmora',
  },
  description:
    'Découvrez nos chalets, villas, appartements meublés et mobil-homes à louer en France.',
  keywords: [
    'location chalet France',
    'location villa France',
    'location appartement meublé',
    'location mobil-home',
    'chalet Alpes',
    'villa Côte d’Azur',
    'Valmora',
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Valmora',
    title: 'Valmora — Biens à louer en France',
    description:
      'Recherchez et réservez votre prochain logement en toute confiance.',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Valmora — Biens à louer en France',
    description: 'Trouvez votre prochain logement en France.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={roboto.variable}>
      <body className="font-sans">
        {children}
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            style: {
              fontFamily: 'var(--font-roboto)',
            },
          }}
        />
      </body>
    </html>
  );
}
