import React from 'react';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

const RequetePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col bg-watermark">
      <Navbar />
      <div className="flex flex-col md:flex-row max-w-5xl w-full bg-white shadow-lg mt-10 p-6 rounded-lg mx-auto">
        {/* Image Section */}
        <img
          src="/assets/rq.jpeg"
          alt="Illustration"
          className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-lg"
        />

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold text-center md:text-left">REQUETE</h2>
          <p className="text-gray-500 text-center md:text-left">
            ENVOYEZ VOTRE REQUETE
          </p>

          <form className="mt-4 space-y-4">
            {/* Libelle Input */}
            <div>
              <label className="block text-gray-700">Libelle</label>
              <input
                type="text"
                name="libelle"
                className="w-full p-2 border rounded-md"
                placeholder="--entrez le libelle--"
              />
            </div>

            {/* Pièce Jointe Input */}
            <div>
              <label className="block text-gray-700">Pièce Jointe</label>
              <input
                type="file"
                name="file"
                className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base md:text-lg"
              />
              
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                className="w-full p-2 border rounded-md"
                placeholder="--entrez une explication--"
              ></textarea>
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