import { Link } from 'react-router-dom';

function Contact() {
  
  return (
<main className="justify-self-stretch flex-1">
	<h2 className="font-grands text-3xl text-center my-2 pt-5">Nous contacter</h2>
	<section className="font-body text-center text-texte">
		<article className="bg-zoning font-body mx-auto w-[60%] rounded-lg shadow dark:bg-gray-800 my-2 py-5">
			<h3 className="text-2xl mb-4">Par téléphone :</h3>
			<Link to="tel:+33XXXXXXXXX">+33X.XX.XX.XX.XX</Link>
			<p>Du lundi au vendredi : 9h - 18h</p>
		</article>
		<article className="bg-zoning font-body mx-auto w-[60%] rounded-lg shadow dark:bg-gray-800 my-2 py-5">
			<img className="mx-auto" src="../../src/assets/images/shelter_empty.webp" alt="Une jolie photo des locaux" />
			<h3 className="text-2xl mb-4">Sur place ou par courrier :</h3>
			<p>9 rue de l'Arche de Noé, 50450 LA BALEINE, France </p>
			<p>Du lundi au vendredi : 10h - 17h30</p>
		</article>
	</section>

	<section>
		<div className="font-body mx-auto w-[60%] bg-zoning rounded-lg shadow dark:bg-gray-800 my-2">
			<h4 className="text-2xl mb-4 text-center my-2 py-4">Nous contacter directement</h4>

			<form className="flex flex-col flex-wrap justify-around text-texte" action="mailto:laura.martin-wortham@oclock.school" method="POST">
				<div className="mx-auto w-[60%] p-2">
					<label className="text-center" htmlFor="prenom">Votre Prénom</label>
					<input className="block bg-fond w-full" type="text" placeholder="Giorno" name="prenom" id="prenom" required />
				</div>
				<div className="mx-auto w-[60%] p-2">
					<label className="text-center" htmlFor="nom">Votre Nom</label>
					<input className="block bg-fond w-full" type="text" placeholder="Giovanna" name="nom" id="nom" required />
				</div>
				<div className="mx-auto w-[60%] p-2">
					<label className="text-center" htmlFor="email">Votre E-mail</label>
					<input className="block bg-fond w-full" type="email" placeholder="jo.jo@morioh.io" name="email" id="email" required />
				</div>
				<div className="mx-auto w-[60%] p-2">
					<label className="text-center" htmlFor="msg">Votre Message</label>
					<textarea className="block bg-fond w-full" id="msg" name="msg" rows={5} cols={30} placeholder="J'aime beaucoup les tortues, merci de penser à elles !" required />
				</div>
				<button className="w-[60%] mx-auto my-3 py-2 px-4 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" type="submit">Envoyer</button>
			</form>
		</div>
	</section>
</main>

  )
};

export default Contact;