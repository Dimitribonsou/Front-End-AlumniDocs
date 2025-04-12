import React, { useState } from "react";
import Sidebar from "../../Components/Siderbar";
import Navbar_admin from "../../Components/Navbar_admin";

interface Validation {
  id: number;
  etudiant: string;
  typeDocument: string;
  dateSoumission: string;
  statut: "En attente" | "Validé" | "Rejeté";
}

const ValidationsPage: React.FC = () => {
  const [validations, setValidations] = useState<Validation[]>([
    { id: 1, etudiant: "Jean-Pierre Ngono", typeDocument: "Relevé de notes", dateSoumission: "2023-04-01", statut: "En attente" },
    { id: 2, etudiant: "Marie Mballa", typeDocument: "Attestation d'inscription", dateSoumission: "2023-04-02", statut: "Validé" },
    { id: 3, etudiant: "Pauline Ewane", typeDocument: "Certificat médical", dateSoumission: "2023-04-03", statut: "En attente" },
  ]);

  const handleValidate = (id: number) => {
    setValidations((prev) =>
      prev.map((validation) =>
        validation.id === id ? { ...validation, statut: "Validé" } : validation
      )
    );
  };

  const handleReject = (id: number) => {
    setValidations((prev) =>
      prev.map((validation) =>
        validation.id === id ? { ...validation, statut: "Rejeté" } : validation
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
          <h1 className="text-2xl font-bold text-[#161B70] mb-6">Gestion des Validations</h1>

          {/* Liste des validations */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Liste des Documents à Valider</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2 text-left">Étudiant</th>
                  <th className="border border-gray-300 p-2 text-left">Type de Document</th>
                  <th className="border border-gray-300 p-2 text-left">Date de Soumission</th>
                  <th className="border border-gray-300 p-2 text-left">Statut</th>
                  <th className="border border-gray-300 p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {validations.map((validation) => (
                  <tr key={validation.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{validation.etudiant}</td>
                    <td className="border border-gray-300 p-2">{validation.typeDocument}</td>
                    <td className="border border-gray-300 p-2">{validation.dateSoumission}</td>
                    <td
                      className={`border border-gray-300 p-2 ${
                        validation.statut === "Validé"
                          ? "text-green-600"
                          : validation.statut === "Rejeté"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {validation.statut}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {validation.statut === "En attente" && (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleValidate(validation.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          >
                            Valider
                          </button>
                          <button
                            onClick={() => handleReject(validation.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Rejeter
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {validations.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 p-3">
                      Aucun document à valider.
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

export default ValidationsPage;