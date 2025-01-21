import {  Animal } from "../../../@types/Animal";
import { Link } from "react-router-dom"

type AnimalCardProps = {
  animal: Animal;
}

const AnimalCard = ({ animal }: AnimalCardProps) => {
  const url = animal.images_animal[0].url;

    return (
      <div className="bg-zoning rounded-lg shadow dark:bg-gray-800 md:flex-col">
      <div className="relative md:w-full flex justify-center items-center">
        { url ? (
          <img className="font-body rounded-lg" src={`../../src/assets`+`${url}`} alt={`Photo de ${animal.nom}`}></img>
        ) : (
          <img className="font-body rounded-lg" src="../../src/assets/images/animal_empty.webp" alt="Photo à venir" />
        )}
        
      </div>
      <div className="flex-auto text-center">
        <div className="flex flex-wrap">
          <h3 className="flex-auto text-xl md:text-3xl font-semibold dark:text-gray-50">{animal.nom}</h3>
          <h4 className="flex-none w-full mt-2 text-xs md:text-xl font-medium text-gray-500 dark:text-gray-300">{animal.espece.nom}</h4>
          <hr />
          <p className="flex-none w-full mt-2 text-xs md:text-xl font-medium text-gray-500 dark:text-gray-300">Age : {animal.age}</p>
          <p className="flex-none w-full mt-2 text-xs md:text-xl font-medium text-gray-500 dark:text-gray-300">Localisation : {animal.refuge.code_postal}</p>
        </div>
        <div className="flex text-sm font-medium justify-center">
          <Link className="my-2 bg-accents1-light text-fond w-[90%] transition ease-in duration-200 text-center text-xs md:text-2xl font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" to={`/animaux/${animal.id}`}>Découvrir</Link>
        </div>
      </div>
    </div>
    )
}

export default AnimalCard;