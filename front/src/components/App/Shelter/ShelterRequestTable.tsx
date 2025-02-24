import { IAnimal } from "../../../@types/index";
import { Link } from "react-router-dom";

type ShelterRequestTableProps = {
  animal: IAnimal;
}

function ShelterRequestTable({ animal }: ShelterRequestTableProps) {

  function handleClick(e: any) {
    const fold = e.currentTarget.nextSibling;
    fold.classList.toggle('hidden')
  
    let content = fold.nextSibling;

    while(content && !content.classList.contains('font-grands')) {
      content.classList.toggle('hidden');
      content = content.nextSibling;
    }
   };

  return(
    <tbody>
      <tr onClick={handleClick} tabIndex={0} className="view text-fond text-sm bg-accents2 font-grands font-semibold p-3 border-accents2-dark border-solid border-1 hover:bg-accents2-dark">
        <td colSpan={4} scope="colgroup" className="px-2 pt-2 border-accents2-dark border-solid border-1">{animal.nom}</td>
        <td colSpan={2} scope="colgroup" className="px-2 pt-2 border-accents2-dark border-solid border-1">Nombre</td>
      </tr>
        <tr className="fold text-fond text-sm bg-accents2-light font-grands font-semibold p-3 border-accents2-dark border-solid border-1 hidden">
          <td colSpan={2} className="px-2 pt-2  border-accents2-light border-solid border-1">Famille</td>
          <td colSpan={2} className="px-2 pt-2  border-accents2-light border-solid border-1">Date de demande</td>
          <td colSpan={2} className="px-2 pt-2  border-accents2-light border-solid border-1">Statut</td>
        </tr>
        { animal.demandes.map((demande : any, index : any) => (
        <tr key={`${animal.id} request n° ${demande.id}`} className={"fold text-sm font-body font-semibold hidden " + (index % 2 > 0 ? 'text-fond bg-accents2-light' : 'bg bg-fond')}>
          
            <td colSpan={2}>{demande.nom}</td>
            <td colSpan={2}>{demande.Demande.date_debut}</td>
            <td colSpan={2}><Link tabIndex={0} className="hover:underline" to={`/associations/profil/demandes/${demande.Demande.id}`} >{demande.Demande.statut_demande}</Link></td> 
        </tr>
        ))}
    </tbody>
  )
};

export default ShelterRequestTable;