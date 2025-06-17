import { NavLink } from "react-router-dom";

function DashNav() {

  const isActiveTab = ({ isActive }: { isActive: boolean }): string => {
    return `dashbtn ${isActive ? "dashbtn-active" : ""}`;
  };

  return (
    <nav className="flex flex-wrap justify-center md:justify-start">
      <ul className="flex flex-wrap-reverse gap-x-2 mx-3 justify-center font-semibold md:justify-start md:ml-10 text-xl">
        <li><NavLink to="/associations/profil" end tabIndex={0} className={isActiveTab}>Profil</NavLink></li>
        <li><NavLink to="/associations/profil/demandes" tabIndex={0} className={isActiveTab}>Demandes</NavLink></li>
        <li><NavLink to="/associations/profil/animaux" tabIndex={0} className={isActiveTab}>Animaux</NavLink></li>
      </ul>
      <div className="mx-2 grow w-[90%] h-2 bg-accents1-dark rounded-t-lg"></div>
    </nav>
  )
}

export default DashNav;