import { useState, useEffect, useRef } from "react";
/* import { useUserContext } from "../../../contexts/UserContext"; */

function FosterSignIn() {
  const isInitialMount = useRef(true);

  /* const { setUser } = useUserContext(); */

  const [fosterInfos, setFosterInfos ] = useState({
    prenom : '',
    nom: '',
    email: '',
    mot_de_passe: '',
    confirmation: '',
    hebergement: '',
    terrain : '',
    rue: '',
    commune : '',
    code_postal : '',
    pays: '',
    telephone: ''
  })


  useEffect(() => {
    const script = document.createElement('script');
  
    script.src="../../../src/assets/utils/apiGouv.js";
    script.defer = true;
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch
          (`${import.meta.env.VITE_API_URL}/famille/inscription`,
          {
            method: 'POST',
            headers: { "Content-type" : "application/json" },
            body: JSON.stringify(fosterInfos),
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
      } catch (error) {
        console.error(error);
      }
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetchUser();
    }
  }, [ fosterInfos, /* setUser */ ]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const { prenom, nom, email, mot_de_passe, confirmation, hebergement, terrain, rue, commune, code_postal, pays, telephone } = Object.fromEntries(formData);

    setFosterInfos({
      prenom: prenom as string,
      nom: nom as string,
      email: email as string,
      mot_de_passe: mot_de_passe as string,
      confirmation: confirmation as string,
      hebergement: hebergement as string,
      terrain: terrain as string,
      rue: rue as string,
      commune: commune as string,
      code_postal: code_postal as string,
      pays: pays as string,
      telephone: telephone as string
    });

    console.log(fosterInfos)
  }

  return (
    <main className="justify-self-stretch flex-1">
  <h2 className="font-grands text-3xl text-center my-2 pt-5">Création de votre compte</h2>
  
  <div className="font-body mx-auto w-[80%] bg-zoning rounded-lg shadow dark:bg-gray-800 my-4 py-6">

    <form className="flex flex-col flex-wrap content-center justify-around text-texte" onSubmit={handleSubmit}>
      
{/*       <% if(locals.message.length != 0){ %>
        <div>
          <p className="font-grands font-base text-accents1 text-center"><%= message.erreur %></p>
        </div>
      <% } %> */}

      <fieldset className="font-body rounded-lg shadow dark:bg-gray-800 my-2 py-5">
        <legend className="font-bold text-lg font-grands text-center">Vos informations</legend>
        <div className="mx-auto p-2">        
          <label className="text-center w-full" htmlFor="prenom">Prénom</label>
          <input className="block bg-fond w-full" type="text" id="prenom" name="prenom" placeholder="Charlotte" required />
        </div>
        <div className="mx-auto p-2">
          <label className="text-center w-full" htmlFor="nom">Nom</label>
          <input className="block bg-fond w-full" type="text" id="nom" name="nom" placeholder="Cripan" required />
        </div>
        <div className="mx-auto p-2">
          <label className="text-center w-full" htmlFor="email">Email</label>
          <input className="block bg-fond w-full" type="email" id="email" name="email" placeholder="chacripan@domain-expansion.io" autoComplete="email" required />
        </div>
        <div className="mx-auto p-2">
          {/* <!-- telephone --> */}
          <label className="text-center w-full" htmlFor="telephone">N° telephone</label>
          <input className="block bg-fond w-full" type="tel" id="telephone" name="telephone" pattern="^(0|\+33 )[1-9]([\-. ]?[0-9]{2} ){3}([\-. ]?[0-9]{2})|([0-9]{8})$" placeholder="01 23 45 67 89" />
        </div>
      </fieldset>
      
      <fieldset className="font-body rounded-lg shadow dark:bg-gray-800 my-2 py-5">
        
        <legend className="font-bold text-lg font-grands text-center">Votre capacité d'hébergement</legend>
        
        {/* <!-- API Adresse --> */}
        <div id="api-container" className="mx-auto p-2 relative mb-3">
          <label className="text-center w-full" htmlFor="api-gouv">Adresse&nbsp;<span className="italic font-semibold">(Remplissage Automatique)</span></label>
          <input className="block bg-fond w-full" type="text" id="api-gouv" name="api_gouv" placeholder="Entrez votre adresse" />
          <div id="address-container" className=" bg-accents2-light absolute w-5/6 divide-y divide-text border-solid border-texte rounded-lg z-10" >
          </div>
        </div>
        
        {/* <!-- Hébergement --> */}
        <div className="mx-auto p-2">
          <label className="text-center w-full" htmlFor="hebergement">Type d'hébergement</label>
          <input className="block bg-fond w-full" type="text" id="hebergement" name="hebergement" placeholder="Maison" required />
        </div>
        {/* <!-- Adresse --> */}
        <div className="mx-auto p-2">
          
          {/* <!-- Terrain --> */}
          <label className="text-center w-full" htmlFor="terrain">Type de terrain</label>
          <input className="block bg-fond w-full" type="text" id="terrain" name="terrain" placeholder="Jardin de 100m²" />
        </div>
        <div className="mx-auto p-2">
          
          {/* <!-- Adresse --> */}
          
          <label className="text-center w-full" htmlFor="rue">Rue</label>
          <input className="block bg-fond w-full" type="text" id="rue" name="rue" placeholder="45, rue de la Boustifaille" required />
        </div>
        {/* <!-- Ville --> */}
        <div className="mx-auto p-2">
          <label className="text-center w-full" htmlFor="commune">Ville</label>
          <input className="block bg-fond w-full" type="text" id="commune" name="commune" placeholder="Paris" required />
        </div> 
        {/* <!-- Code Postal --> */}
        <div className="mx-auto p-2">
          <label className="text-center w-full" htmlFor="code_postal">Code Postal</label>
          <input className="block bg-fond w-full border-" type="text" id="code_postal" name="code_postal" pattern="^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$" placeholder="75020" required />
        </div>  
        {/* <!-- Pays --> */}
        <div className="mx-auto p-2">
          <label className="text-center w-full" htmlFor="pays">Pays</label>
          <input className="block bg-fond w-full" type="text" id="pays" name="pays" placeholder="France" required />
        </div>
      </fieldset>
      
      <fieldset className="font-body rounded-lg shadow dark:bg-gray-800 my-2 py-5">
        <legend className="font-bold text-lg font-grands text-center">Mot de passe</legend>
        <div className="mx-auto p-2">
          <label className="text-center w-full" htmlFor="mot_de_passe">Créez votre mot de passe</label>
          <input className="block bg-fond w-full" type="password" id="mot_de_passe" name="mot_de_passe" placeholder="*********" autoComplete="new-password" required />
        </div>
        <div className="mx-auto p-2">
          <label className="text-center w-full" htmlFor="confirmation">Confirmez votre mot de passe</label>
          <input className="block bg-fond w-full" type="password" id="confirmation" name="confirmation" placeholder="*********" autoComplete="new-password" required />
        </div>
      </fieldset>
      <button className="w-[60%] mx-auto my-3 py-2 px-4 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" type="submit">Valider votre inscription</button>
      
    </form>
  </div>
</main>


  )
}

export default FosterSignIn;