import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useUserContext } from "../../../contexts/UserContext";

function FosterProfile() {
  const isInitialMount = useRef(true);

  const { user, setUser } = useUserContext();

  if (!user) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const famille = user.accueillant;

  const [updatedInfos, setUpdatedInfos ] = useState({
    id: '',
    prenom : '',
    nom: '',
    email: '',
    hebergement: '',
    terrain : '',
    rue: '',
    commune : '',
    code_postal : ''
  })

/*   useEffect(() => {
    const script = document.createElement('script');
  
    script.src="../../../src/assets/utils/editInputs.js";
    script.async = true;
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }); */

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch
          (`${import.meta.env.VITE_API_URL}/famille/profil`,
          {
            method: 'POST',
            headers: { "Content-type" : "application/json" },
            body: JSON.stringify(updatedInfos),
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

        /* setUser(data); */

        const newState = Object.assign({}, user?.state);
        newState.accueillant = data;
        setUser(newState);
      } catch (error) {
        console.error(error);
      }
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetchUser();
    }
  }, [ updatedInfos ]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const { prenom, nom, email, hebergement, terrain, rue, commune, code_postal } = Object.fromEntries(formData);

    const userId = user?.accueillant.id;

    setUpdatedInfos({
      id: userId as string,
      prenom: prenom as string,
      nom: nom as string,
      email: email as string,
      hebergement: hebergement as string,
      terrain: terrain as string,
      rue: rue as string,
      commune: commune as string,
      code_postal: code_postal as string
    });
  }

  function allowEdit(e: any) {
    const field = e.target.closest('fieldset')
    const inputs = field.querySelectorAll('input')
    const validate = document.getElementById("validate");
  
  if (validate && validate.classList.contains('hidden')) {
    validate.classList.toggle('hidden')
  }
  
  inputs.forEach((input : any) => {
    input.disabled = false;
    input.required = true
    input.classList.add('bg-fond')
    if (input.id === 'terrain' || input.id === 'prenom') {
      input.required = false;
    } 
  })
  }

  return(
    <main className="justify-self-stretch flex-1">
	<h2 className="font-grands text-3xl text-center my-2 py-6">Bienvenue sur votre espace personnel</h2>
  <div className="flex flex-col content-center justify-center mx-auto mb-4 w-[80%]">

    <nav className="flex flex-wrap justify-center md:justify-start">
      <ul className="flex flex-wrap-reverse gap-x-2 mx-3 justify-center font-semibold md:justify-start md:ml-10 text-xl">
        <li><Link to="/famille/profil" tabIndex={0}><button id="dashbtn-1" className="dashbtn dashbtn-active" tabIndex={-1}>Mon profil</button></Link></li>
        <li><Link to="/famille/profil/demandes" tabIndex={0}><button id="dashbtn-2" className="dashbtn" tabIndex={-1}>Demandes</button></Link></li>
      </ul>
      <div className="mx-2 grow w-[90%] h-2 bg-accents1-dark rounded-t-lg"></div>
    </nav>

    <div className="font-body bg-zoning rounded-lg shadow dark:bg-gray-800 mb-4">

      <section className="flex flex-wrap justify-center" id="dashboard-container">
        <h3 className="font-grands text-3xl text-center my-2 pt-5 w-full">Mon profil</h3>

        {/* <% if(locals.message.length != 0){ %>
          <div>
            <p className="font-grands font-base text-accents1 text-center"message.erreur %></p>
          </div>
        <% } %> */}

        <form className="flex flex-col flex-wrap content-center justify-around text-texte w-full" onSubmit={handleSubmit}>
          
          <fieldset className="w-[60%] font-body rounded-lg shadow dark:bg-gray-800 my-2 py-5">
            <legend className="text-center">Mes informations&nbsp;<span tabIndex={0} className="material-symbols-outlined" onClick={allowEdit}>edit</span></legend>

            <div className="mx-auto p-2"> 
              <label className="text-center w-full" htmlFor="prenom">Prénom</label>
              <input className="block w-full" type="text" id="prenom" name="prenom" defaultValue={famille.prenom == null ? '' : famille.prenom } disabled />
            </div>
            <div className="mx-auto p-2">
              <label className="text-center w-full" htmlFor="nom">Nom</label>
              <input className="block w-full" type="text" id="nom" name="nom" defaultValue={famille.nom} disabled />
            </div>
            <div className="mx-auto p-2">
              <label className="text-center w-full" htmlFor="email">Email</label>
              <input className="block w-full" type="email" id="email" name="email" defaultValue={user.email} disabled />
            </div>
          </fieldset>
      
          <fieldset className="font-body rounded-lg shadow dark:bg-gray-800 my-2 py-5">
            <legend className="text-center">Mon accueil&nbsp;<span tabIndex={0} className="material-symbols-outlined" onClick={allowEdit}>edit</span></legend>

              <div className="mx-auto p-2">
                <label className="text-center w-full" htmlFor="hebergement">Type</label>
                <input className="block w-full" type="text" id="hebergement" name="hebergement" defaultValue={famille.hebergement} disabled />
              </div>

              <div className="mx-auto p-2">
                <label className="text-center w-full" htmlFor="terrain">Terrain</label>
                <input className="block w-full" type="text" id="terrain" name="terrain" defaultValue={famille.terrain == null ? '' : famille.terrain} disabled />
              </div>

              <div className="mx-auto p-2">
                <label className="text-center w-full" htmlFor="rue">Rue</label>
                <input className="block w-full" type="text" id="rue" name="rue" defaultValue={famille.rue} disabled />
              </div>

              <div className="mx-auto p-2">       
                <label className="text-center w-full" htmlFor="commune">Commune</label>
                <input className="block w-full" type="text" id="commune" name="commune" defaultValue={famille.commune} disabled />
              </div>

              <div className="mx-auto p-2">
                <label className="text-center w-full" htmlFor="code_postal">Code Postal</label>
                <input className="block w-full" type="text" id="code_postal" name="code_postal" pattern="^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$" defaultValue={famille.code_postal} disabled />
              </div>

{/*               <!-- <label htmlFor="departement">Département</label>
              <input className="block w-full" type="number" id="departement" name="departement" defaultValue={famille.departement} disabled /> --> */}
          </fieldset>

{/*           <!-- 
          <fieldset className="font-body rounded-lg shadow dark:bg-gray-800 my-2 py-5">
            <legend className="text-center">Je peux accueillir</legend>
            <% especes.forEach(espece => {}              <div>
                <label className="text-center w-full" htmlFor={espece.nom}{espece.nom}/label>
                <input className=# type="checkbox" id={espece.nom} name={espece.nom} />
              </div>
            <% })}          </fieldset>
          --> */}

          <button id="validate" className="hidden w-[60%] mx-auto my-3 py-2 px-4 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" type="submit">Valider les modifications</button>
        </form>
        <form className="flex flex-col flex-wrap content-center justify-around text-texte" action="/famille/profil/delete" method="POST" /* onSubmit={return confirm('Voulez-vous vraiment supprimer votre profil ? Cette action est irréversible !')} */>
          <button id="deleteAccount" className="w-[60%] mx-auto my-3 py-2 px-4 bg-accents2-dark text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" type="submit">Supprimer mon profil</button>
          <p className="text-center w-full">ATTENTION ! Cette suppression est définitive !</p>
        </form>
      </section>
    </div>
  </div>
</main>


  )
}

export default FosterProfile;