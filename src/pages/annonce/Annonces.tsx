import React, { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import AnnouncementCard from "../../Components/annonces";
import Footer from "../../Components/footer";
import constant from "../../data/constant";
import Ilogin from "../../types/Ilogin";
import IclassInfo from "../../types/IclasseInfo";
import { AnnonceType } from "../../types/annonceType";

const Annonce = () => {
  const [annonces,setAnnonces]=useState<AnnonceType[]>([]);
  useEffect( () => {
    getAnnonces();
  },[]);
  const getAnnonces = async ()=>{
    const classeInfo:IclassInfo[] = JSON.parse(localStorage.getItem("classInfo") || '{}') as IclassInfo[];
   const id_classe=classeInfo[0].id_classe || 1;
    const response = await fetch(`${constant.host}/AlumniDocs-API/getAnnonceClasse/${id_classe}`);
    if(!response.ok)
    {
       console.log("erreur lors de la recuperation des notifications .");
    }
    // recuperer le resultat retourner par l'api
     const annonceData = await response.json();
     console.log(annonceData);
     //mettre a jour la valeur du state
     setAnnonces(annonceData);
     console.log("Mise a jour des donnees : ", annonces);
  }
  return (
    <div className="min-h-screen flex flex-col bg-watermark">
      <Navbar />

      {/* Conteneur principal centré */}
      <div className="container mx-auto flex flex-col items-center mt-10 space-y-6 px-4">
        {/* Section Annonces */}
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            { annonces && annonces.length >0 ? (
             annonces.map((annonce)=>(
                <AnnouncementCard
                   imageSrc={annonce.lien_fichier || ""}
                   title={annonce.libelle}
                   description={annonce.description.substring(0,30)}
                   date={new Date(annonce.date_publication).toISOString().split('T')[0]}
                   time={annonce.heure_publication}
                   id_annonce={annonce.id_annonce}
                 />
            ))) :
            (
               <p className="text-center font-medium text-blue-800 w-full my-2 text-xl">Aucune Annonce disponible pour l'instant.</p> 
            )}
        
          
          </div>
        </div>
      </div>
        <div className="mt-auto w-full">
          <Footer />
        </div>
    </div>
  );
};

export default Annonce;