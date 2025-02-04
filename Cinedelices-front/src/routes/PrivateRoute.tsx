import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Définition des types pour les props du composant
interface PrivateRouteProps {
  requiredRole?: string;
  children?: React.ReactNode; // Indiquer que `children` peut être tout élément React
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ requiredRole, children }) => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <>{children || <Outlet />} </>; // Utilisation de `children` si présents, sinon affichage de `Outlet`
};

export default PrivateRoute;