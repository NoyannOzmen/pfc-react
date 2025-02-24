import { Link } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";
import { useRootContext } from '../../../contexts/RootContext';
import ShelterRequestTable from "./ShelterRequestTable";

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
    <ShelterRequestTable key={animal.id} animal={animal} />
  ));

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
                  <thead className="border-none bg-zoning text-sm font-grands">
                    <tr>
                      <th colSpan={4} scope="colgroup">Nom Animal</th>
                      <th colSpan={2} scope="colgroup">Nombre de demandes</th>
                    </tr>
                  </thead>
                  {requestedAnimals}
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