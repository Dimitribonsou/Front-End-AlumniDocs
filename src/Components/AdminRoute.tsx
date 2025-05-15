import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import Ilogin from '../types/Ilogin';

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  // Récupérer les données de connexion depuis le localStorage
  const loginData = JSON.parse(localStorage.getItem('loginData') || '{}') as Ilogin;

  // Vérifier si l'utilisateur est connecté et est un administrateur
  if (!loginData || loginData.role !== 'admin') {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas un admin
    return <Navigate to="/login" replace />;
  }

  // Si l'utilisateur est un admin, afficher le contenu protégé
  return <>{children}</>;
};

export default AdminRoute;
