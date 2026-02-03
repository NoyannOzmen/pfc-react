import { NavLink } from 'react-router-dom';

function DashSubNav() {
  const isActiveSubTab = ({ isActive }: { isActive: boolean }): string => {
    return `block grow text-center border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4 ${isActive ? 'dashsubbtn-active' : ''}`;
  };

  return (
    <nav className="rounded-lg h-9">
      <ul className="rounded-t-lg flex h-9 content-center bg-accents2 justify-stretch font-semibold text-fond text-sm md:justify-start pl-2">
        <li className="rounded-tl-lg ml-2 md:rounded-none md:border-l-2 md:border-l-zoning">
          <NavLink to="/associations/profil" end tabIndex={0} className={isActiveSubTab}>
            Mes informations
          </NavLink>
        </li>
        <li className="border-r-solid">
          <NavLink to="/associations/profil/logo" tabIndex={0} className={isActiveSubTab}>
            Ajouter une image
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default DashSubNav;
