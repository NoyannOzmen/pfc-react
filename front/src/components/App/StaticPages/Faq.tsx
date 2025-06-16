function Faq() {
  
  return (
    <main className="justify-self-stretch flex-1">
      <article className="p-32 mx-auto">
        <h2 className="font-grands text-3xl text-center my-6 pb-4">Foire Aux Questions</h2>

        <p className="font-body text-texte text-center text-m pb-4">Pour toute autre question, n'hésitez pas à nous envouer un message via le formulaire de Contact disponible au pied de cette page.</p>

        <h3 className="font-grands my-1 pt-6 text-l">Ma recherche n'affiche aucun résultat</h3>
          <p className="font-body text-texte text-m pb-4">Vous pouvez élargir votre recherche en choisissant des critères moins précis. Revenez également nous voir régulièrement car notre base de données est régulièrement mise à jour !</p>
        
        <h3 className="font-grands my-1 pt-6 text-l">Pourquoi dois-je m'inscrire en tant que famille d'accueil ?</h3>
          <p className="font-body text-texte text-m pb-4">L'inscription vous permet d'avoir un compte sur PetFosterConnect. Votre compte personnel vous permettra de faire une demande d'accueil, et de suivre le statut de cette demande. Dès qu'un refuge aura accepté ou refusé votre demande, vous pourrez également en être informés.</p>
        
        <h3 className="font-grands my-1 pt-6 text-l">Un refuge proche de chez moi n'est pas référencé sur votre site</h3>
          <p className="font-body text-texte text-m pb-4">Nous ne connaissons pas encore tous les refuges sur le territoire français. Mais vous pouvez soit nous informer pour que nous puissions prendre contact avec eux, ou leur passer le mot à propos de notre site. Nous serions ravis de permettre à toujours plus d'animaux de connaître la chaleur d'un foyer !</p>
          
      </article>
    </main>
  )
};

export default Faq;