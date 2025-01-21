import {  Animal } from "../../../@types/Animal";
import { Link } from "react-router-dom"

type AnimalCardProps = {
  animal: Animal;

}

const AnimalCarouselCardOne = ({ animal }: AnimalCardProps) => {
  const url = animal.images_animal[0].url;
    return (
        <div className="hidden carousel-img">
          <div className="flex bg-fond rounded-lg shadow dark:bg-gray-800 flex-col md:flex-col mx-auto my-2 w-[75%] p-4">
            <div className="w-full md:w-full flex justify-center items-center">
            { url ? (
            <img className="object-contain md:h-full rounded-lg" src={`../../src/assets`+`${url}`} alt={`Photo de ${animal.nom}`} />
            ) : (
            <img className="object-contain md:h-full rounded-lg" src="../../src/assets/images/animal_empty.webp" alt="Photo à venir" />
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
    )
};

export default AnimalCarouselCardOne;