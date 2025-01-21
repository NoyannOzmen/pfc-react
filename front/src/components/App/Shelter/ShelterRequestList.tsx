import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useUserContext } from "../../../contexts/UserContext";
import { useRootContext } from "../../../routes/Root";


function ShelterRequestList() {
  const { animals } = useRootContext();
  const { user } = useUserContext();

  if (!user) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const requested = animals.filter(({ association_id, demandes }) => Number(association_id) === Number(user.id) && demandes.length);

  const requestedAnimals = requested.map((animal) => (
    <>
    <tr key={`${animal.id} header`} tabIndex={0} className="view text-fond text-sm bg-accents2 font-grands font-semibold p-3 border-accents2-dark border-solid border-1 hover:bg-accents2-dark">
      <td colSpan={3} scope="colgroup" className="px-2 pt-2 border-accents2-dark border-solid border-1">{animal.nom}</td>
      {/* TO DO : Add Count for # of Requests */}
      {/* TO DO : Add JS for unfurling row */}
      <td colSpan={3} scope="colgroup" className="px-2 pt-2 border-accents2-dark border-solid border-1">Nombre</td>
    </tr>
    <tr key={`${animal.id} body`} className="fold mb-3 bg-fond rounded-b-lg hidden">
      <tr key={`${animal.id} body title`}className="fold text-fond text-sm bg-accents2-light font-grands font-semibold p-3 border-accents2-dark border-solid border-1
      ">
        <td colSpan={2} className="px-2 pt-2  border-accents2-light border-solid border-1">Famille</td>
        <td colSpan={2} className="px-2 pt-2  border-accents2-light border-solid border-1">Date de demande</td>
        <td colSpan={2} className="px-2 pt-2  border-accents2-light border-solid border-1">Statut</td>
      </tr>
      { animal.demandes.map((demande : any, index : any) => (
      <tr key={`${animal.id} request n° ${demande.id}`} className={"fold text-sm font-body font-semibold hidden" + (index % 2 > 0 ? 'text-fond bg-accents2-light' : 'bg bg-fond')}>
        <Link tabIndex={0} className="hover:underline" to={`/associations/profil/demandes/${demande.Demande.id}`}>
          <td colSpan={2}>{demande.nom}</td>
          <td colSpan={2}>{demande.Demande.date_debut}</td>
          <td colSpan={2}>{demande.Demande.statut_demande}</td>
        </Link>
      </tr>
      ))}
    </tr>
    </>
  ));

  useEffect(() => {
    const script = document.createElement('script');
  
    script.src="../../../src/assets/utils/dashboardSuiviDemande.js";
    script.defer = true;
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return(
    <main className="justify-self-stretch flex-1">
	<h2 className="font-grands text-3xl text-center my-2 pt-5">Mon espace association</h2>
  <div className="flex flex-col content-center justify-center mx-auto mb-4 w-[80%]"> 

    <nav className="flex flex-wrap justify-center md:justify-start">
      <ul className="flex flex-wrap-reverse gap-x-2 mx-3 justify-center font-semibold md:justify-start md:ml-10 text-xl">
        <li><Link to="/associations/profil" tabIndex={0}><button id="dashbtn-1" className="dashbtn" tabIndex={-1}>Profil</button></Link></li>
        <li><Link to="/associations/profil/demandes" tabIndex={0}><button id="dashbtn-2" className="dashbtn dashbtn-active" tabIndex={-1}>Demandes</button></Link></li>
        <li><Link to="/associations/profil/animaux" tabIndex={0}><button id="dashbtn-3" className="dashbtn" tabIndex={-1}>Animaux</button></Link></li>
      </ul>
      <div className="mx-2 grow w-[90%] h-2 bg-accents1-dark rounded-t-lg"></div>
    </nav>

    <div className="flex flex-col bg-zoning rounded-lg">
      <nav className="rounded-lg h-9">
        <ul className="rounded-t-lg flex h-9 content-center bg-accents2 justify-stretch font-semibold text-fond text-sm md:justify-start pl-2"></ul>
      </nav>

      <section className="flex flex-wrap justify-center" id="dashboard-container">
        <h3 className="hidden md:inline font-grands text-3xl text-center my-2 pt-5 w-full">Gestion des demandes d'accueil</h3>

         <div className="container">
          <div className="row w-full text-center my-6">
            <div className="col w-full text-center my-6 flex justify-center flex-wrap">
              { !requested.length ? (
                <h4 className="w-full text-center font-grands text-2xl my-4">Pas de demandes d'accueil en attente</h4>
              ) : (
                <>
                <h4 className="w-full text-center font-grands text-2xl my-4">Demandes en cours</h4>

                <table className="table text-center w-full md:w-5/6">
                  <thead>
                  <tr className="border-none bg-zoning text-sm font-grands">
                    <td colSpan={3} scope="colgroup">Nom Animal</td>
                    <td colSpan={3} scope="colgroup">Nombre de demandes</td>
                  </tr>
                  </thead>
                  <tbody>
                  {requestedAnimals}
                  </tbody>
                </table>
                </>
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

export default ShelterRequestList;