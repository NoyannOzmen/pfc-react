import { Link } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";
import { useRootContext } from '../../../contexts/RootContext';
import AnimalTable from "./AnimalTable";

function FosterRequest() {
  const { animals } = useRootContext();
  const { user } = useUserContext();

  if (!user) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const familleId = user?.accueillant.id

  const requested = animals.filter(( { demandes } ) => demandes.length )

  const requestedAnimals = requested.filter((x : any) => 
    x.demandes.some((y:any) => y.Demande.famille_id === familleId)
  )

  const animalItems = requestedAnimals.map((animal) => (
    <AnimalTable key={animal.id} animal={animal} />
  ));

  return(
    <main className="justify-self-stretch flex-1">
  <h2 className="font-grands text-3xl text-center my-2 py-6">Bienvenue sur votre espace personnel</h2>
  <div className="flex flex-col content-center justify-center mx-auto mb-4 w-[80%]">
    
    <nav className="flex flex-wrap justify-center md:justify-start">
      <ul className="flex flex-wrap-reverse gap-x-2 mx-3 justify-center font-semibold md:justify-start md:ml-10 text-xl">
        <li><Link to="/famille/profil" tabIndex={0}><button id="dashbtn-1" className="dashbtn" tabIndex={-1}>Profil</button></Link></li>
        <li><Link to="/famille/profil/demandes" tabIndex={0}><button id="dashbtn-2" className="dashbtn dashbtn-active" tabIndex={-1}>Demandes</button></Link></li>
      </ul>
      <div className="mx-2 grow w-[90%] h-2 bg-accents1-dark rounded-t-lg"></div>
    </nav>
    
    <div className="font-body bg-zoning rounded-lg shadow dark:bg-gray-800 mb-4">
      
      <section className="flex flex-wrap justify-center" id="dashboard-container">
        
        <h3 className="font-grands text-3xl text-center my-2 pt-5 w-full">Gestion des demandes d'accueil</h3>
        
        <div className="container w-[80%]">
          
          <div className="row w-full text-center my-6">
            <div className="col w-full text-center my-6">
               {requestedAnimals ? (
                <>
                <h4 className="w-full text-center font-grands text-2xl my-4">Demandes en cours</h4>
                  <table className="table text-center w-full">
                      <thead key={"header"} className="border-none bg-zoning text-sm font-grands">
                        <tr>
                          <th colSpan={3} scope="colgroup">Nom Animal</th>
                          <th colSpan={3} scope="colgroup">Demande</th>
                        </tr>
                      </thead>

                        {animalItems}

                  </table>
                  </>
              ) : (
                <h4 className="w-full text-center font-grands text-2xl my-4">Pas de demandes d'accueil en attente</h4>
              )}               
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</main>
 
  )
}

export default FosterRequest;