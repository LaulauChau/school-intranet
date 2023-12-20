import { Loader2, type LucideProps } from 'lucide-react';
import type { JSX } from 'react';

import { cn } from '~/lib/utils';

type SpinnerProps = LucideProps;

export function Spinner({ className, ...props }: SpinnerProps): JSX.Element {
  return <Loader2 className={cn('h-5 w-5 animate-spin', className)} {...props} />;
}