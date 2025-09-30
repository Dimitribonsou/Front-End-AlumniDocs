// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import Ilogin from '../types/Ilogin';
import IclassInfo from '../types/IclasseInfo';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // Tableau des rôles autorisés
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const data = JSON.parse(localStorage.getItem("loginData") || '{}') as Ilogin;
   const classeInfo:IclassInfo[] = JSON.parse(localStorage.getItem("classInfo") || '{}') as IclassInfo[];
  if (!data.islogin) {
    return <Navigate to="/login" replace />;
  }
  // Si des rôles sont spécifiés, vérifie si l'utilisateur a le bon rôle
  if (allowedRoles  && !allowedRoles.includes('etudiant')) {
    return <Navigate to="/home" replace />;
  }
  // if (data.islogin && !classeInfo ) {
  //   return <Navigate to="/home" replace />;
  // }
  // if (classeInfo && classeInfo.length<=0 ) {
  //   return <Navigate to="/incription" replace />;
  // }

  return <>{children}</>;
};

export default ProtectedRoute;