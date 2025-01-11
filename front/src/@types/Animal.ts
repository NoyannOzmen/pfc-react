import { Media } from './Media';
import { Espece } from './Espece';
import { Association } from './Association';

export type Animal = {
  id: string;
  nom: string;
  race: string;
  couleur: string;
  age: number;
  sexe: string;
  description: string;
  statut: string;
  espece: Espece;
  photo: Media;
  refuge: Association
}