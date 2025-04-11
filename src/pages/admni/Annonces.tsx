import React, { useState } from "react";
import Sidebar from "../../Components/Siderbar";
import Navbar_admin from "../../Components/Navbar_admin";

const Annonces: React.FC = () => {
  const [annonces, setAnnonces] = useState([
    { id: 1, titre: "Réunion de rentrée", auteur: "Admin", date: "2025-04-01" },
    { id: 2, titre: "Résultats disponibles", auteur: "Responsable", date: "2025-03-28" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAnnonce, setNewAnnonce] = useState({ titre: "", auteur: "" });
  const [selectedClasse, setSelectedClasse] = useState("");

  const classes = ["CSI3 DLW", "3IL2", "ERIS4"]; // Liste des classes

  const handleAddAnnonce = () => {
    if (newAnnonce.titre && newAnnonce.auteur) {
      setAnnonces([
        ...annonces,
        {
          id: annonces.length + 1,
          titre: newAnnonce.titre,
          auteur: newAnnonce.auteur,
          date: new Date().toISOString().split("T")[0], // Date actuelle
        },
      ]);
      setNewAnnonce({ titre: "", auteur: "" });
      setIsModalOpen(false);
    }
  };

  const handlePublish = (id: number) => {
    console.log(`Annonce ${id} publiée pour la classe : ${selectedClasse}`);
    setSelectedClasse(""); // Réinitialiser la sélection après publication
  };

  return (
    <div className="flex h-screen bg-gray-100">
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
                    <th className="p-3">Titre</th>
                    <th className="p-3">Auteur</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {annonces.map((annonce) => (
                    <tr key={annonce.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{annonce.titre}</td>
                      <td className="p-3">{annonce.auteur}</td>
                      <td className="p-3">{annonce.date}</td>
                      <td className="p-3 flex flex-col sm:flex-row gap-2">
                        <div className="flex items-center gap-2">
                          <select
                            className="border border-gray-300 p-2 rounded text-sm"
                            value={selectedClasse}
                            onChange={(e) => setSelectedClasse(e.target.value)}
                          >
                            <option value="">Choisir une classe</option>
                            {classes.map((classe) => (
                              <option key={classe} value={classe}>
                                {classe}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => handlePublish(annonce.id)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                          >
                            Publier
                          </button>
                        </div>
                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Ajouter une Annonce</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value={newAnnonce.titre}
                onChange={(e) => setNewAnnonce({ ...newAnnonce, titre: e.target.value })}
                placeholder="Entrez le titre de l'annonce"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Auteur</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value={newAnnonce.auteur}
                onChange={(e) => setNewAnnonce({ ...newAnnonce, auteur: e.target.value })}
                placeholder="Entrez le nom de l'auteur"
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
                onClick={handleAddAnnonce}
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

export default Annonces;