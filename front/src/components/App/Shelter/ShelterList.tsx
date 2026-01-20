import { useState } from 'react';
import { useRootContext } from '../../../contexts/RootContext';
import ShelterCard from "./ShelterCard";
import DptSelect from '../StaticPages/DptSelect';

function ShelterList() {
  const { shelters, species } = useRootContext();

  let available = shelters;
  //* Displays only shelters with animals up for adoption
  //* Deactived for now, since there would be only one
  /* let available = shelters.filter(({ pensionnaires }) => pensionnaires.some(({ statut }) => statut === "En refuge")) */

  const [ searchedShelters, setSearchedShelters ] = useState(
    available
  )

  const shelterItems = searchedShelters.map((shelter) => (
    <ShelterCard key={shelter.id} shelter={shelter} />
  ))

  const speciesItems = species.map((espece) => (
    <div key={espece.id}>
    <label htmlFor={`${espece.nom}`}>{espece.nom}</label>
    <input onChange={handleCheck} type="checkbox" name="espece" id={espece.nom} value={espece.nom}/>
  </div>
  ))

  const [espece, setEspece] = useState<Array<string>>([]);

  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;
    if(checked) {
      setEspece([...espece, value])
    } else {
      setEspece(espece.filter((e) => e !== value))
    }
  }

  let filtered = shelters;

  let dptSelectSmall = document.getElementById('dpt-select-small') as HTMLInputElement;
  let dptSelectFull = document.getElementById("dpt-select-full") as HTMLInputElement;
  let shelterNom = document.getElementById("shelter-nom") as HTMLSelectElement;

  let animalSelect: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="espece"]');

  function filterResultsSmall(event : any) {
    event?.preventDefault();
    filtered = available;

    if (dptSelectSmall.value !== "default") {
      let filtered = shelters.filter((shelter) =>
        shelter?.code_postal.toLowerCase().startsWith(dptSelectSmall.value.toLowerCase()),
      );

      setSearchedShelters(filtered);
    } else {
      setSearchedShelters(available);
    }
  }

  function filterResultsFull(event : any) {
    event?.preventDefault();
    filtered = available;

    if(dptSelectFull.value !== "default") {
      filtered = filtered.filter((shelter) =>
        shelter.code_postal.toLowerCase().startsWith(dptSelectFull.value.toLowerCase())
    )} else { filtered = filtered }

    if(shelterNom.value) {
      filtered = filtered.filter((shelter) => 
        shelter.nom.toLowerCase().includes(shelterNom.value.toLowerCase())
    )} else { filtered = filtered }

    if(espece.length > 0) {
      let filteringArray : any = [];

      filtered.forEach((shelter) =>
        espece.forEach((identification) => {
          const found = shelter.pensionnaires.find((animal) =>
            animal.espece.nom === identification
          );

          if(found && !filteringArray.includes(shelter)) {
            filteringArray.push(shelter)
          }
          if(!found && filteringArray.includes(shelter)) {
             filteringArray = filteringArray.filter((a : any) => a !== shelter)
            }
        })
      )
      filtered = filteringArray;
    } else { filtered = filtered}
    
    setSearchedShelters(filtered)
  }

  function deploySearch() {
    const shortSearch = document.getElementById('fullSearch');
    shortSearch && shortSearch.classList.toggle('hidden');
  
    const filters = document.getElementById('searchCriterias');
    filters?.classList.toggle('hidden');
    filters?.classList.toggle('grid');
  }

  function resetSearch() {
    shelterNom.value = '';
    dptSelectFull.value = "default";
    dptSelectSmall.value = "default";

    animalSelect.forEach(radio => {
      if (radio.checked) {
        radio.checked = !radio.checked;
      }
    });
    setSearchedShelters(available)
  }

  return (
    <main className="justify-self-stretch flex-1">
      {/* <!-- Menu de recherche --> */}
      <div className="md:my-3 flex flex-wrap font-body w-full bg-zoning rounded-lg shadow dark:bg-gray-800 justify-around">
        <form className="text-texte justify-around">
          <div id="fullSearch" className="mx-2 col-span-3 items-center flex flex-wrap justify-around">
            <h2 className="font-grands text-2xl w-full my-2 text-center">Rechercher une association</h2>
            <label htmlFor="dpt-select-small">Par département</label>
            <select tabIndex={0} className="col-span-3 text-xs block w-[50%]" id="dpt-select-small" name="dptSelectSmall" defaultValue="default">
              <DptSelect />
            </select>
            <input tabIndex={0} onClick={deploySearch} id="deploy" className="w-[20%] col-span-1 my-1 py-2 px-2 bg-accents2-dark text-fond transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" type="button" value="Filtres" />
            <input tabIndex={0} onClick={filterResultsSmall} className="w-1/3 col-span-1 mx-auto my-3 py-2 px-2 bg-accents1-light text-fond transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" type="button" value="Rechercher" />
            <div className='w-full mx-auto flex justify-center'>
              <input tabIndex={0} onClick={resetSearch} className="w-[20%] self-center col-span-3 my-1 py-2 px-2 bg-accents2-dark text-fond transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" type="button" value="Réinitialiser" />  
            </div>
          </div>
          
          <div id="searchCriterias" className="hidden grid-cols-3 gap-1 mx-auto my-3 text-texte">
            <h3 className="col-span-3 font-grands text-3xl text-center my-2">Rechercher une association</h3>
            <div className="col-span-1 mx-auto">
              <fieldset className="mx-auto p-2 my-2">
                {/* <!-- Nom du refuge --> */}
                <label htmlFor="shelter-nom">Nom du refuge</label>
                <input className="text-xs block" type="text" id="shelter-nom" name="shelterNom" placeholder="--Entrez un nom--" />
              </fieldset>
            </div>
            
            <div className="col-span-1">
              <fieldset className="mx-auto p-2 my-2">
                <legend>Animaux</legend>
                {speciesItems}
              </fieldset>
            </div>
              
            <div className="col-span-1">
              <fieldset className="mx-auto p-2 my-2">
              
                {/* <!-- Département --> */}
                <label htmlFor="dpt-select-full">Département</label>
                <select tabIndex={0} className="text-xs block" id="dpt-select-full" name="dptSelectFull" defaultValue="default">
                  <DptSelect />
                </select>
              </fieldset>
            </div>
              
            <input tabIndex={0} onClick={filterResultsFull} className="col-span-3 w-[60%] mx-auto my-3 py-2 px-4 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"  type="button" value="Rechercher" />
            <input tabIndex={0} onClick={resetSearch} className="col-span-3 w-[40%] mx-auto my-3 py-2 px-4 bg-accents2-dark text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" type="button" value="Réinitialiser" />
              
          </div>
        </form>
      </div>
      
      <div className="flex flex-wrap content-center justify-around my-8">
        <section className="mx-auto w-[80%]">
          <h2 className="font-grands text-3xl text-center my-2">Nos partenaires</h2>
          <p className="mx-auto text-l font-body text-center">Pet Foster Connect a l'honneur de travailler main dans la main avec des refuges et associations de protection animale sur tout le territoire Français.
            <br />Retrouvez-les toutes ci-dessous. Vous pouvez également faire une recherche pour trouver les plus proches de chez vous !
          </p>
        </section>
      </div>

      { searchedShelters.length ? (
        <div className="grid grid-cols-3 gap-3 m-3">       
          {shelterItems}
        </div>
      ) : (
        <h3 className="font-grands text-2xl w-full my-2 text-center">Aucun refuge ne correspond à votre recherche</h3>
      )}
    </main>
  )
};

export default ShelterList;