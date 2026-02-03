import { useState } from 'react';
import { useRootContext } from '../../../contexts/RootContext';
import AnimalCard from './AnimalCard';
import DptSelect from '../StaticPages/DptSelect';
import { IAnimal } from '../../../@types';

function AnimalList() {
  const { animals, species, tags } = useRootContext();

  const available = animals.filter(({ statut }) => statut === 'En refuge');

  const [sheltered, setSheltered] = useState(available);

  const animalItems = sheltered.map((animal: IAnimal) => (
    <AnimalCard key={animal.id} animal={animal} />
  ));

  const speciesItems = species.map(espece => (
    <option key={espece.id} value={espece.nom}>
      {espece.nom}
    </option>
  ));

  const tagItems = tags.map(tag => (
    <div key={tag.id}>
      <label htmlFor={`${tag.nom}`}>{tag.nom}</label>
      <input onChange={handleCheck} type="checkbox" name="tag" id={tag.nom} value={tag.nom} />
    </div>
  ));

  //* Search
  const [tag, setTag] = useState<Array<string>>([]);

  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;
    if (checked) {
      setTag([...tag, value]);
    } else {
      setTag(tag.filter((e: string) => e !== value));
    }
  }

  let filtered = sheltered;

  const especeDropdownSmall = document.getElementById('espece-dropdown-small') as HTMLInputElement;
  const especeDropdownFull = document.getElementById('espece-dropdown-full') as HTMLInputElement;
  const minAge = document.getElementById('age-min') as HTMLInputElement;
  const maxAge = document.getElementById('age-max') as HTMLInputElement;
  const dptSelect = document.getElementById('dpt-select') as HTMLSelectElement;

  const sexes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="sexe"]');
  const tagSelect: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="tag"]');
  let sexe: string | undefined = '';

  sexes.forEach(radio => {
    radio.addEventListener('change', () => {
      sexe = handleInputData('sexe');
    });
  });

  function filterResultsSmall(event: React.MouseEvent<HTMLElement>) {
    event?.preventDefault();
    filtered = available;

    if (especeDropdownSmall.value !== 'defaultSmall') {
      filtered = available.filter(animal =>
        animal?.espece.nom.toLowerCase().includes(especeDropdownSmall.value.toLowerCase())
      );

      setSheltered(filtered);
    } else {
      setSheltered(available);
    }
  }

  const handleInputData = (name: string): string | undefined => {
    const options: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      `input[name="${name}"]`
    );
    for (const option of options) {
      if (option.checked) {
        return option.value;
      }
    }
    return undefined;
  };

  function filterResultsFull(event: React.MouseEvent<HTMLElement>) {
    event?.preventDefault();
    filtered = available;

    if (especeDropdownFull.value !== 'defaultFull') {
      filtered = filtered.filter(animal =>
        animal.espece.nom.toLowerCase().includes(especeDropdownFull.value.toLowerCase())
      );
    }

    if (sexe) {
      filtered = filtered.filter(animal => animal.sexe.toLowerCase() === sexe?.toLowerCase());
    }

    if (dptSelect.value !== 'default') {
      filtered = filtered.filter(animal => animal.refuge.code_postal.startsWith(dptSelect.value));
    }

    if (minAge.value) {
      filtered = filtered.filter(animal => animal.age > Number(minAge.value));
    }

    if (maxAge.value) {
      filtered = filtered.filter(animal => animal.age < Number(maxAge.value));
    }

    if (tag.length > 0) {
      let tagFilteringArray: IAnimal[] = [];

      filtered.forEach(animal =>
        tag.forEach(identification => {
          const found = animal.tags.some((tag: { nom: string }) => tag.nom === identification);

          if (!found && !tagFilteringArray.includes(animal)) {
            tagFilteringArray.push(animal);
          }
          if (found && tagFilteringArray.includes(animal)) {
            tagFilteringArray = tagFilteringArray.filter((a: IAnimal) => a !== animal);
          }
        })
      );
      filtered = tagFilteringArray;
    }

    setSheltered(filtered);
  }

  function deploySearch() {
    const shortSearch = document.getElementById('fullSearch');
    shortSearch?.classList.toggle('hidden');

    const filters = document.getElementById('searchCriterias');
    filters?.classList.toggle('hidden');
    filters?.classList.toggle('grid');
  }

  function resetSearch() {
    minAge.value = '';
    maxAge.value = '';
    dptSelect.value = 'default';
    especeDropdownFull.value = 'defaultFull';
    especeDropdownSmall.value = 'defaultSmall';

    sexes.forEach(radio => {
      if (radio.checked) {
        radio.checked = !radio.checked;
      }
    });

    tagSelect.forEach(tag => {
      if (tag.checked) {
        tag.checked = !tag.checked;
      }
    });
    setSheltered(available);
  }

  return (
    <main className="justify-self-stretch flex-1">
      {/* <!-- Menu de recherche --> */}
      <div className="md:my-3 flex flex-wrap font-body w-full bg-zoning rounded-lg shadow dark:bg-gray-800 justify-around">
        <form className="text-texte justify-around">
          <div
            id="fullSearch"
            className="mx-2 col-span-3 items-center flex flex-wrap justify-around"
          >
            <h2 className="font-grands text-2xl w-full my-2 text-center">Rechercher un animal</h2>
            <label htmlFor="espece-dropdown-small">Par espèce</label>
            <select
              tabIndex={0}
              className="col-span-3 text-xs block w-[50%]"
              id="espece-dropdown-small"
              name="especeDropdownSmall"
              defaultValue="defaultSmall"
            >
              <option value="defaultSmall" disabled hidden>
                --Choisissez une espèce--
              </option>
              {speciesItems}
            </select>
            <input
              tabIndex={0}
              onClick={deploySearch}
              id="deploy"
              className="w-[20%] col-span-1 my-1 py-2 px-2 bg-accents2-dark text-fond transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              type="button"
              value="Filtres"
            />
            <input
              tabIndex={0}
              onClick={filterResultsSmall}
              className="w-1/3 col-span-3 mx-auto my-3 py-2 px-2 bg-accents1-light text-fond transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              type="button"
              value="Rechercher"
            />
            <div className="w-full mx-auto flex justify-center">
              <input
                tabIndex={0}
                onClick={resetSearch}
                className="w-[20%] self-center col-span-3 my-1 py-2 px-2 bg-accents2-dark text-fond transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                type="button"
                value="Réinitialiser"
              />
            </div>
          </div>
          <div id="searchCriterias" className="hidden grid-cols-3 gap-1 mx-auto my-3 text-texte">
            <h3 className="col-span-3 font-grands text-3xl text-center my-2">
              Rechercher un animal
            </h3>

            <div className="col-span-1 mx-auto">
              <h4>Caractéristiques</h4>

              {/* <!-- Choix de l'espèce --> */}
              <div className="my-2">
                <label htmlFor="espece-dropdown-full">Espèce</label>
                <select
                  tabIndex={0}
                  className="text-xs block"
                  id="espece-dropdown-full"
                  name="especeDropdownFull"
                  defaultValue="defaultFull"
                >
                  <option value="defaultFull" disabled hidden>
                    --Choisissez une espèce--
                  </option>
                  {speciesItems}
                </select>
              </div>

              {/* <!-- Sexe --> */}
              <div className="my-2">
                <fieldset id="sexe">
                  <legend>Sexe</legend>
                  <label>
                    <input type="radio" name="sexe" value="Mâle" className="mx-1" />
                    Mâle
                  </label>
                  <label>
                    <input type="radio" name="sexe" value="Femelle" className="mx-1" />
                    Femelle
                  </label>
                  <label>
                    <input type="radio" name="sexe" value="Inconnu" className="mx-1" />
                    Inconnu
                  </label>
                </fieldset>
              </div>

              {/* <!-- Selection Age --> */}
              <div className="my-2">
                <p>Age :</p>
                <label htmlFor="age-min">De&nbsp;</label>
                <input id="age-min" name="minAge" type="number" tabIndex={0} min="0" max="3999" />
                <label htmlFor="age-max">&nbsp;à&nbsp;</label>
                <input id="age-max" name="maxAge" type="number" tabIndex={0} min="1" max="4000" />
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
                <select
                  tabIndex={0}
                  className="text-xs block"
                  id="dpt-select"
                  name="dptSelect"
                  defaultValue="default"
                >
                  <DptSelect />
                </select>
              </div>
            </div>

            <input
              tabIndex={0}
              onClick={filterResultsFull}
              className="col-span-3 w-[60%] mx-auto my-3 py-2 px-4 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              type="button"
              value="Rechercher"
            />
            <input
              tabIndex={0}
              onClick={resetSearch}
              className="col-span-3 w-[40%] mx-auto my-3 py-2 px-4 bg-accents2-dark text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              type="button"
              value="Réinitialiser"
            />
          </div>
        </form>
      </div>

      {sheltered.length ? (
        <div className="grid grid-flow-row-dense grid-cols-3 gap-3 m-3">{animalItems}</div>
      ) : (
        <h3 className="font-grands text-2xl w-full my-2 text-center">
          Aucun animal ne correspond à votre recherche
        </h3>
      )}
    </main>
  );
}

export default AnimalList;
