import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { formatDateShort } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface NewsCardProps {
  title: string;
  excerpt: string;
  category: string;
  publishedAt: Date | string;
  href: string;
  className?: string;
}

const categoryColors: Record<string, 'default' | 'secondary' | 'success' | 'warning'> = {
  press: 'default',
  release: 'secondary',
  event: 'success',
  media: 'warning',
};

export function NewsCard({ title, excerpt, category, publishedAt, href, className }: NewsCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className={cn('h-full card-hover', className)}>
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <Badge variant={categoryColors[category] || 'default'}>{category}</Badge>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <time dateTime={typeof publishedAt === 'string' ? publishedAt : publishedAt.toISOString()}>
                {formatDateShort(publishedAt)}
              </time>
            </div>
          </div>
          <h3 className="text-base font-semibold ja-text group-hover:text-primary-600 transition-colors line-clamp-2">
            {title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 line-clamp-3 ja-text">{excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
