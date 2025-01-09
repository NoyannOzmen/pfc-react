import { Link } from "react-router-dom";

function ShelterResidentProfileList() {
  return(
    <main className="justify-self-stretch flex-1">
	<h2 className="font-grands text-3xl text-center my-2 pt-5">Mon espace association</h2>
  
  {/* <!-- Conteneur général qui contient tout le dashboard --> */}
  <div className="flex flex-col content-center justify-center mx-auto mb-4 w-[80%]">
    
    <nav className="flex flex-wrap justify-center md:justify-start">
      <ul className="flex flex-wrap-reverse gap-x-2 mx-3 justify-center font-semibold md:justify-start md:ml-10 text-xl">
        <li><Link to="/associations/profil" tabIndex={0}><button id="dashbtn-1" className="dashbtn" tabIndex={-1}>Profil</button></Link></li>
        <li><Link to="/associations/profil/demandes" tabIndex={0}><button id="dashbtn-2" className="dashbtn" tabIndex={-1}>Demandes</button></Link></li>
        <li><Link to="/associations/profil/animaux" tabIndex={0}><button id="dashbtn-3" className="dashbtn dashbtn-active" tabIndex={-1}>Animaux</button></Link></li>
      </ul>
      <div className="mx-2 grow w-[90%] h-2 bg-accents1-dark rounded-t-lg"></div>
    </nav>
    
    {/* <!-- Conteneur du sous menu et de la section --> */}
    <div className="flex flex-col bg-zoning rounded-lg">
      
      <nav className="rounded-lg">
        <ul className="rounded-t-lg flex bg-accents2 justify-stretch font-semibold text-fond text-sm md:justify-start md:pl-8">
          <li className=" rounded-tl-lg block grow text-center pl-2 border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4 md:rounded-none md:border-l-2 md:border-l-zoning bor"><Link to="/associations/profil/animaux">Nos animaux</Link></li>
          <li className="dashsubbtn-active block grow text-center border-r-solid border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4 "><Link to="/associations/profil/animaux/suivi">Suivi accueils</Link></li>
          <li className="block grow text-center pr-2 py-2 rounded-tr-lg hover:underline md:grow-0 md:px-4 md:rounded-none md:border-r-solid md:border-r-2 md:border-r-zoning"><Link to="/associations/profil/animaux/nouveau-profil">Créer un profil</Link></li>
        </ul>
      </nav>
      
      <section className="flex flex-wrap justify-center" id="dashboard-container">
        <h3 className="hidden md:inline font-grands text-3xl text-center my-2 pt-5 w-full">Suivi des animaux accueillis</h3>
        
        <div className="w-full mx-4 my-6">
          <table className="text-left w-full">
            
            <tr className="border-none bg-zoning text-sm font-grands">
              <th>Nom Animal</th>
              <th>Famille d'Accueil</th>
            </tr>
            
            {/* <% animals.forEach(animal => { %>
              <tr tabIndex={0} className="view  text-fond text-sm bg-accents2 font-grands font-semibold p-3 border-accents2-dark border-solid border-1 hover:bg-accents2-dark">
                <td className="px-2 pt-2  border-accents2-dark border-solid border-1"><%= animal.nom %></td>
                <td className="px-2 pt-2  border-accents2-dark border-solid border-1"><%= animal.accueillant.nom %></td>
              </tr>
              
              <tr className="fold hidden mb-3 bg-fond rounded-b-lg ">
                <td className="w-full rounded-xl" colspan="2">

                  <!-- CONTENEUR POUR LES INFORMATIONS -->
                  <div className="flex flex-wrap p-2 justify-center md:flex-nowrap" >
                    
                    <!-- Partie Animal -->
                    <div className="w-full md:w-1/2">
                      <h3 className="font-body font-bold">Animal</h3>
                      
                      <div className="flex p-6 pb-4">
                        <div className="flex flex-col gap-2">
                          <% if (animal.images_animal.length > 0) { %>
                            <img className="w-28 rounded-lg" src="<%= animal.images_animal[0].url %>" alt="Photo de <%= animal.nom %>">
                          <% } else { %>
                            <img className="w-28 rounded-lg" src="/images/animal_empty.webp" alt="Photo à venir">
                          <% } %>
                          <a className="rounded-full block bg-accents1 text-fond w-16 text-center text-xs font-semibold py-1 hover:underline" to="/associations/profil/animaux/<%= animal.id %>">Détails</a>
                        </div>
                        
                        <div className="pl-4">
                          <p className="text-base italic leading-3">Nom</p>
                          <p className="text-base font-semibold"><%= animal.nom %></p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 px-6 gap-y-2">
                        <div>
                          <p className="text-sm italic leading-3">Age</p>
                          <p className="text-base font-semibold"><%= animal.age %> ans</p>
                        </div>
                        
                        <div>
                          <p className="text-sm italic leading-3">Sexe</p>
                          <p className="text-base font-semibold"><%= animal.sexe %></p>
                        </div>
                        
                        <div className="">
                          <p className="text-sm italic leading-3">Espèce</p>
                          <p className="text-base font-semibold"><%= animal.espece.nom %></p>
                        </div>

                        <% if (animal.race) { %>
                          <div>
                            <p className="text-sm italic leading-3">Race</p>
                            <p className="text-base font-semibold"><%= animal.race %></p>
                          </div>
                        <% } %>
                      </div>

                        <% if (animal.tags) { %>
                          <div className="flex flex-wrap mt-4 px-6 gap-1">
                            <% animal.tags.forEach(tag => { %>
                              
                              <p className="group rounded-full block bg-accents1 text-fond text-center text-xs font-semibold py-1 px-2">
                                <%= tag.nom %>
                                <span className="group-hover:block hidden z-10 bg-accents2-dark text-fond absolute px-2 py-2 text-xs rounded-b-xl rounded-tr-xl">
                                  <%= tag.description  %>
                                </span>
                              </p>
                            <% }) %>
                          </div>
                        <% } %>   
                    </div>  
                          
                    <hr className="border-t-accents2 w-2/4 border-t-2 border-solid justify-self-center my-4 md:hidden">
                          
                    <!-- PARTIE FAMILLE -->
                    <div className="w-full md:w-1/2">      
                      <h3 className="font-body font-bold mb-4">Famille</h3>

                      <div className="px-6 mb-3 md:grid-cols-2 md:grid">
                        <div className="mb-2 mt-2">
                          <p className="text-sm italic leading-3">Nom</p>
                          <p className="text-base font-semibold"><%= animal.accueillant.nom %></p>
                        </div>
                        <div className="mb-2">
                          <p className="text-sm italic leading-3">Téléphone</p>
                          <p className="text-base font-semibold"><%= animal.accueillant.telephone %></p>
                        </div>
                        <div className="mb-2">
                          <p className="text-sm italic leading-3">e-mail</p>
                          <p className="text-base font-semibold"><%= animal.accueillant.identifiant_famille.email %></p>
                        </div>
                        <div className="mb-2">
                          <p className="text-sm italic leading-4">Adresse</p>
                          <p className="text-base font-semibold leading-3"><%= animal.accueillant.rue %></p>
                          <p className="text-base font-semibold "><%= animal.accueillant.code_postal %> <%= animal.accueillant.commune  %></p>
                        </div>
                        <div className="mb-2">
                          <p className="text-sm italic leading-3">Pays</p>
                          <p className="text-base font-semibold"><%= animal.accueillant.pays %></p>
                        </div>
                        <div>
                          <p className="text-sm italic leading-3">Hébergement</p>
                          <p className="text-base font-semibold"><%= animal.accueillant.hebergement %></p>
                        </div>
                      </div>      
                    </div>
                  </div>
                </td>
              </tr>
            <% }) %> */}                  
          </table>
        </div>             
      </section>
    </div>
  </div> 
  {/* <script src="/utils/dashboardAssoSuiviAccueil.js"></script> */}
</main>
          

   
  )
}

export default ShelterResidentProfileList;