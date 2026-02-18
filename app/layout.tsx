import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Diagramma | Scan Notes to Structured Documents',
  description:
    'Turn photos and scans of class notes into clean, editable DOCX and PDF with deterministic structure detection and a review-first workflow.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
