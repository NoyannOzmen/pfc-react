import { Media } from './Media';

export type Association = {
  id: string;
  nom: string;
  responsable: string;
  rue: string;
  commune: string;
  code_postal: string;
  pays: string;
  siret: string;
  telephone: string;
  logo: Media
}