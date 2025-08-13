import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Siderbar";
import Navbar_admin from "../../Components/Navbar_admin";
import constant from "../../data/constant";
import { faCheckCircle, faTimesCircle,faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewNotification from "../../data/function";

interface Requete {
  id_requete: number;
  id_etudiant: number;
  etudiant: string;
  type: string;
  objet?: string;
  date_envoi: string;
  statut: "En attente" | "Traitée" | "Rejeter";
  //.piece_jointe?: string; // Ajout du champ pièce jointe
  description?:string
  // date: string;
  // statut: "En attente" | "Traitée";
  piece_jointe?: string;
}

const EXEMPLES_REQUETES: Requete[] = [
  {
    id_requete: 1,
    id_etudiant:34,
    etudiant: "Jean-Pierre Ngono",
    type: "Revendication de note",
    date_envoi: "2023-04-01",
    statut: "En attente",
    piece_jointe: "/uploads/pj1.pdf",
  },
  {
    id_requete: 2,
    id_etudiant:34,
    etudiant: "Marie Mballa",
    type: "Absence justifiée",
    date_envoi: "2023-04-02",
    statut: "Traitée",
    piece_jointe: "/uploads/pj2.pdf",
  },
  {
    id_requete: 3,
    id_etudiant:34,
    etudiant: "Pauline Ewane",
    type: "Demande de document",
    date_envoi: "2023-04-03", 
    statut: "En attente",
    piece_jointe: "/uploads/pj3.pdf",
  },
  {
    id_requete: 4,
    id_etudiant:34,
    etudiant: "Alain Mbarga",
    type: "Revendication de note",
    date_envoi: "2023-04-04",
    statut: "Traitée",
    piece_jointe: "/uploads/pj4.pdf",
  },
  {
    id_requete: 5,
    id_etudiant:34,
    etudiant: "Sophie Nkou",
    type: "Absence justifiée",
    date_envoi: "2023-04-05", 
    statut: "En attente",
    piece_jointe: "/uploads/pj5.pdf",
  },
];

const PAGE_SIZE = 3;

const RequeteAdmin: React.FC = () => {
  const [requetes, setRequetes] = useState<Requete[]>(EXEMPLES_REQUETES);
  const [search, setSearch] = useState("");
  const [statutFilter, setStatutFilter] = useState<"" | "En attente" | "Rejeter" | "Traitée">("");
  const [page, setPage] = useState(1);
  const [showConfirmDialog, setshowConfirmDialog] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<number>(2);
  const [currentStudent, setCurrentStudent] = useState(2);
  const [currentStatut, setCurrentStatut] = useState(false);
  const [description, setDescription] = useState("");
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


  // Filtrage et recherche
  const filteredRequetes = requetes.filter((requete) => {
    const matchSearch =
      requete.etudiant.toLowerCase().includes(search.toLowerCase()) ||
      requete.type.toLowerCase().includes(search.toLowerCase());
    const matchStatut = statutFilter === "" || requete.statut === statutFilter;
    return matchSearch && matchStatut;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRequetes.length / PAGE_SIZE);
  const requetesToShow = filteredRequetes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleMarkAsProcessed = async (id: number,id_etudiant:number) => {
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
      // actualiser la liste 
      getRequetes();
      // envoyer les notifications a l'etudiant conserner
      if(description.trim() === "")
      {
        NewNotification("Requete traitée","Votre requete a été traitée avec success.",id_etudiant,'success');
      }
      else
      {
        NewNotification("Requete traitée",description,id_etudiant,'success');
      }
     
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
        body:JSON.stringify({statut:"Rejeter"})
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
      if(description.trim() === "")
      {
        NewNotification("Requete rejetée","Votre requete a été rejetée .",id_etudiant,'danger');
      }
       else
      {
        NewNotification("Requete rejetée",description,id_etudiant,'danger');
      }
     
    } catch (error) {
      console.log("Une erreur est survenue : "+error)
    }
    
  };
 const showConfirmDialogHandler = (requeteId: number,studentId:number,statut:boolean) => {
  console.log("RequestId : "+requeteId)
    setCurrentRequest(requeteId); 
    setCurrentStudent(studentId); 
    setCurrentStatut(statut); 
    setshowConfirmDialog(true);
  }
  const handleSendResponse = () => {
    setshowConfirmDialog(false);
    console.log("id requete : "+currentRequest);
    if(currentStatut)
    {
      handleMarkAsProcessed(currentRequest,currentStudent);
    }
    else
    {
      handleMarkAsReset(currentRequest,currentStudent);
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

          {/* Barre de recherche et filtre */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-2 mb-4">
            <input
              type="text"
              placeholder="Rechercher par étudiant ou type..."
              className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/3"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <select
              className="border border-gray-300 rounded px-3 py-2 w-full md:w-48"
              value={statutFilter}
              onChange={(e) => {
                setStatutFilter(e.target.value as "" | "En attente" | "Traitée");
                setPage(1);
              }}
            >
              <option value="">Tous les statuts</option>
              <option value="En attente">En attente</option>
              <option value="Traitée">Traitée</option>
              <option value="Rejeter">Rejeter</option>
            </select>
          </div>

          {/* Liste des requêtes */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Liste des Requêtes</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-[#161B70] text-white">
                  <th className="border border-gray-300 p-2 text-left">Étudiant</th>
                  <th className="border border-gray-300 p-2 text-left">Type</th>
                  <th className="border border-gray-300 p-2 text-left">Objet</th>
                  <th className="border border-gray-300 p-2 text-left">Date</th>
                  <th className="border border-gray-300 p-2 text-left">Statut</th>
                  <th className="border border-gray-300 p-2 text-center">Actions</th>
                  <th className="border border-gray-300 p-2 text-center">Justificatif</th>
                </tr>
              </thead>
              <tbody>
                {requetesToShow.map((requete) => (
                  <tr key={requete.id_requete} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2 capitalize">{requete.etudiant}</td>
                    <td className="border border-gray-300 p-2">{requete.type}</td>
                    <td className="border border-gray-300 p-2">{requete.objet}</td>
                    <td className="border border-gray-300 p-2">{new Date(requete.date_envoi).toISOString().split('T')[0]}</td>
                    <td
                      className={`border border-gray-300 p-2 ${
                        requete.statut === "Traitée"
                          ? "text-green-600 font-semibold"
                          : requete.statut === "En attente"
                          ? "text-yellow-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }`}
                    >
                      {requete.statut}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {/* {requete.statut === "En attente" || 1 && ( */}
                        <div className="flex gap-1">

                          <button
                            // onClick={() => handleMarkAsProcessed(requete.id,requete.id_etudiant)}
                             onClick={() => showConfirmDialogHandler(requete.id_requete,requete.id_etudiant,true)}
                            className="bg-[#161B70]  text-white px-3 py-1 rounded hover:opacity-80"
                          >
                            <FontAwesomeIcon icon={faCheckCircle} />
                            {/* Accepter */}
                          </button>
                          <button
                            // onClick={() => handleMarkAsReset(requete.id,requete.id_etudiant)}
                             onClick={() => showConfirmDialogHandler(requete.id_requete,requete.id_etudiant,false)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:opacity-80"
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
                          href={constant.requete_file_path + "/" + requete.piece_jointe}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-2 py-1 rounded bg-gray-100 hover:bg-blue-100 text-blue-700 font-medium transition-colors duration-150"
                        >
                          <span className="truncate max-w-[100px]">{requete.piece_jointe.split('/').pop()}</span>
                          <FontAwesomeIcon icon={faArrowRight} className="text-[#161B70]" />
                        </a>
                      ) : (
                        <span className="text-gray-400">Aucune pièce</span>
                      )}
                    </td>
                  </tr>
                ))}
                {requetesToShow.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-500 p-3">
                      Aucune requête trouvée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <div>
                Page {page} sur {totalPages}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Précédent
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
            {/* Boîte de dialogue de confirmation */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Laisser une reponse à la requete</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                className="w-full border border-gray-300 p-2 rounded"
                value={description}
                onChange={(e) => setDescription( e.target.value)}
                placeholder="Entrez un Justificatif"
                rows={3}
                maxLength={255}
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={()=>setshowConfirmDialog(false)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:opacity-80"
              >
                Annuler
              </button>
              <button
                onClick={handleSendResponse}
                className="px-4 py-2 bg-[#161B70] text-white rounded hover:opacity-80"
              >
                Envoyer
              </button>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default RequeteAdmin;