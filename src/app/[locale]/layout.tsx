import { Inter, Noto_Sans_JP } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '@/styles/globals.css';
import { locales } from '@/i18n';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://f-circle.com'),
  title: {
    default: 'F-Circle | DX推進を加速するシステムインテグレーター',
    template: '%s | F-Circle',
  },
  description:
    'システム開発からクラウド移行、データ活用まで、企業のデジタル変革を総合的に支援します。金融・製造・流通・公共・通信業界で500社以上の実績。',
  keywords: [
    'システムインテグレーター',
    'SIer',
    'DX',
    'デジタルトランスフォーメーション',
    'クラウド移行',
    'データ分析',
    'アプリケーション開発',
    'ITコンサルティング',
  ],
  authors: [{ name: 'F-Circle Inc.' }],
  creator: 'F-Circle Inc.',
  publisher: 'F-Circle Inc.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/',
    siteName: 'F-Circle',
    title: 'F-Circle | DX推進を加速するシステムインテグレーター',
    description:
      'システム開発からクラウド移行、データ活用まで、企業のデジタル変革を総合的に支援します。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'F-Circle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'F-Circle | DX推進を加速するシステムインテグレーター',
    description:
      'システム開発からクラウド移行、データ活用まで、企業のデジタル変革を総合的に支援します。',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // ロケール検証
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
