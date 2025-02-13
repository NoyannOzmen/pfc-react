import { Link } from 'react-router-dom';
import HeaderNav from './HeaderNav';

function Header() {
  function mobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("#nav-links");

    hamburger?.classList.toggle("active");
    navMenu?.classList.toggle("active");
  }

  function closeMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("#nav-links");  

    hamburger?.classList.remove("active");
    navMenu?.classList.remove("active");
  }

  return (
  <>
    <header id="top" className="w-screen flex flex-row bg-zoning shadow-xl flex-none">
    
    <Link to="/" className="flex flex-row grow-0 p-4">
      <img src="/icons/logo.svg" alt="Logo de Pet Foster Connect" className="size-20" />
      <div className="grow-0 py-4 px-2">
        <h1 className="stroke-title font-grands pt-2">Pet&nbsp;Foster<br />Connect<br /></h1>
        <p>"Plateforme&nbsp;Française d'acCueil"</p>
      </div>
    </Link>
    
    <div onClick={mobileMenu} className="hamburger absolute top-0 right-4 p-4">
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </div>  
    <div onClick={closeMenu} className="grow-1 flex flex-col md:flex-row flex-auto max-[767px]:nav-links" id="nav-links">

      <div className="flex flex-auto flex-col place-self-center w-full md:w-[625px] md:flex-row-reverse md:absolute md:top-0 md:right-0">
        <HeaderNav />        
          {/* Social Media Navigation */}
        <nav className="flex flex-row flex-auto justify-center p-3 gap-2">
            <Link to="#" className="" tabIndex={-1} >
              {/* Icone FB */}
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0,0,256,256">
                <g fill="#fffbe4" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter"
                strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none"
                fontSize="none" textAnchor="none" /* style="mix-blend-mode: normal" */>
                  <g transform="scale(8.53333,8.53333)">
                    <path className="justify-center"
                    d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.016 4.432,10.984 10.206,11.852v-8.672h-2.969v-3.154h2.969v-2.099c0,-3.475 1.693,-5 4.581,-5c1.383,0 2.115,0.103 2.461,0.149v2.753h-1.97c-1.226,0 -1.654,1.163 -1.654,2.473v1.724h3.593l-0.487,3.154h-3.106v8.697c5.857,-0.794 10.376,-5.802 10.376,-11.877c0,-6.627 -5.373,-12 -12,-12z">
                    </path>
                  </g>
                </g>
              </svg>
            </Link>
        
            <Link to="#" className="" tabIndex={-1} >
              {/* Icone Instagram */}
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0,0,256,256">
                <g fill="#fffbe4" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter"
                strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none"
                fontSize="none" textAnchor="none" /* style="mix-blend-mode: normal" */>
                  <g transform="scale(10.66667,10.66667)">
                    <path
                    d="M8,3c-2.761,0 -5,2.239 -5,5v8c0,2.761 2.239,5 5,5h8c2.761,0 5,-2.239 5,-5v-8c0,-2.761 -2.239,-5 -5,-5zM18,5c0.552,0 1,0.448 1,1c0,0.552 -0.448,1 -1,1c-0.552,0 -1,-0.448 -1,-1c0,-0.552 0.448,-1 1,-1zM12,7c2.761,0 5,2.239 5,5c0,2.761 -2.239,5 -5,5c-2.761,0 -5,-2.239 -5,-5c0,-2.761 2.239,-5 5,-5zM12,9c-1.65685,0 -3,1.34315 -3,3c0,1.65685 1.34315,3 3,3c1.65685,0 3,-1.34315 3,-3c0,-1.65685 -1.34315,-3 -3,-3z">
                    </path>
                  </g>
                </g>
              </svg>
            </Link>
        </nav>
      </div>
          
      {/* Menu Navigation */}
      <nav className="flex flex-auto grow-1  place-self-center md:place-self-end pb-4 pr-4 text-m md:text-base xl:text-xl">
        <ul className="flex flex-auto flex-col md:flex-row md:place-content-end md:gap-5 pl-4 gap-2">
              <li className="hover:text-accents1-light place-self-start item-link">
                <Link tabIndex={0} to="/animaux">Nos Animaux</Link>
              </li>
              <li className="hover:text-accents1-light place-self-start item-link">
                <Link tabIndex={0} to="/associations">Nos Partenaires</Link>
              </li>
              <li className="hover:text-accents1-light place-self-start item-link">
                <Link tabIndex={0} to="/a-propos">Qui sommes&#x2011;nous&nbsp;?</Link>
              </li>
              <li className="hover:text-accents1-light place-self-start item-link">
                <Link tabIndex={0} to="/faq">Foire aux Questions</Link>
              </li>
              <li className="hover:text-accents1-light place-self-start item-link">
                <Link tabIndex={0} to="/devenir-famille-d-accueil">Devenez Famille&nbsp;d'accueil</Link>
              </li>
        </ul>
      </nav>
                
    </div>
  </header>
  </>

  )
}

export default Header;