import { Link } from 'react-router-dom';

function Plan() {
  
  return (
<main className="justify-self-stretch flex-1">
  <article className="p-12 mx-auto">
    <h2 className="font-grands text-center my-6 pb-6 text-3xl">Plan du Site</h2>
      <ul>
        <li className="font-body text-center my-6 pb-2"><Link to="/">Accueil</Link></li>
        <li className="font-body text-center my-6 pb-2"><Link to="/connexion">Connexion</Link></li>
        <li className="font-body text-center my-6 pb-2"><Link to="/famille/inscription">Inscription Famille</Link></li>
        <li className="font-body text-center my-6 pb-2"><Link to="/associaton/inscription">Inscription Association</Link></li>
        <li className="font-body text-center my-6 pb-2"><Link to="/associations">Associations Partenaires</Link></li>
        <li className="font-body text-center my-6 pb-2"><Link to="/animaux">Découvrez nos Animaux</Link></li>
        <li className="font-body text-center my-6 pb-2"><Link to="/a-propos">Qui sommes-nous ?</Link></li>
        <li className="font-body text-center my-6 pb-2"><Link to="/faq">Foire Aux Questions</Link></li>
        <li className="font-body text-center my-6 pb-2"><Link to="/devenir-famille-d-accueil">Devenir Famille d'Accueil</Link></li>
        <li className="font-body text-center my-6 pb-2"><Link to="/infos-legales">Informations Légales</Link></li>
        <li className="font-body text-center my-6 pb-2"><Link to="/rgpd">Protection des données - RGPD</Link></li>
        <li className="flex font-body justify-center my-6 pb-2"><Link to="/plan">Plan du site</Link><p className="font-bold">&nbsp;&nbsp;(vous êtes ici)</p></li>
        <li className="font-body text-center my-6 pb-2"><Link to="/contact">Contact</Link></li>
      </ul>
  </article>
</main>
  )
};

export default Plan;