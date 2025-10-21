import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  // サポートされる言語
  locales,

  // デフォルト言語
  defaultLocale: 'ja',

  // 静的エクスポートのため言語検出を無効化
  localeDetection: false,

  // すべてのロケールをパスに含める
  localePrefix: 'always',
});

export const config = {
  // /api や /_next などを除外
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
