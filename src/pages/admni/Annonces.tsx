import React, { useState } from "react";
import Sidebar from "../../Components/Siderbar";
import Navbar_admin from "../../Components/Navbar_admin";

const Annonces: React.FC = () => {
  const [annonces, setAnnonces] = useState([
    { id: 1, libelle: "Réunion de rentrée", auteur: "Admin", date: "2025-04-01" },
    { id: 2, libelle: "Résultats disponibles", auteur: "Responsable", date: "2025-03-28" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [newAnnonce, setNewAnnonce] = useState({ libelle: "", description: "", auteur: "" });
  const [selectedFiliere, setSelectedFiliere] = useState("");

  const filieres = ["Informatique", "Génie Civil", "Électronique"]; // Liste des filières

  const handleAddAnnonce = () => {
    if (newAnnonce.libelle && newAnnonce.description && newAnnonce.auteur) {
      setAnnonces([
        ...annonces,
        {
          id: annonces.length + 1,
          libelle: newAnnonce.libelle,
          auteur: newAnnonce.auteur,
          date: new Date().toISOString().split("T")[0], // Date actuelle
        },
      ]);
      setNewAnnonce({ libelle: "", description: "", auteur: "" });
      setIsModalOpen(false);
    }
  };

  const handlePublish = (id: number) => {
    console.log(`Annonce ${id} publiée pour la filière : ${selectedFiliere}`);
    setSelectedFiliere(""); // Réinitialiser la sélection après publication
    setIsPublishModalOpen(false);
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
                    <th className="p-3">Date</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {annonces.map((annonce) => (
                    <tr key={annonce.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{annonce.libelle}</td>
                      <td className="p-3">{annonce.auteur}</td>
                      <td className="p-3">{annonce.date}</td>
                      <td className="p-3 flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => setIsPublishModalOpen(true)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                        >
                          Publier
                        </button>
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Ajouter une Annonce</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Libellé</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value={newAnnonce.libelle}
                onChange={(e) => setNewAnnonce({ ...newAnnonce, libelle: e.target.value })}
                placeholder="Entrez le libellé de l'annonce"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                className="w-full border border-gray-300 p-2 rounded"
                value={newAnnonce.description}
                onChange={(e) => setNewAnnonce({ ...newAnnonce, description: e.target.value })}
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
                onClick={handleAddAnnonce}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Filière</label>
              <select
                className="w-full border border-gray-300 p-2 rounded"
                value={selectedFiliere}
                onChange={(e) => setSelectedFiliere(e.target.value)}
              >
                <option value="">Sélectionnez une filière</option>
                {filieres.map((filiere) => (
                  <option key={filiere} value={filiere}>
                    {filiere}
                  </option>
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
                onClick={() => handlePublish(1)} // Remplacez "1" par l'ID de l'annonce sélectionnée
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Publier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Annonces;