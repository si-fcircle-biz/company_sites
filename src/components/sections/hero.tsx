import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaPrimary?: {
    label: string;
    href: string;
  };
  ctaSecondary?: {
    label: string;
    href: string;
  };
  image?: {
    url: string;
    alt: string;
  };
}

export function Hero({ title, subtitle, ctaPrimary, ctaSecondary, image }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
      <div className="container-custom relative py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* テキストコンテンツ */}
          <div className="space-y-8 animate-fade-in">
            <h1 className="heading-display whitespace-pre-line">{title}</h1>
            <p className="body-text max-w-2xl whitespace-pre-line text-gray-600">{subtitle}</p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              {ctaPrimary && (
                <Button size="lg" asChild>
                  <Link href={ctaPrimary.href}>
                    {ctaPrimary.label}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}
              {ctaSecondary && (
                <Button size="lg" variant="outline" asChild>
                  <Link href={ctaSecondary.href}>{ctaSecondary.label}</Link>
                </Button>
              )}
            </div>
          </div>

          {/* 画像（オプション） */}
          {image && (
            <div className="relative animate-slide-up">
              <div className="aspect-video overflow-hidden rounded-2xl shadow-primary-lg">
                {/* 実際の実装ではnext/imageを使用 */}
                <div className="h-full w-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <span className="text-6xl font-bold text-primary-600">F</span>
                </div>
              </div>
              {/* 装飾 */}
              <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-secondary-cyan-400 opacity-20 blur-2xl" />
              <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-primary-400 opacity-20 blur-2xl" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
