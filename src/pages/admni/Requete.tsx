import React, { useState } from "react";
import Sidebar from "../../Components/Siderbar";
import Navbar_admin from "../../Components/Navbar_admin";

interface Requete {
  id: number;
  etudiant: string;
  type: string;
  date: string;
  statut: "En attente" | "Traitée";
  pieceJointeUrl?: string;
}

const EXEMPLES_REQUETES: Requete[] = [
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
  {
    id: 4,
    etudiant: "Alain Mbarga",
    type: "Revendication de note",
    date: "2023-04-04",
    statut: "Traitée",
    pieceJointeUrl: "/uploads/pj4.pdf",
  },
  {
    id: 5,
    etudiant: "Sophie Nkou",
    type: "Absence justifiée",
    date: "2023-04-05",
    statut: "En attente",
    pieceJointeUrl: "/uploads/pj5.pdf",
  },
];

const PAGE_SIZE = 3;

const RequeteAdmin: React.FC = () => {
  const [requetes, setRequetes] = useState<Requete[]>(EXEMPLES_REQUETES);
  const [search, setSearch] = useState("");
  const [statutFilter, setStatutFilter] = useState<"" | "En attente" | "Traitée">("");
  const [page, setPage] = useState(1);

  // Filtrage et recherche
  const filteredRequetes = requetes.filter((requete) => {
    const matchSearch =
      requete.etudiant.toLowerCase().includes(search.toLowerCase()) ||
      requete.type.toLowerCase().includes(search.toLowerCase());
    const matchStatut = statutFilter === "" || requete.statut === statutFilter;
    return matchSearch && matchStatut;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRequetes.length / PAGE_SIZE);
  const requetesToShow = filteredRequetes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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

          {/* Barre de recherche et filtre */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-2 mb-4">
            <input
              type="text"
              placeholder="Rechercher par étudiant ou type..."
              className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/3"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <select
              className="border border-gray-300 rounded px-3 py-2 w-full md:w-48"
              value={statutFilter}
              onChange={(e) => {
                setStatutFilter(e.target.value as "" | "En attente" | "Traitée");
                setPage(1);
              }}
            >
              <option value="">Tous les statuts</option>
              <option value="En attente">En attente</option>
              <option value="Traitée">Traitée</option>
            </select>
          </div>

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
                {requetesToShow.map((requete) => (
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
                {requetesToShow.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-500 p-3">
                      Aucune requête trouvée.
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
        </div>
      </div>
    </div>
  );
};

export default RequeteAdmin;