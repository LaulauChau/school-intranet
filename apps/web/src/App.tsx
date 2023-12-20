import { Suspense, type JSX } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '~/features/auth';

export default function App(): JSX.Element {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='auth/*' element={<AuthRoutes />} />
        <Route path='*' element={<Navigate to='auth/login' />} />
      </Routes>
    </Suspense>
  );
}
