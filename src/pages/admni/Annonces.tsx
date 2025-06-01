import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Siderbar";
import Navbar_admin from "../../Components/Navbar_admin";
import constant from "../../data/constant";
import Ilogin from "../../types/Ilogin";
import IclassInfo from "../../types/IclasseInfo";
import { AnnonceType } from "../../types/annonceType";

const Annonces: React.FC = () => {
  const [annonces, setAnnonces] = useState<AnnonceType[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [annonceToDelete, setAnnonceToDelete] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [selectedFiliere, setSelectedFiliere] = useState<string[]>([]);
  const [libelle, setlibelle] = useState("");
  const [description, setDescription] = useState("");
  const [fichier, setFichier] =useState<any>();
  const [serverMessage, setServerMessage] = useState('');
  const [listClass, setClasseListe]=useState([]);
  const [idPublication, setIdPublication]=useState<number>(0);
  const [listAnnonce, setListeAnnonce]=useState<AnnonceType[]>([]);
  useEffect(()=>{
    getClasse();
    getAnnonces();
  },[]);
  // fonction pour  afficher la liste des classes
const getClasse= async ()=>{
  const response = await fetch(`${constant.host}/AlumniDocs-API/ClassList`);
  if(response.ok)
  {
    //mettre a jour la liste des classe
     setClasseListe(await response.json());
  }
  else
  {
     console.log("erreur lors de la recuperation de la classe");
  }
}
const getAnnonces= async ()=>{
  const response = await fetch(`${constant.host}/AlumniDocs-API/annonceList`);
  if(response.ok)
  {
    //mettre a jour la liste des annonces
    setListeAnnonce(await response.json());
    console.table(listAnnonce)
  }
  else
  {
     console.log("erreur lors de la recuperation de la classe");
  }
}
  const handleSubmit = async (e: React.FormEvent) => {
    const dataLogin:any = JSON.parse(localStorage.getItem("loginData") || '{}') as Ilogin;
    const idAdmin=dataLogin.iduser;
    e.preventDefault();
    const formData = new FormData();
    formData.append('libelle', libelle);
    formData.append('description', description);
    // formData.append('id_categorie', categorie);
    formData.append('image', fichier);
    formData.append('id_admin', idAdmin);
    try {
      const response = await fetch(`${constant.host}/AlumniDocs-API/newAnnonce`, {
        method: 'POST',
        body: formData
      });
      console.log(formData);
      if (!response.ok) {
        throw new Error('La réponse du serveur n\'est pas valide.');
      }

      const result = await response.text();
      setServerMessage(result);
      //mettre a jour la liste des annonces
      getAnnonces();
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la requête :', error);
      setServerMessage('Une erreur est survenue lors de l\'envoi de votre requête.');
    }
  };

const getPublication=(id_pub:number)=>{
  // afficher la boite de dialogue pour la publication 
  setIsPublishModalOpen(true);
  //recuperer l'id pubication  selectionner
  setIdPublication(id_pub);
}
const handleDeleteClick = (id_pub: number) => {
  setAnnonceToDelete(id_pub);
  setShowConfirmDialog(true);
};

const handleConfirmDelete = async () => {
  if (!annonceToDelete) return;

  try {
    const response = await fetch(`${constant.host}/AlumniDocs-API/deleteAnnonce/${annonceToDelete}`, {
      method: "DELETE"
    });

    if (response.ok) {
      const message = await response.text();
      alert(message);
      // fermer la boite de confirmation pour la suppression
      setShowConfirmDialog(false);
      getAnnonces(); // Mettre à jour la liste des annonces
    } else {
      alert("Échec de la suppression");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    alert("Une erreur est survenue lors de la suppression");
  } finally {
    setShowConfirmDialog(false);
    setAnnonceToDelete(null);
  }
};

const handleCancelDelete = () => {
  setShowConfirmDialog(false);
  setAnnonceToDelete(null);
};

  const handlePublish = async (id: number) => {
    try {
      console.log(id);
      console.log(selectedFiliere)
      for (const id_classe of selectedFiliere) {
        let data={
          "id_classe":id_classe,
          "id_annonce":id
        }
        try {
          const response = await fetch(`${constant.host}/AlumniDocs-API/newpublication`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });
          console.log(data);
          if (!response.ok) {
            throw new Error('La réponse du serveur n\'est pas valide.');
          }
          const result = await response.text();
          setServerMessage(result);
          getAnnonces();

        } catch (error) {
          console.error('Erreur lors de l\'envoi de la requête pour la classe ' + id_classe + ' :', error);
          setServerMessage('Une erreur est survenue lors de l\'envoi de votre requête.');
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la requête :', error);
      setServerMessage('Une erreur est survenue lors de l\'envoi de votre requête.');
    }
    // console.log(`Annonce ${id} publiée pour la filière : ${selectedFiliere}`);
    setSelectedFiliere([]); // Réinitialiser la sélection après publication
    setIsPublishModalOpen(false);
    setIdPublication(0);
    alert(serverMessage);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar_admin />

        <main className="p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-6 text-center md:text-left">Gestion des Annonces</h1>
          <div className="bg-white shadow-md rounded-lg p-4">
            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3">Libellé</th>
                    <th className="p-3">Auteur</th>
                    {/* <th className="p-3">Classes</th> */}
                    <th className="p-3">Date</th>
                    <th className="p-3">statut</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listAnnonce.map((annonce:AnnonceType) => (
                    <tr key={annonce.id_annonce} className="border-b hover:bg-gray-50">
                      <td className="p-3">{annonce.libelle}</td>
                      <td className="p-3 capitalize font-medium">{annonce.nom_admin}</td>
                      {/* <td className="p-3">{annonce.classes ? annonce.classes.map((classe:string)=>classe).join(", ") : ''}</td> */}
                      <td className="p-3">{new Date(annonce.date_publication).toISOString().split("T")[0]}</td>
                      <td className='p-3'> <span className={annonce.statut ? "bg-green-200 text-white   rounded-lg p-1 px-2" : "bg-yellow-200 text-white  rounded-lg p-1 px-2"  }>{annonce.statut ? 'publier' :'non publier'}</span></td>
                      <td className="p-3 flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => getPublication(annonce.id_annonce)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                        >
                          Publier
                        </button>
                        <button onClick={() => handleDeleteClick(annonce.id_annonce)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-center md:justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Ajouter une annonce
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Modal pour ajouter une annonce */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Ajouter une Annonce</h2>
            <p className='font-medium text-center   mt-1 text-green-500 rounded-sm'>{serverMessage}</p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Libellé</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value={libelle}
                onChange={(e) => setlibelle(e.target.value)}
                placeholder="Entrez le libellé de l'annonce"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
              <input
                type="file"
                className="w-full border border-gray-300 p-2 rounded"
                onChange={(e) => e.target.files && setFichier( e.target.files[0])}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                className="w-full border border-gray-300 p-2 rounded"
                value={description}
                onChange={(e) => setDescription( e.target.value)}
                placeholder="Entrez la description de l'annonce"
                rows={3}
              ></textarea>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour publier une annonce */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Publier une Annonce</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Classe conserner</label>
                <select
                  className="w-full border border-gray-300 p-2 rounded"
                  value={selectedFiliere}
                  onChange={(e) => setSelectedFiliere(Array.from(e.target.options).filter(option => option.selected).map(option => option.value))}
                  multiple={true}
                >
                  {/* <option value="">Sélectionnez un classe</option> */}
                  {listClass.map((classe:any) => (
                              <option key={classe.id_classe} value={classe.id_classe}>{classe.libelle}</option>
                        ))}
                </select>
              </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={() => handlePublish(idPublication)} // Remplacez "1" par l'ID de l'annonce sélectionnée
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Publier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Boîte de dialogue de confirmation */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Confirmation de suppression</h3>
            <p className="mb-6">Voulez-vous vraiment supprimer cette annonce ?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Annonces;