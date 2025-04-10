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
  { id: 1, nom : "Classe A" },
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNiveau, setSelectedNiveau] = useState<string>("");

  const handleViewDocs = (etudiant: Etudiant) => {
    setSelectedEtudiant(etudiant);
  };

  const handleDownloadList = (format: string) => {
    alert(`Téléchargement de la liste des étudiants en format ${format}`);
    // Implémentez ici la logique pour générer et télécharger le fichier
  };

  const handleDownloadZip = () => {
    alert("Téléchargement du dossier ZIP contenant les documents des étudiants");
    // Implémentez ici la logique pour générer et télécharger un fichier ZIP
  };

  const etudiants = selectedClasseId
    ? etudiantsMock[selectedClasseId]?.filter((etudiant: Etudiant) => {
        const matchesSearch = `${etudiant.nom} ${etudiant.prenom}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesNiveau =
          selectedNiveau === "" || etudiant.niveau === selectedNiveau;
        return matchesSearch && matchesNiveau;
      }) || []
    : [];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar_admin />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Étudiants par classe</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Liste des classes */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-3">Classes</h3>
              <ul className="space-y-2">
                {classesMock.map((classe) => (
                  <li key={classe.id}>
                    <button
                      onClick={() => setSelectedClasseId(classe.id)}
                      className={`block w-full text-left px-3 py-2 rounded ${
                        selectedClasseId === classe.id
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {classe.nom}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Liste des étudiants */}
            <div className="md:col-span-3">
              {selectedClasseId ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">
                      Liste des étudiants -{" "}
                      {classesMock.find((c) => c.id === selectedClasseId)?.nom || "Classe inconnue"}
                    </h2>
                    <div className="flex gap-2">
                      <button
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        onClick={() => handleDownloadList("PDF")}
                      >
                        Télécharger PDF
                      </button>
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={() => handleDownloadList("CSV")}
                      >
                        Télécharger CSV
                      </button>
                      <button
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                        onClick={handleDownloadZip}
                      >
                        Télécharger ZIP
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Rechercher un étudiant..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    />
                    <select
                      value={selectedNiveau}
                      onChange={(e) => setSelectedNiveau(e.target.value)}
                      className="border rounded px-3 py-2"
                    >
                      <option value="">Tous les niveaux</option>
                      <option value="L3">L3</option>
                      <option value="M1">M1</option>
                    </select>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full bg-white rounded shadow">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-3 text-left">Nom</th>
                          <th className="p-3 text-left">Email</th>
                          <th className="p-3 text-left">Niveau</th>
                          <th className="p-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {etudiants.map((etudiant: Etudiant) => (
                          <tr key={etudiant.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">{etudiant.nom} {etudiant.prenom}</td>
                            <td className="p-3">{etudiant.email}</td>
                            <td className="p-3">{etudiant.niveau}</td>
                            <td className="p-3">
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
                <p className="text-gray-600">
                  Veuillez sélectionner une classe pour afficher les étudiants.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}