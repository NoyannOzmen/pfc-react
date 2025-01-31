
import { useRootContext } from '../../../contexts/RootContext';
import { useParams, Link } from 'react-router-dom';

function CarouselOfOne() {
  const { animals } = useRootContext();
  const { animalId } = useParams();
  const { shelterId } = useParams();

  let sheltered = animals?.filter(({ statut }) => statut === "En refuge");

  if ( animalId ) {
    const baseline = animals?.find(( { id }) => Number(id) === Number(animalId));

    sheltered = sheltered?.filter(({ association_id }) => Number(association_id) === Number(baseline?.association_id))
  }

  if (shelterId) {
    sheltered = sheltered?.filter(({ association_id }) => Number(association_id) === Number(shelterId))
  }

  const animalItemsOne = sheltered?.map((animal, index) => (
    
    <div key={animal.id} className={"carousel-img " + (index === 0 ? "" : "hidden")}>
          <div className="flex bg-fond rounded-lg shadow dark:bg-gray-800 flex-col md:flex-col mx-auto my-2 w-[75%] p-4">
            <div className="w-full md:w-full flex justify-center items-center">
            { animal.images_animal ? (
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
              to={`/animaux/${animal.id}`}>Découvrir</Link>
              </div>
            </div>
          </div>
        </div>
  ))

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


  return (
    <section id="animal-carousel" className="md:hidden relative mx-auto h-auto w-[90%] bg-zoning rounded-lg shadow dark:bg-gray-800">
        
    <button
    className="absolute top-0 start-0 z-1 flex items-center justify-center h-full pl-2 cursor-pointer group focus:outline-none  size-10 opacity-75"
    type="button" id="previous" aria-label="Précédent" tabIndex={0}><img src="/icons/left.svg" alt="" 
    onClick={getOnePreviousPic} /></button>
    
    <div className="h-auto mx-auto rounded-lg p-4">
    {animalItemsOne}
    </div>
    
    <button
    className="absolute top-0 end-0 z-1 flex items-center justify-center h-full pr-2 cursor-pointer group focus:outline-none size-10 opacity-75"
    type="button" id="next" aria-label="Suivant" tabIndex={0}><img src="/icons/right.svg" alt="" 
    onClick={getOneNextPic} /></button>
    
    </section>
  )
}

export default CarouselOfOne;