import { NavLink } from "react-router-dom";

function ResidentSubNav() {

  const isActiveSubTab = ({ isActive }: { isActive: boolean }): string => {
    return `block grow text-center border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4 ${isActive ? "dashsubbtn-active" : ""}`;
  };

  return (
    <nav className="rounded-lg">
    <ul className="rounded-t-lg flex bg-accents2 justify-stretch font-semibold text-fond text-sm md:justify-start md:pl-8">
      <li className="rounded-tl-lg pl-2 md:rounded-none md:border-l-2 md:border-l-zoning">
        <NavLink to="/associations/profil/animaux" end tabIndex={0} 
        className={isActiveSubTab}>Nos animaux</NavLink>
      </li>
      <li className="border-r-solid">
        <NavLink to="/associations/profil/animaux/suivi" end tabIndex={0} className={isActiveSubTab}>Suivi accueils</NavLink>
      </li>
      <li className="pr-2 rounded-tr-lg md:rounded-none md:border-r-solid">
        <NavLink to="/associations/profil/animaux/nouveau-profil" end tabIndex={0} 
        className={isActiveSubTab}>Créer un profil</NavLink>
      </li>
    </ul>
  </nav>
  )
}

export default ResidentSubNav;