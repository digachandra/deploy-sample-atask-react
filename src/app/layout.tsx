import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Container from '@/components/container';
import { cn } from '@/lib/utils';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const meta = {
  title: 'Atask GRE by digachandra',
  description: 'A powerful to explore GitHub repositories by username.',
};

export const metadata: Metadata = {
  title: {
    template: `%s - ${meta.title}`,
    default: meta.title,
  },
  description: 'A powerful to explore GitHub repositories by username.',
  icons: {
    icon: 'icons/favicon-32x32.png',
    shortcut: 'icons/favicon-96x96.png',
    apple: [
      { url: 'icons/icon-webapp-180x180.png', sizes: '180x180', type: 'image/png' },
      { url: 'icons/icon-webapp-167x167.png', sizes: '167x167', type: 'image/png' },
      { url: 'icons/icon-webapp-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: 'icons/icon-webapp-120x120.png', sizes: '120x120', type: 'image/png' },
    ],
  },
  appleWebApp: {
    title: meta.title,
    statusBarStyle: 'black',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  width: 'device-width',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, '!mx-auto min-h-dvh antialiased duration-400')}>
        <Container>{children}</Container>
      </body>
    </html>
  );
}
