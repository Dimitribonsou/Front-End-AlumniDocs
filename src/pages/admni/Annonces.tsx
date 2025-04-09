import React from 'react';
import Sidebar from '../../Components/Siderbar';
import Navbar_admin from '../../Components/Navbar_admin';

const Annonces: React.FC = () => {
  const annonces = [
    { id: 1, titre: "Réunion de rentrée", auteur: "Admin", date: "2025-04-01" },
    { id: 2, titre: "Résultats disponibles", auteur: "Responsable", date: "2025-03-28" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar_admin />
        <main className="p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-6 text-center md:text-left">Gestion des Annonces</h1>
          <div className="bg-white shadow-md rounded-lg p-4">
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
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm w-full sm:w-auto">
                          Modifier
                        </button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm w-full sm:w-auto">
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-center md:justify-end">
              <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                Ajouter une annonce
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Annonces;