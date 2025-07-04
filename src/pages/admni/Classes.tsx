import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Siderbar";
import Navbar_admin from "../../Components/Navbar_admin";
import constant from "../../data/constant";

const EXEMPLES_CLASSES = [
  { id: 1, name: "CSI3 DLW", niveau: "Licence 3" },
  { id: 2, name: "3IL2", niveau: "Licence 2" },
  { id: 3, name: "ERIS4", niveau: "Master 1" },
  { id: 4, name: "GL2", niveau: "Licence 2" },
  { id: 5, name: "INFO1", niveau: "Licence 1" },
  { id: 6, name: "ERIS5", niveau: "Master 2" },
];

const PAGE_SIZE = 4;

const Classes = () => {
  const [classes, setClasses] = useState(EXEMPLES_CLASSES);
  const [newClassName, setNewClassName] = useState("");
  const [newClassNiveau, setNewClassNiveau] = useState("");
  const [newClassSup, setNewClassSup] = useState("");
  const [newClassNumero, setNewClassNumero] = useState("");
  const [newClassFiliere, setNewClassFiliere] = useState("");
  const [listClass, setClasseListe]=useState([]);
  const [listFiliere, setFiliereListe]=useState([]);
  const [errorMessage, setErrorMessage]=useState([]);
  const [search, setSearch] = useState("");
  const [niveauFilter, setNiveauFilter] = useState("");
  const [page, setPage] = useState(1);

  // Filtrage
  const filteredClasses = classes.filter(
    (classe) =>
      (niveauFilter === "" || classe.niveau === niveauFilter) &&
      (classe.name.toLowerCase().includes(search.toLowerCase()) ||
        classe.niveau.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination
  const totalPages = Math.ceil(filteredClasses.length / PAGE_SIZE);
  const classesToShow = filteredClasses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // const handleAddClass = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (newClassName && newClassNiveau) {
  //     setClasses([
  //       ...classes,
  //       { id: classes.length + 1, name: newClassName, niveau: newClassNiveau },
  //     ]);
  //     setNewClassName("");
  //     setNewClassNiveau("");
  //     setPage(1);
  //   }
  // fonction pour afficher  enregistrer une nouvelle classe
const handleSubmit = async()=>{
  try {
    const data={
       libelle:newClassName,
       numero_salle:newClassNumero,
       salle_sup:newClassSup,
       id_niveau:newClassNiveau
    }
           const response =await fetch(`${constant.host}/AlumniDocs-API/NewClass`,{
              method:'POST',
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify(data)
           })
           if(response.ok)
           {
              console.log("Classe enregistrer avec success !")
              const message:any= await response.text();
              console.log(message)
              setErrorMessage(message);
           }
           console.log("Erreur lors de l'enregistrement de la Classe")
   } catch (error) {
    console.log("Une erreur est survenu : "+error)
   }
}
  useEffect(()=>{
    getClasse();
    getFiliere();
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
//fonction pour afficher la liste des filieres
const getFiliere= async ()=>{
  const response = await fetch(`${constant.host}/AlumniDocs-API/FiliereList`);
  if(response.ok)
  {
    //mettre a jour la liste des classe
    setFiliereListe(await response.json());
  }
  else
  {
     console.log("erreur lors de la recuperation de la classe");
  }
}

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        {/* Navbar */}
        <Navbar_admin />

        {/* Contenu de la page */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#161B70] mb-6">Gestion des Classes</h1>

          {/* Barre de recherche et filtre */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-2 mb-4">
            <input
              type="text"
              placeholder="Rechercher une classe ou un niveau..."
              className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/3"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <select
              className="border border-gray-300 rounded px-3 py-2 w-full md:w-48"
              value={niveauFilter}
              onChange={(e) => {
                setNiveauFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Tous les niveaux</option>
              <option value="Licence 1">Licence 1</option>
              <option value="Licence 2">Licence 2</option>
              <option value="Licence 3">Licence 3</option>
              <option value="Master 1">Master 1</option>
              <option value="Master 2">Master 2</option>
            </select>
          </div>

          {/* Liste des classes */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Liste des Classes</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2 text-left">#</th>
                    <th className="border border-gray-300 p-2 text-left">Nom</th>
                    <th className="border border-gray-300 p-2 text-left">Niveau</th>
                    <th className="border border-gray-300 p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classesToShow.map((classe) => (
                    <tr key={classe.id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 p-2">{classe.id}</td>
                      <td className="border border-gray-300 p-2">{classe.name}</td>
                      <td className="border border-gray-300 p-2">{classe.niveau}</td>
                      <td className="border border-gray-300 p-2">
                        <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mr-2">
                          Modifier
                        </button>
                        <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                  {classesToShow.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center text-gray-500 p-3">
                        Aucune classe trouvée.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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

          {/* Ajouter une nouvelle classe */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Ajouter une Nouvelle Classe</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la Classe</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Entrez le nom de la classe"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Numéro Classe</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Entrez le nom de la classe"
                  value={newClassNumero}
                  onChange={(e) => setNewClassNumero(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Filiere</label>
                <select
                  className="w-full border border-gray-300 p-2 rounded"
                  value={newClassFiliere}
                  onChange={(e) => setNewClassFiliere(e.target.value)}
                >
                  <option value="">Sélectionnez un filiere</option>
                  {listFiliere.map((filiere:any) => (
                              <option key={filiere.id_filiere} value={filiere.id_filiere}>{filiere.libelle}</option>
                        ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Niveau</label>
                <select
                  className="w-full border border-gray-300 p-2 rounded"
                  value={newClassNiveau}
                  onChange={(e) => setNewClassNiveau(e.target.value)}
                >
                  <option value="" >Selectionnez un niveau</option>
                  <option value="1" selected={true}>1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Classe superieur</label>
                <select
                  className="w-full border border-gray-300 p-2 rounded"
                  value={newClassSup}
                  onChange={(e) => setNewClassSup(e.target.value)}
                >
                  <option value="">Sélectionnez un classe</option>
                  {listClass.map((classe:any) => (
                              <option key={classe.id_classe} value={classe.id_classe}>{classe.libelle}</option>
                        ))}
                </select>
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
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

export default Classes;