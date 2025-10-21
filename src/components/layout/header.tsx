'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  {
    label: 'services',
    href: '/services',
    hasDropdown: true,
  },
  {
    label: 'industries',
    href: '/industries',
  },
  {
    label: 'caseStudies',
    href: '/case-studies',
  },
  {
    label: 'news',
    href: '/news',
  },
  {
    label: 'about',
    href: '/about',
  },
  {
    label: 'careers',
    href: '/careers',
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // モバイルメニューを閉じる
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-white border-b border-gray-200'
      )}
    >
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* ロゴ */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700">
              <span className="text-xl font-bold text-white">F</span>
            </div>
            <span className="text-xl font-bold text-gray-900 lg:text-2xl">
              {tCommon('siteName')}
            </span>
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center space-x-1 rounded-md px-4 py-2 text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                )}
              >
                <span>{t(item.label)}</span>
                {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
              </Link>
            ))}
          </nav>

          {/* CTAボタン（デスクトップ） */}
          <div className="hidden lg:flex lg:items-center lg:space-x-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/contact?type=document">{tCommon('requestDocument')}</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/contact">{tCommon('contactUs')}</Link>
            </Button>
          </div>

          {/* モバイルメニューボタン */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            aria-label="メニュー"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="container-custom py-4">
            <div className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-md px-4 py-3 text-base font-medium transition-colors',
                    pathname === item.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  {t(item.label)}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-col space-y-2 border-t border-gray-200 pt-4">
              <Button variant="outline" asChild>
                <Link href="/contact?type=document">{tCommon('requestDocument')}</Link>
              </Button>
              <Button asChild>
                <Link href="/contact">{tCommon('contactUs')}</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
