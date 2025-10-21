import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  className?: string;
}

export function ServiceCard({ title, description, icon: Icon, href, className }: ServiceCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className={cn('h-full card-hover', className)}>
        <CardHeader>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
            <Icon className="h-6 w-6" />
          </div>
          <CardTitle className="ja-text">{title}</CardTitle>
          <CardDescription className="ja-text mt-2">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="link" className="p-0 h-auto text-primary-600 group-hover:text-primary-700">
            詳しく見る
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
