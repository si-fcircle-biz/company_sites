import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, TrendingUp, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CaseStudyCardProps {
  title: string;
  clientName: string;
  industry: string;
  challenge: string;
  results: string[];
  href: string;
  className?: string;
}

export function CaseStudyCard({
  title,
  clientName,
  industry,
  challenge,
  results,
  href,
  className,
}: CaseStudyCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className={cn('h-full card-hover', className)}>
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="default">{industry}</Badge>
          </div>
          <h3 className="text-heading-sm font-semibold ja-text group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building2 className="h-4 w-4 text-gray-400" />
            <span>{clientName}</span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 ja-text">{challenge}</p>
          <div className="space-y-2 border-t border-gray-100 pt-4">
            <div className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700 ja-text">{results[0]}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
