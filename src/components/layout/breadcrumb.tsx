import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { Breadcrumb as BreadcrumbType } from '@/types';
import { cn } from '@/lib/utils';

interface BreadcrumbProps {
  items: BreadcrumbType[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="パンくずリスト" className={cn('py-4', className)}>
      <ol className="flex flex-wrap items-center space-x-2 text-sm">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center text-gray-500 hover:text-primary-600 transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">ホーム</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              {isLast ? (
                <span className="font-medium text-gray-900" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-primary-600 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
