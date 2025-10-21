import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/hero';
import { ServiceCard } from '@/components/sections/service-card';
import { CaseStudyCard } from '@/components/sections/case-study-card';
import { NewsCard } from '@/components/sections/news-card';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layout/main-layout';
import { services } from '@/data/services';
import { caseStudies } from '@/data/case-studies';
import { news } from '@/data/news';
import Link from 'next/link';
import { ArrowRight, Building2, Users, Award, MapPin } from 'lucide-react';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('hero');
  const tServices = await getTranslations('services');
  const tCaseStudies = await getTranslations('caseStudies');
  const tNews = await getTranslations('news');
  const tCommon = await getTranslations('common');

  return (
    <MainLayout>
      {/* ヒーローセクション */}
      <Hero
        title={t('title')}
        subtitle={t('subtitle')}
        ctaPrimary={{
          label: t('ctaPrimary'),
          href: '/contact',
        }}
        ctaSecondary={{
          label: t('ctaSecondary'),
          href: '/contact?type=document',
        }}
        image={{
          url: '/hero-image.png',
          alt: 'F-Circle',
        }}
      />

      {/* 数字で見るF-Circle */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Building2, label: '導入実績', value: '500+', unit: '社' },
              { icon: MapPin, label: '拠点数', value: '5', unit: '拠点' },
              { icon: Users, label: '技術者数', value: '800+', unit: '名' },
              { icon: Award, label: '継続率', value: '98', unit: '%' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center rounded-lg bg-white p-8 shadow-sm"
              >
                <stat.icon className="h-10 w-10 text-primary-600 mb-4" />
                <div className="text-4xl font-bold text-gray-900">
                  {stat.value}
                  <span className="text-2xl text-gray-600">{stat.unit}</span>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* サービス */}
      <section className="section">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="heading-xl mb-4">{tServices('title')}</h2>
            <p className="body-text text-gray-600">{tServices('description')}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                href={service.href}
              />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/services">
                {tCommon('viewAll')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 導入事例 */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="heading-xl mb-4">{tCaseStudies('title')}</h2>
            <p className="body-text text-gray-600">{tCaseStudies('description')}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard
                key={caseStudy.id}
                title={caseStudy.title}
                clientName={caseStudy.clientName}
                industry={caseStudy.industry}
                challenge={caseStudy.challenge}
                results={caseStudy.results}
                href={caseStudy.href}
              />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/case-studies">
                {tCommon('viewAll')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* お知らせ */}
      <section className="section">
        <div className="container-custom">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="heading-xl">{tNews('latest')}</h2>
            <Button variant="link" asChild>
              <Link href="/news">
                {tCommon('viewAll')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {news.slice(0, 4).map((item) => (
              <NewsCard
                key={item.id}
                title={item.title}
                excerpt={item.excerpt}
                category={item.category}
                publishedAt={item.publishedAt}
                href={item.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="section bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-xl mb-4">DX推進のパートナーとして、\n御社をサポートします</h2>
          <p className="body-text mb-8 max-w-2xl mx-auto opacity-90">
            まずはお気軽にご相談ください。専門スタッフが最適なソリューションをご提案します。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-primary-600 hover:bg-gray-100" asChild>
              <Link href="/contact?type=document">{tCommon('requestDocument')}</Link>
            </Button>
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100" asChild>
              <Link href="/contact">{tCommon('contactUs')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
