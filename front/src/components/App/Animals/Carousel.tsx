
import { useRootContext } from '../../../contexts/RootContext';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Carousel() {
  const { animals } = useRootContext();
  const params = useParams();

  const [width, setWidth] = useState<number>(0)

  useEffect(() => setWidth(window.innerWidth), [])

  let sheltered = animals?.filter(({ statut }) => statut === "En refuge");

  //* Checks if a slug exists in url,
  // then will try to determine which page the Carousel is on,
  // in order to return a list of all other animals in the same shelter.
  if(params.slug) {
    const animal = animals.find((a) => a.slug === params.slug);

    sheltered = (animal)
    ? sheltered?.filter(({ association_id }) => Number(association_id) === Number(animal?.association_id))
    : sheltered?.filter((s) => s.refuge.slug === params.slug);
  }

  //* Only displays animal cards if "sheltered" both exists and has content,
  // otherwise displays information message
  const animalItemsOne = (sheltered && Object.keys(sheltered).length) ?
    sheltered?.map((animal, index) => (
    <div key={animal.id} className={width < 768 ? ("carousel-img " + (index === 0 ? "" : "hidden")) : ("carousel3-img place-self-center " + (index < 3 ? "" : "hidden"))}>
        <div className="flex bg-fond rounded-lg shadow dark:bg-gray-800 flex-col md:flex-col mx-auto my-2 w-[75%] p-4">
          <div className="w-full md:w-full flex justify-center items-center">
          { animal.images_animal.length > 0 ? (
          <img className="object-contain md:h-full rounded-lg" src={`${import.meta.env.VITE_API_URL}` + `${animal.images_animal[0].url}`} alt={`Photo de ${animal.nom}`} />
          ) : (
          <img className="object-contain md:h-full rounded-lg" src="/images/animal_empty.webp" alt="Photo à venir" />
          )}
          </div>

          <div className="flex-auto text-center">
            <div className="flex flex-wrap my-2">
              <h3 className="flex-auto text-xl font-semibold dark:text-gray-50">{animal.nom}</h3>
              <h4 className="flex-none w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">{animal.espece.nom}</h4>
              <hr />
              <p className="flex-none w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">Age : {animal.age}</p>
              <p className="flex-none w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">Localisation : {animal.refuge.code_postal}</p>
            </div>

            <div className="flex mb-4 text-sm font-medium">
              <Link className="py-2 px-4 bg-accents1-light text-fond w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              to={`/animaux/${animal.slug}`}>Découvrir</Link>
            </div>
          </div>
        </div>
      </div>
    ))
    : 
    <div className="h-auto mx-auto rounded-lg p-4 md:w-auto md:flex md:my-6 md:gap-4 md:px-8">
      <p className="font-body text-texte md:text-center md:text-lg">Aucun animal n'est actuellement proposé à l'adoption. Revenez plus tard !</p>
    </div>

  let i = 0;
  const carouselPics = document.querySelectorAll('.carousel-img');

  function getOneNextPic() {

    if (i < carouselPics.length - 1) {
      carouselPics[i].classList.toggle('hidden');
      carouselPics[i+1].classList.toggle('hidden');
      i++;   
    };
  }

  function getOnePreviousPic() {

      if (i > 0) {
        carouselPics[i].classList.toggle('hidden');
        carouselPics[i-1].classList.toggle('hidden');
        i--;   
      };  
    };

    function getThreeNextPic() {
      const carouselPics3 = document.querySelectorAll('.carousel3-img');
      if (i < carouselPics3.length - 3) {
        carouselPics3[i].classList.toggle('hidden');
        carouselPics3[i+3].classList.toggle('hidden');
        i++;   
      };
    }
  
    function getThreePreviousPic() {
      const carouselPics3 = document.querySelectorAll('.carousel3-img');
      if (i > 0) {
        carouselPics3[i+2].classList.toggle('hidden');
        carouselPics3[i-1].classList.toggle('hidden');
        i--;   
      }; 
    };

  return (
    <section id="animal-carousel" className="md:flex md:flex-row relative mx-auto h-auto w-[90%] bg-zoning rounded-lg shadow dark:bg-gray-800">
    
        <button
        className="absolute top-0 start-0 z-1 flex items-center justify-center h-full pl-2 cursor-pointer group focus:outline-none  size-10 opacity-75"
        type="button" id="previous" aria-label="Précédent" tabIndex={0}>
          <img src="/icons/left.svg" alt="" onClick={width < 768 ? (getOnePreviousPic) : (getThreePreviousPic)} />
        </button>
        
        <div className="h-auto mx-auto rounded-lg p-4 md:w-auto md:flex md:my-6 md:gap-4 md:px-8">
          {animalItemsOne}
        </div>
        
        <button
        className="absolute top-0 end-0 z-1 flex items-center justify-center h-full pr-2 cursor-pointer group focus:outline-none size-10 opacity-75"
        type="button" id="next" aria-label="Suivant" tabIndex={0}>
          <img src="/icons/right.svg" alt="" onClick={width < 768 ? (getOneNextPic) : (getThreeNextPic)} />
        </button>

    </section>

  )
}

export default Carousel;