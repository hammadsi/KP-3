import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AuthState } from '../state/ducks/auth/auth.interface';
import { UserRole } from '../state/ducks/auth/auth.interface';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const userRole = useSelector((state: { auth: AuthState }) => state.auth.userDetails?.roles[0]);

  if (userRole && allowedRoles.includes(userRole)) {
    return <>{children}</>;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoutes;
