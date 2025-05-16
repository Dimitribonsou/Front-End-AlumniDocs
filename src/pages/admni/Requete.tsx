import React, { useState } from "react";
import Sidebar from "../../Components/Siderbar";
import Navbar_admin from "../../Components/Navbar_admin";

interface Requete {
  id: number;
  etudiant: string;
  type: string;
  date: string;
  statut: "En attente" | "Traitée";
  pieceJointeUrl?: string; // Ajout du champ pièce jointe
}

const RequeteAdmin: React.FC = () => {
  const [requetes, setRequetes] = useState<Requete[]>([
    {
      id: 1,
      etudiant: "Jean-Pierre Ngono",
      type: "Revendication de note",
      date: "2023-04-01",
      statut: "En attente",
      pieceJointeUrl: "/uploads/pj1.pdf",
    },
    {
      id: 2,
      etudiant: "Marie Mballa",
      type: "Absence justifiée",
      date: "2023-04-02",
      statut: "Traitée",
      pieceJointeUrl: "/uploads/pj2.pdf",
    },
    {
      id: 3,
      etudiant: "Pauline Ewane",
      type: "Demande de document",
      date: "2023-04-03",
      statut: "En attente",
      pieceJointeUrl: "/uploads/pj3.pdf",
    },
  ]);

  const handleMarkAsProcessed = (id: number) => {
    setRequetes((prevRequetes) =>
      prevRequetes.map((requete) =>
        requete.id === id ? { ...requete, statut: "Traitée" } : requete
      )
    );
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        {/* Navbar */}
        <Navbar_admin />

        {/* Contenu de la page */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#161B70] mb-6">Gestion des Requêtes</h1>

          {/* Liste des requêtes */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Liste des Requêtes</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2 text-left">Étudiant</th>
                  <th className="border border-gray-300 p-2 text-left">Type</th>
                  <th className="border border-gray-300 p-2 text-left">Date</th>
                  <th className="border border-gray-300 p-2 text-left">Statut</th>
                  <th className="border border-gray-300 p-2 text-center">Actions</th>
                  <th className="border border-gray-300 p-2 text-center">Détails</th>
                </tr>
              </thead>
              <tbody>
                {requetes.map((requete) => (
                  <tr key={requete.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{requete.etudiant}</td>
                    <td className="border border-gray-300 p-2">{requete.type}</td>
                    <td className="border border-gray-300 p-2">{requete.date}</td>
                    <td
                      className={`border border-gray-300 p-2 ${
                        requete.statut === "Traitée" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {requete.statut}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {requete.statut === "En attente" && (
                        <button
                          onClick={() => handleMarkAsProcessed(requete.id)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Marquer comme traitée
                        </button>
                      )}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {requete.pieceJointeUrl ? (
                        <a
                          href={requete.pieceJointeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#161B70] underline hover:text-blue-700"
                        >
                          Détails
                        </a>
                      ) : (
                        <span className="text-gray-400">Aucune pièce</span>
                      )}
                    </td>
                  </tr>
                ))}
                {requetes.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-500 p-3">
                      Aucune requête trouvée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequeteAdmin;