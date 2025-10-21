# F-Circle 企業サイト

DX推進を加速するシステムインテグレーター「F-Circle」の企業サイト。

## 📋 プロジェクト概要

**技術スタック**
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- next-intl (i18n)
- Contentful/MicroCMS (CMS)
- Playwright (E2Eテスト)

**デザインコンセプト**
- 信頼性: 落ち着いた青系トーン
- 先進性: モダンなレイアウト
- 日本品質: 読みやすさ重視の日本語組版

## 🚀 クイックスタート

### 環境構築

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev
```

http://localhost:3000 でアクセス

### 環境変数設定

`.env.local` ファイルを作成:

```env
# サイトURL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Contentful
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token
CONTENTFUL_PREVIEW_SECRET=your_preview_secret

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

## 📁 プロジェクト構成

```
/
├── docs/                    # ドキュメント
│   ├── 00-project-overview.md
│   ├── 01-information-architecture.md
│   ├── 02-design-system.md
│   ├── 03-pages-implementation.md
│   ├── 04-cms-integration.md
│   ├── 05-seo-performance.md
│   └── 06-testing-cicd.md
├── messages/                # i18n翻訳
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # Reactコンポーネント
│   ├── lib/                 # ユーティリティ
│   ├── types/               # TypeScript型定義
│   ├── data/                # 静的データ
│   └── styles/              # グローバルスタイル
└── tests/                   # テスト
```

## 📚 ドキュメント

すべてのドキュメントは `docs/` ディレクトリに格納されています。

1. **プロジェクト概要** (`00-project-overview.md`)
2. **情報設計** (`01-information-architecture.md`)
3. **デザインシステム** (`02-design-system.md`)
4. **ページ実装** (`03-pages-implementation.md`)
5. **CMS統合** (`04-cms-integration.md`)
6. **SEO・パフォーマンス** (`05-seo-performance.md`)
7. **テスト・CI/CD** (`06-testing-cicd.md`)

## 🎨 デザインシステム

### カラーパレット
- プライマリ: `#0070f3` (信頼の青)
- セカンダリ: `#06b6d4` (先進性のシアン)

### タイポグラフィ
- 欧文: Inter
- 和文: Noto Sans JP
- 行間: 1.7（日本語最適化）

## 🌐 多言語対応

- 日本語 (`/`)
- 英語 (`/en/`)

## 🧪 テスト

```bash
npm run test:e2e    # E2Eテスト
npm run type-check  # 型チェック
npm run lint        # リント
```

## 📦 ビルド・デプロイ

```bash
npm run build  # 本番ビルド
npm start      # 本番サーバー
```

## 🎯 パフォーマンス目標

- LCP < 2.5s
- Lighthouse Score > 90
- WCAG 2.1 Level AA準拠

## 📄 主要ページ

### 実装済み
- ✅ ホーム
- ✅ ヘッダー・フッター・Sticky CTA

### 実装予定
- ⏳ サービス一覧・詳細
- ⏳ 導入事例一覧・詳細
- ⏳ お知らせ一覧・詳細
- ⏳ 企業情報・採用情報
- ⏳ お問い合わせフォーム

## 📝 ライセンス

Proprietary - F-Circle Inc.

---

**最終更新**: 2024年10月