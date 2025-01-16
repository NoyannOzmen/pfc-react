import { Utilisateur } from "./Utilisateur";

export interface IMedia {
  id: string;
  url: string;
  ordre: string
}

export interface ITag {
  id: string;
  nom: string;
  description: string
}

export interface IUtilisateur {
  id: string;
  email: string;
  mot_de_passe: string;
  role: string;
  accueillant: Famille | null;
  refuge : Association | null;
}

export interface IFamille {
  id: string;
  prenom: string;
  nom: string;
  telephone: string;
  rue: string;
  commune: string;
  code_postal: string;
  pays: string;
  hebergement: string
}

export interface IEspece {
  id: string;
  nom: string;
}

export interface IAssociation {
  id: string;
  nom: string;
  responsable: string;
  rue: string;
  commune: string;
  code_postal: string;
  pays: string;
  siret: string;
  telephone: string;
  images_association: Media;
  email: Utilisateur
}

export interface IAnimal {
  id: string;
  nom: string;
  race: string;
  couleur: string;
  age: number;
  sexe: string;
  description: string;
  statut: string;
  espece: Espece;
  images_animal: Media;
  refuge: Association;
  demandes: Demande;
}

export interface IDemande {
  id: string;
  famille: Famille;
  animal: Animal;
  statut_demande: string;
  date_debut : string;
  date_fin: string
}

export interface RootContext {
  animals: Animal[];
  tags: Tag[];
  species: Espece[];
  shelters: Association[];
  user: LoggedUser | null;
}

export interface LoggedUser {
  id: string;
  email: string;
  role: string;
  accueillant: Famille | null;
  refuge : Association | null;
  /* accessToken: string; */
}
