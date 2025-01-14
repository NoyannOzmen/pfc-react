export interface IMedia {
  id: number;
  url: string;
  ordre: string
}

export interface ITag {
  id: number;
  nom: string;
  description: string
}

export interface IUtilisateur {
  id: number;
  email: string;
  mot_de_passe: string
}

export interface IFamille {
  id: number;
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
  id: number;
  nom: string;
}

export interface IAssociation {
  id: number;
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

export interface IAnimal {
  id: number;
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

export interface IDemande {
  id: number;
  famille: Famille;
  animal: Animal;
  statut_demande: string;
  date_debut : Date;
  date_fin: Date
}

export interface RootContext {
  animals: IAnimal[];
  tags: ITag[];
  species: IEspece[];
  shelters: IAssociation[];
  user: LoggedUser | null;
}

export interface LoggedUser {
  id: number;
  email: string;
  role : Famille | Association | null;
  /* accessToken: string; */
}
