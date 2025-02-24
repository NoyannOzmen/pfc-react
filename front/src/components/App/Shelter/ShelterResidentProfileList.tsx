import { Link } from "react-router-dom";
import { useRootContext } from '../../../contexts/RootContext';
import { useUserContext } from "../../../contexts/UserContext";
import ShelterResidentTable from "./ShelterResidentTable";

function ShelterResidentProfileList() {
  const { animals } = useRootContext();
  const { user } = useUserContext();

  if (!user) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const fostered = animals.filter(({ association_id, statut }) => Number(association_id) === Number(user.id) && statut === "Accueilli");

  const fosteredItems = fostered.map((animal) => (
    <ShelterResidentTable key={animal.id} animal={animal} />
  ))

  return(
  <main className="justify-self-stretch flex-1">
    <h2 className="font-grands text-3xl text-center my-2 pt-5">Mon espace association</h2>
    
    {/* <!-- Conteneur général qui contient tout le dashboard --> */}
    <div className="flex flex-col content-center justify-center mx-auto mb-4 w-[80%]">
      
      <nav className="flex flex-wrap justify-center md:justify-start">
        <ul className="flex flex-wrap-reverse gap-x-2 mx-3 justify-center font-semibold md:justify-start md:ml-10 text-xl">
          <li><Link to="/associations/profil" tabIndex={0}><button id="dashbtn-1" className="dashbtn" tabIndex={-1}>Profil</button></Link></li>
          <li><Link to="/associations/profil/demandes" tabIndex={0}><button id="dashbtn-2" className="dashbtn" tabIndex={-1}>Demandes</button></Link></li>
          <li><Link to="/associations/profil/animaux" tabIndex={0}><button id="dashbtn-3" className="dashbtn dashbtn-active" tabIndex={-1}>Animaux</button></Link></li>
        </ul>
        <div className="mx-2 grow w-[90%] h-2 bg-accents1-dark rounded-t-lg"></div>
      </nav>
      
      {/* <!-- Conteneur du sous menu et de la section --> */}
      <div className="flex flex-col bg-zoning rounded-lg">
        
        <nav className="rounded-lg">
          <ul className="rounded-t-lg flex bg-accents2 justify-stretch font-semibold text-fond text-sm md:justify-start md:pl-8">
            <li className=" rounded-tl-lg block grow text-center pl-2 border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4 md:rounded-none md:border-l-2 md:border-l-zoning bor"><Link to="/associations/profil/animaux">Nos animaux</Link></li>
            <li className="dashsubbtn-active block grow text-center border-r-solid border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4 "><Link to="/associations/profil/animaux/suivi">Suivi accueils</Link></li>
            <li className="block grow text-center pr-2 py-2 rounded-tr-lg hover:underline md:grow-0 md:px-4 md:rounded-none md:border-r-solid md:border-r-2 md:border-r-zoning"><Link to="/associations/profil/animaux/nouveau-profil">Créer un profil</Link></li>
          </ul>
        </nav>
        
        <section className="flex flex-wrap justify-center" id="dashboard-container">
          <h3 className="hidden md:inline font-grands text-3xl text-center my-2 pt-5 w-full">Suivi des animaux accueillis</h3>
          
          <div className="w-full mx-4 my-6">
            <table className="text-left w-full">
              <thead>
                <tr className="border-none bg-zoning text-sm font-grands">
                  <th>Nom Animal</th>
                  <th>Famille d'Accueil</th>
                </tr>
              </thead>

                {fosteredItems}   
            </table>
          </div>             
        </section>
      </div>
    </div> 
  </main>  
  )
}

export default ShelterResidentProfileList;