import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useRootContext } from '../../../routes/Root';
import { useUserContext } from '../../../contexts/UserContext';
import CarouselOfThree from '../Animals/CarouselOfThree';
import CarouselOfOne from '../Animals/CarouselOfOne';

function AnimalDetails() {
	const isInitialMount = useRef(true);

	const { animalId } = useParams();
	const { animals } = useRootContext();
	const { user } = useUserContext();

	const animal = animals.find(({id}) => Number(id) === Number(animalId));

	if (!animal) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }

	const animalUrl = animal.images_animal[0].url;
	const shelterUrl = animal.refuge.images_association.url;

	const tagItems = animal.tags.map((tag: any) => (
		<button key={tag.id} className="group p-1 rounded-lg bg-accents1-dark text-fond text-center">
					{tag.nom}
					<span className="group-hover:block hidden z-10 bg-accents2-dark text-fond absolute px-2 py-2 text-xs rounded-b-xl rounded-tr-xl">
						{tag.description}
					</span>
		</button>
  ))

/* 	useEffect(() => {
    const script = document.createElement('script');
    if (window.innerWidth > 768) {
      script.src="../../../src/assets/utils/carouselOfThree.js";
    } else { 
      script.src="../../../src/assets/utils/carouselOfOne.js";
    }
    script.defer = true;
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, [window.innerWidth]); */

	const [ requestInfos, setRequestInfos ] = useState({
		animalId: '',
		familleId: '',
	})

/* 	useEffect(() => {
    async function sendRequest() {
      try {
        const response = await fetch
          (`${import.meta.env.VITE_API_URL}/animaux/${animalId}/faire-une-demande`,
          {
            method: 'POST',
            headers: { "Content-type" : "application/json" },
            body: JSON.stringify(requestInfos),
          }
        );

        if (!response.ok) {
          switch (response.status) {
            case 401: {
              const { message } = await response.json();
              throw new Error(message);
            }

            case 404:
              throw new Error("La page demandée n'existe pas.");

            case 500:
              throw new Error(
                'Une erreur est survenue, merci de ré-essayer ultérieurement.'
              );

            default:
              throw new Error(`HTTP ${response.status}`);
          }
        }

        const data = await response.json();
				console.log(data)
      } catch (error) {
        console.error(error);
      }
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      sendRequest();
    }
  }, [ requestInfos ]); */

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    /* const formData = new FormData(event.currentTarget);
    const { prenom, nom, email, hebergement, terrain, rue, commune, code_postal } = Object.fromEntries(formData); */

    const userId = user?.accueillant.id;

    setRequestInfos({
      familleId: userId as string,
      animalId: animalId as string,
    });

		try {
			const response = await fetch
				(`${import.meta.env.VITE_API_URL}/animaux/${animalId}/faire-une-demande`,
				{
					method: 'POST',
					headers: { "Content-type" : "application/json" },
					body: JSON.stringify(requestInfos),
				}
			);

			if (!response.ok) {
				switch (response.status) {
					case 401: {
						const { message } = await response.json();
						throw new Error(message);
					}

					case 404:
						throw new Error("La page demandée n'existe pas.");

					case 500:
						throw new Error(
							'Une erreur est survenue, merci de ré-essayer ultérieurement.'
						);

					default:
						throw new Error(`HTTP ${response.status}`);
				}
			}

			const data = await response.json();
			console.log(data)
		} catch (error) {
			console.error(error);
		}
  }

  return (
    <main className="flex flex-wrap flex-col md:flex-row justify-self-stretch flex-1 w-full place-content-evenly 2xl:w-1/2 2xl:self-center">
  <section className="flex flex-col m-4 flex-1 max-[767px]:mx-4 md:ml-6 place-content-evenly">
		<h2 className="font-grands text-2xl md:text-3xl text-center w-full my-6">{animal.nom}</h2>

		<div className="font-body mx-auto w-[80%] bg-zoning rounded-lg shadow dark:bg-gray-800 my-4">
			{ animalUrl ? (
				<img className="mx-auto my-2"
				src={`../../src/assets`+`${animalUrl}`} alt={`Photo de ${animal.nom}`} />
			) : (
				<img className="mx-auto my-2" src="../../src/assets/images/animal_empty.webp" alt="Photo à venir" />
			)}
		</div>
		<article className="font-body mx-auto w-[80%] bg-zoning rounded-lg shadow dark:bg-gray-800 my-4">
			<div className="text-center w-full py-2">
				<h3 className="font-grands text-3xl text-center my-2 w-full">A propos de {animal.nom}</h3>
			</div>

			
			<div className="text-center w-full py-2">
				{tagItems}
			</div>
			
			<div className="text-center w-full py-2">
				<p className="font-body text-texte">Nom : {animal.nom}</p>
				<p className="font-body text-texte">Age : {animal.age}&nbsp;ans</p>
				<p className="font-body text-texte">Sexe : {animal.sexe}</p>
			</div>
			<div className="text-center w-full py-2">
				<p className="font-body text-texte">Espèce : {animal.espece.nom}</p>
				{animal.race && (
				<p className="font-body text-texte">Race : {animal.race}</p>
				)}
				<p className="font-body text-texte">Couleur : {animal.couleur}</p>
			</div>
			<div className="text-center w-full py-2">
				<p className="font-body text-texte">Statut : {animal.statut}</p>
			</div>

			<div className="text-center w-full py-2">
				<p className="font-body text-texte">Son petit truc en plus :<br />{animal.description}</p>
			</div>
				{ user && user.accueillant && (
				<div className="text-center w-full py-2">
					{/* <% if(locals.message.erreur){ %>
						<div>
							<p className="font-grands font-base text-accents1 text-center"><%= message.erreur %></p>
						</div>
					<% } %>
					<% if(locals.message.succes){ %>
						<div>
							<p className="font-grands font-base text-accents1 text-center"><%= message.succes%></p>
						</div>
					<% } %> */ }
					<form onSubmit={handleSubmit}>
					<button type="submit" className="mx-auto my-3 py-2 px-6 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">Faire une demande</button>
					</form>
				</div>
				)}
		</article>

	</section>
	
 	{/* Mini association profile */}
	<section className="flex flex-col md:my-8 flex-none  md:max-w-[50%] max-[767px]:mx-4 md:mr-6 md:mt-32 py-6">
		<article className="font-body mx-auto w-full bg-zoning rounded-lg shadow dark:bg-gray-800 my-4">
			<h3 className="font-grands text-3xl text-center my-2 pt-5 w-full">{animal.nom}<br />vous attend chez<br />{animal.refuge.nom}</h3>


			<div className="font-body mx-auto w-[80%] rounded-lg my-4">
 				{ shelterUrl ? (
					<img className="mx-auto"
					src={`../../src/assets`+`${shelterUrl}`} alt={`Logo de ${animal.refuge.nom}`}></img>
				) : (
					<img className="mx-auto" src="../../src/assets/images/shelter_empty.webp" alt={`Logo de ${animal.refuge.nom} bientôt visible`} />
				)}
			</div>

			<div className="text-center w-full py-2">
				<p className="font-body text-texte">Adresse : {animal.refuge.rue},<br />{animal.refuge.code_postal},&nbsp;{animal.refuge.commune},&nbsp;{animal.refuge.pays}</p>
				<p className="font-body text-texte">Téléphone : {animal.refuge.telephone}</p>
				<p className="font-body text-texte">E-mail : {animal.refuge.identifiant_association.email}</p>
				{ animal.refuge.description && <p className="hidden md:block font-body text-texte">{animal.refuge.description}</p> }
			</div>
				
			<div className="text-center w-full py-2">
				<Link className="w-[60%] mx-auto my-3 py-2 px-4 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" to={`/associations/${animal.refuge.id}`}>En savoir plus</Link>
			</div>
		</article>
	</section>
	
	{/* Carousels */ }

	<section className="p-4 py-6 block">
		<h2 className="font-grands text-3xl text-center my-2">Ils vous attendent de patte ferme !</h2>
		{ window.innerWidth > 768 ? (
			<CarouselOfThree />
		) : (
			<CarouselOfOne />
		)}	
	</section>

</main>


  )
};

export default AnimalDetails;