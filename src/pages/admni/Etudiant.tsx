import { useState } from "react";
import Sidebar from "../../Components/Siderbar";
import Navbar_admin from "../../Components/Navbar_admin";

interface Classe {
  id: number;
  nom: string;
}

interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  niveau: string;
  documents: string[];
}

const classesMock: Classe[] = [
  { id: 1, nom: "Classe A" },
  { id: 2, nom: "Classe B" },
];

const etudiantsMock: Record<number, Etudiant[]> = {
  1: [
    {
      id: 101,
      nom: "Diallo",
      prenom: "Fatou",
      email: "fatou@gmail.com",
      niveau: "L3",
      documents: ["memoire.pdf", "cv.pdf"],
    },
    {
      id: 102,
      nom: "Koné",
      prenom: "Moussa",
      email: "moussa@gmail.com",
      niveau: "L3",
      documents: ["rapport.pdf"],
    },
  ],
  2: [
    {
      id: 201,
      nom: "Traoré",
      prenom: "Awa",
      email: "awa@gmail.com",
      niveau: "M1",
      documents: ["memoire.pdf", "attestation.pdf"],
    },
  ],
};

export default function AdminEtudiantsParClasse() {
  const [selectedClasseId, setSelectedClasseId] = useState<number | null>(null);
  const [selectedEtudiant, setSelectedEtudiant] = useState<Etudiant | null>(null);

  const handleViewDocs = (etudiant: Etudiant) => {
    setSelectedEtudiant(etudiant);
  };

  const etudiants = selectedClasseId ? etudiantsMock[selectedClasseId] || [] : [];

  return (
    <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Navbar_admin />
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Etudiants par classe</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-3">Classes</h3>
          <ul className="space-y-2">
            {classesMock.map((classe) => (
              <li key={classe.id}>
                <button
                  onClick={() => setSelectedClasseId(classe.id)}
                  className={`block w-full text-left px-3 py-2 rounded ${
                    selectedClasseId === classe.id ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {classe.nom}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          {selectedClasseId ? (
            <>
              <div className="flex justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  Liste des étudiants - {classesMock.find((c) => c.id === selectedClasseId) ? classesMock.find((c) => c.id === selectedClasseId)!.nom : "Classe inconnue"}
                </h2>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={() => alert("Téléchargement ZIP")}
                >
                  Télécharger tous les documents (.zip)
                </button>
              </div>

              <input
                type="text"
                placeholder="Rechercher un étudiant..."
                className="w-full border rounded px-3 py-2 mb-3"
              />
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded shadow">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left">Nom</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Niveau</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {etudiants.map((etudiant) => (
                      <tr key={etudiant.id} className="border-b">
                        <td className="p-3">{etudiant.nom} {etudiant.prenom}</td>
                        <td className="p-3 text-center">{etudiant.email}</td>
                        <td className="p-3 text-center">{etudiant.niveau}</td>
                        <td className="p-3 text-center">
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={() => handleViewDocs(etudiant)}
                          >
                            Voir documents
                          </button>
                        </td>
                      </tr>
                    ))}
                    {etudiants.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center text-gray-500 p-3">
                          Aucun étudiant trouvé.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p className="text-gray-600">Veuillez sélectionner une classe pour afficher les étudiants.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedEtudiant && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Documents de {selectedEtudiant.nom} {selectedEtudiant.prenom}
            </h3>
            <ul className="space-y-2 mb-4">
              {selectedEtudiant.documents.map((doc, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border rounded p-2"
                >
                  <span>{doc}</span>
                  <a
                    href={`#`} // remplacer avec l'URL du doc
                    download={doc}
                    className="text-blue-600 hover:underline"
                  >
                    Télécharger
                  </a>
                </li>
              ))}
            </ul>
            <button
              className="w-full bg-gray-300 hover:bg-gray-400 rounded py-2"
              onClick={() => setSelectedEtudiant(null)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
}