import React, { useState } from 'react';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

const RequetePage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Exemple de validation
    setError("Exemple de notification ou d'erreur");
    // Ajoute ici ta logique de soumission réelle
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col bg-watermark">
      <Navbar />
      <div className="flex flex-col md:flex-row max-w-5xl w-full bg-white  mt-10 p-6 rounded-lg mx-auto">
        {/* Image Section */}
        <img
          src="/assets/rq.jpeg"
          alt="Illustration"
          className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-lg"
        />

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold text-center md:text-left">REQUETE</h2>
          <p className="text-gray-500 text-center italic md:text-left">
            Envoyer votre requete
          </p>

          {/* Notification */}
          {error && (
            <div className="w-full mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded text-center border border-gray-300 font-semibold shadow-sm">
              {error}
            </div>
          )}

          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            {/* Libelle Input */}
            <div>
              <label className="block text-gray-700">Objet</label>
              <input
                type="text"
                name="Objet"
                className="w-full p-2 h-9 border rounded-md"
                placeholder="Entrez le Objet"
              />
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                className="w-full p-2 border rounded-md"
                placeholder="Entrez une explication de votre requete"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700">Categorie</label>
              <select name="" id="" className="w-full p-2 h-9 border rounded-md">
                <option value=""></option>
                <option value="">Notes</option>
                <option value="">Absence</option>
              </select>
            </div>

            {/* Pièce Jointe Input */}
            <div>
              <label className="block text-gray-700">Pièce Jointe</label>
              <input
                type="file"
                name="file"
                className="mt-1 block text-sm w-full  text-gray-700  border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base md:text-lg"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-900 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RequetePage;