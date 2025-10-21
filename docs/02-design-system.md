# 2️⃣ デザインシステム

## デザインコンセプト

**信頼 × 先進性 × 日本品質**

- NTTデータのような落ち着いた青系トーンで企業の信頼感を表現
- モダンなレイアウトで先進的な技術力をアピール
- 読みやすさ重視の日本語組版

## カラーシステム

### プライマリカラー（ブルー系）

```typescript
// 企業ブルー - 信頼・安定・先進性を表現
const primary = {
  50: '#e6f1ff',   // 背景・ハイライト
  100: '#b3d9ff',  // ホバー
  200: '#80c1ff',  // アクセント淡
  300: '#4da9ff',  //
  400: '#1a91ff',  //
  500: '#0070f3',  // メインブランドカラー
  600: '#005cc5',  // ボタン・リンク
  700: '#004799',  // ボタンホバー
  800: '#00336e',  //
  900: '#001f42',  // ダークテキスト
  950: '#001229',  // 最暗部
}
```

### セカンダリカラー（アクセント）

```typescript
const secondary = {
  cyan: {
    400: '#22d3ee',  // アイコン・グラフ
    500: '#06b6d4',
    600: '#0891b2',
  },
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  }
}
```

### セマンティックカラー

```typescript
const semantic = {
  success: {
    light: '#d1fae5',
    DEFAULT: '#10b981',
    dark: '#047857',
  },
  warning: {
    light: '#fef3c7',
    DEFAULT: '#f59e0b',
    dark: '#d97706',
  },
  error: {
    light: '#fee2e2',
    DEFAULT: '#ef4444',
    dark: '#dc2626',
  },
  info: {
    light: '#dbeafe',
    DEFAULT: '#3b82f6',
    dark: '#2563eb',
  }
}
```

### グレースケール（本文・背景）

```typescript
const grayscale = {
  white: '#ffffff',
  gray: {
    50: '#fafafa',   // 背景
    100: '#f5f5f5',  // カード背景
    200: '#e5e5e5',  // ボーダー
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',  // 補助テキスト
    600: '#525252',
    700: '#404040',  // 本文
    800: '#262626',  // 見出し
    900: '#171717',  // 強調見出し
  },
  black: '#000000',
}
```

## タイポグラフィ

### フォントファミリー

```css
/* 日本語 */
--font-ja: 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3',
           Meiryo, メイリオ, sans-serif;

/* 英数字 */
--font-en: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* コード */
--font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
```

### タイプスケール

```typescript
const typography = {
  // Display - ヒーローセクション
  'display-lg': {
    fontSize: '3.75rem',    // 60px
    lineHeight: '1.2',
    fontWeight: '700',
    letterSpacing: '-0.02em',
  },
  'display-md': {
    fontSize: '3rem',       // 48px
    lineHeight: '1.2',
    fontWeight: '700',
    letterSpacing: '-0.01em',
  },

  // Heading - セクション見出し
  'heading-xl': {
    fontSize: '2.25rem',    // 36px
    lineHeight: '1.3',
    fontWeight: '700',
  },
  'heading-lg': {
    fontSize: '1.875rem',   // 30px
    lineHeight: '1.35',
    fontWeight: '700',
  },
  'heading-md': {
    fontSize: '1.5rem',     // 24px
    lineHeight: '1.4',
    fontWeight: '600',
  },
  'heading-sm': {
    fontSize: '1.25rem',    // 20px
    lineHeight: '1.5',
    fontWeight: '600',
  },

  // Body - 本文
  'body-lg': {
    fontSize: '1.125rem',   // 18px
    lineHeight: '1.7',      // 日本語最適
    fontWeight: '400',
  },
  'body-md': {
    fontSize: '1rem',       // 16px
    lineHeight: '1.7',
    fontWeight: '400',
  },
  'body-sm': {
    fontSize: '0.875rem',   // 14px
    lineHeight: '1.6',
    fontWeight: '400',
  },

  // Label - UI要素
  'label-lg': {
    fontSize: '0.875rem',   // 14px
    lineHeight: '1.5',
    fontWeight: '600',
  },
  'label-md': {
    fontSize: '0.8125rem',  // 13px
    lineHeight: '1.5',
    fontWeight: '600',
  },
  'label-sm': {
    fontSize: '0.75rem',    // 12px
    lineHeight: '1.5',
    fontWeight: '600',
  },
}
```

### 日本語組版設定

```css
.ja-text {
  font-feature-settings: 'palt' 1; /* プロポーショナルメトリクス */
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  word-break: break-word;
  overflow-wrap: break-word;
  hanging-punctuation: allow-end; /* 句読点ぶら下げ */
}
```

## スペーシングシステム

```typescript
const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  8: '2rem',        // 32px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  32: '8rem',       // 128px
  40: '10rem',      // 160px

  // セクション用
  'section-sm': '3rem',    // 48px
  'section-md': '5rem',    // 80px
  'section-lg': '7rem',    // 112px
  'section-xl': '10rem',   // 160px
}
```

## レイアウト

### コンテナ

```typescript
const containers = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',  // メインコンテンツ最大幅
  full: '100%',
}
```

### ブレークポイント

```typescript
const breakpoints = {
  sm: '640px',   // モバイル横
  md: '768px',   // タブレット縦
  lg: '1024px',  // タブレット横・小型PC
  xl: '1280px',  // PC
  '2xl': '1536px', // 大型PC
}
```

## ボーダーラディウス

```typescript
const borderRadius = {
  none: '0',
  sm: '0.25rem',   // 4px - 小さなボタン・バッジ
  DEFAULT: '0.5rem',  // 8px - カード・ボタン
  md: '0.75rem',   // 12px - 大きめのカード
  lg: '1rem',      // 16px - モーダル
  xl: '1.5rem',    // 24px - 特大カード
  '2xl': '2rem',   // 32px - ヒーローセクション
  full: '9999px',  // 完全な円形
}
```

## シャドウシステム

```typescript
const shadows = {
  // エレベーション0-4
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

  // ブランドシャドウ（ブルー系）
  'primary': '0 10px 40px -10px rgba(0, 112, 243, 0.3)',
  'primary-lg': '0 20px 60px -15px rgba(0, 112, 243, 0.4)',
}
```

## アニメーション

```typescript
const animations = {
  // イージング
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },

  // デュレーション
  duration: {
    fast: '150ms',
    base: '250ms',
    slow: '350ms',
    slower: '500ms',
  },

  // プリセット
  transitions: {
    all: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
    colors: 'color 250ms, background-color 250ms, border-color 250ms',
    transform: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
  }
}
```

## Tailwind CSS 設定

```javascript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f1ff',
          100: '#b3d9ff',
          200: '#80c1ff',
          300: '#4da9ff',
          400: '#1a91ff',
          500: '#0070f3',
          600: '#005cc5',
          700: '#004799',
          800: '#00336e',
          900: '#001f42',
          950: '#001229',
        },
        secondary: {
          cyan: {
            400: '#22d3ee',
            500: '#06b6d4',
            600: '#0891b2',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'sans-serif'],
        ja: ['Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        'display-lg': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-xl': ['2.25rem', { lineHeight: '1.3', fontWeight: '700' }],
        'heading-lg': ['1.875rem', { lineHeight: '1.35', fontWeight: '700' }],
        'heading-md': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.5', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body-md': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
      },
      spacing: {
        'section-sm': '3rem',
        'section-md': '5rem',
        'section-lg': '7rem',
        'section-xl': '10rem',
      },
      boxShadow: {
        'primary': '0 10px 40px -10px rgba(0, 112, 243, 0.3)',
        'primary-lg': '0 20px 60px -15px rgba(0, 112, 243, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
}
```

## shadcn/ui コンポーネント一覧

### 導入するコンポーネント

```bash
# レイアウト・ナビゲーション
npx shadcn-ui@latest add navigation-menu
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add separator

# カード・コンテンツ表示
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add avatar

# フォーム
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add select
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add radio-group
npx shadcn-ui@latest add button

# フィードバック
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add skeleton

# オーバーレイ
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add popover

# その他
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add breadcrumb
```

## アクセシビリティポリシー

### WCAG 2.1 Level AA 準拠

#### カラーコントラスト
- 本文: 最低4.5:1
- 大きな文字(18pt以上): 最低3:1
- UI要素: 最低3:1

#### キーボード操作
- すべてのインタラクティブ要素にフォーカス可能
- Tab順序は論理的な流れ
- フォーカスインジケーター明確

#### スクリーンリーダー
- セマンティックHTML使用
- ARIA属性適切に配置
- 画像に代替テキスト必須

#### レスポンシブ
- 320px幅から対応
- テキストズーム200%対応
- タッチターゲット最小44×44px

### 実装チェックリスト

```typescript
// アクセシビリティチェック項目
const a11yChecklist = [
  'セマンティックHTML（header, nav, main, article, aside, footer）',
  'ランドマークロール適切に配置',
  'heading階層（h1→h2→h3）正しい',
  'フォーム要素にlabel紐付け',
  'ボタンに適切なaria-label',
  'リンクテキスト意味のある内容',
  'フォーカス管理（モーダル・メガメニュー）',
  'カラーだけに依存しない情報伝達',
  'エラーメッセージ明確',
  'ライブリージョン（トースト通知）',
]
```

## 成果物チェックリスト

- [x] カラーシステム定義（プライマリ・セカンダリ・セマンティック）
- [x] タイポグラフィスケール設定
- [x] 日本語組版設定
- [x] スペーシングシステム
- [x] レイアウト・ブレークポイント
- [x] ボーダーラディウス
- [x] シャドウシステム
- [x] アニメーション設定
- [x] Tailwind CSS theme.extend設定
- [x] shadcn/uiコンポーネント一覧
- [x] アクセシビリティポリシー
