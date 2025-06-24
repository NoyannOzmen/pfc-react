import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";

function FosterProfile() {
  const auth = useUserContext();

  if (!auth.user) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const famille = auth.user.accueillant;

  const [userMessage, setUserMessage] = useState(null);
  const token = sessionStorage.getItem("site");

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const { prenom, nom, email, hebergement, terrain, rue, commune, code_postal } = Object.fromEntries(formData);

    const userId = auth.user?.accueillant.id;

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

    try {
      const response = await fetch
        (`${import.meta.env.VITE_API_URL}/famille/profil`,
        {
          method: 'POST',
          headers: { 
            "Content-type" : "application/json",
            "Authorization": `Bearer ${token}`
          },
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

      const newState = Object.assign({}, auth.user?.accueillant);
      newState.accueillant = data;
      auth.setUser(newState);
    } catch (error) {
      console.error(error);
    }
  }

  function allowEdit(e: React.MouseEvent<HTMLLegendElement>) {
    const field = e.currentTarget.closest('fieldset')
    const inputs = field?.querySelectorAll('input')
    const validate = document.getElementById("validate");
  
    if (validate && validate.classList.contains('hidden')) {
      validate.classList.toggle('hidden')
    }
    
    inputs?.forEach((input : HTMLInputElement) => {
      input.disabled = false;
      input.required = true
      input.classList.add('bg-fond')
      if (input.id === 'terrain' || input.id === 'prenom') {
        input.required = false;
      } 
    })
  }

  async function handleDelete(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUserMessage(null)

    try {
      const response = await fetch
        (`${import.meta.env.VITE_API_URL}/famille/profil/delete`,
        {
          method: 'POST',
          headers: { 
            "Content-type" : "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(auth.user)
        }
      );

      if (!response.ok) {
				const { message } = await response.json();
				setUserMessage(message)
			}

      displayModal();
      auth.logOut();

    } catch (error) {
      console.error(error);
    }
  }

  function displayModal() {
    const addTagModal = document.getElementById('delete-account-modal');
    addTagModal?.classList.toggle('hidden');
    addTagModal?.classList.toggle('flex');
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

            {userMessage &&
              <div>
                <p className="font-grands font-base text-accents1 text-center">{userMessage}</p>
              </div>
            }

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
                  <input className="block w-full" type="email" id="email" name="email" defaultValue={auth.user.email} autoComplete="email" disabled />
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
              </fieldset>

              <button id="validate" className="hidden w-[60%] mx-auto my-3 py-2 px-4 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" type="submit">Valider les modifications</button>
            </form>
            <div className="flex flex-col flex-wrap content-center justify-around text-texte">
              <button onClick={displayModal} id="deleteAccount" className="w-[60%] mx-auto my-3 py-2 px-4 bg-accents2-dark text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" type="submit">Supprimer mon profil</button>
              <p className="text-center w-full">ATTENTION ! Cette suppression est définitive !</p>
            </div>
          </section>
        </div>
      </div>

      {/* MODAL START */}
      <div id="delete-account-modal" className="hidden justify-center content-center fixed bg-texte/20 inset-0">

        <div className="self-center bg-zoning p-6 rounded-lg">
          <div className="flex justify-between">
            <h3 className="font-grands text-lg font-extrabold mb-4">Supprimer votre compte</h3>
            <span onClick={displayModal} className="cancel material-symbols-outlined text-texte cursor-pointer">
              close
            </span>
          </div>
          <form id="delete-container" className="" onSubmit={handleDelete}>
            <div className="mb-2">
              <p className="block text-texte font-grands font-bold text-base">ATTENTION ! <br/> Êtes-vous sûrs et certains de vouloir supprimer votre compte ? <br /> Cette suppression est définitive !</p>
            </div>
            <div>
              <input className="cursor-pointer hover:bg-accents1-dark rounded-full hover:underline bg-accents1 text-center font-grands text-fond font-semibold text-base py-1 px-4" type="submit" value="Valider" />
              <button onClick={displayModal} className="hover:bg-accents2-dark rounded-full hover:underline bg-accents2-dark text-center font-grands text-fond font-semibold text-base py-1 px-4 cancel">Annuler</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default FosterProfile;