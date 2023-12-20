import type { JSX, ReactNode } from 'react';

import '~/assets/css/main.css';
import { Toaster } from '~/components/ui/toaster';
import { ReactQueryProvider } from '~/providers/react-query-provider';
import { ReactRouterProvider } from '~/providers/react-router-provider';

export function RootProvider({ children }: { children: ReactNode }): JSX.Element {
  return (
    <ReactQueryProvider>
      <ReactRouterProvider>
        {children}
        <Toaster />
      </ReactRouterProvider>
    </ReactQueryProvider>
  );
}
