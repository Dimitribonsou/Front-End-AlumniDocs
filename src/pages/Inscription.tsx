import React, { useState } from 'react';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

const Inscription: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const renderLabel = (text: string) => (
    <label className="block mb-2 text-sm font-medium text-gray-700">{text}</label>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Exemple de validation
    setError("Exemple de notification ou d'erreur");
    // Ici, ajoute ta logique de soumission réelle
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col bg-watermark">
      <Navbar />
      <div className="flex flex-col max-w-3xl w-full bg-white shadow-lg mt-10 p-6 rounded-lg mx-auto">
        
        {/* Form Section */}
        <div className="w-full p-6">
          <h2 className="text-2xl font-bold text-center">INSCRIPTION</h2>
          {/* Notification */}
        {error && (
          <div className="w-full mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded text-center border border-gray-300 font-semibold ">
            {error}
          </div>
        )}
          <div className="mt-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Infos académiques */}
              <div className="space-y-4">
                <hr />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    {renderLabel("Année académique")}
                    <select
                      name="anneeAcademique"
                      className="w-full border p-2 rounded"
                      required
                    >
                      <option value="">Sélectionnez une année</option>
                      <option value="2024-2025">2024-2025</option>
                      <option value="2023-2024">2023-2024</option>
                    </select>
                  </div>
                  <div>
                    {renderLabel("Matricule")}
                    <input
                      type="text"
                      name="matricule"
                      placeholder="Entrer le matricule"
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  <div>
                    {renderLabel("Classe")}
                    <select
                      name="classe"
                      className="w-full border p-2 rounded"
                      required
                    >
                      <option value="">Sélectionnez une classe</option>
                      <option value="L1">CSI3 DLW</option>
                      <option value="L2">3IL2</option>
                      <option value="L3">ERIS4</option>
                    </select>
                  </div>
                  <div>
                    {renderLabel("Baccalauréat")}
                    <select
                      name="bac"
                      className="w-full border p-2 rounded"
                      required
                    >
                      <option value="">Sélectionnez un type de Bac</option>
                      <option value="Scientifique">Scientifique</option>
                      <option value="Littéraire">Littéraire</option>
                      <option value="Autres">Autres</option>
                    </select>
                  </div>
                  <div>
                    {renderLabel("Série du Bac")}
                    <input
                      type="text"
                      name="serieBac"
                      placeholder="Entrer la série du Bac"
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  <div>
                    {renderLabel("Année d'obtention du Bac")}
                    <input
                      type="text"
                      name="anneeObtentionBac"
                      placeholder="Entrer l'année d'obtention du Bac"
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  <div>
                    {renderLabel("Etablissement d'obtention du Bac")}
                    <input
                      type="text"
                      name="etsObtentionBac"
                      placeholder="Entrer l'établissement d'obtention du Bac"
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  <div>
                    {renderLabel("Diplôme d'entrée")}
                    <input
                      type="text"
                      name="diplomeEntree"
                      placeholder="Entrer le diplôme d'entrée"
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  <div>
                    {renderLabel("Année d'obtention du diplôme")}
                    <input
                      type="text"
                      name="anneeObtentionDiplome"
                      placeholder="Entrer l'année d'obtention du diplôme"
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                </div>
              </div>
              {/* Submit Button */}
              <div className="max-w-sm mx-auto">
                <button
                  type="submit"
                  className="w-full bg-blue-900 text-white p-2 rounded-md hover:bg-blue-700"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Inscription;