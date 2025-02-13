import { Link } from "react-router-dom";

function ErrorPage() {
    return (
      <main className="justify-self-stretch flex-1">
        <div className="my-12 flex items-center justify-center">
          <img src="/images/404.webp" className="" alt="Un lion choqué" />
        </div>

        <h2 className="font-grands text-center my-3 pt-2">Cette page n'existe pas !</h2>
        <p className="font-body text-center my-6 pt-2">Mais vous pouvez reprendre la navigation depuis le menu en haut de la page <br /> ou cliquer sur le Chat pour revenir à l'accueil !</p>
        
        <div className="flex items-center justify-center">
          <Link to="/">
          <img src="/icons/logo.svg" className="size-20 my-2" alt="Retour à l'accueil" />
          </Link>
        </div>
      </main>
    )
}

export default ErrorPage;
