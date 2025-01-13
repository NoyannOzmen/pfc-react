import { useEffect, useState } from 'react';
import { Animal } from '../../../@types/Animal';
import AnimalCarouselCardThree from '../Animals/AnimalCarouselCardThree';

function CarouselOfThree() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  /*   const { products } = useRootContext(); */
  useEffect(() => {
    const script = document.createElement('script');
  
    script.src="../../../src/assets/utils/carouselOfThree.js";
    script.async = true;
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/animaux`);
        const data = await response.json();
        setAnimals(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAnimals();
  }, []);

  const animalItemsThree = animals.map((animal) => (
    <AnimalCarouselCardThree key={animal.id} animal={animal} />
  ))

  return (
    <section id="animal-carousel3" className=" flex flex-row max-[767px]:hidden relative mx-auto w-[90%] h-auto bg-zoning rounded-lg shadow dark:bg-gray-800">
        
    <button
    className="absolute top-0 start-0 z-1 flex items-center justify-center h-full pl-2 cursor-pointer group focus:outline-none size-10 opacity-75"
    type="button" id="previous3" aria-label="Précédent" tabIndex={0}><img src="../../../src/assets/icons/left.svg" alt="" /></button>
    
    <div className="h-auto w-auto flex rounded-lg my-6 gap-4 px-8">
      {animalItemsThree}
    </div>
    
    <button
    className="absolute top-0 end-0 z-1 flex items-center justify-center h-full pr-2 cursor-pointer group focus:outline-none size-10 opacity-75"
    type="button" id="next3" aria-label="Suivant" tabIndex={0}><img src="../../../src/assets/icons/right.svg" alt="" /></button>
    
    </section>
  )
}

export default CarouselOfThree;