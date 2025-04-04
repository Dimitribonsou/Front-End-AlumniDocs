import React, { useState } from 'react';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

const RequetePage: React.FC = () => {


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col ">
      
      <Navbar />
      <div className="flex max-w-5xl w-full bg-white shadow-lg mt-10 p-6 rounded-lg">
        <img src="/path/to/image.png" alt="Illustration" className="w-1/2 h-auto object-cover rounded-lg" />
        
        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-bold">REQUETE</h2>
          <p className="text-gray-500">ENVOYEZ VOTRE REQUETE</p>
          
          <form className="mt-4 space-y-4">
            <div>
              <label className="block text-gray-700">Libelle</label>
              <input 
                type="text" 
                name="libelle" 
                
                 
                className="w-full p-2 border rounded-md" 
                placeholder="--entrez le libelle--" 
              />
            </div>
            
            <div>
              <label className="block text-gray-700">Pièce Jointe</label>
              <input 
                type="file" 
                name="file" 
                className="w-full p-2 border rounded-md" 
              />
            </div>
            
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea 
                name="description" 
                className="w-full p-2 border rounded-md" 
                placeholder="--entrez une explication--"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-900 text-white p-2 rounded-md hover:bg-blue-700">
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
