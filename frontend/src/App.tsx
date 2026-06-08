import { RouterProvider } from 'react-router-dom';
import { createAppRouter } from './router/AppRouter';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>No user</div>; // или LoginPage

  const router = createAppRouter(user.role);

  return <RouterProvider router={router} />;
}