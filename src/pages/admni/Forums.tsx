import React, { useState } from "react";
import Sidebar from "../../Components/Siderbar";
import Navbar_admin from "../../Components/Navbar_admin";

const Forums: React.FC = () => {
  const [classes, setClasses] = useState([
    { id: 1, name: "CSI3 DLW" },
    { id: 2, name: "3IL2" },
    { id: 3, name: "ERIS4" },
  ]);

  const [forums, setForums] = useState([
    { id: 1, titre: "Discussion Générale", classeId: 1 },
    { id: 2, titre: "Projets de Groupe", classeId: 1 },
    { id: 3, titre: "Questions Administratives", classeId: 2 },
  ]);

  const [selectedClasseId, setSelectedClasseId] = useState<number | null>(null);
  const [newForum, setNewForum] = useState({ titre: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddForum = () => {
    if (newForum.titre && selectedClasseId !== null) {
      setForums([
        ...forums,
        {
          id: forums.length + 1,
          titre: newForum.titre,
          classeId: selectedClasseId,
        },
      ]);
      setNewForum({ titre: "" });
      setIsModalOpen(false);
    }
  };

  const handleDeleteForum = (id: number) => {
    setForums(forums.filter((forum) => forum.id !== id));
  };

  const filteredForums = selectedClasseId
    ? forums.filter((forum) => forum.classeId === selectedClasseId)
    : [];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar_admin />

        <main className="p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-6 text-center md:text-left">Gestion des Forums</h1>

          {/* Sélection de la classe */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sélectionnez une Classe</label>
            <select
              className="w-full border border-gray-300 p-2 rounded"
              value={selectedClasseId || ""}
              onChange={(e) => setSelectedClasseId(Number(e.target.value))}
            >
              <option value="">-- Choisir une classe --</option>
              {classes.map((classe) => (
                <option key={classe.id} value={classe.id}>
                  {classe.name}
                </option>
              ))}
            </select>
          </div>

          {/* Liste des forums */}
          {selectedClasseId && (
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Forums pour la Classe</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="p-3">Titre</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredForums.map((forum) => (
                      <tr key={forum.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{forum.titre}</td>
                        <td className="p-3 flex gap-2">
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                            onClick={() => alert(`Modifier le forum : ${forum.titre}`)}
                          >
                            Modifier
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                            onClick={() => handleDeleteForum(forum.id)}
                          >
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
                  Ajouter un forum
                </button>
              </div>
            </div>
          )}

          {!selectedClasseId && (
            <p className="text-gray-500 text-center mt-6">
              Veuillez sélectionner une classe pour afficher ou gérer ses forums.
            </p>
          )}
        </main>
      </div>

      {/* Modal pour ajouter un forum */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Ajouter un Forum</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value={newForum.titre}
                onChange={(e) => setNewForum({ ...newForum, titre: e.target.value })}
                placeholder="Entrez le titre du forum"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={handleAddForum}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forums;