import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import Unauthorize from '@/pages/system/Unauthorize';
import { ROUTES } from '@/routes';

interface PrivateRouteProps {
  requiredRoles?: string[];
}

export const PrivateRoute = ({ requiredRoles = [] }: PrivateRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.login} replace />;
  }

  if (requiredRoles.length > 0 && user) {
    const hasRequiredRole = requiredRoles.includes(user.role);
    if (!hasRequiredRole) {
      return <Unauthorize />;
    }
  }

  return <Outlet />;
};
