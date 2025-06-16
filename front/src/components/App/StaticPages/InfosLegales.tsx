import { Link } from 'react-router-dom';

function InfosLegales() {
  
  return (
    <main className="justify-self-stretch flex-1">
      <article className="p-32 mx-auto">
        <h2 className="font-grands text-3xl text-center my-6 pb-4">Informations Légales</h2>
        <p className="font-body text-texte text-m pb-4">Merci de bien vouloir lire attentivement l’intégralité des présentes Conditions Générales d’Utilisation avant de consulter notre site. Celles-ce définissent les modalités d’accès et d’utilisation du site proposé aux visiteurs par PetFosterConnect .
        La consultation de notre site reste subordonnée à l’acceptation intégrale et au respect des <abbr title="Condition Générales d’Utilisation"> C.G.U </abbr> suivantes. PetFosterConnect se réserve le droit de modifier ou de mettre à jour ces C.G.U à tout moment.
        Dans le cas où vous ne seriez pas en accord avec tout ou partie des C.G.U décrites ci-après, nous vous recommandons vivement de ne pas utiliser notre site.
        </p>
        
        <h3 className="font-grands my-1 pt-6 text-xl text-center">Mentions Légales</h3>
        <p className="font-body text-texte text-m pb-4">PetFosterConnect.com est un site Web de l’Association « PetFosterConnect »
        Les coordonnées et un formulaire de contact sont disponibles sur le site sur la page de contact dédiée : <Link to="/contact">Contactez-nous</Link>
        Le présent site internet est hébergé par <span className="font-semibold italic">eddi cloud</span>
        </p>
        <ul className="font-body text-texte text-m">
          <li><span className="font-semibold italic">Rédacteur en Chef :</span> M. Noyann Özmen</li>
          <li><span className="font-semibold italic">Webmaster :</span> M. Maxime Lizere</li>
          <li><span className="font-semibold italic">Editeur & Intégrateur :</span> M. Samuel Juminer</li>
          <li><span className="font-semibold italic">Conception du Logo :</span> Mme Laura Martin-Wortham</li>
          <li><span className="font-semibold italic">Webdesigner & graphiste :</span> Mme Laura Martin-Wortham</li>
        </ul>
      
        <h3 className="font-grands my-1 pt-6 text-xl text-center">Condition Générales d'Utilisation</h3>
        <ul className="font-body text-texte text-m pb-4">
          <li className="pb-4">
            Le présent site Web et l’ensemble de son contenu (textes, images, base de données, programmes, langages, etc…), nommé ci-après le Site Web, est protégé par le droit d’auteur.
          </li>
          <li className="pb-4">
            PetFosterConnect autorise la visualisation de son contenu uniquement à titre personnel et privé, à l'exclusion de toute visualisation ou diffusion publique.
            Toute autorisation de reproduction n’est valide que sous forme numérique, via le présent agent utilisateur, i.e ordinateur/tablette/smartphone de consultation - aux fins de visualisation des pages consultées par votre logiciel de navigation.
            L'impression papier est autorisée aux fins de copie privée à l'usage exclusif du copiste au sens de l'article L. 122-5 2° du Code de la Propriété Intellectuelle.
            La création d'un lien hypertexte vers le Site Web est autorisée sans frame vers l'adresse de la page de d'accueil du site, à l'exclusion de toute autre adresse.
          </li>
          <li className="pb-4">
            Toute autre utilisation non expressément visée aux présentes n'est pas permise et nécessite l'accord exprès écrit et préalable de PetFosterConnect.
            Il n’est pas permis – en dehors des utilisations expressément concédées ci-dessus – de : reproduire les marques et logos de PetFosterConnect, et d’utiliser tout programme ou script utilisé sur ce SiteWeb, etc…
          </li>
          <li className="pb-4">
            Malgré toute la vigilance de l’équipe de PetFosterConnect, les informations contenues dans le présent Site Web sont données à titre indicatif et sont susceptibles d’être modifiées sans préavis.
          </li>
          <li className="pb-4">
            PetFosterConnect ne garantit pas l'exactitude, complétude, adéquation ou fonctionnement du site Web ou de l'information qu'il contient, ni que ladite information a été vérifiée. Nous faisons confiance à nos partenaires quant à la véracité des informations.
          </li>
          <li className="pb-4">
            PetFosterConnect n'assume aucune responsabilité relative à l'information contenue et à l'existence ou la disponibilité de toute annonce mentionnée dans le présent site Web et décline toute responsabilité découlant d'une négligence ou autre concernant cette information.
          </li>
          <li className="pb-4">
            Le présent Site Web a été créé en France. En utilisant le présent Site Web, vous acceptez les conditions d'utilisation décrites susmentionnées, sans préjudice de tous recours de nature contractuelle ou délictuelle pouvant être exercés par PetFosterConnect.
            Tout litige portant sur l'interprétation ou l'exécution d'un engagement contractuel prévu au présent site sera de la compétence exclusive des tribunaux français faisant application de la loi française.
          </li>
        </ul>
      
        <h3 className="font-grands my-1 pt-6 text-xl text-center">Cookies</h3>
        <ul className="font-body text-texte text-m pb-4">
          <li className="pb-4">
            Lors de votre visite sur notre site, nous sommes susceptibles d’ajouter un cookie à votre ordinateur. Un cookie est un petit bloc de données envoyé à votre navigateur par un serveur web et stocké sur le disque dur de votre ordinateur.
          </li>
          <li className="pb-4">
            Le cookie ne nous permet pas de vous identifier personnellement. De manière générale, il nous permet d’enregistrer des informations relatives à la navigation de votre ordinateur sur notre site (les pages que vous avez consultées, la date et l’heure de la consultation, etc.) que nous pourrons lire lors de vos visites ultérieures.
          </li>
          <li className="pb-4">
            Vous pouvez naturellement vous opposer à l’enregistrement de cookies en configurant votre navigateur à partir des « Options » ou « Préférences » de celui-ci.
          </li>
          <li className="pb-4">
            Vous pouvez également supprimer les cookies à tout moment et individuellement en vous rapportant au manuel d’utilisation de votre ordinateur.
          </li>
        </ul>
            
          <h3 className="font-grands my-1 pt-6 text-xl text-center">Données Personnelles</h3>
          <p className="font-body text-texte text-m pb-4">
            Des traitements de données à caractère personnel sont réalisés à travers l’utilisation du Site Web. Pour en savoir plus sur ces traitements, vous pouvez consulter notre <Link to="/rgpd">Politique de protection des données</Link></p>
      
        <h3 className="font-grands my-1 pt-6 text-xl text-center">Copyright</h3>
        <p className="font-body text-texte text-m pb-4">
          Copyright 2024 – Pet Foster Connect – Tous droits réservés.
          La reproduction du contenu de ce site web, en tout ou en partie, est interdite sans la permission écrite de l’auteur (sauf mention particulière). Tout autre matériel contenu sur ce site ne nous appartenant pas : photos, textes, images, codes source, logos, noms de produits ou marques citées, etc., est la propriété de leurs détenteurs respectifs
          </p>

        <p className="font-body text-texte text-m pb-4">Date de dernière mise à jour : <span className="font-semibold italic">Le 16 Septembre 2024 à 11h34</span></p>
      </article>
    </main>
  )
};

export default InfosLegales;