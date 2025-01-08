/* import { useRootContext } from '../../../routes/Root'; */
import { Link } from 'react-router-dom';

/* import Categories from '../Categories/Categories';
import Products from '../Products/Products'; */

/* import '../../../index.css' */

function HomePage() {
  /*   const { products } = useRootContext(); */
  
  return (
    <main className="justify-self-stretch flex-1 flex flex-col">
      <section className="flex flex-col h-[80%] bg-right bg-cover bg-unai place-content-center">
      <div className="flex flex-col rounded-2xl bg-texte/35 py-10 m-6 max-w-4xl">
      <h2 className="stroke-title font-grands px-12 text-5xl">Parce que chaque animal a besoin d'un toit...</h2>
      <p className="text-fond p-12 max-w-4xl text-base">Vous aimez les animaux et êtes soucieux de leur bien-être ?<br />Vous souhaitez venir en aide à un refuge proche de vous ?<br />Vous n'êtes pas encore sûrs de pouvoir adopter durablement un animal ?<br />Vous n'avez jamais eu d’animal mais aimeriez bien en avoir un ?</p>
      <div className="px-12">
      <Link to="/devenir-famille-d-accueil" className="text-base rounded-full bg-accents1 hover:bg-accents1-light text-fond font-bold uppercase p-4">Devenez famille d'accueil</Link>
      </div>
      </div>
      </section>
      
      <section className="p-4 block mx-auto">
      <h2 className="font-grands text-3xl text-center my-2">Ils vous attendent de patte ferme !</h2>
      {/* <!-- Carousel of ONE -->
        <section id="animal-carousel" className="md:hidden relative mx-auto h-auto w-[90%] bg-zoning rounded-lg shadow dark:bg-gray-800">
        
        <button
        className="absolute top-0 start-0 z-1 flex items-center justify-center h-full pl-2 cursor-pointer group focus:outline-none  size-10 opacity-75"
        type="button" id="previous" aria-label="Précédent" tabindex="0"><img src="/icons/left.svg" alt=""></button>
        
        <div className="h-auto mx-auto rounded-lg p-4">
        <% animals.forEach(animal=> { %>
        <div className="hidden carousel-img">
        <div className="flex bg-fond rounded-lg shadow dark:bg-gray-800 flex-col md:flex-col mx-auto my-2 w-[75%] p-4">
        <div className="w-full md:w-full flex justify-center items-center">
        <% if (animal.images_animal.length > 0) { %>
        <img className="object-contain md:h-full rounded-lg"
        src="<%= animal.images_animal[0].url %>" alt="Photo de <%= animal.nom %>">
        <% } else { %>
        <img className="object-contain md:h-full rounded-lg" src="/images/animal_empty.webp" alt="Photo à venir">
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
        animal.refuge.code_postal %>
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
        type="button" id="next" aria-label="Suivant" tabindex="0"><img src="/icons/right.svg" alt=""></button>
        
        </section>
        
        <!-- Carousel of THREE -->
        <section id="animal-carousel3" className=" flex flex-row max-[767px]:hidden relative mx-auto w-[90%] h-auto bg-zoning rounded-lg shadow dark:bg-gray-800">
        
        <button
        className="absolute top-0 start-0 z-1 flex items-center justify-center h-full pl-2 cursor-pointer group focus:outline-none size-10 opacity-75"
        type="button" id="previous3" aria-label="Précédent" tabindex="0"><img src="/icons/left.svg" alt=""></button>
        
        <div className="h-auto w-auto flex rounded-lg my-6 gap-4 px-8">
        <% animals.forEach(animal=> { %>
        <div className="hidden carousel3-img place-self-center">
        <div className="flex bg-zoning rounded-lg shadow dark:bg-gray-800 flex-row md:flex-col p-4">
        <div className="w-full md:w-full flex justify-center items-center">
        
        <% if (animal.images_animal.length > 0) { %>
        <img className="object-contain w-[80%] h-48 md:h-full rounded-lg"
        src="<%= animal.images_animal[0].url %>" alt="Photo de <%= animal.nom %>">
        <% } else { %>
        <img className="object-contain w-[80%] h-48 md:h-full rounded-lg" src="/images/animal_empty.webp" alt="Photo à venir">
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
        animal.refuge.code_postal %>
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
        type="button" id="next3" aria-label="Suivant" tabindex="0"><img src="/icons/right.svg" alt=""></button>
        
        </section>*/}
      </section>
    </main>
  );
}
  
export default HomePage;