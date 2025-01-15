import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

import Header from '../components/App/Header/Header.tsx';
import Footer from '../components/App/Footer/Footer.tsx';

/* import '../index.css' */

function ErrorPage() {
  const error = useRouteError();
  
  function getErrorData(e: unknown) {
    // est-ce une erreur de routage
    // React Router nous donne une fonction pour le déterminer
    if (isRouteErrorResponse(e)) {
      return {
        status: e.status,
        text: e.statusText,
      };
    }
    
    if (e instanceof Response && (e.status === 400 || e.status === 404)) {
      return {
        status: e.status,
        text: e.statusText,
      };
    }
    
    if (e instanceof Error) {
      return {
        status: '500',
        text: e.message,
      };
    }
    
    return {
      status: '4XX',
      text: 'Erreur inconnue',
    };
  }
  
  const { status, text } = getErrorData(error);
  
  return (
    <>
        <Header />
      
      <main className="justify-self-stretch flex-1">
        <div className="my-12 flex items-center justify-center">
          <img src="../src/assets/images/404.webp" className="" alt="Un lion choqué" />
        </div>

        <span className="font-body text-center my-6 pt-2">Erreur {status} : {text}</span>
        <h2 className="font-grands text-center my-3 pt-2">Cette page n'existe pas !</h2>
        <p className="font-body text-center my-6 pt-2">Mais vous pouvez reprendre la navigation depuis le menu en haut de la page <br /> ou cliquer sur le Chat pour revenir à l'accueil !</p>
        
        <div className="flex items-center justify-center">
          <Link to="/">
          <img src="../src/assets/images/logo.svg" className="size-20 my-2" alt="Retour à l'accueil" />
          </Link>
        </div>
      </main>

        <Footer />
    </>
  )
}

export default ErrorPage;
