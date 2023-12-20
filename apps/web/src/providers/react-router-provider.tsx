import type { JSX, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

export function ReactRouterProvider({ children }: { children: ReactNode }): JSX.Element {
  return <BrowserRouter>{children}</BrowserRouter>;
}
