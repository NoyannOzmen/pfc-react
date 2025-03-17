import { useState } from 'react';
import { useRootContext } from '../../../contexts/RootContext';
import AnimalCard from "./AnimalCard";
import DptSelect from '../StaticPages/DptSelect';
import { IAnimal } from '../../../@types';


function AnimalList() {
  const { animals } = useRootContext();
  const { species } = useRootContext();
  const { tags } = useRootContext();

  const [ sheltered, setSheltered ] = useState(
    animals.filter(({ statut }) => statut === "En refuge")
  )

  let animalItems = sheltered.map((animal: IAnimal) => (
    <AnimalCard key={animal.id} animal={animal} />
  ))

  const speciesItems = species.map((espece) => (
    <option key={espece.id} value={espece.nom}>{espece.nom}</option>
  ))

  const tagItems = tags.map((tag) => (
    <div key={tag.id} >
    <label htmlFor={`${tag.nom}`}>{tag.nom}</label>
    <input onChange={handleCheck} type="checkbox" name="tag" id={tag.nom} value={tag.nom} />
  </div>
  ))

  //* Search
  const [tag, setTag] = useState<Array<string>>([]);

  const [formData, setFormData] = useState({
    especeDropdownSmall : '',
    especeDropdownFull: '',
    dptSelect: '',
    sexe: '',
    minAge: '',
    maxAge: '',
    tag
  })

  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;
    if(checked) {
      setTag([...tag, value])
    } else {
      setTag(tag.filter((e : string) => e !== value))
    }
  }

  const handleInputData = (input: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    const inputValue = value;
    setFormData((prevState) => ({
      ...prevState,
      [input]: inputValue,
    }));
  };

  const [userMessage, setUserMessage] = useState(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUserMessage(null)

    tag.length && setFormData((prevState) => ({
      ...prevState,
      tag,
    }));

    try {
      const response = await fetch
        (`${import.meta.env.VITE_API_URL}/animaux`,
        {
          method: 'POST',
          headers: { "Content-type" : "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
				const { message } = await response.json();
				setUserMessage(message)
			}

      const data = await response.json();
      setSheltered(data);
    } catch (error) {
      console.error(error);
    }
  }

  function deploySearch() {
    const shortSearch = document.getElementById('fullSearch');
    shortSearch && shortSearch.classList.toggle('hidden');
  
    const filters = document.getElementById('searchCriterias');
    filters?.classList.toggle('hidden');
    filters?.classList.toggle('grid');
  }

  return (
    <main className="justify-self-stretch flex-1">
  
      {/* <!-- Menu de recherche --> */}
      <div className="md:my-3 flex flex-wrap font-body w-full bg-zoning rounded-lg shadow dark:bg-gray-800 justify-around">
        <form className="text-texte justify-around" onSubmit={handleSubmit}>
          <div id="fullSearch" className="mx-2 col-span-3 items-center flex flex-wrap justify-around">
            <h2 className="font-grands text-2xl w-full my-2 text-center">Rechercher un animal</h2>
            <label htmlFor="espece-dropdown-small">Par espèce</label>
            <select onChange={handleInputData("especeDropdownSmall")} tabIndex={0} className="col-span-3 text-xs block w-[50%]" id="espece-dropdown-small" name="especeDropdownSmall" defaultValue="defaultSmall">
              <option value="defaultSmall" disabled hidden>--Choisissez une espèce--</option>
              {speciesItems}
            </select>
              <input tabIndex={0} onClick={deploySearch} id="deploy" className="w-[20%] col-span-1 my-1 py-2 px-2 bg-accents2-dark text-fond transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" type="button" value="Filtres" />
              <input tabIndex={0} className="w-1/3 col-span-1 mx-auto my-3 py-2 px-2 bg-accents1-light text-fond transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" type="submit" value="Rechercher" />         
          </div>
          <div id="searchCriterias" className="hidden grid-cols-3 gap-1 mx-auto my-3 text-texte">
            <h3 className="col-span-3 font-grands text-3xl text-center my-2">Rechercher un animal</h3> 
            
            <div className="col-span-1 mx-auto">
              <h4>Caractéristiques</h4>
              
              {/* <!-- Choix de l'espèce --> */}
              <div className="my-2">
                <label htmlFor="espece-dropdown-full">Espèce</label>
                <select onChange={handleInputData("especeDropdownFull")} tabIndex={0} className="text-xs block" id="espece-dropdown-full" name="especeDropdownFull" defaultValue="defaultFull">
                  <option value="defaultFull" disabled hidden>--Choisissez une espèce--</option>
                  {speciesItems}
                </select>
              </div>
                
              {/* <!-- Sexe --> */}
              <div className="my-2">
                <fieldset id="sexe">
                  <legend>Sexe</legend>
                  <label><input onChange={handleInputData("sexe")} type="radio" name="sexe" value="Mâle" className="mx-1" />Mâle</label>
                  <label><input onChange={handleInputData("sexe")} type="radio" name="sexe" value="Femelle" className="mx-1"/>Femelle</label>
                  <label><input onChange={handleInputData("sexe")} type="radio" name="sexe" value="Inconnu" className="mx-1"/>Inconnu</label>
                </fieldset>
              </div>
              
              {/* <!-- Selection Age --> */}
              <div className="my-2">
                <p>Age :</p>
                <label htmlFor="age-min">De&nbsp;</label>
                <input onChange={handleInputData("minAge")} id="age-min" name="minAge" type="number" tabIndex={0} min="0" max="3999" />
                <label htmlFor="age-max">&nbsp;à&nbsp;</label>
                <input onChange={handleInputData("maxAge")} id="age-max" name="maxAge" type="number" tabIndex={0} min="1" max="4000" />
                <label>&nbsp;ans.</label>
              </div>
            </div>
              
            {/* <!-- Sélection Tags --> */}
            <div className="col-span-1">
              <p>Exclure si :</p>
              {tagItems}
            </div>
              
            <div className="col-span-1">   
              <div className="my-2">
                {/* <!-- Département --> */}
                <label htmlFor="dpt-select">Département</label>
                <select onChange={handleInputData("dptSelect")} tabIndex={0} className="text-xs block" id="dpt-select" name="dptSelect" defaultValue="default">
                  <DptSelect />
                </select>  
              </div>
            </div>

            <input tabIndex={0} className="col-span-3 w-[60%] mx-auto my-3 py-2 px-4 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"  type="submit" value="Rechercher" />
          </div>
        </form>
      </div>

      {userMessage &&
        <div>
          <p className="font-grands font-base text-accents1 text-center">{userMessage}</p>
        </div>
      }

      { sheltered.length ? (
        <div className="grid grid-flow-row-dense grid-cols-3 gap-3 m-3">
          {animalItems}
        </div>
      ) : (
        <h3 className="font-grands text-2xl w-full my-2 text-center">Aucun animal ne correspond à votre recherche</h3>
      )}

    </main>
  )
}

export default AnimalList;