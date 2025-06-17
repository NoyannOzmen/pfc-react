import { Link } from "react-router-dom";

function Register() {
  return (
    <main className="pb-72">
      <h2 className="font-grands text-3xl text-center my-2 pt-10">Inscription</h2>

      <section className="m-6 pt-10">
        <div className="font-body mx-auto w-[80%] md:w-[60%] bg-zoning rounded-lg shadow dark:bg-gray-800">

          <div className="flex flex-col flex-wrap justify-around text-texte">
            <p className="font-grands text-xl text-center my-2 pt-10">Je suis...</p>
            <div className="mx-auto p-2 w-[60%]">
            <Link to="/famille/inscription"><button className="w-full mx-auto my-3 py-2 px-4 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" type="button">Une famille d'accueil</button></Link>
            </div>

            <div className="mx-auto p-2 w-[60%]">
            <Link to="/association/inscription"><button className="w-full mx-auto my-3 py-2 px-4 bg-accents2-dark text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" type="button">Un refuge</button></Link>
            </div>

            <Link to='/rgpd' className="font-body text-texte text-center text-m pb-4">Consulter nos Conditions d'Utilisation</Link>
          </div>

        </div>
      </section>
    </main>
  )
}

export default Register;