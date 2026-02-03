import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

export const ShelterRoute = () => {
  const auth = useUserContext();
  const refuge = auth.user?.refuge;
  if (!auth.user || !refuge) return <Navigate to="/" />;
  return <Outlet />;
};

export const FosterRoute = () => {
  const auth = useUserContext();
  const accueillant = auth.user?.accueillant;
  if (!auth.user || !accueillant) return <Navigate to="/" />;
  return <Outlet />;
};
