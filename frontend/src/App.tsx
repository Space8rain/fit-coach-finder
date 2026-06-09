import { RouterProvider } from 'react-router-dom';
import { createAppRouter, createAuthRouter } from './router/AppRouter';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { user } = useAuth();

  const router = user ? createAppRouter(user.role) : createAuthRouter();

  return <RouterProvider key={user?.role ?? "auth"} router={router} />;
}