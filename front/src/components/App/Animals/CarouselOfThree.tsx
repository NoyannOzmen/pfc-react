import { useParams, Link } from 'react-router-dom';
import { useRootContext } from '../../../routes/Root';
/* import AnimalCarouselCardThree from '../Animals/AnimalCarouselCardThree'; */

function CarouselOfThree() {
  const { animals } = useRootContext();

  const { animalId } = useParams();

  let sheltered = animals.filter(({ statut }) => statut === "En refuge");

  if ( animalId ) {
    const baseline = animals.find(( { id }) => Number(id) === Number(animalId));

    sheltered = sheltered.filter(({ association_id }) => Number(association_id) === Number(baseline.association_id))
  }

  const animalItemsThree = sheltered.map((animal, index) => (
    <div key={animal.id} className={"carousel3-img place-self-center " + (index < 3 ? "" : "hidden")}>
          <div className="flex bg-zoning rounded-lg shadow dark:bg-gray-800 flex-row md:flex-col p-4">
            <div className="w-full md:w-full flex justify-center items-center">
            { animal.images_animal ? (
            <img className="object-contain w-[80%] h-48 md:h-full rounded-lg" src={`../../src/assets`+`${animal.images_animal[0].url}`} alt={`Photo de ${animal.nom}`} />
            ) : (
              <img className="object-contain w-[80%] h-48 md:h-full rounded-lg" src="../../src/assets/images/animal_empty.webp" alt="Photo à venir" />
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

  let i = 0

  const carouselPics3 = document.querySelectorAll('.carousel3-img');

  function getThreeNextPic() {

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
    <section id="animal-carousel3" className=" flex flex-row max-[767px]:hidden relative mx-auto w-[90%] h-auto bg-zoning rounded-lg shadow dark:bg-gray-800">
        
    <button
    className="absolute top-0 start-0 z-1 flex items-center justify-center h-full pl-2 cursor-pointer group focus:outline-none size-10 opacity-75"
    type="button" id="previous3" aria-label="Précédent" tabIndex={0}><img src="../../../src/assets/icons/left.svg" alt="" 
    onClick={getThreePreviousPic} /></button>
    
    <div className="h-auto w-auto flex rounded-lg my-6 gap-4 px-8">
      {animalItemsThree}
    </div>
    
    <button
    className="absolute top-0 end-0 z-1 flex items-center justify-center h-full pr-2 cursor-pointer group focus:outline-none size-10 opacity-75"
    type="button" id="next3" aria-label="Suivant" tabIndex={0}><img src="../../../src/assets/icons/right.svg" alt="" 
    onClick={getThreeNextPic} /></button>
    
    </section>
  )
}

export default CarouselOfThree;