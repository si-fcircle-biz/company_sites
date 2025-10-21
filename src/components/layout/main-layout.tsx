import { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { StickyCTA } from './sticky-cta';

interface MainLayoutProps {
  children: ReactNode;
  showStickyCTA?: boolean;
}

export function MainLayout({ children, showStickyCTA = true }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {showStickyCTA && <StickyCTA />}
    </div>
  );
}
