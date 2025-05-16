import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Siderbar";
import Navbar_admin from "../../Components/Navbar_admin";
import constant from "../../data/constant";

const Classes = () => {
  const [classes, setClasses] = useState([
    { id: 1, name: "CSI3 DLW", niveau: "Licence 3" },
    { id: 2, name: "3IL2", niveau: "Licence 2" },
    { id: 3, name: "ERIS4", niveau: "Master 1" },
  ]);

  const [newClassName, setNewClassName] = useState("");
  const [newClassNiveau, setNewClassNiveau] = useState("");
  const [newClassSup, setNewClassSup] = useState("");
  const [newClassNumero, setNewClassNumero] = useState("");
  const [newClassFiliere, setNewClassFiliere] = useState("");
  const [listClass, setClasseListe]=useState([]);
  const [listFiliere, setFiliereListe]=useState([]);
  const [errorMessage, setErrorMessage]=useState([]);

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

          {/* Liste des classes */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Liste des Classes</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2 text-left">#</th>
                  <th className="border border-gray-300 p-2 text-left">Libelle</th>
                  <th className="border border-gray-300 p-2 text-left">Niveau</th>
                  <th className="border border-gray-300 p-2 text-left">Numero salle</th>
                  {/* <th className="border border-gray-300 p-2 text-left">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {listClass.map((classe:any) => (
                  <tr key={classe.id_classe} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{classe.id_classe}</td>
                    <td className="border border-gray-300 p-2">{classe.libelle}</td>
                    <td className="border border-gray-300 p-2">{classe.niveau}</td>
                    <td className="border border-gray-300 p-2">{classe.numero_salle}</td>
                    {/* <td className="border border-gray-300 p-2"> */}
                      {/* <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mr-2">
                        Modifier
                      </button> */}
                      {/* <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                        Supprimer
                      </button> */}
                    {/* </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
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