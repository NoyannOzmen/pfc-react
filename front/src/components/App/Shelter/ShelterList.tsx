/* import { Link } from 'react-router-dom'; */
import { useState, useEffect } from 'react';
import { Association } from '../../../@types/Association';
import { Espece } from '../../../@types/Espece';
import ShelterCard from "./ShelterCard";

function ShelterList() {
  const [shelters, setShelters] = useState<Association[]>([]);
  const [species, setSpecies] = useState<Espece[]>([]);
  
  useEffect(() => {
    const script = document.createElement('script');
  
    script.src="../../../src/assets/utils/deploySearch.js";
    script.async = true;
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/associations`);
        const data = await response.json();
        setShelters(data);
      } catch (error) {
        console.error(error);
      }
    }

    const fetchSpecies = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/especes`);
        const data = await response.json();
        setSpecies(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchShelters();
    fetchSpecies();
  }, []);

  const shelterItems = shelters.map((shelter) => (
    <ShelterCard key={shelter.id} shelter={shelter} />
  ))

  const speciesItems = species.map((espece) => (
    <div key={espece.id}>
    <label htmlFor={`${espece.nom}`}>{espece.nom}</label>
    <input type="checkbox" name="espece" id={espece.nom} value={espece.nom}/>
  </div>
  ))

  return (
    <main className="justify-self-stretch flex-1">
      
      {/* <!-- Menu de recherche --> */}
      <div className="md:my-3 flex flex-wrap font-body w-full bg-zoning rounded-lg shadow dark:bg-gray-800 justify-around">
        <form className="text-texte justify-around" action="/associations" method="POST">
          <div id="fullSearch" className="mx-2 col-span-3 items-center flex flex-wrap justify-around">
            <h3 className="font-grands text-2xl w-full my-2 text-center">Rechercher une association</h3>
            <select tabIndex={0} className="col-span-3 text-xs block w-[50%]" id="dpt-select-small" name="dptSelectSmall" defaultValue="default">
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
            <input tabIndex={0} id="deploy" className="w-[20%] col-span-1 my-1 py-2 px-2 bg-accents2-dark text-fond transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" type="button" value="Filtres" />
            <input tabIndex={0} className="w-1/3 col-span-1 mx-auto my-3 py-2 px-2 bg-accents1-light text-fond transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" type="submit" value="Rechercher" />
          </div>
          
          <div id="searchCriterias" className="hidden grid grid-cols-3 gap-1 mx-auto my-3 text-texte">
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
                <label htmlFor="dpt-select">Département</label>
                <select tabIndex={0} className="text-xs block" id="dpt-select-full" name="dptSelectFull" defaultValue="default">
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
              </fieldset>
            </div>
              
            <input tabIndex={0} className="col-span-3 w-[60%] mx-auto my-3 py-2 px-4 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"  type="submit" value="Rechercher" />
              
          </div>
        </form>
      </div>
      
      <div className="flex flex-wrap content-center justify-around my-8">
        <section className="mx-auto w-[80%]">
          <h2 className="font-grands text-3xl text-center my-2">Nos partenaires</h2>
          <p className="mx-auto text-l font-body text-center">Pet Foster Connect a l'honneur de travailler main dans la main avec des refuges et associations de protection Sheltere sur tout le territoire Français.
            <br />Retrouvez-les toutes ci-dessous. Vous pouvez également faire une recherche pour trouver les plus proches de chez vous !
          </p>
        </section>
      </div>

    {/*   <% if (associations.length < 1) { %>
        <h3 className="font-grands text-2xl w-full my-2 text-center">Aucun refuge ne correspond à votre recherche</h3>
      <% } %> */}
      
      <div className="grid grid-cols-3 gap-3 m-3">       
        {shelterItems}
      </div>
    </main>
  )
};

export default ShelterList;