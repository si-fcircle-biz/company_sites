'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FileText, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('common');

  useEffect(() => {
    const handleScroll = () => {
      // ファーストビューを通過したら表示
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsVisible(scrollPosition > windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 transition-all duration-300',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="container-custom py-3">
          <div className="flex items-center justify-center space-x-3 lg:space-x-4">
            <Button variant="outline" size="sm" className="flex-1 lg:flex-initial" asChild>
              <Link href="/contact?type=document">
                <FileText className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">{t('requestDocument')}</span>
                <span className="sm:hidden">資料請求</span>
              </Link>
            </Button>
            <Button size="sm" className="flex-1 lg:flex-initial" asChild>
              <Link href="/contact">
                <Mail className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">{t('contactUs')}</span>
                <span className="sm:hidden">お問い合わせ</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
