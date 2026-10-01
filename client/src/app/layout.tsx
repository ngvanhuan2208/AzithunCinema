import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from './Providers';

const font = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});
export const metadata: Metadata = {
  title: { default: 'Azithun', template: '%s · Azithun' },
  description: 'Nền tảng xem phim và nghe audio.',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={font.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
