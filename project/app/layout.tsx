import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/providers/theme-provider';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AirScout | Global Smart Booking Platform for Unique Stays',
  description: 'AirScout is a smart, scalable platform for discovering, managing, and monetizing short-term rental properties globally. Book unique accommodations with ease.',
  keywords: 'travel, smart booking, vacation rentals, luxury stays, airscout, short-term rentals, global travel',
  authors: [{ name: 'AirScout Team' }],
  openGraph: {
    title: 'AirScout | Global Smart Booking Platform',
    description: 'Discover unique places to stay around the world. Book with confidence and travel with ease.',
    url: 'https://airscout.travel',
    siteName: 'AirScout',
    images: [
      {
        url: 'https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg',
        width: 1200,
        height: 630,
        alt: 'AirScout Luxury Stays',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AirScout | Find Your Perfect Stay',
    description: 'Discover unique places to stay around the world with AirScout.',
    images: ['https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}