import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useUserContext } from "../../../contexts/UserContext";

function ShelterDashboard() {
  const isInitialMount = useRef(true);

  const { user, setUser } = useUserContext();

   if (!user) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const shelter = user.refuge;

  const [updatedInfos, setUpdatedInfos ] = useState({
    id: '',
    nom: '',
    responsable: '',
    rue: '',
    commune : '',
    code_postal : '',
    pays: '',
    siret: '',
    telephone: '',
    site: '',
    description: ''
  })

/*   useEffect(() => {
    const script = document.createElement('script');
  
    script.src="../../../src/assets/utils/editShelterInputs.js";
    script.async = true;
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []); */

  const navigate = useNavigate();

  const logout = () => {
    setUser(null)
    navigate('/')
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch
          (`${import.meta.env.VITE_API_URL}/associations/profil`,
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

        /* setUser(data); */

        const newState = Object.assign({}, user?.state);
        newState.refuge = data;
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
    const { nom, responsable, rue, commune, code_postal, pays, siret, telephone, site, description } = Object.fromEntries(formData);

    const userId = user?.refuge.id;

    setUpdatedInfos({
      id: userId as string,
      nom: nom as string,
      responsable: responsable as string,
      rue: rue as string,
      commune: commune as string,
      code_postal: code_postal as string,
      pays: pays as string,
      siret: siret as string,
      telephone: telephone as string,
      site: site as string,
      description: description as string
    });
  }

  function allowEdit(e: any) {
    const field = e.target.closest('fieldset')
    const inputs = field.querySelectorAll('input')
    const validate = document.getElementById("validateBtn");
    const area = field.querySelector('textarea')
  
  if (validate && validate.classList.contains('hidden')) {
    validate.classList.toggle('hidden')
  }

  if (area) {
    area.disabled = false;
    area.required = false;
    area.classList.add('bg-fond')
  }
  
  inputs.forEach((input : any) => {
    input.disabled = false;
    input.required = true
    input.classList.add('bg-fond')
    if (input.id === 'site' || input.id === 'description') {
      input.required = false;
    } 
  })
  }

  async function handleDelete(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      /* const assoId = JSON.stringify(user?.refuge.id);
      const formData = new FormData();
      formData.append("assoId", assoId); */

      const response = await fetch
        (`${import.meta.env.VITE_API_URL}/association/profil/delete`,
        {
          method: 'POST',
          headers: { "Content-type" : "application/json" },
          body: JSON.stringify(user)
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

      /* const data = await response.json();
      console.log(data) */
      displayModal();
      logout();

    } catch (error) {
      console.error(error);
    }
  }

  function displayModal() {
    const addTagModal = document.getElementById('delete-account-modal');
    addTagModal && addTagModal.classList.toggle('hidden');
  }

  return(
    <main className="justify-self-stretch flex-1">
  <h2 className="font-grands text-3xl text-center my-2 pt-5">Bienvenue sur votre espace personnel</h2>
  <div className="flex flex-col content-center justify-center mx-auto mb-4 w-[80%]">
    
    <nav className="flex flex-wrap justify-center md:justify-start">
      <ul className="flex flex-wrap-reverse gap-x-2 mx-3 justify-center font-semibold md:justify-start md:ml-10 text-xl">
        <li><Link to="/associations/profil" tabIndex={0}><button id="dashbtn-1" className="dashbtn dashbtn-active" tabIndex={-1}>Profil</button></Link></li>
        <li><Link to="/associations/profil/demandes" tabIndex={0}><button id="dashbtn-2" className="dashbtn" tabIndex={-1}>Demandes</button></Link></li>
        <li><Link to="/associations/profil/animaux" tabIndex={0}><button id="dashbtn-3" className="dashbtn" tabIndex={-1}>Animaux</button></Link></li>
      </ul>
      <div className="mx-2 grow w-[90%] h-2 bg-accents1-dark rounded-t-lg"></div>
    </nav>
    
    <div className="font-body bg-zoning rounded-lg shadow dark:bg-gray-800 mb-4">
      
      <nav className="rounded-lg h-9">
        <ul className="rounded-t-lg flex h-9 content-center bg-accents2 justify-stretch font-semibold text-fond text-sm md:justify-start pl-2">
          <li className="dashsubbtn-active rounded-tl-lg block grow text-center pl-2 border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4 md:rounded-none md:border-l-2 md:border-l-zoning bor"><Link to="/associations/profil/">Mes informations</Link></li>
          <li className="block grow text-center border-r-solid border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4"><Link to="/associations/profil/logo">Ajouter une image</Link></li>
        </ul>
      </nav>
      
      <section className="flex flex-wrap justify-center" id="dashboard-container">
        <h3 className="font-grands text-3xl text-center my-2 pt-5 w-full">Mon profil</h3>
        
        <form className="flex flex-wrap content-center md:w-[60%] justify-center text-texte" onSubmit={handleSubmit}>
          
          <fieldset className="shrink font-body rounded-lg shadow dark:bg-gray-800 my-2 py-5">
            <legend className="text-center">Mon organisme&nbsp;<span tabIndex={0} className="material-symbols-outlined" onClick={allowEdit}>edit</span></legend>
            
            {/* <!-- Nom --> */}
            <div className="mx-auto p-2">
              <label className="text-center" htmlFor="nom">Nom</label>
              <input className="block" type="text" id="nom" name="nom" defaultValue={shelter.nom} disabled />
            </div>

            {/* <!-- Président --> */}
            <div className="mx-auto p-2">
              <label className="text-center" htmlFor="president">Président</label>
              <input className="block" type="text" id="president" name="president" defaultValue={shelter.responsable} disabled />
            </div>

            {/* <!-- Rue --> */}
            <div className="mx-auto p-2">  
              <label className="text-center" htmlFor="rue">Rue</label>
              <input className="block" type="text" id="rue" name="rue" defaultValue={ shelter.rue} disabled />
            </div>

            {/* <!-- Commune --> */}
            <div className="mx-auto p-2">  
              <label className="text-center" htmlFor="commune">Commune</label>
              <input className="block" type="text" id="commune" name="commune" defaultValue={shelter.commune} disabled />
            </div>

            {/* <!-- Code Postal --> */}
            <div className="mx-auto p-2">   
              <label className="text-center" htmlFor="code_postal">Code Postal</label>
              <input className="block" type="text" id="code_postal" name="code_postal" pattern="^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$" defaultValue={shelter.code_postal} disabled />
            </div>

            {/* <!-- Pays --> */}
            <div className="mx-auto p-2">  
              <label className="text-center" htmlFor="pays">Pays</label>
              <input className="block" type="text" id="pays" name="pays" defaultValue={shelter.pays} disabled />
            </div>

            {/* <!-- Téléphone --> */}
            <div className="mx-auto p-2">  
              <label className="text-center" htmlFor="telephone">N° Téléphone</label>
              <input className="block" type="tel" id="telephone" name="telephone" pattern="^(0|\+33 )[1-9]([\-. ]?[0-9]{2} ){3}([\-. ]?[0-9]{2})|([0-9]{8})$" defaultValue={shelter.telephone} disabled />
            </div>

            {/* <!-- N° SIRET --> */}
            <div className="mx-auto p-2">  
              <label className="text-center" htmlFor="siret">N° SIRET</label>
              <input className="block" type="text" id="siret" name="siret" pattern="^(\d{14}|((\d{3}[ ]\d{3}[ ]\d{3})|\d{9})[ ]\d{5})$" defaultValue={shelter.siret} disabled />
            </div>

            {/* <!-- Site Web --> */}
            <div className="mx-auto p-2 flex flex-wrap">  
              <label className="w-full" htmlFor="site">Site Web</label>
              <input className="w-56" type="url" name="site" id="site" defaultValue={shelter.site == null ? '' : shelter.site }  pattern="https://.*"  disabled />
            </div>
  
            {/* <!-- Description --> */}
            <div className="flex flex-wrap mx-auto p-2">
              <label className="place-items-start pr-1 w-full" htmlFor="description">Description</label>
              <textarea rows={5} className="w-56" name="description" id="description" defaultValue={shelter.description == null ? '' : shelter.description} disabled />
            </div>

          </fieldset>
          
          <button id="validateBtn" className="hidden md:w-[60%] mx-auto my-3 py-2 px-4 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" type="submit">Valider les modifications</button>
          
        </form>
      </section>
      <section className="flex flex-wrap justify-center">
        <div className="flex flex-col flex-wrap content-center justify-around text-texte">
          <button onClick={displayModal} className="w-full md:w-[60%] mx-auto my-3 py-2 px-4 bg-accents2-dark text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" type="submit">Supprimer mon profil</button>
          <p className="text-center">ATTENTION ! Cette suppression est définitive !</p>
        </div>
      </section>
    </div>
  </div>

      {/* <!-- ICI MODALE DE SUPPRESSION DE COMPTE --> */}
      <div id="delete-account-modal" className="hidden flex justify-center content-center fixed bg-texte/20 inset-0">
      
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
{/*             <label htmlFor="tag-name" className="block text-texte font-grands font-bold text-base ">Nom du Tag</label>
            <input className="w-56 rounded-md h-8 px-2 py-1 text-texte bg-fond " type="text" name="tag_name" id="tag-name" required /> */}
          </div>
          
          {/* <div className="mb-4 ">
            <label htmlFor="tag-description" className="block text-texte font-grands font-bold text-base ">Description</label>
            <textarea className="w-56 rounded-md px-2 py-1 text-texte bg-fond" name="tag_description" id="tag-description" rows={3} required></textarea>
          </div> */}
          
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

export default ShelterDashboard;