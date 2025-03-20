import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Company Intelligence',
  description: 'Gather comprehensive insights about your target company',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 