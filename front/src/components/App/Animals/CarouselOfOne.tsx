import { useRootContext } from '../../../routes/Root';
import { useParams } from 'react-router-dom';
import AnimalCarouselCardOne from '../Animals/AnimalCarouselCardOne';

function CarouselOfOne() {
  const { animals } = useRootContext();

  const { animalId } = useParams();

  let sheltered = animals.filter(({ statut }) => statut === "En refuge");

  if ( animalId ) {
    const baseline = animals.find(( { id }) => Number(id) === Number(animalId));

    sheltered = sheltered.filter(({ association_id }) => Number(association_id) === Number(baseline.association_id))
  }

  const animalItemsOne = sheltered.map((animal) => (
    <AnimalCarouselCardOne key={animal.id} animal={animal} />
  ))

  return (
    <section id="animal-carousel" className="md:hidden relative mx-auto h-auto w-[90%] bg-zoning rounded-lg shadow dark:bg-gray-800">
        
    <button
    className="absolute top-0 start-0 z-1 flex items-center justify-center h-full pl-2 cursor-pointer group focus:outline-none  size-10 opacity-75"
    type="button" id="previous" aria-label="Précédent" tabIndex={0}><img src="../../../src/assets/icons/left.svg" alt="" /></button>
    
    <div className="h-auto mx-auto rounded-lg p-4">
    {animalItemsOne}
    </div>
    
    <button
    className="absolute top-0 end-0 z-1 flex items-center justify-center h-full pr-2 cursor-pointer group focus:outline-none size-10 opacity-75"
    type="button" id="next" aria-label="Suivant" tabIndex={0}><img src="../../../src/assets/icons/right.svg" alt="" /></button>
    
    </section>
  )
}

export default CarouselOfOne;