import { useEffect, useState, useRef } from "react";
/* import { useUserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom"; */
import { useUserContext } from "../../../contexts/UserContext";

function Login() {
  const inputRef = useRef<HTMLInputElement>(null);

  /* const isInitialMount = useRef(true);

  const { setUser } = useUserContext(); */
  
  const [credentials, setCredentials] = useState({
    email: '',
    mot_de_passe: '',
  });

  /* const navigate = useNavigate(); */

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /* useEffect(() => {
    async function fetchUser() {
      setUserMessage(null)
      try {
        const response = await fetch
          (`${import.meta.env.VITE_API_URL}/connexion`,
          {
            method: 'POST',
            headers: { "Content-type" : "application/json" },
            body: JSON.stringify(credentials),
          }
        );

        if (!response.ok) {
          const { message } = await response.json();
          setUserMessage(message)
        }

        const data = await response.json();

        setUser(data);
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetchUser();
    }
  }, [ credentials, setUser]); */

  /* const [userMessage, setUserMessage] = useState(null); */

  const auth = useUserContext();

  const handleInput = (e : any) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

   /*  const formData = new FormData(event.currentTarget);
    const { email, mot_de_passe } = Object.fromEntries(formData);

    setCredentials({
      email: email as string,
      mot_de_passe: mot_de_passe as string,
    }); */

    if (credentials !== null) {
      auth.logIn(credentials)
      return
    }
  }

  return (
    <main className="justify-self-stretch flex-1">
      <h2 className="font-grands text-3xl text-center my-2 pt-10">Connexion</h2>

      <section className="pt-10">
        <div className="font-body mx-auto w-[80%] md:w-[60%] bg-zoning rounded-lg shadow dark:bg-gray-800">

          <form className="flex flex-col flex-wrap justify-around text-texte" onSubmit={handleSubmit}>
            <div className="mx-auto p-2 w-[60%]">
              <label className="text-center" htmlFor="email">Votre e-mail</label>
              <input onChange={handleInput} className="block bg-fond w-full" type="email" placeholder="jo.jo@morioh.io" name="email" id="email" autoComplete="email" required/>
            </div>
            <div className="mx-auto p-2 w-[60%]">
              <label className="text-center" htmlFor="mot_de_passe">Votre mot de passe</label>
              <input onChange={handleInput} className="block bg-fond w-full" type="password" placeholder="********" name="mot_de_passe" id="mot_de_passe" autoComplete="current-mot_de_passe" required/>
            </div>
            <button className="w-[60%] mx-auto my-3 py-2 px-4 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" type="submit">Se connecter</button>
          </form>

          { auth.userMessage && 
          <div>
            <p className="font-grands font-base text-accents1 text-center">{auth.userMessage}</p>
          </div>
          }

        </div>
      </section>

    </main>
  )
};

export default Login;