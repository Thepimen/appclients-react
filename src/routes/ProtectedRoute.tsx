import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

export default function ProtectedRoute({ children }: any) {

  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const ok = await AuthService.isAuthenticated();
    setAuth(ok);
  };

  if (auth === null) {
    return <p>Cargando...</p>;
  }

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return children;
}
