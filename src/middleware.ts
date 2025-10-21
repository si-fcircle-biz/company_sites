import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  // サポートされる言語
  locales,

  // デフォルト言語
  defaultLocale: 'ja',

  // 言語検出を有効化
  localeDetection: true,

  // ロケールプレフィックス設定
  localePrefix: 'as-needed',
});

export const config = {
  // /api や /_next などを除外
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
