import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuthStore';
import Unauthorize from '@/pages/shared/systems/Unauthorize';
import { ROUTES } from '@/routes';
import { useEffect, useRef } from 'react';

interface PrivateRouteProps {
  requiredRoles?: string[];
}

export const PrivateRoute = ({ requiredRoles = [] }: PrivateRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const hasCheckedAuth = useRef(false);

  // 401
  const isAuth = isAuthenticated();
  
  // useEffect to ensure toast container is mounted before navigation
  useEffect(() => {
    if (!isAuth && !hasCheckedAuth.current) {
      hasCheckedAuth.current = true;
      isAuthenticated(true); // Show toast
    }
  }, [isAuth, isAuthenticated]);

  if (!isAuth) {
    return <Navigate to={ROUTES.login} replace />;
  }

  // 403
  if (requiredRoles.length > 0 && user) {
    const hasRequiredRole = requiredRoles.includes(user.role);
    if (!hasRequiredRole) {
      return <Unauthorize />;
    }
  }

  return <Outlet />;
};
