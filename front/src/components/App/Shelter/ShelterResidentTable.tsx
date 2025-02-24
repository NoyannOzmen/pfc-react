import { IAnimal } from "../../../@types/index";
import { Link } from "react-router-dom";

type ShelterResidentTableProps = {
  animal: IAnimal;
}

function ShelterResidentTable({ animal }: ShelterResidentTableProps) {

  function handleClick(e: any) {
    const fold = e.currentTarget.nextSibling;
    fold.classList.toggle('hidden')
   };

  return(
    <tbody>
      <tr onClick={handleClick} tabIndex={0} className="view  text-fond text-sm bg-accents2 font-grands font-semibold p-3 border-accents2-dark border-solid border-1 hover:bg-accents2-dark">
        <td className="px-2 pt-2  border-accents2-dark border-solid border-1">{animal.nom}</td>
        <td className="px-2 pt-2  border-accents2-dark border-solid border-1">{animal.accueillant.nom}</td>
      </tr>
                
      <tr className="fold hidden mb-3 bg-fond rounded-b-lg ">
        <td className="w-full rounded-xl" colSpan={2}>

          {/* WRAPPER */}
          <div className="flex flex-wrap p-2 justify-center md:flex-nowrap" >
              
            {/* ANIMAL */}
            <div className="w-full md:w-1/2">
              <h3 className="font-body font-bold">Animal</h3>
              
              <div className="flex p-6 pb-4">
                <div className="flex flex-col gap-2">
                  { animal.images_animal[0].url ? (
                    <img className="w-28 rounded-lg" src={`${import.meta.env.VITE_API_URL}` + `${animal.images_animal[0].url}`} alt={`Photo de ${animal.nom}`} />
                  ) : (
                    <img className="w-28 rounded-lg" src="/images/animal_empty.webp" alt="Photo à venir" />
                  )}
                  <Link className="rounded-full block bg-accents1 text-fond w-16 text-center text-xs font-semibold py-1 hover:underline" to={`/associations/profil/animaux/${animal.id}`}>Détails</Link>
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

                { animal.race &&
                  <div>
                    <p className="text-sm italic leading-3">Race</p>
                    <p className="text-base font-semibold">{animal.race}</p>
                  </div>
                }
              </div>

                { animal.tags &&
                  <div className="flex flex-wrap mt-4 px-6 gap-1">
                    { animal.tags.map((tag : any) => (
                      <p key={`${animal.id} tag n° ${tag.id}`} className="group rounded-full block bg-accents1 text-fond text-center text-xs font-semibold py-1 px-2">
                          {tag.nom}
                          <span className="group-hover:block hidden z-10 bg-accents2-dark text-fond absolute px-2 py-2 text-xs rounded-b-xl rounded-tr-xl">
                            {tag.description}
                          </span>
                      </p>
                    ))}
                  </div>
                } 
            </div>  
                    
            <hr className="border-t-accents2 w-2/4 border-t-2 border-solid justify-self-center my-4 md:hidden" />
                    
            {/* FOSTER */}
            <div className="w-full md:w-1/2">      
              <h3 className="font-body font-bold mb-4">Famille</h3>

              <div className="px-6 mb-3 md:grid-cols-2 md:grid">
                <div className="mb-2 mt-2">
                  <p className="text-sm italic leading-3">Nom</p>
                  <p className="text-base font-semibold">{animal.accueillant.nom}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm italic leading-3">Téléphone</p>
                  <p className="text-base font-semibold">{animal.accueillant.telephone}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm italic leading-3">e-mail</p>
                  <p className="text-base font-semibold">{animal.accueillant.identifiant_famille.email}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm italic leading-4">Adresse</p>
                  <p className="text-base font-semibold leading-3">{animal.accueillant.rue}</p>
                  <p className="text-base font-semibold ">{animal.accueillant.code_postal} {animal.accueillant.commune }</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm italic leading-3">Pays</p>
                  <p className="text-base font-semibold">{animal.accueillant.pays}</p>
                </div>
                <div>
                  <p className="text-sm italic leading-3">Hébergement</p>
                  <p className="text-base font-semibold">{animal.accueillant.hebergement}</p>
                </div>
              </div>      
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  )
};

export default ShelterResidentTable;