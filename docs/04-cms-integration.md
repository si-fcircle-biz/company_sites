# 4️⃣ CMS統合ガイド

## CMS選定

**推奨: Contentful または MicroCMS**

### Contentful

**メリット:**
- エンタープライズグレード
- GraphQL API
- 豊富なウィジェット
- プレビュー機能充実

### MicroCMS

**メリット:**
- 日本語UI
- シンプルな料金体系
- 日本企業サポート
- API設計がわかりやすい

## コンテンツモデル設計（Contentful例）

### 1. Service（サービス）

```typescript
// contentful/types/service.ts
export interface ServiceEntry {
  fields: {
    slug: string;
    title: string;
    titleEn?: string;
    description: string;
    descriptionLong: RichTextDocument;
    icon: string;
    category: 'development' | 'infrastructure' | 'consulting' | 'operation' | 'data';
    heroImage: Asset;
    features: Feature[];
    benefits: Benefit[];
    process: ProcessStep[];
    relatedCaseStudies: Entry<CaseStudyEntry>[];
    faq: FAQ[];
    metaTitle: string;
    metaDescription: string;
    ogImage: Asset;
  };
}

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface Benefit {
  title: string;
  description: string;
  icon: string;
}

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration?: string;
}

interface FAQ {
  question: string;
  answer: string;
}
```

### 2. CaseStudy（導入事例）

```typescript
export interface CaseStudyEntry {
  fields: {
    slug: string;
    title: string;
    client: {
      name: string;
      industry: string;
      size: 'large' | 'medium' | 'small';
      logo?: Asset;
    };
    challenge: RichTextDocument;
    solution: RichTextDocument;
    results: Result[];
    period: {
      start: string;
      end?: string;
    };
    services: Entry<ServiceEntry>[];
    technologies: string[];
    heroImage: Asset;
    testimonial?: {
      quote: string;
      author: string;
      role: string;
      photo?: Asset;
    };
    metrics: Metric[];
    publishedAt: string;
  };
}

interface Result {
  label: string;
  value: string;
  description: string;
}

interface Metric {
  label: string;
  before: string;
  after: string;
  improvement: string;
}
```

### 3. News（お知らせ）

```typescript
export interface NewsEntry {
  fields: {
    slug: string;
    title: string;
    excerpt: string;
    content: RichTextDocument;
    category: 'press' | 'release' | 'event' | 'media' | 'ir';
    tags: string[];
    thumbnail?: Asset;
    publishedAt: string;
    updatedAt?: string;
  };
}
```

## Contentful SDK セットアップ

### 1. インストール

```bash
npm install contentful
npm install -D @contentful/rich-text-types
```

### 2. クライアント設定

```typescript
// src/lib/contentful.ts
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
  host: 'preview.contentful.com',
});

export function getClient(preview = false) {
  return preview ? previewClient : client;
}

// サービス取得
export async function getServices(preview = false) {
  const client = getClient(preview);
  const entries = await client.getEntries<ServiceEntry>({
    content_type: 'service',
    order: '-fields.publishedAt',
  });
  return entries.items;
}

// サービス詳細取得
export async function getService(slug: string, preview = false) {
  const client = getClient(preview);
  const entries = await client.getEntries<ServiceEntry>({
    content_type: 'service',
    'fields.slug': slug,
    limit: 1,
  });
  return entries.items[0] || null;
}

// 事例取得
export async function getCaseStudies(filters?: {
  industry?: string;
  service?: string;
  limit?: number;
}) {
  const client = getClient();
  const query: any = {
    content_type: 'caseStudy',
    order: '-fields.publishedAt',
  };

  if (filters?.industry) {
    query['fields.client.industry'] = filters.industry;
  }

  if (filters?.limit) {
    query.limit = filters.limit;
  }

  const entries = await client.getEntries<CaseStudyEntry>(query);
  return entries.items;
}

// ニュース取得
export async function getNews(filters?: {
  category?: string;
  limit?: number;
}) {
  const client = getClient();
  const query: any = {
    content_type: 'news',
    order: '-fields.publishedAt',
  };

  if (filters?.category) {
    query['fields.category'] = filters.category;
  }

  if (filters?.limit) {
    query.limit = filters.limit;
  }

  const entries = await client.getEntries<NewsEntry>(query);
  return entries.items;
}
```

### 3. Rich Text レンダリング

```typescript
// src/lib/rich-text.tsx
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import type { Document } from '@contentful/rich-text-types';
import Image from 'next/image';

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="mb-4 text-gray-700 ja-text">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: any) => (
      <h2 className="heading-lg mt-8 mb-4">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <h3 className="heading-md mt-6 mb-3">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="mb-4 list-disc list-inside space-y-2">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: any) => (
      <ol className="mb-4 list-decimal list-inside space-y-2">{children}</ol>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file, title } = node.data.target.fields;
      return (
        <div className="my-8">
          <Image
            src={`https:${file.url}`}
            alt={title || ''}
            width={file.details.image.width}
            height={file.details.image.height}
            className="rounded-lg"
          />
        </div>
      );
    },
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <a
        href={node.data.uri}
        className="text-primary-600 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export function renderRichText(document: Document) {
  return documentToReactComponents(document, options);
}
```

## ISR（Incremental Static Regeneration）設定

```typescript
// src/app/[locale]/services/[slug]/page.tsx
export const revalidate = 3600; // 1時間ごとに再生成

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({
    slug: service.fields.slug,
  }));
}

export default async function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const service = await getService(params.slug);
  // ...
}
```

## プレビューモード

### 1. プレビューAPI Route

```typescript
// src/app/api/preview/route.ts
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { getService } from '@/lib/contentful';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const contentType = searchParams.get('contentType');

  // シークレット検証
  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  // コンテンツ存在確認
  if (contentType === 'service') {
    const service = await getService(slug!, true);
    if (!service) {
      return new Response('Content not found', { status: 404 });
    }
  }

  // Draft Mode有効化
  draftMode().enable();

  // リダイレクト
  redirect(`/services/${slug}`);
}
```

### 2. プレビュー解除

```typescript
// src/app/api/disable-preview/route.ts
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET() {
  draftMode().disable();
  redirect('/');
}
```

## Webhook設定（自動再ビルド）

### Contentful → Vercel

1. Contentful Settings → Webhooks
2. Add Webhook
3. URL: `https://api.vercel.com/v1/integrations/deploy/{project-id}/{hook-id}`
4. Triggers: Publish, Unpublish, Delete

## 環境変数

```env
# .env.local
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token
CONTENTFUL_PREVIEW_SECRET=your_preview_secret
```

## チェックリスト

- [ ] CMSプラン契約
- [ ] コンテンツモデル作成
- [ ] Contentful SDK設定
- [ ] データ取得関数実装
- [ ] Rich Textレンダリング
- [ ] ISR設定
- [ ] プレビューモード実装
- [ ] Webhook設定
- [ ] 画像最適化
- [ ] エラーハンドリング
