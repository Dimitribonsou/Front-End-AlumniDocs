
import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Siderbar";
import Navbar_admin from "../../Components/Navbar_admin";
import constant from "../../data/constant";
import { FiliereType } from "../../types/FiliereType";
import { exit } from "process";

const EXEMPLES_FILIERES = [
  { id_filiere: 1, libelle: "CSI" },
  { id_filiere: 2, libelle: "Génie Logiciel" },
  { id_filiere: 3, libelle: "Prepar 3IL" },
  { id_filiere: 4, libelle: "Réseaux et Télécoms" },
  { id_filiere: 5, libelle: "Data Science" },
];

const PAGE_SIZE = 3;

const Filieres = () => {

  // const filieres = [
  //   { id: 1, libelle: "CSI" },
  //   { id: 2, libelle: "Génie Logiciel"},
  //   { id: 3, libelle: "Prepar 3IL" },
  // ];
  const  [libelle,setLibelle]=useState('');
  const  [errorMessage,setErrorMessage]=useState('');
  const [filieres, setFilieres] = useState<FiliereType[]>(EXEMPLES_FILIERES);
  const [search, setSearch] = useState("");
  const [newFiliere, setNewFiliere] = useState("");
  const [page, setPage] = useState(1);
  // const  [filieres,setFilieres]=useState<FiliereType[]>([]);
  useEffect(()=>{
    getFiliere();
  },[])
  //fonction pour enregistrer une filiere
   const handleSubmit= async ()=>{
         try {
            if(libelle=='')
            {
              setErrorMessage("Entrer le nom de la filiere !");
              return;
            }
          const data={
             libelle:libelle
          }
                 const response =await fetch(`${constant.host}/AlumniDocs-API/NewFiliere`,{
                    method:'POST',
                    headers:{
                      "Content-Type":"application/json"
                    },
                    body:JSON.stringify(data)
                 })
                 if(response.ok)
                 {
                    console.log("Filiere enregistrer avec success !")
                    const message:any= await response.text();
                    console.log(message)
                    setErrorMessage(message);
                    getFiliere();
                 }
                 console.log("Erreur lors de l'enregistrement de la filiere")
         } catch (error) {
          console.log("Une erreur est survenu : "+error)
         }
   }
  //  fonction pour afficher la liste des filieres disponibles
  const getFiliere=async ()=>{
    const response = await fetch(`${constant.host}/AlumniDocs-API/FiliereList`);
    if(response.ok)
    {
      //mettre a jour la liste des classe
      setFilieres(await response.json());
    }
    else
    {
       console.log("erreur lors de la recuperation de la classe");
    }
  }

 

  // Filtrage
  const filteredFilieres = filieres.length>0 ?  filieres.filter((filiere) =>
    filiere.libelle.toLowerCase().includes(search.toLowerCase()) 
  ) : [];

  // Pagination
  const totalPages = Math.ceil(filteredFilieres.length / PAGE_SIZE);
  const filieresToShow = filteredFilieres.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex ">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        {/* Navbar */}
        <Navbar_admin />

        {/* Contenu de la page */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#161B70] mb-6">Gestion des Filières</h1>

          {/* Barre de recherche */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-2 mb-4">
            <input
              type="text"
              placeholder="Rechercher une filière..."
              className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/3"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {/* Liste des filières */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Liste des Filières</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-[#161B70] text-white">
                  <th className="border border-gray-300 p-2 text-left">#</th>
                  <th className="border border-gray-300 p-2 text-left">Nom</th>
                  <th className="border border-gray-300 p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>

                {filieresToShow.map((filiere) => (
                  <tr key={filiere.id_filiere} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{filiere.id_filiere}</td>
                    <td className="border border-gray-300 p-2">{filiere.libelle}</td>
                     <td className="border border-gray-300 p-2">
                      {/* <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mr-2">
                        Modifier
                      </button>  */}
                       <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                        Supprimer
                      </button> 
                    </td> 
                  </tr>
                ))}
                {filieresToShow.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center text-gray-500 p-3">
                      Aucune filière trouvée.
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

          {/* Ajouter une nouvelle filière */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Ajouter une Nouvelle Filière</h2>
            <form >
              <p className={errorMessage.length>0 ? "text-center  py-2 bg-[#161B70] text-white rounded-sm my-2" :""}>{errorMessage}</p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la Filière</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Entrez le nom de la filière"
                  value={libelle}
                  onChange={(e=>setLibelle(e.target.value))}
                  required={true}
                />
              </div>
              <button
                type="button"
                className="bg-[#161B70] text-white px-4 py-2 rounded hover:opacity-80"
                onClick={handleSubmit}
              >
                Ajouter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filieres;