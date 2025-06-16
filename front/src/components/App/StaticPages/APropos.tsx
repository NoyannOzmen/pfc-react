function APropos() {
  
  return (
		<main className="justify-self-stretch flex-1">
			<article className="flex flex-col p-2 lg:p-32 mx-auto">
				<h2 className="font-grands text-3xl text-center my-6 pb-4"> Qui sommes nous ? </h2>

				<section className="font-body mx-auto w-[94%] bg-zoning rounded-lg shadow dark:bg-gray-800 my-8">
					<div className="py-4">
						<h3 className="font-grands my-1 pt-6 text-xl text-center">Notre Histoire</h3>
						<div className="flex flex-row gap-4">
							<p className="text-texte my-8 px-2">
								Créé en Septembre 2024 par des passionnés des animaux, PetFosterConnect est un des sites français proposant à tous les refuges et associations de secours aux animaux de présenter leurs animaux, et aux potentielles familles d’accueil de les visualiser et de faire une demande d’accueil pour ces mêmes animaux.
								<br />Vous êtes à la recherche d’un pôtichat noir en Loire-Atlantique ou d’un pangolin à Toulon ? PetFosterConnect vous permet d’effectuer une recherche multicritère qui vous permettra d’obtenir la liste de tous les animaux qui correspondent à vos critères dans la région ou le département de votre choix.					
							</p>
							<img src="/icons/logo.svg" className="size-20 my-8" alt="Le logo Pet Foster Connect" />
						</div>
					</div>
				</section>
				
				<section className="font-body mx-auto w-[94%] bg-zoning rounded-lg shadow dark:bg-gray-800 my-8">
					<div className="my-4">
						<h3 className="font-grands my-1 pt-6 text-xl text-center px-2">Nos Missions</h3>
						<div className="flex flex-row gap-4">
							<img src="/images/unai.webp" className="size-20 my-8 rounded-lg" alt="Unai, mascotte officielle de Pet Foster Connect" />
							<p className="text-texte my-8 self-center">
								En proposant une plate-forme qui centralise les annonces des différents organismes, PetFosterConnect facilite les interactions entre refuges et familles d'accueil.
								<br />Pour les refuges, c'est l'assurance d'offrir une vitrine plus large à leurs pensionnaires, et pour les familles un espace unique pour rechercher et contacter ces refuges.
							</p>
						</div>
					</div>
				</section>
				
				<section className="font-body mx-auto w-[94%] bg-zoning rounded-lg shadow dark:bg-gray-800 my-8">
					<div className="my-4">
						<h3 className="font-grands my-1 pt-6 text-xl text-center">Nos Objectifs</h3>
						<div className="flex flex-row gap-4 px-2">
								<ul>
									<li className="text-texte my-4">Permettre à tous à les refuges et associations de protection animale de se faire connaître et de faire connaître leurs pensionnaires.</li>
									<li className="text-texte my-4">Offrir aux particuliers à la recherche d’un animal à prendre en charge en tant que famille d'accueil un outil de recherche efficace et performant.</li>
									<li className="text-texte my-4">Mettre en relation ces deux groupes afin d'offrir un toit à un maximum d'animaux dans le besoin.</li>
								</ul>
							<img src="/images/404.webp" className="size-20 py-2 rounded-xl " alt="Un animal en détresse" />
						</div>
					</div>
				</section>
			</article>
		</main>
  )
};

export default APropos;