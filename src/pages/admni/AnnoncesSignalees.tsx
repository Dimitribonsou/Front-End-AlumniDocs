import React from 'react';
import Sidebar from '../../Components/Siderbar';
import Navbar_admin from '../../Components/Navbar_admin';

const AnnoncesSignalees: React.FC = () => {
  const signalements = [
    { id: 1, titre: "Problème de salle", signaléPar: "Étudiant X", date: "2025-03-29" },
    { id: 2, titre: "Annonce inappropriée", signaléPar: "Étudiant Y", date: "2025-03-25" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar_admin />
        <main className="p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-6">Annonces Signalées</h1>
          <div className="bg-white shadow-md rounded-lg p-4">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Titre</th>
                  <th className="p-3">Signalé par</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {signalements.map((annonce) => (
                  <tr key={annonce.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{annonce.titre}</td>
                    <td className="p-3">{annonce.signaléPar}</td>
                    <td className="p-3">{annonce.date}</td>
                    <td className="p-3">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">Consulter</button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm ml-2">Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnnoncesSignalees;
