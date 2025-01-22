import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IAnimal} from "../../../@types";

function FosterRequest() {
  /* const isInitialMount = useRef(true); */
  const [ requestedAnimals, setRequestedAnimals ] = useState<IAnimal[]>([])

  useEffect(() => {
    const script = document.createElement('script');
  
    script.src="../../../src/assets/utils/dashboardSuiviDemande.js";
    script.async = true;
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  useEffect(() => {
    const fetchRequestedAnimals = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/famille/profil/demandes`);
        const data = await response.json();
        setRequestedAnimals(data);
      } catch (error) {
        console.error(error);
      }
    }
      fetchRequestedAnimals();
  }, []);

/*   const requestItems = .map((request) => (
    <tr key={request.id} className="fold mb-3 bg-fond rounded-b-lg hidden">
    <tr className="fold text-fond text-sm bg-accents2-light font-grands font-semibold p-3 border-accents2-dark border-solid border-1 hidden">
      <td colSpan={2} className="px-2 pt-2  border-accents2-light border-solid border-1">Refuge</td>
      <td colSpan={2} className="px-2 pt-2  border-accents2-light border-solid border-1">Date de demande</td>
      <td colSpan={2} className="px-2 pt-2  border-accents2-light border-solid border-1">Statut</td>
    </tr>
    <tr className="fold text-sm font-body font-semibold hidden bg bg-fond">                          
      <td colSpan={2}>{request.animal.refuge.nom}</td>
      <td colSpan={2}>{request.date_debut}</td>
      <td colSpan={2}>{request.statut_demande}</td>
    </tr>
</tr>
  )) */

  const animalItems = requestedAnimals.map((animal) => (
    <>
    <tr key={animal.id} tabIndex={0} className="view text-fond text-sm bg-accents2 font-grands font-semibold p-3 border-accents2-dark border-solid border-1 hover:bg-accents2-dark">
      <td colSpan={3} scope="colgroup" className="px-2 pt-2  border-accents2-dark border-solid border-1">{animal.nom}</td>
      <td colSpan={3} scope="colgroup" className="px-2 pt-2  border-accents2-dark border-solid border-1">Demande</td>
    </tr>
    {/* <tr key={animal.demandes.id} className="fold mb-3 bg-fond rounded-b-lg "> */}
      <tr key={`${animal.demandes.id} header`} className="fold text-fond text-sm bg-accents2-light font-grands font-semibold p-3 border-accents2-dark border-solid border-1 ">
        <td colSpan={2} className="px-2 pt-2  border-accents2-light border-solid border-1">Refuge</td>
        <td colSpan={2} className="px-2 pt-2  border-accents2-light border-solid border-1">Date de demande</td>
        <td colSpan={2} className="px-2 pt-2  border-accents2-light border-solid border-1">Statut</td>
      </tr>
      <tr key={`${animal.demandes.id} body`} className="fold text-sm font-body font-semibold bg bg-fond">                          
        <td colSpan={2}>{animal.refuge.nom}</td>
        <td colSpan={2}>{animal.demandes[0].Demande.date_debut}</td>
        <td colSpan={2}>{animal.demandes[0].Demande.statut_demande}</td>
      </tr>
    {/* </tr> */}
    {/* {requestItems} */}
    </>
  ))

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

                      <tr className="border-none bg-zoning text-sm font-grands">
                        <td colSpan={3} scope="colgroup">Nom Animal</td>
                        <td colSpan={3} scope="colgroup">Demande</td>
                      </tr>

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