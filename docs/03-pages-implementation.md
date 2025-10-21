# 3️⃣ ページ実装ガイド

## 実装済みページ

### ✅ ホームページ (`/app/[locale]/page.tsx`)

**セクション構成:**
1. Hero - メインビジュアル + CTA
2. 数字で見るF-Circle - 実績の可視化
3. サービス一覧 - ServiceCard×5
4. 導入事例 - CaseStudyCard×3
5. お知らせ - NewsCard×4
6. CTAセクション - グラデーション背景

**特徴:**
- 完全レスポンシブ
- アニメーション実装
- Sticky CTA統合
- i18n対応

## 未実装ページ（実装テンプレート）

### 1. サービス一覧ページ

**ファイルパス:** `src/app/[locale]/services/page.tsx`

```tsx
import { Metadata } from 'next';
import { MainLayout } from '@/components/layout/main-layout';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { ServiceCard } from '@/components/sections/service-card';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'サービス一覧',
  description: 'F-Circleが提供する各種ITサービスをご紹介します',
};

export default function ServicesPage() {
  return (
    <MainLayout>
      <div className="container-custom">
        <Breadcrumb items={[{ label: 'サービス', href: '/services' }]} />
      </div>

      {/* ヒーロー */}
      <section className="section-sm bg-gray-50">
        <div className="container-custom text-center">
          <h1 className="heading-xl mb-4">サービス</h1>
          <p className="body-text text-gray-600 max-w-2xl mx-auto">
            お客様のビジネス課題に応じた最適なソリューションを提供します
          </p>
        </div>
      </section>

      {/* サービス一覧 */}
      <section className="section">
        <div className="container-custom">
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
        </div>
      </section>
    </MainLayout>
  );
}
```

### 2. サービス詳細ページ

**ファイルパス:** `src/app/[locale]/services/[slug]/page.tsx`

```tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MainLayout } from '@/components/layout/main-layout';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

// この関数は後でCMSから取得に変更
async function getService(slug: string) {
  // TODO: CMSから取得
  return {
    title: 'クラウド移行支援',
    description: 'オンプレミスからクラウドへの移行を安全かつ効率的に実現',
    features: [
      '現状分析とクラウド戦略立案',
      'マイグレーション計画策定',
      '段階的な移行実行',
      '移行後の運用サポート',
    ],
    benefits: [
      { title: 'コスト削減', description: '初期投資不要、従量課金で最適化' },
      { title: 'スケーラビリティ', description: 'ビジネス成長に合わせて柔軟に拡張' },
      { title: 'セキュリティ', description: 'エンタープライズグレードのセキュリティ' },
    ],
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = await getService(params.slug);
  if (!service) notFound();

  return (
    <MainLayout>
      <div className="container-custom">
        <Breadcrumb
          items={[
            { label: 'サービス', href: '/services' },
            { label: service.title, href: `/services/${params.slug}` },
          ]}
        />
      </div>

      {/* ヒーロー */}
      <section className="section-sm bg-gradient-to-b from-primary-50 to-white">
        <div className="container-custom">
          <h1 className="heading-display mb-4">{service.title}</h1>
          <p className="body-text text-gray-600 max-w-3xl">{service.description}</p>
        </div>
      </section>

      {/* 特徴 */}
      <section className="section">
        <div className="container-custom">
          <h2 className="heading-lg mb-8">サービスの特徴</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100">
                    <Check className="h-4 w-4 text-primary-600" />
                  </div>
                </div>
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* メリット */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <h2 className="heading-lg mb-8 text-center">導入のメリット</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {service.benefits.map((benefit, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-4">お気軽にご相談ください</h2>
          <p className="body-text text-gray-600 mb-8 max-w-2xl mx-auto">
            専門のコンサルタントが、御社に最適なソリューションをご提案します
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">お問い合わせ</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact?type=document">資料請求</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export async function generateStaticParams() {
  // TODO: CMSから全サービスのslugを取得
  return [
    { slug: 'app-development' },
    { slug: 'cloud-migration' },
    { slug: 'data-analytics' },
    { slug: 'system-operation' },
    { slug: 'consulting' },
  ];
}
```

### 3. 導入事例一覧ページ

**ファイルパス:** `src/app/[locale]/case-studies/page.tsx`

```tsx
'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { CaseStudyCard } from '@/components/sections/case-study-card';
import { Badge } from '@/components/ui/badge';
import { caseStudies } from '@/data/case-studies';

const industries = ['すべて', '金融', '製造', '流通', '公共', '通信'];

export default function CaseStudiesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState('すべて');

  const filteredCases =
    selectedIndustry === 'すべて'
      ? caseStudies
      : caseStudies.filter((c) => c.industry === selectedIndustry);

  return (
    <MainLayout>
      <div className="container-custom">
        <Breadcrumb items={[{ label: '導入事例', href: '/case-studies' }]} />
      </div>

      {/* ヒーロー */}
      <section className="section-sm bg-gray-50">
        <div className="container-custom text-center">
          <h1 className="heading-xl mb-4">導入事例</h1>
          <p className="body-text text-gray-600 max-w-2xl mx-auto">
            500社以上の実績から、成功事例をご紹介します
          </p>
        </div>
      </section>

      {/* フィルター */}
      <section className="section-sm">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 justify-center">
            {industries.map((industry) => (
              <Badge
                key={industry}
                variant={selectedIndustry === industry ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedIndustry(industry)}
              >
                {industry}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* 事例一覧 */}
      <section className="section">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCases.map((caseStudy) => (
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
        </div>
      </section>
    </MainLayout>
  );
}
```

### 4. お問い合わせフォーム

**ファイルパス:** `src/app/[locale]/contact/page.tsx`

```tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MainLayout } from '@/components/layout/main-layout';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

const contactSchema = z.object({
  type: z.enum(['inquiry', 'document', 'support', 'other']),
  companyName: z.string().min(1, '会社名を入力してください'),
  name: z.string().min(1, 'お名前を入力してください'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  phone: z.string().optional(),
  subject: z.string().min(1, '件名を入力してください'),
  message: z.string().min(10, 'お問い合わせ内容は10文字以上で入力してください'),
  privacy: z.boolean().refine((val) => val === true, {
    message: 'プライバシーポリシーに同意してください',
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: API送信実装
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <MainLayout showStickyCTA={false}>
        <section className="section">
          <div className="container-custom text-center">
            <div className="max-w-md mx-auto">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success-light mx-auto">
                <Mail className="h-8 w-8 text-success" />
              </div>
              <h1 className="heading-lg mb-4">送信完了</h1>
              <p className="body-text text-gray-600 mb-8">
                お問い合わせありがとうございます。
                <br />
                担当者より3営業日以内にご連絡いたします。
              </p>
              <Button asChild>
                <a href="/">ホームに戻る</a>
              </Button>
            </div>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout showStickyCTA={false}>
      <div className="container-custom">
        <Breadcrumb items={[{ label: 'お問い合わせ', href: '/contact' }]} />
      </div>

      <section className="section">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* フォーム */}
            <div className="lg:col-span-2">
              <h1 className="heading-xl mb-4">お問い合わせ</h1>
              <p className="body-text text-gray-600 mb-8">
                お気軽にご相談ください。専門スタッフが対応いたします。
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* お問い合わせ種別 */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    お問い合わせ種別 <span className="text-error">*</span>
                  </label>
                  <select
                    {...register('type')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2"
                  >
                    <option value="inquiry">サービスに関するお問い合わせ</option>
                    <option value="document">資料請求</option>
                    <option value="support">サポート</option>
                    <option value="other">その他</option>
                  </select>
                  {errors.type && (
                    <p className="mt-1 text-sm text-error">{errors.type.message}</p>
                  )}
                </div>

                {/* 会社名 */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    会社名 <span className="text-error">*</span>
                  </label>
                  <input
                    {...register('companyName')}
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2"
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-error">{errors.companyName.message}</p>
                  )}
                </div>

                {/* お名前 */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    お名前 <span className="text-error">*</span>
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-error">{errors.name.message}</p>
                  )}
                </div>

                {/* メールアドレス */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    メールアドレス <span className="text-error">*</span>
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-error">{errors.email.message}</p>
                  )}
                </div>

                {/* 電話番号 */}
                <div>
                  <label className="block text-sm font-medium mb-2">電話番号</label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2"
                  />
                </div>

                {/* 件名 */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    件名 <span className="text-error">*</span>
                  </label>
                  <input
                    {...register('subject')}
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-error">{errors.subject.message}</p>
                  )}
                </div>

                {/* お問い合わせ内容 */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    お問い合わせ内容 <span className="text-error">*</span>
                  </label>
                  <textarea
                    {...register('message')}
                    rows={6}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-error">{errors.message.message}</p>
                  )}
                </div>

                {/* プライバシーポリシー */}
                <div>
                  <label className="flex items-start gap-2">
                    <input {...register('privacy')} type="checkbox" className="mt-1" />
                    <span className="text-sm">
                      <a href="/privacy" className="text-primary-600 underline">
                        プライバシーポリシー
                      </a>
                      に同意する <span className="text-error">*</span>
                    </span>
                  </label>
                  {errors.privacy && (
                    <p className="mt-1 text-sm text-error">{errors.privacy.message}</p>
                  )}
                </div>

                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? '送信中...' : '送信する'}
                </Button>
              </form>
            </div>

            {/* サイドバー - 連絡先情報 */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">お電話でのお問い合わせ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">03-1234-5678</p>
                      <p className="text-sm text-gray-600">平日 9:00-18:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">メールでのお問い合わせ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary-600 mt-0.5" />
                    <div>
                      <a
                        href="mailto:info@f-circle.com"
                        className="text-primary-600 hover:underline"
                      >
                        info@f-circle.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">本社所在地</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary-600 mt-0.5" />
                    <div className="text-sm">
                      <p>〒100-0001</p>
                      <p>東京都千代田区千代田1-1-1</p>
                      <p>F-Circleビル 10F</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
```

## ページ実装チェックリスト

### 各ページ共通

- [ ] MainLayout適用
- [ ] Breadcrumb実装
- [ ] レスポンシブ対応
- [ ] SEO metadata設定
- [ ] i18n対応
- [ ] アクセシビリティ確認

### サービスページ

- [ ] サービス一覧ページ
- [ ] サービス詳細ページ（5種類）
- [ ] 関連事例表示
- [ ] CTAセクション

### 事例ページ

- [ ] 事例一覧ページ
- [ ] フィルター機能（業種別）
- [ ] 事例詳細ページ
- [ ] 成果の可視化

### お知らせページ

- [ ] お知らせ一覧
- [ ] カテゴリフィルター
- [ ] お知らせ詳細
- [ ] MDX対応

### 企業情報・その他

- [ ] 企業情報ページ
- [ ] 採用情報ページ
- [ ] プライバシーポリシー
- [ ] セキュリティ方針

### お問い合わせ

- [ ] フォームバリデーション
- [ ] API送信
- [ ] reCAPTCHA
- [ ] サンクスページ
