import { Link } from 'react-router-dom';
import ScrollButton from './ScrollButton';

function Footer() {
  return (
  <>
      <ScrollButton />

      <footer className="bg-zoning p-2 flex-none">
        <div>
          <nav className="align-middle text-xs lg:text-sm h-12">
            <ul className="flex flex-row place-content-evenly p-4">
              <li className="hover:text-accents1-light">
                <Link to="/infos-legales">Informations Légales</Link>
              </li>
              <li className="hover:text-accents1-light">
                <Link to="/rgpd">Politique RGPD</Link>
              </li>
              <li className="hover:text-accents1-light">
                <Link to="/plan">Plan du site</Link>
              </li>
              <li className="hover:text-accents1-light">
                <Link to="/contact">Contact</Link>
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