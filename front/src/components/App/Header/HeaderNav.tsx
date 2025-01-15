import { useUserContext } from "../../../contexts/UserContext";
import HeaderLogged from "./HeaderLogged";
import HeaderLogin from "./HeaderLogin";

function HeaderNav() {
  const { user } = useUserContext();
  /* console.log(user) */

  return (
    <nav className="rounded-br-lg md:rounded-b-lg flex-auto  bg-accents2-dark text-fond p-3 text-base md:text-lg md:mr-4">
      <ul className="flex flex-col md:flex-row flex-nowrap justify-around">
        {/* Login Navigation */}
        { user ? (
          <HeaderLogged
          user={user}
          />      
        ) : (
          <HeaderLogin />
        )}
          
      </ul>           
  </nav>
  )
}

export default HeaderNav;