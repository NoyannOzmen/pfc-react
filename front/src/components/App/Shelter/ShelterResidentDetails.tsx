import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useRootContext } from '../../../contexts/RootContext';
import { ITag } from "../../../@types";
import DashNav from "./DashNav";
import ResidentSubNav from "./ResidentSubNav";

function ShelterResidentDetails() {
  const { animalId } = useParams();
  const { animals } = useRootContext();
  const [file, setFile] = useState<File | null>(null);

	const animal = animals.find(({id}) => Number(id) === Number(animalId));

	if (!animal) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const tagItems = animal.tags.map((tag :ITag) => (
    <p key={tag.id} className="group rounded-full block bg-accents1 text-fond text-center text-xs font-semibold py-1 px-2">
      {tag.nom}
        <span className="group-hover:block hidden z-10 bg-accents2-dark text-fond absolute px-2 py-2 text-xs rounded-b-xl rounded-tr-xl">
          {tag.description}
        </span>
    </p>
  ))

  const requestItems = animal.demandes.map((demande : typeof animal.demandes) => (
    <tr key={demande.id} className="odd:bg-accents2-light even:bg-fond odd:text-fond text-sm font-body font-semibold p-4 rounded-lg ">
      <td className="text-center p-2 rounded-lg ">{demande.nom}</td>
      <td className="text-center p-2 rounded-lg ">{demande.Demande.date_debut}</td>
      <td className="text-center p-2 rounded-lg hover:underline"><Link to={`/associations/profil/demandes/${demande.Demande.id}`}>{demande.Demande.statut_demande}</Link></td>
  </tr>
  ))

  const animalUrl = (animal.images_animal.length) ? animal.images_animal[0].url : null;

  const [userMessage, setUserMessage] = useState(null);
  const token = sessionStorage.getItem("site");

  async function sendFile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUserMessage(null)
    
    if (file) {
      const pictureId = JSON.stringify(animal?.id);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("animalId", pictureId)

      try {
        const response = await fetch
          (`${import.meta.env.VITE_API_URL}/upload/photo`,
          {
            method: 'POST',
            headers: {
              "Authorization": `Bearer ${token}`
            },
            body: formData
          }
        );

        const res = await response.json();
        setUserMessage(res.message)
      } catch (error) {
        console.error(error);
      }
    }
  }
  

  return(
    <main className="justify-self-stretch flex-1">
      <h2 className="font-grands text-3xl text-center my-2 pt-5">Mon espace association</h2>
      <div className="flex flex-col content-center justify-center mx-auto mb-4 w-[80%]">
        <DashNav />
        <div className="flex flex-col bg-zoning rounded-lg">
          <ResidentSubNav />
          <section id="dahboard-container" className="flex justify-center flex-wrap gap-x-6 gap-y-4 p-6">

          {userMessage &&
            <div>
              <p className="font-grands font-base text-accents1 text-center">{userMessage}</p>
            </div>
          }
            
            {/* ANIMAL */}
            <div className="w-60 md:w-auto">
              <h3 className="hidden md:inline font-grands text-3xl text-center my-2 pt-5 w-full">Fiche de suivi d'un animal</h3>
              <div className="flex p-6 pb-4">
                <div className="flex flex-col gap-2">
                  { animalUrl ? (
                    <img className="w-28 rounded-lg" src={`${import.meta.env.VITE_API_URL}` + `${animalUrl}`} alt={`Photo de ${animal.nom}`} />
                  ) : (
                    <img className="w-28 rounded-lg" src="/images/animal_empty.webp" alt="Photo à venir" />
                  )}
                </div>
                    
                <div className="pl-4">
                  <p className="text-base italic leading-3">Nom</p>
                  <p className="text-base font-semibold">{animal.nom}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 px-6 gap-y-2">
                
                <div>
                  <p className="text-sm italic leading-3">Age</p>
                  <p className="text-base font-semibold">{animal.age} ans</p>
                </div>
                
                <div>
                  <p className="text-sm italic leading-3">Sexe</p>
                  <p className="text-base font-semibold">{animal.sexe}</p>
                </div>
                
                <div className="">
                  <p className="text-sm italic leading-3">Espèce</p>
                  <p className="text-base font-semibold">{animal.espece.nom}</p>
                </div>
                
                {animal.race && (
                  <div>
                    <p className="text-sm italic leading-3">Race</p>
                    <p className="text-base font-semibold">{animal.race}</p>
                  </div>
                )}
              </div>
                
              {animal.tags && (
                <div className="flex flex-wrap mt-4 px-6 gap-1">
                  {tagItems}
                </div>
              )}
              
              <div className="font-body mx-auto w-[80%] bg-zoning rounded-lg shadow dark:bg-gray-800 my-4">
                <form onSubmit={sendFile}>
                  <div className="flex flex-col">
                      <label htmlFor="file">Importer une image</label>
                      <input onChange={(e) => setFile(e.target.files?.[0] || null)} id="file" type="file" name="file" required/>
                  </div>
                  <div className="w-full">
                    <input type="submit" value="Importer" className="hover:bg-accents1-dark rounded-full hover:underline bg-accents1 text-center font-grands text-fond font-semibold text-xs py-0.5 px-4"/>
                  </div>
                </form>
              </div>     
            </div>
                  
            {/* CURRENT FOSTER INFOS */}
            {animal.accueillant && ( 
              <div className="w-60 md:w-auto">
                <h3 className="font-body font-bold mb-4">Famille d'accueil</h3>
                
                <div className="px-6 mb-3 md:grid-cols-2 md:grid md:max-w-96">
                  <div className="mb-2 mt-2">
                    <p className="text-sm italic leading-3">Nom</p>
                    <p className="text-sm font-semibold">{animal.accueillant.nom}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm italic leading-3">Téléphone</p>
                    <p className="text-sm font-semibold">{animal.accueillant.telephone}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm italic leading-4">Adresse</p>
                    <p className="text-sm font-semibold leading-3">{animal.accueillant.rue}</p>
                    <p className="text-sm font-semibold ">{animal.accueillant.code_postal} {animal.accueillant.commune}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm italic leading-3">Pays</p>
                    <p className="text-sm font-semibold">{animal.accueillant.pays}</p>
                  </div>
                  <div>
                    <p className="text-sm italic leading-3">Hébergement</p>
                    <p className="text-sm font-semibold">{animal.accueillant.hebergement}</p>
                  </div>
                </div>
              </div>
            )}
                    
            {/* REQUEST HISTORY  */} 
            { animal.demandes.length ? (
                <div className="px-4">
                  <h3 className="font-body font-bold mb-4">Historique des demandes d'accueil</h3>
                  
                  <table className="mb-3 rounded-b-lg rounded-lg border-separate ">
                    <thead className=" text-fond text-sm bg-accents2 font-grands font-semibold p-3 border-accents2-dark border-solid border-1">
                      <tr>
                        <th className="px-2 pt-2  border-accents2-light border-solid border-1 text-center">Famille</th>
                        <th className="px-2 pt-2  border-accents2-light border-solid border-1 text-center">Date de demande</th>
                        <th className="px-2 pt-2  border-accents2-light border-solid border-1 text-center">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="rounded-lg border-separate ">
                      {requestItems}
                    </tbody>
                  </table>
                </div>    
            ) : ( <></> )}
          </section>             
        </div>
      </div>
    </main>
  )
}

export default ShelterResidentDetails;