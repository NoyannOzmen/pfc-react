import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";
import { useRootContext } from '../../../contexts/RootContext';
import DashNav from "./DashNav";

function ShelterUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const auth = useUserContext();
  const { shelters } = useRootContext();

  if (!auth.user) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const shelter = shelters.find(({id}) => Number(id) === Number(auth.user?.refuge.id));

  const [userMessage, setUserMessage] = useState(null);
  const token = sessionStorage.getItem("site");

  async function sendFile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUserMessage(null)
    
    if (file) {
      const assoId = JSON.stringify(auth.user?.refuge.id)
      const formData = new FormData();
      formData.append("assoId", assoId);
      formData.append("file", file);

      try {
        const response = await fetch
          (`${import.meta.env.VITE_API_URL}/upload/logo`,
          {
            method: 'POST',
            /* headers: { "Content-type" : "multipart/form-data" }, */
            headers: { 
              "Authorization": `Bearer ${token}`
            },
            body: formData
          }
        );

        if (!response.ok) {
          const { message } = await response.json();
          setUserMessage(message)
        }

        const data = await response.json();
        setCurrentLogo(data)
      } catch (error) {
        console.error(error);
      }
    }
  }

  const [ currentLogo, setCurrentLogo ] = useState(
    shelter?.images_association[0]
  );

  return(
    <main className="justify-self-stretch flex-1">
      <h2 className="font-grands text-3xl text-center my-2 pt-5">Bienvenue sur votre espace personnel</h2>
        <div className="flex flex-col content-center justify-center mx-auto mb-4 w-[80%]">
          <DashNav />
          
          <div className="font-body bg-zoning rounded-lg shadow dark:bg-gray-800 mb-4">
            
            <nav className="rounded-lg h-9">
              <ul className="rounded-t-lg flex h-9 content-center bg-accents2 justify-stretch font-semibold text-fond text-sm md:justify-start pl-2">
                <li className="block grow text-center pl-2 border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4 md:rounded-none md:border-l-2 md:border-l-zoning bor"><Link to="/associations/profil/">Mes informations</Link></li>
                <li className="dashsubbtn-active rounded-tl-lg block grow text-center border-r-solid border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4"><Link to="/associations/profil/logo">Ajouter une image</Link></li>
              </ul>
            </nav>
            
            <section className="flex flex-col flex-wrap justify-center" id="dashboard-container">
              <h3 className="font-grands text-3xl text-center my-2 pt-5 w-full">Ajouter une image</h3>

              {userMessage &&
                <div>
                  <p className="font-grands font-base text-accents1 text-center">{userMessage}</p>
                </div>
              }
              
              <form className="self-center" onSubmit={sendFile}>
                <div className="flex flex-col">
                  <label htmlFor="file" className="text-center">Importer une image</label>
                  <input onChange={(e) => setFile(e.target.files?.[0] || null)} id="file" type="file" name="file" required/>
                </div>
                <div className="flex justify-center">
                  <input type="submit" value="Importer" className="my-3 py-2 px-4 mx-auto bg-accents2-dark text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"/>
                </div>
              </form>
            </section>

            {currentLogo &&
              <div className="flex flex-col justify-center">
                <h3 className="font-body text-2xl text-center">Votre Logo actuel</h3>
                <img className="w-[40%] mx-auto rounded-lg" src={`${import.meta.env.VITE_API_URL}` + `${currentLogo.url}`} alt="" />
              </div>
            }
          </div>
        </div>
    </main>
  )
}

export default ShelterUploadPage;