import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useRootContext } from '../../../routes/Root';
import CarouselOfThree from '../Animals/CarouselOfThree';
import CarouselOfOne from '../Animals/CarouselOfOne';

function ShelterDetails() {
  const { shelterId } = useParams();
	const { shelters } = useRootContext();

	const shelter = shelters.find(({ id }) => Number(id) === Number(shelterId));

  if (!shelter) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  
  const shelterUrl = shelter.images_association[0].url;

  return (
    <main className="justify-self-stretch flex-1">
  <section className="flex flex-col mx-auto mt-2">
    <h2 className="font-grands text-2xl md:text-3xl text-center w-full my-6">{shelter.nom}</h2>

    <div className="font-body mx-auto w-[80%] rounded-lg my-1 justify-center flex">
       	{ shelterUrl ? (
					<img className="rounded-lg" src={`../../src/assets`+`${shelterUrl}`} alt={`Logo de ${shelter.nom}`}></img>
				) : (
					<img className="rounded-lg" src="../../src/assets/images/shelter_empty.webp" alt={`Logo de ${shelter.nom} bientôt visible`} />
				)}
    </div>

    <article className="font-body mx-auto w-[90%] md:w-[60%] bg-zoning rounded-lg shadow dark:bg-gray-800 my-4">
      <div className="text-center w-full">
        <h3 className="font-grands text-xl md:text-3xl text-center my-1 w-full">Informations</h3>
      </div>

      <div className="w-full py-2 px-2 text-xs">
        <p className="font-body text-texte md:text-center md:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus magni rerum, unde sunt beatae ipsam rem est sequi minus eligendi doloremque aliquid laudantium eos perspiciatis obcaecati ea voluptas harum et?</p>
      </div>

       <div className="w-full px-2 py-4 gap-2 text-xs flex flex-col">
        <p className="font-body text-texte text-center md:text-base">Adresse : {shelter.rue},&nbsp;{shelter.code_postal},&nbsp;{shelter.commune},&nbsp;{shelter.pays}</p>
        <p className="font-body text-texte text-center md:text-base">Téléphone : {shelter.telephone}</p>
        {/* <p className="font-body text-texte text-center md:text-base">E-mail : <%= shelter.identifiant_shelter.email %></p>	 */}
      </div>
    </article>
  </section>
	
  <section className="p-2 block">
    <h2 className="font-grands text-xl text-center my-2 md:md:text-2xl">Ils vous y attendent de patte ferme !</h2>
      <CarouselOfOne />

      <CarouselOfThree />
  </section>
</main>



  )
}

export default ShelterDetails;