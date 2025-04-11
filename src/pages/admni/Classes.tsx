import React, { useState } from "react";
import Sidebar from "../../Components/Siderbar";
import Navbar_admin from "../../Components/Navbar_admin";

const Classes = () => {
  const [classes, setClasses] = useState([
    { id: 1, name: "CSI3 DLW", niveau: "Licence 3" },
    { id: 2, name: "3IL2", niveau: "Licence 2" },
    { id: 3, name: "ERIS4", niveau: "Master 1" },
  ]);

  const [newClassName, setNewClassName] = useState("");
  const [newClassNiveau, setNewClassNiveau] = useState("");

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (newClassName && newClassNiveau) {
      setClasses([
        ...classes,
        { id: classes.length + 1, name: newClassName, niveau: newClassNiveau },
      ]);
      setNewClassName("");
      setNewClassNiveau("");
    }
  };

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
                  <th className="border border-gray-300 p-2 text-left">Nom</th>
                  <th className="border border-gray-300 p-2 text-left">Niveau</th>
                  <th className="border border-gray-300 p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((classe) => (
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
              </tbody>
            </table>
          </div>

          {/* Ajouter une nouvelle classe */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Ajouter une Nouvelle Classe</h2>
            <form onSubmit={handleAddClass}>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Niveau</label>
                <select
                  className="w-full border border-gray-300 p-2 rounded"
                  value={newClassNiveau}
                  onChange={(e) => setNewClassNiveau(e.target.value)}
                >
                  <option value="">Sélectionnez un niveau</option>
                  <option value="Licence 1">Licence 1</option>
                  <option value="Licence 2">Licence 2</option>
                  <option value="Licence 3">Licence 3</option>
                  <option value="Master 1">Master 1</option>
                  <option value="Master 2">Master 2</option>
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