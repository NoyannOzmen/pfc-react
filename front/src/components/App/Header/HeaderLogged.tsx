import { Link } from "react-router-dom"
import { useUserContext } from "../../../contexts/UserContext";
import { LoggedUser } from "../../../@types";
import { useNavigate } from "react-router-dom";

type HeaderLoggedProps = {
  user: LoggedUser;
};

function HeaderLogged({user } : HeaderLoggedProps) {
  const { setUser } = useUserContext();

  const navigate = useNavigate();

  const logout = () => {
    setUser(null)
    navigate('/')
  }

  const links = () => {
    if (user.accueillant) {
      return (
        <>
          <li className="border-2 border-accents2-dark max-[767px]:border-b-fond md:mr-4 md:border-r-fond px-4 max-[767px]:pb-2 place-self-center md:place-self-start pl-2">
          {user.accueillant.prenom ? (
            <Link to="/famille/profil">Bonjour : {user.accueillant.prenom}</Link>
          ) : (
            <Link to="/famille/profil">Bonjour : {user.accueillant.nom}</Link>
          )}
          </li>
          <li className="border-2 border-accents2-dark mr-0 max-[767px]:border-b-fond  md:border-r-fond px-4 pr-6 max-[767px]:pb-2 place-self-center md:place-self-start">
          <Link tabIndex={0} className="hover:text-accents1-light" to="/famille/profil">Tableau de&nbsp;bord</Link>
        </li>
        </>
        );
    } else {
      return (
        <>
          <li className="border-2 border-accents2-dark max-[767px]:border-b-fond md:mr-4 md:border-r-fond px-4 max-[767px]:pb-2 place-self-center md:place-self-start pl-2">
            <Link to="/associations/profil">Bonjour : {user.refuge.nom}</Link>
          </li>
          <li className="border-2 border-accents2-dark mr-0 max-[767px]:border-b-fond  md:border-r-fond px-4 pr-6 max-[767px]:pb-2 place-self-center md:place-self-start">
            <Link tabIndex={0} className="hover:text-accents1-light" to="/associations/profil">Tableau de&nbsp;bord</Link>
          </li>
        </>
        )
    }
  }

  return (
    <>
      {links()}

      <li id="log-out" className="border-2 border-accents2-dark place-self-center md:place-self-start pl-2">
        {/* <Link to="/deconnexion" className="hover:text-accents1-light">Se Déconnecter</Link> */}
        <p className="hover:text-accents1-light" onClick={logout}>Se Déconnecter</p>
      </li>
    </>
  )
}

export default HeaderLogged;