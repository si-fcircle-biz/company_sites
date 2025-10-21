import Link from 'next/link';
import { useTranslations } from 'next-intl';

const footerNavigation = [
  {
    title: 'services',
    links: [
      { label: 'アプリケーション開発', href: '/services/app-development' },
      { label: 'クラウド移行', href: '/services/cloud-migration' },
      { label: 'データ分析', href: '/services/data-analytics' },
      { label: '運用保守', href: '/services/system-operation' },
      { label: 'コンサルティング', href: '/services/consulting' },
    ],
  },
  {
    title: 'companyInfo',
    links: [
      { label: '会社概要', href: '/about' },
      { label: '導入事例', href: '/case-studies' },
      { label: 'お知らせ', href: '/news' },
      { label: '採用情報', href: '/careers' },
    ],
  },
  {
    title: 'support',
    links: [
      { label: 'お問い合わせ', href: '/contact' },
      { label: 'プライバシーポリシー', href: '/privacy' },
      { label: 'セキュリティ方針', href: '/security' },
    ],
  },
];

export function Footer() {
  const t = useTranslations('footer');
  const tCommon = useTranslations('common');

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12 lg:py-16">
        {/* フッターナビゲーション */}
        <div className="grid gap-8 lg:grid-cols-4">
          {/* 会社情報 */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700">
                <span className="text-xl font-bold text-white">F</span>
              </div>
              <span className="text-xl font-bold text-white">{tCommon('siteName')}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">{tCommon('siteDescription')}</p>
          </div>

          {/* ナビゲーションリンク */}
          {footerNavigation.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {t(section.title)}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ボーダー */}
        <div className="my-8 border-t border-gray-800" />

        {/* コピーライト */}
        <div className="flex flex-col items-center justify-between space-y-4 lg:flex-row lg:space-y-0">
          <p className="text-sm">{t('copyright', { year: currentYear })}</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-sm hover:text-white transition-colors">
              {t('privacy')}
            </Link>
            <Link href="/security" className="text-sm hover:text-white transition-colors">
              {t('security')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
