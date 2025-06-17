import { NavLink } from "react-router-dom";

function DashSubNav() {

  const isActiveSubTab = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? "dashbtn-active" : "";
  };

  //!TODO : Fix first tab not staying active

  return (
    <nav className="rounded-lg h-9">
      <ul className="rounded-t-lg flex h-9 content-center bg-accents2 justify-stretch font-semibold text-fond text-sm md:justify-start pl-2">
        <li>
          <NavLink to="/associations/profil" end tabIndex={0} className={"rounded-tl-lg block grow text-center pl-2 border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4 md:rounded-none md:border-l-2 md:border-l-zoning " + isActiveSubTab}>Mes informations</NavLink></li>
        <li>
          <NavLink to="/associations/profil/logo" end tabIndex={0} className={"block grow text-center border-r-solid border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4 " + isActiveSubTab}>Ajouter une image</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default DashSubNav;