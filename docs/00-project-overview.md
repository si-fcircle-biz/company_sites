# F-Circle 企業サイト 総合ドキュメント

## プロジェクト概要

F-CircleのSIer企業向け企業サイト。NTTデータを参考にした、信頼感と先進性を兼ね備えたデザイン。

### 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **UIコンポーネント**: shadcn/ui (Radix UI)
- **国際化**: next-intl
- **フォーム**: React Hook Form + Zod
- **アイコン**: Lucide React
- **テスト**: Playwright + Testing Library
- **デプロイ**: Vercel

## ディレクトリ構成

```
/home/user/company_sites/
├── docs/                          # プロジェクトドキュメント
│   ├── 00-project-overview.md     # 総合概要（本ファイル）
│   ├── 01-information-architecture.md  # 情報設計
│   ├── 02-design-system.md        # デザインシステム
│   └── ...
├── messages/                      # i18n翻訳ファイル
│   ├── ja.json                    # 日本語
│   └── en.json                    # 英語
├── src/
│   ├── app/                       # Next.js App Router
│   │   └── [locale]/              # 言語別ルーティング
│   │       ├── layout.tsx         # ルートレイアウト
│   │       ├── page.tsx           # ホームページ
│   │       ├── services/          # サービスページ
│   │       ├── case-studies/      # 導入事例
│   │       ├── news/              # お知らせ
│   │       ├── about/             # 企業情報
│   │       ├── careers/           # 採用情報
│   │       ├── contact/           # お問い合わせ
│   │       └── ...
│   ├── components/                # Reactコンポーネント
│   │   ├── ui/                    # shadcn/ui基本コンポーネント
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   └── ...
│   │   ├── layout/                # レイアウトコンポーネント
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── main-layout.tsx
│   │   │   ├── sticky-cta.tsx
│   │   │   └── breadcrumb.tsx
│   │   └── sections/              # セクションコンポーネント
│   │       ├── hero.tsx
│   │       ├── service-card.tsx
│   │       ├── case-study-card.tsx
│   │       └── news-card.tsx
│   ├── lib/                       # ユーティリティ関数
│   │   └── utils.ts
│   ├── types/                     # TypeScript型定義
│   │   └── index.ts
│   ├── data/                      # 静的データ（後でCMSに移行）
│   │   ├── services.ts
│   │   ├── case-studies.ts
│   │   └── news.ts
│   ├── styles/                    # グローバルスタイル
│   │   └── globals.css
│   ├── i18n.ts                    # i18n設定
│   └── middleware.ts              # Next.js middleware
├── public/                        # 静的ファイル
│   ├── images/
│   ├── og-image.png
│   └── ...
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
├── components.json                # shadcn/ui設定
└── README.md

```

## 実装済み機能

### ✅ 完了項目

1. **情報設計**
   - サイトマップ定義
   - URL規約策定
   - ナビゲーション設計
   - コンテンツモデル定義

2. **デザインシステム**
   - カラーパレット（青系主軸）
   - タイポグラフィスケール
   - スペーシングシステム
   - Tailwind CSS theme設定
   - 日本語組版最適化

3. **Next.jsプロジェクト基盤**
   - App Router構成
   - TypeScript設定
   - ESLint/Prettier設定
   - i18n設定（日本語/英語）

4. **UIコンポーネント**
   - Button, Card, Badge (shadcn/ui)
   - Header（スクロール時変化、モバイル対応）
   - Footer
   - Sticky CTAバー
   - Breadcrumb
   - Hero
   - ServiceCard
   - CaseStudyCard
   - NewsCard

5. **ページ実装**
   - ホームページ（完全実装）
     - ヒーローセクション
     - 数字で見るF-Circle
     - サービス一覧
     - 導入事例
     - お知らせ
     - CTAセクション

### 🚧 次のステップ（実装推奨）

1. **残りのページ**
   - `/services` - サービス一覧
   - `/services/[slug]` - サービス詳細
   - `/case-studies` - 事例一覧
   - `/case-studies/[slug]` - 事例詳細
   - `/news` - お知らせ一覧
   - `/news/[slug]` - お知らせ詳細
   - `/about` - 企業情報
   - `/careers` - 採用情報
   - `/contact` - お問い合わせフォーム
   - `/privacy`, `/security` - 法務ページ

2. **お問い合わせフォーム**
   - React Hook Form + Zod バリデーション
   - reCAPTCHA統合
   - API Route実装
   - サンクスページ

3. **CMS統合**
   - Contentful or MicroCMS接続
   - コンテンツ型定義
   - ISR設定
   - プレビューモード

4. **SEO対応**
   - sitemap.xml生成
   - robots.txt
   - 構造化データ（JSON-LD）
   - OG画像動的生成

5. **テスト**
   - Playwright E2Eテスト
   - Testing Library コンポーネントテスト
   - Lighthouse CI

6. **CI/CD**
   - GitHub Actions設定
   - Vercelデプロイ設定
   - 環境変数管理

## クイックスタート

### 依存関係のインストール

```bash
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

http://localhost:3000 でアクセス

### ビルド

```bash
npm run build
npm start
```

### リント・フォーマット

```bash
npm run lint
npm run format
```

## 環境変数

`.env.local` を作成:

```env
# サイトURL
NEXT_PUBLIC_SITE_URL=https://f-circle.com

# CMS (後で追加)
# CONTENTFUL_SPACE_ID=
# CONTENTFUL_ACCESS_TOKEN=
# CONTENTFUL_PREVIEW_ACCESS_TOKEN=

# フォーム送信
# FORM_WEBHOOK_URL=

# reCAPTCHA
# NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
# RECAPTCHA_SECRET_KEY=
```

## デザインコンセプト

### カラーパレット

- **プライマリ**: `#0070f3` (信頼の青)
- **セカンダリ**: `#06b6d4` (先進性のシアン)
- **グレースケール**: 高コントラストで読みやすさ重視

### タイポグラフィ

- **欧文**: Inter
- **和文**: Noto Sans JP
- **行間**: 1.7（日本語最適化）

### レスポンシブブレークポイント

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## アクセシビリティ

- WCAG 2.1 Level AA準拠
- セマンティックHTML
- キーボードナビゲーション対応
- スクリーンリーダー対応
- カラーコントラスト4.5:1以上

## パフォーマンス目標

- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Lighthouse Score > 90

## ブラウザサポート

- Chrome (最新2バージョン)
- Firefox (最新2バージョン)
- Safari (最新2バージョン)
- Edge (最新2バージョン)

## ライセンス

Proprietary - F-Circle Inc.

## サポート

技術的な質問は開発チームまで。
