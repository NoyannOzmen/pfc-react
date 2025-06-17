import { NavLink } from "react-router-dom";

function ResidentSubNav() {

  const isActiveSubTab = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? "dashbtn-active" : "";
  };

  //!TODO : Fix first tab not staying active

  return (
    <nav className="rounded-lg">
    <ul className="rounded-t-lg flex bg-accents2 justify-stretch font-semibold text-fond text-sm md:justify-start md:pl-8">
      <li>
        <NavLink to="/associations/profil/animaux" end tabIndex={0} className={"rounded-tl-lg block grow text-center pl-2 border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4 md:rounded-none md:border-l-2 md:border-l-zoning " + isActiveSubTab}>Nos animaux</NavLink>
        </li>
      <li>
        <NavLink to="/associations/profil/animaux/suivi" end tabIndex={0} className={"block grow text-center border-r-solid border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4 " + isActiveSubTab}>Suivi accueils</NavLink></li>
      <li>
        <NavLink to="/associations/profil/animaux/nouveau-profil" end tabIndex={0} className={"block grow text-center pr-2 py-2 rounded-tr-lg hover:underline md:grow-0 md:px-4 md:rounded-none md:border-r-solid md:border-r-2 md:border-r-zoning " + isActiveSubTab}>Créer un profil</NavLink>
      </li>
    </ul>
  </nav>
  )
}

export default ResidentSubNav;