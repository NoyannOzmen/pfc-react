import { IAnimal } from "../../../@types/index";

type AnimalTableProps = {
  animal: IAnimal;
}

function AnimalTable({ animal }: AnimalTableProps) {

  function handleClick(e: any) {
    const fold = e.currentTarget.nextSibling;
    fold.classList.toggle('hidden')

    const content = fold.nextSibling;
    content.classList.toggle('hidden')
  };

  return(
    <tbody>
      <tr onClick={handleClick} tabIndex={0} className="view text-fond text-sm bg-accents2 font-grands font-semibold p-3 border-accents2-dark border-solid border-1 hover:bg-accents2-dark">
        <td colSpan={3} scope="colgroup" className="px-2 pt-2  border-accents2-dark border-solid border-1">{animal.nom}</td>
        <td colSpan={3} scope="colgroup" className="px-2 pt-2  border-accents2-dark border-solid border-1">Demande</td>
      </tr>
      <tr className="text-fond text-sm bg-accents2-light font-grands font-semibold p-3 border-accents2-dark border-solid border-1 hidden">
        <td colSpan={2} className="px-2 pt-2  border-accents2-light border-solid border-1">Refuge</td>
        <td colSpan={2} className="px-2 pt-2  border-accents2-light border-solid border-1">Date de demande</td>
        <td colSpan={2} className="px-2 pt-2  border-accents2-light border-solid border-1">Statut</td>
      </tr>
      <tr className="text-sm font-body font-semibold bg bg-fond hidden">                          
        <td colSpan={2}>{animal.refuge.nom}</td>
        <td colSpan={2}>{animal.demandes[0].Demande.date_debut}</td>
        <td colSpan={2}>{animal.demandes[0].Demande.statut_demande}</td>
      </tr>
    </tbody>
  )
};

export default AnimalTable;