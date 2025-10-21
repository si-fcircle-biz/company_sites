# 5️⃣ SEO・パフォーマンス最適化

## SEO対応

### 1. Metadata設定

```typescript
// src/app/[locale]/services/[slug]/page.tsx
import { Metadata } from 'next';
import { getService } from '@/lib/contentful';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await getService(params.slug);

  if (!service) {
    return {
      title: 'Not Found',
    };
  }

  const { title, metaDescription, ogImage } = service.fields;

  return {
    title: `${title} | F-Circle`,
    description: metaDescription,
    openGraph: {
      title: `${title} | F-Circle`,
      description: metaDescription,
      url: `https://f-circle.com/services/${params.slug}`,
      siteName: 'F-Circle',
      images: [
        {
          url: `https:${ogImage.fields.file.url}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'ja_JP',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | F-Circle`,
      description: metaDescription,
      images: [`https:${ogImage.fields.file.url}`],
    },
    alternates: {
      canonical: `https://f-circle.com/services/${params.slug}`,
      languages: {
        'ja-JP': `/ja/services/${params.slug}`,
        'en-US': `/en/services/${params.slug}`,
      },
    },
  };
}
```

### 2. 構造化データ（JSON-LD）

```typescript
// src/components/structured-data/organization.tsx
export function OrganizationStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'F-Circle Inc.',
    url: 'https://f-circle.com',
    logo: 'https://f-circle.com/logo.png',
    description: 'DX推進を加速するシステムインテグレーター',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '千代田区千代田1-1-1 F-Circleビル 10F',
      addressLocality: '東京都',
      postalCode: '100-0001',
      addressCountry: 'JP',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+81-3-1234-5678',
      contactType: 'customer service',
      areaServed: 'JP',
      availableLanguage: ['Japanese', 'English'],
    },
    sameAs: [
      'https://twitter.com/fcircle',
      'https://www.linkedin.com/company/fcircle',
      'https://www.facebook.com/fcircle',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

```typescript
// src/components/structured-data/article.tsx
interface ArticleStructuredDataProps {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  image: string;
  author?: string;
}

export function ArticleStructuredData({
  title,
  description,
  publishedAt,
  updatedAt,
  image,
  author = 'F-Circle Inc.',
}: ArticleStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'F-Circle Inc.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://f-circle.com/logo.png',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

```typescript
// src/components/structured-data/breadcrumb.tsx
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbStructuredData({ items }: { items: BreadcrumbItem[] }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

### 3. sitemap.xml生成

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { getServices, getCaseStudies, getNews } from '@/lib/contentful';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://f-circle.com';

  const services = await getServices();
  const caseStudies = await getCaseStudies();
  const news = await getNews();

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service.fields.slug}`,
    lastModified: new Date(service.sys.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const caseStudyPages = caseStudies.map((caseStudy) => ({
    url: `${baseUrl}/case-studies/${caseStudy.fields.slug}`,
    lastModified: new Date(caseStudy.sys.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const newsPages = news.map((item) => ({
    url: `${baseUrl}/news/${item.fields.slug}`,
    lastModified: new Date(item.sys.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...servicePages,
    ...caseStudyPages,
    ...newsPages,
  ];
}
```

### 4. robots.txt

```typescript
// src/app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/_next/'],
    },
    sitemap: 'https://f-circle.com/sitemap.xml',
  };
}
```

### 5. OG画像動的生成

```typescript
// src/app/[locale]/services/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og';
import { getService } from '@/lib/contentful';

export const runtime = 'edge';
export const alt = 'F-Circle Service';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const service = await getService(params.slug);

  if (!service) {
    return new ImageResponse(<div>Not Found</div>);
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #0070f3, #004799)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          {service.fields.title}
        </div>
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center',
            maxWidth: '80%',
          }}
        >
          {service.fields.description}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 60,
            fontSize: 28,
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          F-Circle
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
```

## パフォーマンス最適化

### 1. 画像最適化

```typescript
// next.config.mjs
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
  },
};
```

### 2. フォント最適化

```typescript
// src/app/[locale]/layout.tsx
import { Inter, Noto_Sans_JP } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'],
});
```

### 3. Dynamic Import

```typescript
// 重いコンポーネントは動的インポート
import dynamic from 'next/dynamic';

const ContactForm = dynamic(() => import('@/components/contact-form'), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});
```

### 4. Bundle分析

```bash
npm install @next/bundle-analyzer
```

```javascript
// next.config.mjs
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
```

```bash
ANALYZE=true npm run build
```

## Lighthouse CI設定

### 1. インストール

```bash
npm install -D @lhci/cli
```

### 2. 設定ファイル

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/services',
        'http://localhost:3000/case-studies',
        'http://localhost:3000/contact',
      ],
      numberOfRuns: 3,
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

### 3. GitHub Actions統合

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lhci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - run: npx @lhci/cli@0.12.x autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

## Web Vitals測定

```typescript
// src/app/[locale]/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
```

## SEO チェックリスト

- [ ] 各ページにユニークなtitle/description
- [ ] OGP設定（Open Graph Protocol）
- [ ] Twitter Card設定
- [ ] 構造化データ実装（Organization, Article, Breadcrumb）
- [ ] sitemap.xml生成
- [ ] robots.txt設定
- [ ] canonical URL設定
- [ ] 多言語対応（hreflang）
- [ ] 画像にalt属性
- [ ] セマンティックHTML
- [ ] 見出し階層正しい（h1→h2→h3）
- [ ] 内部リンク最適化
- [ ] モバイルフレンドリー

## パフォーマンス チェックリスト

- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] 画像最適化（WebP/AVIF）
- [ ] フォント最適化
- [ ] コード分割
- [ ] ISR/SSG活用
- [ ] CDN活用（Vercel Edge）
- [ ] Gzip/Brotli圧縮
- [ ] Critical CSS
- [ ] Lazy loading
- [ ] Bundle サイズ最適化
