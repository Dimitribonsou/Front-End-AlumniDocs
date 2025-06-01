// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import Ilogin from '../types/Ilogin';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // Tableau des rôles autorisés
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const data = JSON.parse(localStorage.getItem("loginData") || '{}') as Ilogin;
  
  if (!data.islogin) {
    return <Navigate to="/login" replace />;
  }
  // Si des rôles sont spécifiés, vérifie si l'utilisateur a le bon rôle
  if (allowedRoles  && !allowedRoles.includes('etudiant')) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;