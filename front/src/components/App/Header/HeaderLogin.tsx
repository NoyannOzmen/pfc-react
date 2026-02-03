import { Link } from 'react-router-dom';

function HeaderLogin() {
  return (
    <>
      <li
        id="log-in"
        className="border-2 border-accents2-dark max-[767px]:border-b-fond md:mr-4 md:border-r-fond px-8 max-[767px]:pb-2 place-self-center pl-2"
      >
        <Link to="/connexion" className="hover:text-accents1-light item-link">
          Se Connecter
        </Link>
      </li>

      <li id="register" className="md:mr-4 px-4 max-[767px]:pb-2 place-self-center pl-2">
        <Link to="/inscription" className="hover:text-accents1-light item-link">
          S'inscrire
        </Link>
      </li>
    </>
  );
}

export default HeaderLogin;
