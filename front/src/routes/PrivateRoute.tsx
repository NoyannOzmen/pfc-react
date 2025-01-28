import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { useRootContext } from "./Root";

export const ShelterRoute = () => {
  const { animals, species, shelters, tags } = useRootContext();
  const auth = useUserContext();
  const refuge = auth.user?.refuge;
  if (!auth.user || !refuge) return <Navigate to="/" />;
  return <Outlet context={{ animals, species, shelters, tags }} />;
};

export const FosterRoute = () => {
  const { animals, species, shelters, tags } = useRootContext();
  const auth = useUserContext();
  const accueillant = auth.user?.accueillant;
  if (!auth.user || !accueillant) return <Navigate to="/" />;
  return <Outlet context={{ animals, species, shelters, tags }} />;
}