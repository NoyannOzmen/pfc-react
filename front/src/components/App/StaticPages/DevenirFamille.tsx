function DevenirFamille() {
  
  return (
		<main className="justify-self-stretch flex-1">
			<article className="flex flex-col p-2 lg:p-32 mx-auto">
				<h2 className="font-grands text-center my-6 pb-4 text-3xl"> Devenir famille d'accueil </h2>

				<section className="font-body mx-auto w-[94%] bg-zoning rounded-lg shadow dark:bg-gray-800 my-8">
					<div className="py-4">
						<h3 className="font-grands my-1 pt-6 text-xl text-center">Qu'est-ce qu'une famille d'accueil ?</h3>
						<div className="flex flex-row gap-4 px-2 items-center">
							<p className="text-texte my-8">
								Une famille d'accueil c’est d’abord un foyer aimant, une famille ou une personne vivant seule, au sein duquel des animaux sont placés momentanément en attendant de trouver une famille définitive.
								<br />
								La durée d’accueil est variable : un jour, une semaine, un mois ou un an... ou pour toujours, certaines familles s’étant attachées à l’animal. Ne vous engagez pas à la légère car bien que temporaire, la famille d'accueil doit offrir un foyer stable à l'animal.						
							</p>
							<img src="/images/404.webp" className="size-20 py-2 rounded-xl" alt="Un animal en détresse" />
						</div>
					</div>
				</section>
				
				<section className="font-body mx-auto w-[94%] bg-zoning rounded-lg shadow dark:bg-gray-800 my-8">
					<div className="my-4">
						<h3 className="font-grands my-1 pt-6 text-xl text-center">Quel est son rôle ?</h3>
						<div className="flex flex-row gap-4 px-2 items-center">
							<img src="/images/unai.webp" className="size-20 my-8 rounded-lg" alt="Unai, mascotte officielle de Pet Foster Connect" />
							<p className="text-texte my-8">
								La famille d’accueil joue un rôle vital à la fois pour l’animal qu’elle recueille et pour l’association qu’elle aide.
								<br />
								La vie en famille d'accueil est nettement moins stressante pour l'animal que le refuge. Elle lui permet de profiter de la chaleur d’un foyer aimant et attentionné et donc de pallier la souffrance liée à son abandon.
								Les familles d'accueil permettent aux refuges de mieux connaitre le caractère et les besoins de l'animal avant son adoption et parfois même de parfaire son éducation. Financièrement, elles permettent également aux associations de limiter les coûts de structure, en réduisant le recours aux bénévoles en association.
								Être famille d'accueil, c'est permettre aux associations de prendre en charge un plus grand nombre d'animaux abandonnés.
								<br />
								Dans la majorité des cas, les frais alimentaires sont à la charge de la famille d'accueil, mais il peuvent - dans certains cas - être à la charge de l’association ; les frais des soins vétérinaires restant dans tous les cas à la charge de l'association.						
							</p>
						</div>
					</div>
				</section>
				
				<section className="font-body mx-auto w-[94%] bg-zoning rounded-lg shadow dark:bg-gray-800 my-8">
					<div className="my-4">
						<h3 className="font-grands my-1 pt-6 text-xl text-center">Pour quels animaux ?</h3>
						<div className="flex flex-row gap-4 px-2 ">
							<p className="text-texte my-8 text-center">
								Vous pouvez devenir famille d’accueil pour tous types d’animaux : chien, chat, marsupiaux, poney, oiseau, pangolins, etc.
								PetFosterConnect vous permet de faire une demande d’accueil auprès d’une association, qui se réserve le droit de l’accepter ou de la refuser en fonctions de plusieurs facteurs : besoins actuels de l'association ; vos conditions d’accueil (type d’hébergement, taille éventuelle de votre terrain…) et des autres occupants de votre hébergement (autres espèces, enfants en bas âge…).
							</p>
							<img src="/icons/logo.svg" className="size-20 my-8" alt="Le logo Pet Foster Connect" />
						</div>
					</div>
				</section>

				<section className="font-body mx-auto w-[94%] bg-zoning rounded-lg shadow dark:bg-gray-800 my-8">
					<div className="my-4">
							<h3 className="font-grands my-1 pt-6 text-xl text-center">Vous souhaitez devenir famille d'accueil ?</h3>
						<div className="flex flex-row gap-4 px-2">
							<img src="/images/unai.webp" className="size-20 my-8 rounded-lg" alt="Unai, mascotte officielle de Pet Foster Connect" />
							<p className="text-texte my-8 self-center">
								Créez votre compte Famille, consultez la liste des associations et/ou la liste des animaux sur le présent Site et faites une demande d’accueil via le formulaire dédié !
							</p>
						</div>
					</div>
				</section>
				
			</article>
		</main>
  )
};

export default DevenirFamille;