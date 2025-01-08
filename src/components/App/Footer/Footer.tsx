/* import { useEffect } from 'react'; */
import { Link } from 'react-router-dom';

/* import { ICategory, IProduct, LoggedUser } from '../../../@types'; */

/* import '../../../index.css' */

function Footer() {
  return (
  <>
  {/* <!-- Back to top Button --> */}
      <div className="flex-none">
        <Link className="to-top mb-12 mr-1 flex flex-col text-xs font-bold text-accents1-light opacity-75" to="#top">
          <img className="size-8 place-self-center" src="/src/assets/icons/top.svg" alt="icone de retour vers le haut" />
          <p className="to-top-text text-center">Haut<br />de page</p>
        </Link>
      </div>

      <footer className="bg-zoning p-2 flex-none">
        <div>
          <nav className="align-middle text-xs lg:text-sm h-12">
            <ul className="flex flex-row place-content-evenly p-4">
              <li className="hover:text-accents1-light">
                <a href="/infos-legales">Informations Légales</a>
              </li>
              <li className="hover:text-accents1-light">
                <a href="/rgpd">Politique RGPD</a>
              </li>
              <li className="hover:text-accents1-light">
                <a href="/plan">Plan du site</a>
              </li>
              <li className="hover:text-accents1-light">
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col place-content-evenly text-xs lg:text-sm h-8 lg:h-16">
          <p className="text-center italic">Copyright &copy; Pet Foster Connect 2024<br />Tous droits réservés </p>
        </div>
      </footer>
  </>

  )
}

export default Footer;