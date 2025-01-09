function ShelterSignIn() {
  return (
    <main className="justify-self-stretch flex-1">
  <h2 className="font-grands text-3xl text-center my-2 pt-5">Création de votre compte</h2>
  
  <div className="font-body mx-auto w-[80%] bg-zoning rounded-lg shadow dark:bg-gray-800 my-4">
    
    <form className="flex flex-col flex-wrap content-center justify-around text-texte" action="/association/inscription" method="POST">
      
      <fieldset className="font-body rounded-lg shadow dark:bg-gray-800 my-2 py-5">
        <legend className="font-bold text-lg font-grands text-center">Votre organisme</legend>

        {/* <% if(locals.message.length != 0){ %>
          <div>
            <p className="font-grands font-base text-accents1 text-center"><%= message.erreur %></p>
          </div>
        <% } %> */}
        
        {/* <!-- Nom --> */}
        <div className="mx-auto p-2">  
          <label className="text-center w-full" htmlFor="nom">Nom</label>
          <input className="block bg-fond w-full" type="text" id="nom" name="nom" placeholder="PetSmart" required />
        </div>
        
        {/* <!-- Président --> */}
        <div className="mx-auto p-2"> 
          <label className="text-center w-full" htmlFor="responsable">Président</label>
          <input className="block bg-fond w-full" type="text" id="responsable" name="responsable" placeholder="D. Recteur" required />
        </div>
        
        {/* <!-- API Adresse --> */}
        <div id="api-container" className="mx-auto p-2 relative my-4">
          <label className="text-center w-full" htmlFor="api-gouv">Adresse <span className="italic font-semibold">(Remplissage Automatique)</span></label>
          <input className="block bg-fond w-full" type="text" id="api-gouv" name="api_gouv" placeholder="Entrez votre adresse" />
          <div id="address-container" className=" bg-accents2-light absolute w-5/6 divide-y divide-text border-solid border-texte rounded-lg z-10" >
          </div>
        </div>
        
        {/* <!-- Adresse --> */}
        <div className="mx-auto p-2"> 
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
          <input className="block bg-fond w-full" type="text" id="code_postal" name="code_postal" pattern="^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$" placeholder="75020" required />
        </div>
        
        {/* <!-- Pays --> */}
        <div className="mx-auto p-2">  
          <label className="text-center w-full" htmlFor="pays">Pays</label>
          <input className="block bg-fond w-full" type="text" id="pays" name="pays" placeholder="France" required />
        </div>

        <div className="mx-auto p-2"> 
          {/* <!-- telephone --> */}
          <label className="text-center w-full" htmlFor="telephone">N° telephone</label>
          <input className="block bg-fond w-full" type="tel" id="telephone" name="telephone" pattern="^(0|\+33 )[1-9]([-. ]?[0-9]{2} ){3}([-. ]?[0-9]{2})|([0-9]{8})$" placeholder="01 23 45 67 89" />
        </div>
        <div className="mx-auto p-2">
          {/* <!-- N° SIRET --> */}
          <label className="text-center w-full" htmlFor="siret">N° SIRET</label>
          <input className="block bg-fond w-full" type="text" id="siret" name="siret" pattern="^(\d{14}|((\d{3}[ ]\d{3}[ ]\d{3})|\d{9})[ ]\d{5})$" placeholder="732829320 00074" required />
        </div>
        <div className="mx-auto p-2">
          {/* <!-- Email --> */}
          <label className="text-center w-full" htmlFor="email">Email</label>
          <input className="block bg-fond w-full" type="email" id="email" name="email" placeholder="chacripan@domain-expansion.io" autoComplete="email" required />
        </div>

        {/* <!-- Site Web --> */}
        <div className="mx-auto p-2">
          <label className="text-center w-full" htmlFor="site">Site Web</label>
          <input className="block bg-fond w-full" type="url" name="site" id="site" placeholder="https://exemple.com" size={40}/>
        </div>

        {/* <!-- Description --> */}
        <div className="mx-auto p-2">
            <label className="text-center w-full" htmlFor="description">Description</label>
            <textarea className="block bg-fond w-full" /* type="text" */ rows={5} cols={33} id="description" name="description"
            placeholder="Une courte description de votre refuge !"></textarea>
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
  {/* <script src="/utils/apiGouv.js"></script> */}
</main>


  )
}

export default ShelterSignIn;