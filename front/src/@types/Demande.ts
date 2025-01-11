import { Famille } from './Famille';
import { Animal } from './Animal';

export type Demande = {
  id: string;
  famille: Famille;
  animal: Animal;
  statut_demande: string;
  date_debut : Date;
  date_fin: Date
}