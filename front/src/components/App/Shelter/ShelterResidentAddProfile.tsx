import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useRootContext } from '../../../contexts/RootContext';
import { useUserContext } from "../../../contexts/UserContext";

function ShelterResidentAddProfile() {
  const { species, tags } = useRootContext();

  const isInitialMount = useRef(true);

  const { user } = useUserContext();

  if (!user) {
   throw new Response('', {
     status: 404,
     statusText: 'Not Found',
   });
 }

  const [animalInfos, setAnimalInfos ] = useState({
    association_id: '',
    nom_animal: '',
    sexe_animal: '',
    age_animal: '',
    espece_animal: '',
    race_animal: '',
    couleur_animal: '',
    description_animal: '',
    tags_animal: '',
  })

  const [ tagInfos, setTagInfos ] = useState({
    tag_name: '',
    tag_description: ''
  })

  const speciesItems = species.map((espece) => (
    <option key={`Espece ${espece.id}`} value={espece.id} >{espece.nom}</option>
  ))

  const tagItems = tags.map((tag) => (
    <div key={`Tag ${tag.id}`} className="flex gap-x-1.5 w-full"> 
      <input  type="checkbox" id={tag.id} name={tag.id} value={tag.id} className="leading-3 size-6"/>
      <label htmlFor={tag.id} className="block font-grands text-xs leading-3">{tag.nom}</label>
    </div>
  ))

  const [userMessage, setUserMessage] = useState(null);

  //* ANIMAL
  useEffect(() => {
    async function createAnimal() {
      setUserMessage(null)
      try {
        const response = await fetch
          (`${import.meta.env.VITE_API_URL}/animaux/nouveau-profil`,
          {
            method: 'POST',
            headers: { "Content-type" : "application/json" },
            body: JSON.stringify(animalInfos),
          }
        );

        const res = await response.json();
        setUserMessage(res.message)
      } catch (error) {
        console.error(error);
      }
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      createAnimal();
    }
  }, [ animalInfos, setAnimalInfos ]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const { nom_animal, sexe_animal, age_animal, espece_animal, race_animal, couleur_animal, description_animal, tags_animal } = Object.fromEntries(formData);

    const userId = user?.refuge.id;

    setAnimalInfos({
      association_id: userId as string,
      nom_animal: nom_animal as string,
      sexe_animal: sexe_animal as string,
      age_animal: age_animal as string,
      espece_animal: espece_animal as string,
      race_animal: race_animal as string,
      couleur_animal: couleur_animal as string,
      description_animal: description_animal as string,
      tags_animal: tags_animal as string,
    });
  }

  //* TAG
/*   useEffect(() => {
    async function createTag() {
      setUserMessage(null)
      try {
        const response = await fetch
          (`${import.meta.env.VITE_API_URL}/tags/create`,
          {
            method: 'POST',
            headers: { "Content-type" : "application/json" },
            body: JSON.stringify(tagInfos),
          }
        );

        if (!response.ok) {
          const { message } = await response.json();
          setUserMessage(message)
        }

        const data = await response.json();

    //* VIDE LES OPTIONS PRESENTES DANS LE SELECT
    const selectTagForm = document.getElementById('tags-animal');
    
    if (selectTagForm) {
    selectTagForm.innerHTML='';
    }

    //* REMPLIT LA LISTE DE CHECKBOX AVEC LA LISTE DE TAG UPDATED
    data.forEach((tag : any) => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('flex', 'gap-x-1.5');

        const tagOption = document.createElement('input');
        tagOption.type = 'checkbox';
        tagOption.id=`tag_${tag.id}`;
        tagOption.name=`tag_${tag.id}`;
        tagOption.value=`${tag.id}`;
        tagOption.classList.add('leading-3');

        wrapper.appendChild(tagOption);

        const tagLabel = document.createElement('label');
        tagLabel.htmlFor=`tag_${tag.id}`;
        tagLabel.classList.add('block', 'font-grands','font-semibold','text-xs','leading-3');
        tagLabel.innerText=`${tag.nom}`

        wrapper.appendChild(tagLabel);

        if (selectTagForm) {
        selectTagForm.appendChild(wrapper);
        }
    });

    const addTagModal = document.getElementById('create-tags-modal');
    const addTagForm = document.getElementById('create-tags-form');

    if(addTagForm && addTagModal) {
      addTagModal.classList.toggle('hidden');
    }

      } catch (error) {
        console.error(error);
      }
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      createTag();
    }
  }, [ tagInfos, setTagInfos ]); */

  function handleCreateTag(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const { tag_name, tag_description } = Object.fromEntries(formData);

    setTagInfos({
      tag_name: tag_name as string,
      tag_description: tag_description as string
    });

    async function createTag() {
      setUserMessage(null)
      try {
        const response = await fetch
          (`${import.meta.env.VITE_API_URL}/tags/create`,
          {
            method: 'POST',
            headers: { "Content-type" : "application/json" },
            body: JSON.stringify(tagInfos),
          }
        );

        if (!response.ok) {
          const { message } = await response.json();
          setUserMessage(message)
        }

        const data = await response.json();

    //* VIDE LES OPTIONS PRESENTES DANS LE SELECT
    const selectTagForm = document.getElementById('tags-animal');
    
    if (selectTagForm) {
    selectTagForm.innerHTML='';
    }

    //* REMPLIT LA LISTE DE CHECKBOX AVEC LA LISTE DE TAG UPDATED
    data.forEach((tag : any) => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('flex', 'gap-x-1.5');

        const tagOption = document.createElement('input');
        tagOption.type = 'checkbox';
        tagOption.id=`tag_${tag.id}`;
        tagOption.name=`tag_${tag.id}`;
        tagOption.value=`${tag.id}`;
        tagOption.classList.add('leading-3');

        wrapper.appendChild(tagOption);

        const tagLabel = document.createElement('label');
        tagLabel.htmlFor=`tag_${tag.id}`;
        tagLabel.classList.add('block', 'font-grands','font-semibold','text-xs','leading-3');
        tagLabel.innerText=`${tag.nom}`

        wrapper.appendChild(tagLabel);

        if (selectTagForm) {
        selectTagForm.appendChild(wrapper);
        }
    });

    const addTagModal = document.getElementById('create-tags-modal');
    const addTagForm = document.getElementById('create-tags-form');

    if(addTagForm && addTagModal) {
      addTagModal.classList.toggle('hidden');
    }

      } catch (error) {
        console.error(error);
      }
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      createTag();
    }

  }

  function displayModal() {
    const addTagModal = document.getElementById('create-tags-modal');
    addTagModal && addTagModal.classList.toggle('hidden');
  }

  return(
    <main className="justify-self-stretch flex-1">
      <h2 className="font-grands text-3xl text-center my-2 pt-5">Mon espace association</h2>
      
      {/* <!-- Conteneur général qui contient tout le dashboard --> */}
      <div className="flex flex-col content-center justify-center mx-auto mb-4 w-[80%]">
        
        <nav className="flex flex-wrap justify-center md:justify-start">
          <ul className="flex flex-wrap-reverse gap-x-2 mx-3 justify-center font-semibold md:justify-start md:ml-10 text-xl">
            <li><Link to="/associations/profil" tabIndex={0}><button id="dashbtn-1" className="dashbtn" tabIndex={-1}>Profil</button></Link></li>
            <li><Link to="/associations/profil/demandes" tabIndex={0}><button id="dashbtn-2" className="dashbtn" tabIndex={-1}>Demandes</button></Link></li>
            <li><Link to="/associations/profil/animaux" tabIndex={0}><button id="dashbtn-3" className="dashbtn dashbtn-active" tabIndex={-1}>Animaux</button></Link></li>
          </ul>
          <div className="mx-2 grow w-[90%] h-2 bg-accents1-dark rounded-t-lg"></div>
        </nav>
        
        {/* <!-- Conteneur du sous menu et de la section --> */}
        <div className="flex flex-col bg-zoning rounded-lg">
          <nav className="rounded-lg">
            <ul className="rounded-t-lg flex bg-accents2 justify-stretch font-semibold text-fond text-sm md:justify-start md:pl-8">
              <li className="rounded-tl-lg block grow text-center pl-2 border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4 md:rounded-none md:border-l-2 md:border-l-zoning bor"><Link to="/associations/profil/animaux">Nos animaux</Link></li>
              <li className="block grow text-center border-r-solid border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4 "><Link to="/associations/profil/animaux/suivi">Suivi accueils</Link></li>
              <li className="dashsubbtn-active block grow text-center pr-2 py-2 rounded-tr-lg hover:underline md:grow-0 md:px-4 md:rounded-none md:border-r-solid md:border-r-2 md:border-r-zoning"><Link to="/associations/profil/animaux/nouveau-profil">Créer un profil</Link></li>
            </ul>
          </nav>
          
          <section className="flex flex-col justify-center content-center">
            <h3 className="hidden md:inline font-grands text-3xl text-center my-2 pt-5 w-full">Créer un profil animal</h3>

            {userMessage &&
              <div>
                <p className="font-grands font-base text-accents1 text-center">{userMessage}</p>
              </div>
            }
            
            <form className="grid grid-cols-1 my-6 mx-6 justify-center lg:flex-none lg:mx-2 lg:grid lg:grid-cols-3 lg:px-2 xl:grid-cols-3 xl:p-10" onSubmit={handleSubmit}>
              
              <fieldset className="flex flex-wrap justify-center content-start gap-x-4">
                
                <div className="mb-2 w-[90%]">
                  <label htmlFor="nom_animal" className="block font-grands w-full font-bold text-base ">Nom</label>
                  <input className="w-full rounded-md h-8 px-2 py-1 text-texte bg-fond " type="text" name="nom_animal" id="nom_animal" required />
                </div>
                
                <div className="mb-2 w-[90%]">
                  <label htmlFor="sexe_animal" className="block w-full font-grands font-bold text-base ">Sexe</label>
                  <select name="sexe_animal" id="sexe_animal" className="custom-select w-full rounded-md h-8 px-2 py-1 text-texte bg-fond ">
                    <option value="Inconnu">Inconnu</option>
                    <option value="Mâle">Mâle</option>
                    <option value="Femelle">Femelle</option>
                  </select>
                </div>

                <div className="mb-2 w-[90%]">
                  <label htmlFor="age_animal" className="block w-full font-grands font-bold text-base ">Age</label>
                  <input className="w-full rounded-md h-8 px-2 py-1 text-texte bg-fond " type="number" name="age_animal" id="age_animal" required />
                </div>
              </fieldset>
              
              <hr className="border-t-accents2 w-1/3 border-t-2 border-solid justify-self-center my-4 md:hidden" />
              
              <fieldset className="flex flex-wrap justify-center content-start gap-x-4">
                
                <div className="mb-2 w-[90%] md:shrink md:grow-0 self-start">
                  <label htmlFor="espece_animal" className="block w-full font-grands font-bold text-base ">Espèce</label>
                  <select name="espece_animal" id="espece_animal" className="custom-select w-full rounded-md h-8 px-2 py-1 text-texte bg-fond ">
                    <option value="">Choisissez</option>
                      {speciesItems}
                  </select>
                </div>
                    
                <div className="mb-2 w-[90%]">
                  <label htmlFor="race_animal" className="block w-full font-grands font-bold text-base ">Race</label>
                  <input className="w-full rounded-md h-8 px-2 py-1 text-texte bg-fond " type="text" name="race_animal" id="race_animal" />
                </div>
                <div className="mb-2 w-[90%]">
                  <label htmlFor="couleur_animal" className="block w-full font-grands font-bold text-base ">Couleur</label>
                  <input className="w-full rounded-md h-8 px-2 py-1 text-texte bg-fond " type="text" name="couleur_animal" id="couleur_animal" required />
                </div>
              </fieldset>
                  
              <hr className="border-t-accents2 w-1/3 border-t-2 border-solid justify-self-center my-4 md:hidden" />
              
              <fieldset className="flex flex-wrap justify-center gap-x-4">
              
                <div className="mb-2 grow ">
                  <label htmlFor="description_animal" className="block font-grands font-bold text-base w-full">Description</label>
                  <textarea className="w-full rounded-md px-2 py-1 text-texte bg-fond " name="description_animal" id="description_animal" rows={3} required></textarea>
                </div>

                <div className="mb-2 w-full">
                  <p id="couleur-animal" className="block font-grands font-bold text-base mb-4 shrink">Tags</p>
                  
                  <fieldset name="tags-animal" id="tags-animal" className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full px-2 py-1">
                    {tagItems}  
                  </fieldset>
                    
                  <div className="flex justify-center">
                    <button onClick={displayModal} type="button" id="create-tag" className="self-center hover:bg-accents1-dark rounded-full hover:underline bg-accents1 text-center font-grands text-fond font-semibold text-base py-0.5 px-4">Créer un tag</button>
                  </div>
                </div>
                  
              </fieldset>
                    
              <hr className="border-t-accents2 w-1/3 border-t-2 border-solid justify-self-center my-4 md:hidden" />
              
              <fieldset className="flex flex-wrap justify-center w-full lg:col-start-2 lg:columns-2">
                <div className="">
                  <input type="submit" value="Envoyer" className="hover:bg-accents1-dark rounded-full hover:underline bg-accents1 text-center font-grands text-fond font-semibold text-base py-1 px-4" />
                </div>
              </fieldset>
                    
            </form>             
          </section>            
        </div>          
      </div>  

    {/* <!-- ICI MODALE DE CREATION DE TAGS --> */}
    <div id="create-tags-modal" className="hidden flex justify-center content-center fixed bg-texte/20 inset-0">
      
      <div className="self-center bg-zoning p-6 rounded-lg">
        <div className="flex justify-between">
          <h3 className="font-grands text-lg font-extrabold mb-4">Ajouter un tag</h3>
          <span onClick={displayModal} className="cancel material-symbols-outlined text-texte cursor-pointer">
            close
          </span>
        </div>
        <form id="create-tags-form" className="" onSubmit={handleCreateTag}>
          
          <div className="mb-2">
            <label htmlFor="tag-name" className="block text-texte font-grands font-bold text-base ">Nom du Tag</label>
            <input className="w-56 rounded-md h-8 px-2 py-1 text-texte bg-fond " type="text" name="tag_name" id="tag-name" required />
          </div>
          
          <div className="mb-4 ">
            <label htmlFor="tag-description" className="block text-texte font-grands font-bold text-base ">Description</label>
            <textarea className="w-56 rounded-md px-2 py-1 text-texte bg-fond" name="tag_description" id="tag-description" rows={3} required></textarea>
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

export default ShelterResidentAddProfile;