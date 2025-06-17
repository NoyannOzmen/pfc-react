import { useRootContext } from '../../../contexts/RootContext';
import { useUserContext } from "../../../contexts/UserContext";
import ShelterResidentTable from "./ShelterResidentTable";
import DashNav from "./DashNav";
import ResidentSubNav from "./ResidentSubNav";

function ShelterResidentProfileList() {
  const { animals } = useRootContext();
  const auth = useUserContext();

  if (!auth.user) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const fostered = animals.filter(({ association_id, statut }) => Number(association_id) === Number(auth.user?.id) && statut === "Accueilli");

  const fosteredItems = fostered.map((animal) => (
    <ShelterResidentTable key={animal.id} animal={animal} />
  ))

  return(
  <main className="justify-self-stretch flex-1">
    <h2 className="font-grands text-3xl text-center my-2 pt-5">Mon espace association</h2>
    <div className="flex flex-col content-center justify-center mx-auto mb-4 w-[80%]">
      <DashNav />
      <div className="flex flex-col bg-zoning rounded-lg">
        <ResidentSubNav />
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