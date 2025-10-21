import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// 対応言語
export const locales = ['ja', 'en'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // ロケールの取得
  let locale = await requestLocale;

  // ロケールの検証
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
