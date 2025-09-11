import React, { useState } from 'react';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import constant from '../data/constant';
import Ilogin from '../types/Ilogin';
import NewNotification from '../data/function';

const RequetePage: React.FC = () => {
  const [serverMessage, setServerMessage] = useState('');
  const [objet, setObjet] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState<any>();
  const [fichier, setFichier] =useState<any>();
  const handleSubmit = async (e: React.FormEvent) => {
    const dataLogin:any = JSON.parse(localStorage.getItem("loginData") || '{}') as Ilogin;
    const idEtudiant=dataLogin.iduser;
    e.preventDefault();
    const formData = new FormData();
    formData.append('objet', objet); 
    formData.append('description', description);
    formData.append('id_categorie', categorie);
    formData.append('piece_jointe', fichier);
    formData.append('request_type', "Requete");
    formData.append('id_etudiant', idEtudiant);
    try {
      const response = await fetch(`${constant.host}/AlumniDocs-API/newRequest`, {
        method: 'POST',
        body: formData
      });
      console.log(formData);
      if (!response.ok) {
        throw new Error('La réponse du serveur n\'est pas valide.');
      }

      const result = await response.text();
      setServerMessage(result);
      // envoie des notifications a l'etudiant conserner
       NewNotification("Requete en attente","Votre requete est en cour de traitement",idEtudiant,"success");
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la requête :', error);
      setServerMessage('Une erreur est survenue lors de l\'envoi de votre requête.');
    }
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
          {serverMessage && (
            <div className="w-full mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded text-center border border-gray-300 font-semibold shadow-sm">
              {serverMessage}
            </div>
          )}

          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            {/* Libelle Input */}
            <div>
              <label className="block text-gray-700">Objet</label>
              <input
                type="text"
                name="Objet"
                className="w-full p-2 h-9 border rounded-md outline-none"
                placeholder="Entrez le Objet"
                required={true}
                value={objet}
                onChange={(e)=>setObjet(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Categorie</label>
              <select name="" id="" className="w-full p-2 h-9 border rounded-md outline-none" 
               required={true}
               value={categorie}
               onChange={(e:any)=>setCategorie(e.target.value)}
               >
                <option value="">Categorie requete</option>
                <option value="1">Note</option>
                <option value="2">Absence</option>
                <option value="3">Autre</option>
              </select>
            </div>
            {/* Pièce Jointe Input */}
            <div>
              <label className="block text-gray-700">Pièce Jointe</label>
              <input
                type="file"
                name="file"
                className="mt-1 block text-sm w-full  text-gray-700  border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base md:text-lg"
                required={true}
                onChange={(e:any)=>e.target.files && setFichier(e.target.files[0])}
              />
            </div>
            {/* Description Textarea */}
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                className="w-full p-2 border rounded-md outline-none"
                placeholder="Entrez une explication de votre requete"
                required={true}
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
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