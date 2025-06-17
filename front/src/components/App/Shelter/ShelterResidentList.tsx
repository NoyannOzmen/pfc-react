import { Link } from "react-router-dom";
import { useRootContext } from '../../../contexts/RootContext';
import { useUserContext } from "../../../contexts/UserContext";
import DashNav from "./DashNav";

function ShelterResidentList() {
  const { animals, species } = useRootContext();
  const auth = useUserContext();

  if (!auth.user) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const sheltered = animals.filter(({ association_id }) => Number(association_id) === Number(auth.user?.id));

  const shelteredItems = sheltered.map((animal) => (
    <Link key={animal.id} data-animalid={animal.id} data-nom={animal.nom} data-espece={animal.espece.id} data-statut={animal.statut} className="animal_card animal_card--visible flex flex-col justify-between content-center relative bg-fond rounded-xl w-36 h-36 shrink-0 md:size-60" to={`/associations/profil/animaux/${animal.id}`}>
    
    { animal.images_animal[0].url ? (
      <img className="rounded-t-xl" src={`${import.meta.env.VITE_API_URL}` + `${animal.images_animal[0].url}`} alt={`Photo de ${animal.nom}`} />
    ) : (
      <img className="rounded-t-xl" src="/images/animal_empty.webp" alt="Photo à venir" />
    )}
    
    <p className="text-sm text-center font-semibold md:text-base">{animal.nom}</p>
    <div className="flex flex-wrap justify-between px-2 pt-0.5">
      
      <div className="w-full flex justify-around content-center">
        <p className="espece-nom text-xs italic md:text-base">{animal.espece.nom}</p>
        <p className="text-xs italic md:text-base">{animal.statut}</p>
      </div>
    </div>
    </Link> 
  ))

  const speciesItems = species.map((espece) => (
    <div key={espece.id} className="flex gap-x-1.5 content-center mb-1"> 
      <input onClick={handleFilters} type="checkbox" key={espece.id} id={`espece_${espece.id}`} name={`espece_${espece.id}`} value={`espece_${espece.id}`}  className="species-checkbox checkbox leading-3"/>
      <label htmlFor={`espece_${espece.id}`} className="font-grands font-semibold text-xs leading-3 self-center">{espece.nom}</label>
    </div>
  ))

  function displayDropdown() {
    const searchFilters = document.getElementById('search-filters');
    searchFilters?.classList.toggle('hidden')
    searchFilters?.classList.toggle('flex')
  }

  function filterCards (searchFlag : boolean, animalCards : NodeListOf<HTMLElement>) {
    
    //* On initialise et remplit un tableau avec les valeurs qui doivent être filtrées 
    const speciesFilter: string[] = [];
    const speciesCheckboxes = document.querySelectorAll('.species-checkbox') as NodeListOf<HTMLInputElement>;
    if (speciesCheckboxes) {
    speciesCheckboxes.forEach((species) => {
        if (species.checked) {
            speciesFilter.push(species.value)
        }
    });
    }

    const statutFilter: string[] = [];
    const statutCheckboxes = document.querySelectorAll('.statut-checkbox') as NodeListOf<HTMLInputElement>;
    statutCheckboxes.forEach((statut) => {
        if (statut.checked) {
            statutFilter.push(statut.value)
        }
    });
    
    const searchBar = document.getElementById('search-bar') as HTMLInputElement;
    
    const selectedCards = Array.from(animalCards).filter((animalCard)=> {
      const searchArray = 
      [
          animalCard.dataset.nom?.toLowerCase(),
          animalCard.dataset.statut?.toLowerCase(),
          (animalCard.querySelector('.espece-nom') as HTMLParagraphElement).innerText.toLowerCase()
      ]
    
      const F1 = speciesFilter.length ? speciesFilter.includes(animalCard.dataset.espece!) : true;
      const F2 = statutFilter.length ? statutFilter.includes(animalCard.dataset.statut!) : true;
      const F3 = searchArray.some(e => {return e!.includes(searchBar!.value.toLowerCase())});
      
      if (!searchFlag) {
          return (F1&&F2)
      } else {
          return (F1&&F2&&F3)
      };   
    });
    
    return selectedCards
  }

  function handleSearch() {
    const animalCards =  document.querySelectorAll('.animal_card') as NodeListOf<HTMLElement>;
        animalCards.forEach(animalCard => {
            animalCard.classList.add('hidden');
        });
        const searchFlag = (document.getElementById('search-bar') as HTMLInputElement).value.length>3
        
      if (searchFlag) {
      const visibleCards = filterCards(searchFlag, animalCards) as Array<Element>;
      
      visibleCards.forEach((visibleCard) => {
          visibleCard.classList.remove('hidden');
      });
    }
  }

  function handleFilters(event : React.MouseEvent<HTMLInputElement>) {
    if (event.currentTarget.classList.contains('species-checkbox') ) {
      const allSpeciesCheckbox = document.getElementById('espece_all') as HTMLInputElement;
      allSpeciesCheckbox.checked=false
  }
  const allStatutCheckbox = document.getElementById('statut_all') as HTMLInputElement;
  if (event.currentTarget.classList.contains('statut-checkbox') ) {
      allStatutCheckbox!.checked=false
  }
  
  const animalCards =  document.querySelectorAll('.animal_card') as NodeListOf<HTMLElement>;
  animalCards.forEach(animalCard => {
      animalCard.classList.add('hidden');
  });
  const searchFlag = (document.getElementById('search-bar') as HTMLInputElement).value.length>3
  
  const visibleCards = filterCards(searchFlag, animalCards) as Array<Element>;
  
  visibleCards.forEach((visibleCard) => {
      visibleCard.classList.remove('hidden');
  });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return(
    <main className="justify-self-stretch flex-1">
      <h2 className="font-grands text-3xl text-center my-2 pt-5">Mon espace association</h2>
      <div className="flex flex-col content-center justify-center mx-auto mb-4 w-[80%]">
        <DashNav />
        
        {/* <!-- Conteneur du sous menu et de la section --> */}
        <div className="flex flex-col bg-zoning rounded-lg relative">
          
          <nav className="rounded-lg">
            <ul className="rounded-t-lg flex bg-accents2 justify-stretch font-semibold text-fond text-sm md:justify-start md:pl-8">
              <li className="dashsubbtn-active rounded-tl-lg block grow text-center pl-2 border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4 md:rounded-none md:border-l-2 md:border-l-zoning bor"><Link to="/associations/profil/animaux">Nos animaux</Link></li>
              <li className="block grow text-center border-r-solid border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4"><Link to="/associations/profil/animaux/suivi">Suivi accueils</Link></li>
              <li className="block grow text-center pr-2 py-2 rounded-tr-lg hover:underline md:grow-0 md:px-4 md:rounded-none md:border-r-solid md:border-r-2 md:border-r-zoning"><Link to="/associations/profil/animaux/nouveau-profil">Créer un profil</Link></li>
            </ul>
          </nav>
          
          <section id="dahboard-container" className="flex flex-col justify-center content-center">        
            
            {/* <!-- Titre caché pour le mobile --> */}
            <h3 className="text-center hidden md:inline font-grands text-4xl font-extrabold mt-4">Animaux</h3>

            {/* <!-- FONCTION RECHERCHE et TRI --> */}
            <form autoComplete="off" className="my-4 px-4 flex flex-wrap gap-3 justify-center md:w-1/4 md:absolute md:top-0 md:right-5 md:my-2 md:p-0 md:pr-4 md:justify-end z-10" onSubmit={handleSubmit} /* action="" */>

              <div key={"shelteredSearch"} className=" flex gap-x-1.5 text-center h-5">
                <label className="hidden">Recherche</label>
                <input onInput={handleSearch} id="search-bar" className="bg-fond rounded-full block pl-2 md:w-32 lg:w-full shrink-0" type="text" placeholder="Rechercher" />
                <span onClick={displayDropdown} id="search-dropdown-button" role="button" className="material-symbols-outlined bg-fond rounded-full">
                  arrow_drop_down
                  </span>
              </div>
              
              <div key={"shelteredFilter"} id="search-filters" className="gap-4 hidden md:bg-fond p-4 rounded-lg border-accents2 md:border-4">
                <fieldset key={"first"}>
                  {speciesItems}
                  <div key={"all"} className="flex gap-x-1.5 content-center"> 
                    <input type="checkbox" id="espece_all" name="espece_all" value="all" defaultChecked className="leading-3"/>
                    <label htmlFor="espece_all" className=" font-grands font-semibold text-xs leading-3 self-center"> Tous</label>
                  </div>   
                </fieldset>

                <fieldset key={"second"}> 
                  <div className="flex gap-x-1.5 content-center"> 
                    <input onClick={handleFilters} type="checkbox" id="satut_En_refuge" name="satut_En_refuge" value="En refuge"  className="mb-1 statut-checkbox checkbox leading-3"/>
                    <label htmlFor="satut_En_refuge" className=" font-grands font-semibold text-xs leading-3 self-center">En refuge</label>
                  </div>   
                  
                  <div className="flex gap-x-1.5 content-center"> 
                    <input onClick={handleFilters}  type="checkbox" id="satut_Accueilli" name="satut_Accueilli" value="Accueilli"  className="mb-1 statut-checkbox checkbox leading-3"/>
                    <label htmlFor="satut_Accueilli" className=" font-grands font-semibold text-xs leading-3 self-center">Accueilli</label>
                  </div> 
                  
                  <div className="flex gap-x-1.5 content-center"> 
                    <input onClick={handleFilters}  type="checkbox" id="satut_Adopté" name="satut_Adopté" value="Adopté"  className="mb-1 statut-checkbox checkbox leading-3"/>
                    <label htmlFor="satut_Adopté" className=" font-grands font-semibold text-xs leading-3 self-center">Adopté</label>
                  </div> 

                  <div className="flex gap-x-1.5 content-center"> 
                    <input onClick={handleFilters}  type="checkbox" id="statut_all" name="statut_all" value="all" defaultChecked className="leading-3"/>
                    <label htmlFor="statut_all" className=" font-grands font-semibold text-xs leading-3 self-center"> Tous</label>
                  </div>   
                </fieldset>
              </div> 
            </form>
              
            <div className=" self-center flex flex-wrap p-4 justify-center gap-3.5">            
              {shelteredItems}  
            </div>
          </section>
        </div>    
      </div>
    </main>
  )
}

export default ShelterResidentList;