/* import { Link } from 'react-router-dom'; */

function Login() {
  
  return (
    <main className="justify-self-stretch flex-1">
      <h2 className="font-grands text-3xl text-center my-2 pt-10">Connexion</h2>

      <section className="pt-10">
        <div className="font-body mx-auto w-[80%] md:w-[60%] bg-zoning rounded-lg shadow dark:bg-gray-800">

          <form className="flex flex-col flex-wrap justify-around text-texte" action="/connexion" method="POST">
            <div className="mx-auto p-2 w-[60%]">
              <label className="text-center" htmlFor="email">Votre e-mail</label>
              <input className="block bg-fond w-full" type="email" placeholder="jo.jo@morioh.io" name="email" id="email" autoComplete="email" required/>
            </div>
            <div className="mx-auto p-2 w-[60%]">
              <label className="text-center" htmlFor="mot_de_passe">Votre mot de passe</label>
              <input className="block bg-fond w-full" type="password" placeholder="********" name="mot_de_passe" id="mot_de_passe" autoComplete="current-password" required/>
            </div>
            <button className="w-[60%] mx-auto my-3 py-2 px-4 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" type="submit">Se connecter</button>
          </form>

    {/* 			<% if(locals.message.length != 0){ %>
            <div>
              <p className="font-grands font-base text-accents1 text-center"><%= message.erreur %></p>
            </div>
          <% } %> */}
        </div>
      </section>

    </main>
  )
};

export default Login;