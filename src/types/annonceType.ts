export interface AnnonceType
{
    id_annonce:number;
  libelle:string;
  description:string;
  image:string;
  id_admin?:number;
  annee_scolaire?:string;
  date_publication:string;
  heure_publication:string;
}