import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary-100 text-primary-800 hover:bg-primary-200',
        secondary:
          'border-transparent bg-secondary-cyan-100 text-secondary-cyan-800 hover:bg-secondary-cyan-200',
        destructive: 'border-transparent bg-error-light text-error-dark hover:bg-error',
        success: 'border-transparent bg-success-light text-success-dark hover:bg-success',
        warning: 'border-transparent bg-warning-light text-warning-dark hover:bg-warning',
        outline: 'text-foreground border-gray-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
