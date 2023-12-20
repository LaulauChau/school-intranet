import type { JSX, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useProfile } from '../hooks/use-profile';

export function PublicRoute({
  children,
}: {
  children: ReactNode;
}): string | number | boolean | JSX.Element | Iterable<ReactNode> {
  const { profile, isLoading } = useProfile();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (profile) {
    return <Navigate to='/home' />;
  }

  return children || <Outlet />;
}
