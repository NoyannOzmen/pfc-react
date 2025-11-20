import { useState, useRef } from "react";
import { useRootContext } from '../../../contexts/RootContext';
import { useUserContext } from "../../../contexts/UserContext";
import { useNavigate } from 'react-router-dom';
import { ITag } from "../../../@types";
import DashNav from "./DashNav";
import ResidentSubNav from "./ResidentSubNav";

function ShelterResidentAddProfile() {
  const { species, tags } = useRootContext();
  const auth = useUserContext();
  const isInitialMount = useRef(true);
  const navigate = useNavigate()

  if (!auth.user) {
   throw new Response('', {
     status: 404,
     statusText: 'Not Found',
   });
 }

  const [ tagInfos, setTagInfos ] = useState({
    tag_name: '',
    tag_description: ''
  })

  const speciesItems = species.map((espece) => (
    <option key={`Espece ${espece.id}`} value={espece.id} >{espece.nom}</option>
  ))

  const tagItems = tags.map((tag) => (
    <div key={`Tag ${tag.id}`} className="flex gap-x-1.5 w-full"> 
      <input  type="checkbox" id={tag.id} name={`tag_${tag.id}`} value={tag.id} className="leading-3 size-6"/>
      <label htmlFor={tag.id} className="block font-grands text-xs leading-3">{tag.nom}</label>
    </div>
  ))

  const [userMessage, setUserMessage] = useState(null);
  const token = sessionStorage.getItem("site");

  //* ANIMAL
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUserMessage(null)

    const formData = new FormData(event.currentTarget);
    const userId = auth.user?.refuge.id;
    formData.append('association_id', userId as string)
    const formObjData = Object.fromEntries((formData));

    try {
      const response = await fetch
        (`${import.meta.env.VITE_API_URL}/animaux/nouveau-profil`,
        {
          method: 'POST',
          headers: {
            "Content-type" : "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(formObjData),
        }
      );

      const res = await response.json();

      if(!res.ok) {
        setUserMessage(res.message)
      }

      if(res) {
        navigate("/associations/profil/animaux")
      }

    } catch (error) {
      console.error(error);
    }
  }

  //* TAG
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
            headers: {
              "Content-type" : "application/json",
              "Authorization": `Bearer ${token}`
            },
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
    data.forEach((tag : ITag) => {
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
    addTagModal?.classList.toggle('hidden');
    addTagModal?.classList.toggle('flex');
  }

  return(
    <main className="justify-self-stretch flex-1">
      <h2 className="font-grands text-3xl text-center my-2 pt-5">Mon espace association</h2>
      <div className="flex flex-col content-center justify-center mx-auto mb-4 w-[80%]">
        <DashNav />
        <div className="flex flex-col bg-zoning rounded-lg">
          <ResidentSubNav />
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
                    <button onClick={displayModal} type="button" id="create-tag" className="self-center hover:bg-accents1-dark rounded-full hover:underline bg-accents1-light text-center font-grands text-fond font-semibold text-base py-0.5 px-4">Créer un tag</button>
                  </div>
                </div>
                  
              </fieldset>
                    
              <hr className="border-t-accents2 w-1/3 border-t-2 border-solid justify-self-center my-4 md:hidden" />
              
              <fieldset className="flex flex-wrap justify-center w-full lg:col-start-2 lg:columns-2">
                <div className="">
                  <input type="submit" value="Créer le profil" className="hover:bg-accents1-dark rounded-full hover:underline bg-accents1 text-center font-grands text-fond font-semibold text-xl py-2 px-6" />
                </div>
              </fieldset>
                    
            </form>             
          </section>            
        </div>          
      </div>  

      {/* <!-- ICI MODALE DE CREATION DE TAGS --> */}
      <div id="create-tags-modal" className="hidden justify-center content-center fixed bg-texte/20 inset-0">
        
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