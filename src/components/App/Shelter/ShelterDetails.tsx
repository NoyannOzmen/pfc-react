function ShelterDetails() {
  return (
    <main className="justify-self-stretch flex-1">
  <section className="flex flex-col mx-auto mt-2">
    {/* <h2 className="font-grands text-2xl md:text-3xl text-center w-full my-6"><%= association.nom %></h3> */}

{/*     <div className="font-body mx-auto w-[80%] rounded-lg my-1 justify-center flex">
      <% if (association.images_association.length > 0 ) { %>
        <img src="../..src/assets<%= association.images_association[0].url %>" className="rounded-lg"  alt="Logo de <%= association.nom %>" />
      <% } else { %>
        <img src="../..src/assets/images/shelter_empty.webp" alt="Logo de <%= association.nom %> bientôt visible">
      <% } %>
    </div> */}

    <article className="font-body mx-auto w-[90%] md:w-[60%] bg-zoning rounded-lg shadow dark:bg-gray-800 my-4">
      <div className="text-center w-full">
        <h3 className="font-grands text-xl md:text-3xl text-center my-1 w-full">Informations</h3>
      </div>

      <div className="w-full py-2 px-2 text-xs">
        <p className="font-body text-texte md:text-center md:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus magni rerum, unde sunt beatae ipsam rem est sequi minus eligendi doloremque aliquid laudantium eos perspiciatis obcaecati ea voluptas harum et?</p>
      </div>

{/*       <div className="w-full px-2 py-4 gap-2 text-xs flex flex-col">
        <p className="font-body text-texte text-center md:text-base">Adresse : <%= association.rue %>,&nbsp;<%= association.code_postal %>,&nbsp;<%= association.commune%>,&nbsp;<%= association.pays %></p>
        <p className="font-body text-texte text-center md:text-base">Téléphone : <%= association.telephone %></p>
        <p className="font-body text-texte text-center md:text-base">E-mail : <%= association.identifiant_association.email %></p>	
      </div> */}
    </article>
  </section>
	
  <section className="p-2 block">
    <h2 className="font-grands text-xl text-center my-2 md:md:text-2xl">Ils vous y attendent de patte ferme !</h2>
      {/* <!-- Carousel of ONE --> */}
 {/*      <section id="animal-carousel" className="md:hidden relative mx-auto h-auto w-[90%] bg-zoning rounded-lg shadow dark:bg-gray-800">

        <button
          className="absolute top-0 start-0 z-1 flex items-center justify-center h-full pl-2 cursor-pointer group focus:outline-none  size-10 opacity-75"
          type="button" id="previous" aria-label="Précédent" tabIndex={0}><img src="../..src/assets/icons/left.svg" alt="" /></button>

        <div className="h-auto mx-auto rounded-lg p-4">
          <% association.pensionnaires.forEach(animal=> { %>
            <div className="hidden carousel-img">
              <div className="flex bg-fond rounded-lg shadow dark:bg-gray-800 flex-col md:flex-col mx-auto my-2 w-[75%] p-4">

                <div className="w-full md:w-full flex justify-center items-center">
                  <% if (animal.images_animal.length > 0) { %>
                    <img className="object-contain md:h-full rounded-lg"
                    src="../..src/assets<%= animal.images_animal[0].url %>" alt="Photo de <%= animal.nom %>">
                  <% } else { %>
                    <img className="object-contain md:h-full rounded-lg" src="../..src/assets/images/animal_empty.webp" alt="Photo à venir">
                  <% } %>
                </div>


                <div className="flex-auto text-center">
                  <div className="flex flex-wrap my-2">
                    <h3 className="flex-auto text-xl font-semibold dark:text-gray-50">
                      <%= animal.nom %>
                    </h3>
                    <h4 className="flex-none w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">
                      <%= animal.espece.nom %>
                    </h4>
                    <hr>
                    <p className="flex-none w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">Age : <%= animal.age
                        %>
                    </p>
                    <p className="flex-none w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">Localisation : <%=
                        animal.departement %>
                    </p>
                  </div>
                  <div className="flex mb-4 text-sm font-medium">
                    <a className="py-2 px-4 bg-accents1-light text-fond w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                      href="/animaux/<%= animal.id %>">Découvrir</a>
                  </div>
                </div>
              </div>
            </div>
          <% }) %>
        </div>

        <button
          className="absolute top-0 end-0 z-1 flex items-center justify-center h-full pr-2 cursor-pointer group focus:outline-none size-10 opacity-75"
          type="button" id="next" aria-label="Suivant" tabIndex={0}><img src="../..src/assets/icons/right.svg" alt="" /></button>

      </section> */}

      {/* <!-- Carousel of THREE --> */}
{/*       <section id="animal-carousel3" className=" flex flex-row max-[767px]:hidden relative mx-auto w-[60%] h-auto rounded-lg shadow dark:bg-gray-800">
      
        <button
          className="absolute top-0 start-0 z-1 flex items-center justify-center h-full pl-2 cursor-pointer group focus:outline-none size-10 opacity-75"
          type="button" id="previous3" aria-label="Précédent" tabIndex={0}><img src="../..src/assets/icons/left.svg" alt="" /></button>
      
        <div className="h-auto w-auto flex rounded-lg my-6 gap-4 px-8">
          <% association.pensionnaires.forEach(animal=> { %>
            <div className="hidden carousel3-img place-self-center">
              <div className="flex bg-zoning rounded-lg shadow dark:bg-gray-800 flex-row md:flex-col p-2">

                <div className="w-6 md:w-full flex justify-center items-center">
                  <% if (animal.images_animal.length > 0 ) { %>
                    <img className="object-contain w-[80%] h-48 md:h-full rounded-lg"
                    src="../..src/assets<%= animal.images_animal[0].url %>" alt="Photo de <%= animal.nom %>">
                  <% } else { %>
                      <img className="object-contain w-[80%] h-48 md:h-full rounded-lg" src="../..src/assets/images/animal_empty.webp" alt="Photo à venir">
                  <% } %>
                </div>

                <div className="flex-auto text-center">
                  <div className="flex flex-wrap my-2">
                    <h3 className="flex-auto text-xl font-semibold dark:text-gray-50">
                      <%= animal.nom %>
                    </h3>
                    <h4 className="flex-none w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">
                      <%= animal.espece.nom %>
                    </h4>
                    <hr>
                    <p className="flex-none w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">Age : <%= animal.age
                        %>
                    </p>
                    <p className="flex-none w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">Localisation : <%=
                        association.code_postal %>
                    </p>
                  </div>
                  <div className="flex mb-4 text-sm font-medium">
                    <a className="py-2 px-4 bg-accents1-light text-fond w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                      href="/animaux/<%= animal.id %>">Découvrir</a>
                  </div>
                </div>
              </div>
            </div>
          <% }) %>
        </div>
      
        <button
          className="absolute top-0 end-0 z-1 flex items-center justify-center h-full pr-2 cursor-pointer group focus:outline-none size-10 opacity-75"
          type="button" id="next3" aria-label="Suivant" tabIndex={0}><img src="../..src/assets/icons/right.svg" alt="" /></button>
      
      </section> */}
  </section>
	<script async src="../..src/assets/utils/carousel.js"></script>
</main>



  )
}

export default ShelterDetails;