# 6️⃣ テスト・CI/CD

## テスト戦略

### テストピラミッド

```
         /\
        /  \  E2E (Playwright)
       /____\
      /      \  Integration
     /________\
    /          \  Unit (Jest)
   /____________\
```

## Playwright E2Eテスト

### 1. セットアップ

```bash
npm install -D @playwright/test
npx playwright install
```

### 2. 設定ファイル

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### 3. テストケース例

```typescript
// tests/e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test.describe('ホームページ', () => {
  test('正しくレンダリングされる', async ({ page }) => {
    await page.goto('/');

    // タイトル確認
    await expect(page).toHaveTitle(/F-Circle/);

    // ヒーロー表示確認
    const hero = page.getByRole('heading', { level: 1 });
    await expect(hero).toBeVisible();

    // CTAボタン確認
    const ctaButton = page.getByRole('link', { name: 'お問い合わせ' });
    await expect(ctaButton).toBeVisible();
  });

  test('サービスセクションが表示される', async ({ page }) => {
    await page.goto('/');

    // サービスカード確認
    const serviceCards = page.getByText('アプリケーション開発');
    await expect(serviceCards).toBeVisible();
  });

  test('Sticky CTAが表示される', async ({ page }) => {
    await page.goto('/');

    // スクロール前は非表示
    const stickyCTA = page.getByRole('link', { name: /資料請求/ });
    await expect(stickyCTA).not.toBeVisible();

    // スクロール後に表示
    await page.evaluate(() => window.scrollTo(0, 1000));
    await expect(stickyCTA).toBeVisible();
  });
});
```

```typescript
// tests/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('ナビゲーション', () => {
  test('ヘッダーナビゲーションが機能する', async ({ page }) => {
    await page.goto('/');

    // サービスリンククリック
    await page.getByRole('link', { name: 'サービス' }).click();
    await expect(page).toHaveURL(/\/services/);
  });

  test('モバイルメニューが機能する', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // ハンバーガーメニュー開く
    await page.getByRole('button', { name: 'メニュー' }).click();

    // メニュー項目確認
    const menuItem = page.getByRole('link', { name: 'サービス' });
    await expect(menuItem).toBeVisible();
  });

  test('パンくずリストが表示される', async ({ page }) => {
    await page.goto('/services/cloud-migration');

    const breadcrumb = page.getByRole('navigation', { name: 'パンくずリスト' });
    await expect(breadcrumb).toBeVisible();
  });
});
```

```typescript
// tests/e2e/contact-form.spec.ts
import { test, expect } from '@playwright/test';

test.describe('お問い合わせフォーム', () => {
  test('フォームが送信できる', async ({ page }) => {
    await page.goto('/contact');

    // フォーム入力
    await page.selectOption('select[name="type"]', 'inquiry');
    await page.fill('input[name="companyName"]', 'テスト株式会社');
    await page.fill('input[name="name"]', '山田太郎');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="subject"]', 'テスト問い合わせ');
    await page.fill('textarea[name="message"]', 'これはテストメッセージです。'.repeat(5));
    await page.check('input[name="privacy"]');

    // 送信
    await page.getByRole('button', { name: '送信する' }).click();

    // サンクスページ確認
    await expect(page.getByText('送信完了')).toBeVisible();
  });

  test('バリデーションエラーが表示される', async ({ page }) => {
    await page.goto('/contact');

    // 空で送信
    await page.getByRole('button', { name: '送信する' }).click();

    // エラーメッセージ確認
    await expect(page.getByText('会社名を入力してください')).toBeVisible();
  });
});
```

```typescript
// tests/e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('アクセシビリティ', () => {
  test('ホームページにa11y違反がない', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('キーボードナビゲーションが機能する', async ({ page }) => {
    await page.goto('/');

    // Tabキーでナビゲーション
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // フォーカスされた要素確認
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });
});
```

## Testing Library (コンポーネントテスト)

### 1. セットアップ

```bash
npm install -D @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
```

### 2. Jest設定

```javascript
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

module.exports = createJestConfig(customJestConfig);
```

```javascript
// jest.setup.js
import '@testing-library/jest-dom';
```

### 3. テストケース例

```typescript
// src/components/ui/button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe('Button', () => {
  it('正しくレンダリングされる', () => {
    render(<Button>クリック</Button>);
    expect(screen.getByRole('button', { name: 'クリック' })).toBeInTheDocument();
  });

  it('クリックイベントが発火する', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>クリック</Button>);

    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled状態が機能する', () => {
    render(<Button disabled>クリック</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

## CI/CD パイプライン

### GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      - run: npm ci
      - run: npm run test

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

  lighthouse:
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

### Vercelデプロイ設定

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["hnd1"],
  "env": {
    "NEXT_PUBLIC_SITE_URL": "https://f-circle.com"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### プレビューデプロイ

Vercelは自動的にPRごとにプレビューデプロイを作成します。

### 本番デプロイフロー

1. develop → mainへPR作成
2. CI通過確認（lint, test, e2e, lighthouse）
3. プレビューデプロイで最終確認
4. マージ
5. main自動デプロイ（本番）

## 環境変数管理

### Vercel Dashboard設定

1. Project Settings → Environment Variables
2. 環境ごとに設定:
   - Production
   - Preview
   - Development

```
CONTENTFUL_SPACE_ID=xxx
CONTENTFUL_ACCESS_TOKEN=xxx
CONTENTFUL_PREVIEW_ACCESS_TOKEN=xxx
NEXT_PUBLIC_SITE_URL=https://f-circle.com
```

### ローカル開発

```env
# .env.local (gitignore)
CONTENTFUL_SPACE_ID=xxx
CONTENTFUL_ACCESS_TOKEN=xxx
CONTENTFUL_PREVIEW_ACCESS_TOKEN=xxx
CONTENTFUL_PREVIEW_SECRET=xxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=xxx
RECAPTCHA_SECRET_KEY=xxx
```

## モニタリング

### Vercel Analytics

```typescript
// src/app/[locale]/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### エラートラッキング（Sentry例）

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
});
```

## チェックリスト

### テスト
- [ ] E2Eテスト（主要フロー）
- [ ] コンポーネントテスト
- [ ] アクセシビリティテスト
- [ ] モバイルテスト
- [ ] クロスブラウザテスト

### CI/CD
- [ ] GitHub Actions設定
- [ ] リント自動実行
- [ ] テスト自動実行
- [ ] Lighthouse CI
- [ ] Vercel連携
- [ ] プレビューデプロイ
- [ ] 本番デプロイ自動化

### モニタリング
- [ ] Vercel Analytics
- [ ] Speed Insights
- [ ] エラートラッキング
- [ ] パフォーマンス監視
- [ ] アップタイム監視
