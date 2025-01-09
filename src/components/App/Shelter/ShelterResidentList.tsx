import { Link } from "react-router-dom";

function ShelterResidentList() {
  return(
    <main className="justify-self-stretch flex-1">
  <h2 className="font-grands text-3xl text-center my-2 pt-5">Mon espace association</h2>
  
 {/*  <!-- Conteneur général qui contient tout le dashboard --> */}
  <div className="flex flex-col content-center justify-center mx-auto mb-4 w-[80%]">
    
    <nav className="flex flex-wrap justify-center md:justify-start">
      <ul className="flex flex-wrap-reverse gap-x-2 mx-3 justify-center font-semibold md:justify-end md:ml-10 text-xl">
        <li><Link to="/associations/profil" tabIndex={0}><button id="dashbtn-1" className="dashbtn" tabIndex={-1}>Profil</button></Link></li>
        <li><Link to="/associations/profil/demandes" tabIndex={0}><button id="dashbtn-2" className="dashbtn" tabIndex={-1}>Demandes</button></Link></li>
        <li><Link to="/associations/profil/animaux" tabIndex={0}><button id="dashbtn-3" className="dashbtn dashbtn-active" tabIndex={-1}>Animaux</button></Link></li>
      </ul>
      <div className="mx-2 grow w-[90%] h-2 bg-accents1-dark rounded-t-lg"></div>
    </nav>
    
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
        <form autoComplete="off" className="my-4 px-4 flex flex-wrap gap-3 justify-center md:w-1/4 md:absolute md:top-0 md:right-5 md:my-2 md:p-0 md:pr-4 md:justify-end z-10" action="">

          <div className=" flex gap-x-1.5 text-center h-5">
            <label className="hidden">Recherche</label>
            <input id="search-bar" className="bg-fond rounded-full block pl-2 md:w-32 lg:w-full shrink-0" type="text" placeholder="Rechercher" />
            <span id="search-dropdown-button" role="button" className="material-symbols-outlined bg-fond rounded-full">
              arrow_drop_down
              </span>
          </div>
          
          <div id="search-filters" className="flex gap-4 hidden md:bg-fond p-4 rounded-lg border-accents2 md:border-4">
            <fieldset>
{/*               <% especes.forEach(espece => { %>
                <div className="flex gap-x-1.5 content-center mb-1"> 
                  <input type="checkbox" id="espece_<%= espece.id %>" name="espece_<%= espece.id %>" value="<%= espece.id %>"  className="species-checkbox checkbox leading-3"/>
                  <label htmlFor="espece_<%= espece.id %>" className=" font-grands font-semibold text-xs leading-3 self-center"> <%= espece.nom %></label>
                </div>   
              <% }) %> */}
                <div className="flex gap-x-1.5 content-center"> 
                  <input type="checkbox" id="espece_all" name="espece_all" value="all" checked className="leading-3"/>
                  <label htmlFor="espece_all" className=" font-grands font-semibold text-xs leading-3 self-center"> Tous</label>
                </div>   
            </fieldset>

            <fieldset> 
              <div className="flex gap-x-1.5 content-center"> 
                <input type="checkbox" id="satut_En_refuge" name="satut_En_refuge" value="En refuge"  className="mb-1 statut-checkbox checkbox leading-3"/>
                <label htmlFor="satut_En_refuge" className=" font-grands font-semibold text-xs leading-3 self-center">En refuge</label>
              </div>   
              
              <div className="flex gap-x-1.5 content-center"> 
                <input type="checkbox" id="satut_Accueilli" name="satut_Accueilli" value="Accueilli"  className="mb-1 statut-checkbox checkbox leading-3"/>
                <label htmlFor="satut_Accueilli" className=" font-grands font-semibold text-xs leading-3 self-center">Accueilli</label>
              </div> 
              
              <div className="flex gap-x-1.5 content-center"> 
                <input type="checkbox" id="satut_Adopté" name="satut_Adopté" value="Adopté"  className="mb-1 statut-checkbox checkbox leading-3"/>
                <label htmlFor="satut_Adopté" className=" font-grands font-semibold text-xs leading-3 self-center">Adopté</label>
              </div> 

              <div className="flex gap-x-1.5 content-center"> 
                <input type="checkbox" id="statut_all" name="statut_all" value="all" checked className="leading-3"/>
                <label htmlFor="statut_all" className=" font-grands font-semibold text-xs leading-3 self-center"> Tous</label>
              </div>   
            </fieldset>
          </div> 
        </form>
          
{/*         <div className=" self-center flex flex-wrap p-4 justify-center gap-3.5">            
            <% animals.forEach(animal => { %>  
              <!-- ANIMAL CARD POUR LE DASHBOARD ASSO -->  
              <a data-animalId="<%= animal.id %>" data-nom="<%= animal.nom %>" data-espece="<%= animal.espece.id %>"  data-statut="<%= animal.statut %>" className="animal_card animal_card--visible flex flex-col justify-between content-center relative bg-fond rounded-xl w-36 h-36 shrink-0 md:size-60" to="/associations/profil/animaux/<%= animal.id %>">
                <!-- ICI ATTENTION IL FAUDRAIT PEUT ËTRE CHERCHER L'IMAGE AVEC L'ORDRE LE PLUS FAIBLE ?? -->
                <% if (animal.images_animal.length) { %>
                  <img className="rounded-t-xl" src="<%= animal.images_animal[0].url %>" alt="Photo de <%= animal.nom %>" />
                 <% } else { %>
                  <img className="rounded-t-xl" src="../../src/assets/images/animal_empty.webp" alt="image par défaut" />
                  
                <% } %>
                
                <p className="text-sm text-center font-semibold md:text-base"><%= animal.nom %></p>
                <div className="flex flex-wrap justify-between px-2 pt-0.5">
                  
                  <div className="w-full flex justify-around content-center">
                    <p className="espece-nom text-xs italic md:text-base"> <%= animal.espece.nom %></p>
                    <p className="text-xs italic md:text-base"> <%= animal.statut %></p>
                  </div>
                </div>
              </a> 
            <% }) %>    
        </div> */}
      </section>
    </div>    
  </div>
  {/* <script src="/utils/dashboardAssoListeAnimal.js"></script> */}
</main>



  )
}

export default ShelterResidentList;