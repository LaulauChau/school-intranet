import { lazy, type JSX } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const LoginPage = lazy(() =>
  import('../pages/login-page').then((module) => ({ default: module.LoginPage })),
);
const RegisterPage = lazy(() =>
  import('../pages/register-page').then((module) => ({ default: module.RegisterPage })),
);

export function AuthRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route path='*' element={<Navigate to='auth/login' />} />
    </Routes>
  );
}
