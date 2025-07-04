import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Siderbar";
import Navbar_admin from "../../Components/Navbar_admin";
import constant from "../../data/constant";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewNotification from "../../data/function";

interface Requete {
  id: number;
  id_etudiant: number;
  etudiant: string;
  type: string;
  objet: string;
  date_envoi: string;
  statut: "En attente" | "Traitée" | "Rejeter";
  piece_jointe?: string; // Ajout du champ pièce jointe
  description?:string
}

const RequeteAdmin: React.FC = () => {
  const [requetes, setRequetes] = useState<Requete[]>([]);
  useEffect(()=>{
    getRequetes();
  },[])
  const getRequetes= async ()=>{
    const response = await fetch(`${constant.host}/AlumniDocs-API/requestList`);
    if(response.ok)
    {
      const requestData:Requete[]=await response.json()
      //mettre a jour la liste des annonces
      setRequetes(requestData);
    }
    else
    {
       console.log("erreur lors de la recuperation de la classe");
    }
  }

  const handleMarkAsProcessed = async (id: number,id_etudiant:number) => {
    try {
      const response = await fetch(`${constant.host}/AlumniDocs-API/UpdateStatutRequest/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({statut:"Rejeter"})
      });
      if(!response.ok)
      {
         console.log("erreur lors de la Mise a jour du statut")
      }
      const result=await response.text();
      console.log(result)
      alert(result)
      // actualiser la liste 
      getRequetes();
      // envoyer les notifications a l'etudiant conserner
      NewNotification("Requete traitée","Votre requete a été traitée avec success.",id_etudiant,'success');
     
    } catch (error) {
      console.log("Une erreur est survenue : "+error)
    }  
  };
  const handleMarkAsReset = async (id: number,id_etudiant:number) => {
    try {
      const response = await fetch(`${constant.host}/AlumniDocs-API/UpdateStatutRequest/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({statut:"Traitée"})
      });
      if(!response.ok)
      {
         console.log("erreur lors de la Mise a jour du statut")
      }
      const result=await response.text();
      console.log(result)
      alert(result)
      //mettre a jour la liste
      getRequetes();
      // envoyer les notifications a l'etudiant
      NewNotification("Requete rejetée","Votre requete a été rejetée .",id_etudiant,'danger');
     
    } catch (error) {
      console.log("Une erreur est survenue : "+error)
    }
    
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        {/* Navbar */}
        <Navbar_admin />

        {/* Contenu de la page */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#161B70] mb-6">Gestion des Requêtes</h1>

          {/* Liste des requêtes */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Liste des Requêtes</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2 text-left">Étudiant</th>
                  <th className="border border-gray-300 p-2 text-left">Type</th>
                  <th className="border border-gray-300 p-2 text-left">Objet</th>
                  <th className="border border-gray-300 p-2 text-left">Date</th>
                  <th className="border border-gray-300 p-2 text-left">Statut</th>
                  <th className="border border-gray-300 p-2 text-center">Actions</th>
                  <th className="border border-gray-300 p-2 text-center">Détails</th>
                </tr>
              </thead>
              <tbody>
                {requetes.map((requete) => (
                  <tr key={requete.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2 capitalize">{requete.etudiant}</td>
                    <td className="border border-gray-300 p-2">{requete.type}</td>
                    <td className="border border-gray-300 p-2">{requete.objet}</td>
                    <td className="border border-gray-300 p-2">{new Date(requete.date_envoi).toISOString().split('T')[0]}</td>
                    <td
                      className={`border border-gray-300 p-2 ${
                        requete.statut === "Traitée" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {requete.statut}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {/* {requete.statut === "En attente" || 1 && ( */}
                        <div className="flex gap-1">

                          <button
                            onClick={() => handleMarkAsProcessed(requete.id,requete.id_etudiant)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          >
                            <FontAwesomeIcon icon={faCheckCircle} />
                            {/* Accepter */}
                          </button>
                          <button
                            onClick={() => handleMarkAsReset(requete.id,requete.id_etudiant)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          >
                            <FontAwesomeIcon icon={faTimesCircle} />
                            {/* Refuser */}
                          </button>
                        </div>
                      {/* )} */}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {requete.piece_jointe ? (
                        <a
                          href={constant.requete_file_path+"/"+requete.piece_jointe}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#161B70] underline hover:text-blue-700"
                        >
                          Détails
                        </a>
                      ) : (
                        <span className="text-gray-400">Aucune pièce</span>
                      )}
                    </td>
                  </tr>
                ))}
                {requetes.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-500 p-3">
                      Aucune requête trouvée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequeteAdmin;