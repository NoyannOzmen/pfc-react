import { useState } from 'react';
import { useRootContext } from '../../../contexts/RootContext';
import AnimalCard from "./AnimalCard";


function AnimalList() {
  const { animals } = useRootContext();
  const { species } = useRootContext();
  const { tags } = useRootContext();

  const [ sheltered, setSheltered ] = useState(
    animals.filter(({ statut }) => statut === "En refuge")
  )

  let animalItems = sheltered.map((animal: any) => (
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
  const [tag, setTag] = useState<any>([]);

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
      setTag(tag.filter((e : any) => e !== value))
    }
  }

  const handleInputData = (input: any) => (e: any) => {
    const { value, checked, type, files } = e.target;
    const inputValue =
      type === "checkbox"
        ? checked
        : type === "file"
        ? Array.from(files)
        : value;
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
    filters && filters.classList.toggle('hidden');
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
          <div id="searchCriterias" className="hidden grid grid-cols-3 gap-1 mx-auto my-3 text-texte">
            <h3 className="col-span-3 font-grands text-3xl text-center my-2">Rechercher un animal</h3> 
            
            <div className="col-span-1 mx-auto">
              <h4>Caractéristiques</h4>
              
              {/* <!-- Choix de l'espèce --> */}
              <div className="my-2">
                <label htmlFor="espece-dropdown-full">Espèce</label>
                <select  onChange={handleInputData("especeDropdownFull")} tabIndex={0} className="text-xs block" id="espece-dropdown-full" name="especeDropdownFull" defaultValue="defaultFull">
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
                  <option value="default" disabled hidden>--Choisissez un département--</option>
                  <option value="01">01 - Ain</option> 
                  <option value="02">02 - Aisne</option> 
                  <option value="03">03 - Allier</option> 
                  <option value="04">04 - Alpes-de-Haute-Provence</option> 
                  <option value="05">05 - Hautes-Alpes</option> 
                  <option value="06">06 - Alpes-Maritimes</option> 
                  <option value="07">07 - Ardèche</option> 
                  <option value="08">08 - Ardennes</option> 
                  <option value="09">09 - Ariège</option> 
                  <option value="10">10 - Aube</option> 
                  <option value="11">11 - Aude</option> 
                  <option value="12">12 - Aveyron</option> 
                  <option value="13">13 - Bouches-du-Rhône</option> 
                  <option value="14">14 - Calvados</option> 
                  <option value="15">15 - Cantal</option> 
                  <option value="16">16 - Charente</option> 
                  <option value="17">17 - Charente-Maritime</option> 
                  <option value="18">18 - Cher</option> 
                  <option value="19">19 - Corrèze</option> 
                  <option value="21">21 - Côte-d'Or</option> 
                  <option value="22">22 - Côtes-d'Armor</option> 
                  <option value="23">23 - Creuse</option> 
                  <option value="24">24 - Dordogne</option> 
                  <option value="25">25 - Doubs</option> 
                  <option value="26">26 - Drôme</option> 
                  <option value="27">27 - Eure</option> 
                  <option value="28">28 - Eure-et-Loir</option> 
                  <option value="29">29 - Finistère</option> 
                  <option value="2A">2A - Corse-du-Sud</option> 
                  <option value="2B">2B - Haute-Corse</option> 
                  <option value="30">30 - Gard</option> 
                  <option value="31">31 - Haute-Garonne</option> 
                  <option value="32">32 - Gers</option> 
                  <option value="33">33 - Gironde</option> 
                  <option value="34">34 - Hérault</option> 
                  <option value="35">35 - Ille-et-Vilaine</option> 
                  <option value="36">36 - Indre</option> 
                  <option value="37">37 - Indre-et-Loire</option> 
                  <option value="38">38 - Isère</option> 
                  <option value="39">39 - Jura</option> 
                  <option value="40">40 - Landes</option> 
                  <option value="41">41 - Loir-et-Cher</option> 
                  <option value="42">42 - Loire</option> 
                  <option value="43">43 - Haute-Loire</option> 
                  <option value="44">44 - Loire-Atlantique</option> 
                  <option value="45">45 - Loiret</option> 
                  <option value="46">46 - Lot</option> 
                  <option value="47">47 - Lot-et-Garonne</option> 
                  <option value="48">48 - Lozère</option> 
                  <option value="49">49 - Maine-et-Loire</option> 
                  <option value="50">50 - Manche</option> 
                  <option value="51">51 - Marne</option> 
                  <option value="52">52 - Haute-Marne</option> 
                  <option value="53">53 - Mayenne</option> 
                  <option value="54">54 - Meurthe-et-Moselle</option> 
                  <option value="55">55 - Meuse</option> 
                  <option value="56">56 - Morbihan</option> 
                  <option value="57">57 - Moselle</option> 
                  <option value="58">58 - Nièvre</option> 
                  <option value="59">59 - Nord</option> 
                  <option value="60">60 - Oise</option> 
                  <option value="61">61 - Orne</option> 
                  <option value="62">62 - Pas-de-Calais</option> 
                  <option value="63">63 - Puy-de-Dôme</option> 
                  <option value="64">64 - Pyrénées-Atlantiques</option> 
                  <option value="65">65 - Hautes-Pyrénées</option> 
                  <option value="66">66 - Pyrénées-Orientales</option> 
                  <option value="67">67 - Bas-Rhin</option> 
                  <option value="68">68 - Haut-Rhin</option> 
                  <option value="69">69 - Rhône</option> 
                  <option value="70">70 - Haute-Saône</option> 
                  <option value="71">71 - Saône-et-Loire</option> 
                  <option value="72">72 - Sarthe</option> 
                  <option value="73">73 - Savoie</option> 
                  <option value="74">74 - Haute-Savoie</option> 
                  <option value="75">75 - Paris</option> 
                  <option value="76">76 - Seine-Maritime</option> 
                  <option value="77">77 - Seine-et-Marne</option> 
                  <option value="78">78 - Yvelines</option> 
                  <option value="79">79 - Deux-Sèvres</option> 
                  <option value="80">80 - Somme</option> 
                  <option value="81">81 - Tarn</option> 
                  <option value="82">82 - Tarn-et-Garonne</option> 
                  <option value="83">83 - Var</option> 
                  <option value="84">84 - Vaucluse</option> 
                  <option value="85">85 - Vendée</option> 
                  <option value="86">86 - Vienne</option> 
                  <option value="87">87 - Haute-Vienne</option> 
                  <option value="88">88 - Vosges</option> 
                  <option value="89">89 - Yonne</option> 
                  <option value="90">90 - Territoire de Belfort</option> 
                  <option value="91">91 - Essonne</option> 
                  <option value="92">92 - Hauts-de-Seine</option> 
                  <option value="93">93 - Seine-Saint-Denis</option> 
                  <option value="94">94 - Val-de-Marne</option> 
                  <option value="95">95 - Val-d'Oise</option> 
                  <option value="971">971 - Guadeloupe</option> 
                  <option value="972">972 - Martinique</option> 
                  <option value="973">973 - Guyane</option> 
                  <option value="974">974 - La Réunion</option> 
                  <option value="976">976 - Mayotte</option> 
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