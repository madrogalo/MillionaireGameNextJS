import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const geistInter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Who Wants to Be a Millionaire?',
  description: 'A quiz game built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistInter.variable}`}>{children}</body>
    </html>
  );
}
