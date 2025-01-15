import { Link } from "react-router-dom"
import { LoggedUser } from "../../../@types";

type HeaderLoggedProps = {
  user: LoggedUser;
};

function HeaderLogged({user} : HeaderLoggedProps) {

  const links = () => {
    switch (user.role) {
      case 'famille' :
        return (
        <>
          <li className="border-2 border-accents2-dark max-[767px]:border-b-fond md:mr-4 md:border-r-fond px-4 max-[767px]:pb-2 place-self-center md:place-self-start pl-2">
          {user.prenom ? (
            <Link to="/famille/profil">Bonjour : {user.prenom}</Link>
          ) : (
            <Link to="/famille/profil">Bonjour : {user.nom}</Link>
          )}
          </li>
          <li className="border-2 border-accents2-dark mr-0 max-[767px]:border-b-fond  md:border-r-fond px-4 pr-6 max-[767px]:pb-2 place-self-center md:place-self-start">
          <Link tabIndex={0} className="hover:text-accents1-light" to="/famille/profil">Tableau de&nbsp;bord</Link>
        </li>
        </>
        );
      case 'association' :
        return (
        <>
          <li className="border-2 border-accents2-dark max-[767px]:border-b-fond md:mr-4 md:border-r-fond px-4 max-[767px]:pb-2 place-self-center md:place-self-start pl-2">
            <Link to="/associations/profil">Bonjour : {user.nom}</Link>
          </li>
          <li className="border-2 border-accents2-dark mr-0 max-[767px]:border-b-fond  md:border-r-fond px-4 pr-6 max-[767px]:pb-2 place-self-center md:place-self-start">
            <Link tabIndex={0} className="hover:text-accents1-light" to="/associations/profil/animaux">Tableau de&nbsp;bord</Link>
          </li>
        </>
        )
    }
  }

  return (
    <>
      {links}

      <li id="log-out" className="border-2 border-accents2-dark place-self-center md:place-self-start pl-2">
        <Link to="/deconnexion" className="hover:text-accents1-light">Se Déconnecter</Link>
      </li>
    </>
  )
}

export default HeaderLogged;