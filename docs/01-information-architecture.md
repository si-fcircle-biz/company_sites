# 1️⃣ 情報設計ドキュメント

## サイトマップ

```
/                          ホーム
├── /services              サービス一覧
│   ├── /app-development   アプリケーション開発
│   ├── /cloud-migration   クラウド移行
│   ├── /data-analytics    データ分析
│   ├── /system-operation  運用保守
│   └── /consulting        コンサルティング
├── /industries            業種別ソリューション
│   ├── /finance           金融
│   ├── /manufacturing     製造
│   ├── /retail            流通
│   ├── /public            公共
│   └── /telecom           通信
├── /case-studies          導入事例一覧
│   └── /[slug]            事例詳細
├── /news                  お知らせ一覧
│   └── /[slug]            ニュース詳細
├── /about                 企業情報
│   ├── #mission           ミッション
│   ├── #history           沿革
│   ├── #offices           拠点情報
│   └── #certifications    認証・資格
├── /careers               採用情報
│   ├── #culture           企業文化
│   ├── #positions         募集職種
│   └── #benefits          福利厚生
├── /contact               お問い合わせ
│   └── /thanks            送信完了
├── /privacy               プライバシーポリシー
├── /security              情報セキュリティ方針
├── /sitemap.xml           XMLサイトマップ
└── /robots.txt            robots.txt
```

## URL設計規約

### 原則
- 小文字 + ハイフン区切り（kebab-case）
- 複数形は英語の慣例に従う（services, studies, news）
- 階層は最大3階層まで
- トレイリングスラッシュなし
- 日本語URLは使用しない

### パターン

| パターン | 例 | 用途 |
|---------|-----|------|
| `/` | `/` | トップページ |
| `/[resource]` | `/services`, `/news` | 一覧ページ |
| `/[resource]/[slug]` | `/services/cloud-migration` | 詳細ページ |
| `/[resource]/[category]/[slug]` | `/case-studies/finance/case-001` | カテゴリ付き詳細 |

### 言語対応URL
- `/ja/` (日本語) - デフォルト
- `/en/` (英語)

例: `/en/services/cloud-migration`

## ナビゲーション設計

### グローバルナビゲーション（PC: メガメニュー / Mobile: アコーディオン）

```typescript
const navigation = [
  {
    label: 'サービス',
    href: '/services',
    megaMenu: {
      featured: {
        title: 'DXを加速するトータルソリューション',
        items: [
          { label: 'アプリケーション開発', href: '/services/app-development', icon: 'Code' },
          { label: 'クラウド移行支援', href: '/services/cloud-migration', icon: 'Cloud' },
          { label: 'データ分析・活用', href: '/services/data-analytics', icon: 'BarChart' },
          { label: '運用保守サービス', href: '/services/system-operation', icon: 'Shield' },
          { label: 'ITコンサルティング', href: '/services/consulting', icon: 'Briefcase' }
        ]
      },
      cta: { label: 'サービス資料請求', href: '/contact?type=document' }
    }
  },
  {
    label: '業種別',
    href: '/industries',
    megaMenu: {
      items: [
        { label: '金融', href: '/industries/finance' },
        { label: '製造', href: '/industries/manufacturing' },
        { label: '流通', href: '/industries/retail' },
        { label: '公共', href: '/industries/public' },
        { label: '通信', href: '/industries/telecom' }
      ]
    }
  },
  { label: '導入事例', href: '/case-studies' },
  { label: 'お知らせ', href: '/news' },
  { label: '企業情報', href: '/about' },
  { label: '採用情報', href: '/careers' }
]
```

### フッターナビゲーション

```typescript
const footerNavigation = [
  {
    title: 'サービス',
    links: [
      { label: 'アプリケーション開発', href: '/services/app-development' },
      { label: 'クラウド移行', href: '/services/cloud-migration' },
      { label: 'データ分析', href: '/services/data-analytics' },
      { label: '運用保守', href: '/services/system-operation' },
      { label: 'コンサルティング', href: '/services/consulting' }
    ]
  },
  {
    title: '業種別ソリューション',
    links: [
      { label: '金融', href: '/industries/finance' },
      { label: '製造', href: '/industries/manufacturing' },
      { label: '流通', href: '/industries/retail' },
      { label: '公共', href: '/industries/public' },
      { label: '通信', href: '/industries/telecom' }
    ]
  },
  {
    title: '企業情報',
    links: [
      { label: '会社概要', href: '/about' },
      { label: '導入事例', href: '/case-studies' },
      { label: 'お知らせ', href: '/news' },
      { label: '採用情報', href: '/careers' }
    ]
  },
  {
    title: 'サポート',
    links: [
      { label: 'お問い合わせ', href: '/contact' },
      { label: 'プライバシーポリシー', href: '/privacy' },
      { label: 'セキュリティ方針', href: '/security' }
    ]
  }
]
```

## CTA設計

### CTAタイプ

1. **主CTA（Primary）**: お問い合わせ
2. **副CTA（Secondary）**: 資料請求
3. **補助CTA（Tertiary）**: 採用情報、事例閲覧

### CTA配置戦略

| ページ | Hero CTA | Section CTA | Sticky CTA | Footer CTA |
|--------|----------|-------------|------------|------------|
| ホーム | お問い合わせ + 資料請求 | サービス別CTA | 常時表示 | お問い合わせ |
| サービス詳細 | お問い合わせ | 事例へ誘導 | 常時表示 | お問い合わせ |
| 事例詳細 | 類似事例 | お問い合わせ | 常時表示 | お問い合わせ |
| 企業情報 | 採用情報 | - | お問い合わせ | お問い合わせ |

### Sticky CTA バー仕様
- 位置: 画面下部固定
- 表示タイミング: ファーストビュー通過後
- デバイス: 全デバイス対応
- 内容: 「お問い合わせ」「資料請求」ボタン

## コンテンツモデル

### Service（サービス）

```typescript
interface Service {
  id: string
  slug: string
  title: string
  titleEn?: string
  description: string
  descriptionLong: string
  icon: string
  category: 'development' | 'infrastructure' | 'consulting' | 'operation' | 'data'
  heroImage: Image
  features: Feature[]
  benefits: Benefit[]
  process: ProcessStep[]
  relatedCaseStudies: CaseStudy[]
  relatedIndustries: Industry[]
  faq: FAQ[]
  ctaText: string
  ctaLink: string
  metadata: {
    metaTitle: string
    metaDescription: string
    ogImage: string
  }
  publishedAt: Date
  updatedAt: Date
}
```

### CaseStudy（導入事例）

```typescript
interface CaseStudy {
  id: string
  slug: string
  title: string
  client: {
    name: string // 匿名可: "大手金融機関A社"
    industry: Industry
    size: 'large' | 'medium' | 'small'
    logo?: Image
  }
  challenge: string // 課題
  solution: string // 提供ソリューション
  results: Result[] // 成果
  period: {
    start: Date
    end?: Date
  }
  services: Service[] // 利用サービス
  technologies: Technology[] // 使用技術
  heroImage: Image
  testimonial?: {
    quote: string
    author: string
    role: string
    photo?: Image
  }
  metrics: Metric[] // 定量的成果
  metadata: SEOMetadata
  publishedAt: Date
}

interface Result {
  label: string
  value: string // "50%削減", "3ヶ月で稼働"
  description: string
}

interface Metric {
  label: string
  before: string
  after: string
  improvement: string
}
```

### News（お知らせ）

```typescript
interface News {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string // MDX
  category: 'press' | 'release' | 'event' | 'media' | 'ir'
  tags: string[]
  thumbnail?: Image
  publishedAt: Date
  updatedAt?: Date
  author?: Author
  metadata: SEOMetadata
}
```

### Industry（業種別ソリューション）

```typescript
interface Industry {
  id: string
  slug: string
  name: string
  nameEn: string
  description: string
  heroImage: Image
  challenges: Challenge[] // 業界特有の課題
  solutions: IndustrySolution[] // 業界向けソリューション
  caseStudies: CaseStudy[]
  relatedServices: Service[]
  statistics: Statistic[]
  metadata: SEOMetadata
}

interface Challenge {
  title: string
  description: string
  icon: string
}

interface IndustrySolution {
  title: string
  description: string
  services: Service[]
}

interface Statistic {
  label: string
  value: string
  description: string
}
```

### Job（採用情報）

```typescript
interface Job {
  id: string
  slug: string
  title: string
  department: string
  location: string[]
  employmentType: 'full-time' | 'contract' | 'part-time'
  description: string
  responsibilities: string[]
  requirements: string[]
  preferred: string[]
  benefits: string[]
  salary?: {
    min: number
    max: number
    currency: string
  }
  applicationUrl: string
  publishedAt: Date
  closingDate?: Date
}
```

### Common Types

```typescript
interface Image {
  url: string
  alt: string
  width: number
  height: number
  blurDataURL?: string
}

interface SEOMetadata {
  metaTitle: string
  metaDescription: string
  ogImage: string
  keywords?: string[]
  canonicalUrl?: string
}

interface Feature {
  title: string
  description: string
  icon: string
}

interface ProcessStep {
  step: number
  title: string
  description: string
  duration?: string
}

interface FAQ {
  question: string
  answer: string
}
```

## 検索・フィルター仕様

### 導入事例フィルター
- 業種別（Industry）
- サービス別（Service）
- 企業規模別（Company Size）
- ソート: 新着順、関連度順

### ニュースフィルター
- カテゴリ別（press, release, event, media, ir）
- タグ別
- 年別
- ソート: 新着順

### 採用情報フィルター
- 職種別（Department）
- 勤務地別（Location）
- 雇用形態別（Employment Type）

## パンくずリスト設計

```typescript
// 例: /services/cloud-migration
[
  { label: 'ホーム', href: '/' },
  { label: 'サービス', href: '/services' },
  { label: 'クラウド移行支援', href: '/services/cloud-migration' }
]

// 例: /case-studies/finance-case-001
[
  { label: 'ホーム', href: '/' },
  { label: '導入事例', href: '/case-studies' },
  { label: '大手金融機関A社の事例', href: '/case-studies/finance-case-001' }
]
```

## 成果物チェックリスト

- [x] サイトマップ構造定義
- [x] URL規約策定
- [x] ナビゲーション設計（グローバル/フッター/メガメニュー）
- [x] CTA配置戦略
- [x] コンテンツモデル定義（Service/CaseStudy/News/Industry/Job）
- [x] 検索・フィルター仕様
- [x] パンくずリスト設計
- [x] 共通型定義
