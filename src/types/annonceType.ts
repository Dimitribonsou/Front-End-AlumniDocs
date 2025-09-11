export interface AnnonceType
{
  id_annonce:number;
  libelle:string;
  description:string;
  image:string;
  id_admin?:number;
  nom_admin?:string;
  lien_fichier?:string;
  statut?:boolean;
  annee_scolaire?:string;
  date_publication:string;
  heure_publication:string;
}