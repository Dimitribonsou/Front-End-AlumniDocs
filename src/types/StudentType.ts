export interface StudentType
{
  id_etudiant:number;
  nom?:string;
  prenom?:string;
  email?:string;
  telephone?:string;
  password?:string;
  matricule?:string;
  genre?:string;
  documents: string[];
  id_classe?: number;
}