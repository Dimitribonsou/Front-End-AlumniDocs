import React, { useEffect, useState } from 'react';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import constant from '../data/constant';
import Ilogin from '../types/Ilogin';

const Inscription: React.FC = () => {
  const renderLabel = (text: string) => (
    <label className="block mb-2 text-sm font-medium text-gray-700">{text}</label>
  );
  const [matricule, setMatricule] = React.useState('');
  const [idClasse, setIdClasse] = React.useState('');
  const [bac, setBac] = React.useState('');
  const [anneeObtensionBac, setAnneeObtensionBac] = React.useState('');
  const [diplomeEntrer, setDiplomeEntrer] = React.useState('');
  const [anneeObtensionDiplome, setAnneeObtensionDiplome] = React.useState('');
  const [etsObtentionBac, setEtsObtentionBac] = React.useState('');
  // liste des classes existante 
  const [listClass, setClasseListe]=useState([]);
  // const [idEtudiant, setIdEtudiant] = React.useState('');
  const [serieBac, setSerieBac] = React.useState('');
  // const [anneeAcademique, setSerieBac] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      //recuperer l'id de l'etudiant connecter 
      const dataLogin:any = JSON.parse(localStorage.getItem("loginData") || '{}') as Ilogin;
      const idEtudiant=dataLogin.iduser;
  
      const response = await fetch(`${constant.host}/AlumniDocs-API/newIncription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "matricule": matricule,
          "id_classe": idClasse,
          "bac": bac,
          "annee_obtension_bac": anneeObtensionBac,
          "etablissement_bac": anneeObtensionBac,
          "diplome_entrer": diplomeEntrer,
          "annee_obtension_diplome": anneeObtensionDiplome,
          "id_etudiant": idEtudiant,
          "serie_bac": serieBac
        }),
      });

      if (!response.ok) {
        throw new Error('Réponse du réseau non valide');
      }

      const message = await response.text();
      console.log(message);
      if (message) {
        setError(message);
      } else {
        console.log("Inscription réussie !");
      }
    } catch (error) {
      console.error('Erreur lors de l\'opération de récupération des données :', error);
      setError("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
    }
  };
  useEffect(()=>{
    getClasse();
  },[]);
const getClasse= async ()=>{
  const response = await fetch(`${constant.host}/AlumniDocs-API/ClassList`);
  if(response.ok)
  {
    //mettre a jour la liste des classe
     setClasseListe(await response.json());
  }
  else
  {
     console.log("erreur lors de la recuperation de la classe");
  }
}

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col bg-watermark">
      <Navbar />
      <div className="flex flex-col max-w-3xl w-full bg-white shadow-lg mt-10 p-6 rounded-lg mx-auto">
        {/* Form Section */}
        <div className="w-full p-6">
          <h2 className="text-2xl font-bold text-center">INSCRIPTION</h2>

          {/* Conteneur sans défilement */}
          <div className="mt-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Infos académiques */}
              <div className="space-y-4">
                <hr />
                <span className='text-center text-green-500 my-2 block text-base font-medium'>{error}</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* <div>
                    {renderLabel("Année académique")}
                    <select
                      name="anneeAcademique"
                      className="w-full border p-2 rounded"
                    >
                      <option value="">Sélectionnez une année</option>
                      <option value="2024-2025">2024-2025</option>
                      <option value="2023-2024">2023-2024</option>
                    </select>
                   </div> */}
                    <div>
                    {renderLabel("Matricule")}
                      <input
                        type="text"
                        name="matricule"
                        placeholder="Entrer le matricule"
                        className="w-full border p-2 rounded"
                        required
                        value={matricule}
                        onChange={(e) => setMatricule(e.target.value)}
                      />
                    </div>
                    <div>
                    {renderLabel("Classe")}
                      <select
                        name="classe"
                        className="w-full border p-2 rounded"
                        required
                        value={idClasse}
                        onChange={(e) => setIdClasse(e.target.value)}
                      >
                        <option value="">Sélectionnez une classe</option>
                        {/* afficher la liste des classes  */}
                        {listClass.map((classe:any) => (
                              <option key={classe.id_classe} value={classe.id_classe}>{classe.libelle}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                    {renderLabel("Type de Bac")}
                      <select
                        name="bac"
                        className="w-full border p-2 rounded"
                        required
                        value={bac}
                        onChange={(e) => setBac(e.target.value)}
                      >
                        <option value="">Sélectionnez un type de Bac</option>
                        <option value="Scientifique">Scientifique</option>
                        <option value="Littéraire">Littéraire</option>
                        <option value="Autres">Autres</option>
                      </select>
                    </div>
                    <div>
                    {renderLabel("Serie du  Bac")}
                        <input
                          type="text"
                          name="serieBac"
                          placeholder="Entrer la série du Bac"
                          className="w-full border p-2 rounded"
                          required
                          value={serieBac}
                          onChange={(e) => setSerieBac(e.target.value)}
                        />
                    </div>
                    <div>
                    {renderLabel("Année d'obtention du Bac")}
                        <input
                          type="text"
                          name="anneeObtensionBac"
                          placeholder="Entrer l'année d'obtention du Bac"
                          className="w-full border p-2 rounded"
                          required
                          value={anneeObtensionBac}
                          onChange={(e) => setAnneeObtensionBac(e.target.value)}
                        />
                  </div>
                  {/* <div>
                      {renderLabel("Classe")}
                      <select
                        name="classe"
                        className="w-full border p-2 rounded"
                        required
                        value={idClasse}
                        onChange={(e) => setIdClasse(e.target.value)}
                      >
                        <option value="">Sélectionnez une classe</option>
                        <option value="1">CSI3 DLW</option>
                        <option value="2">3IL2</option>
                        <option value="3">ERIS4</option>
                      </select>
                  </div> */}
                  {/* <div>
                      {renderLabel("Baccalauréat")}
                      <select
                        name="bac"
                        className="w-full border p-2 rounded"
                        required
                        value={bac}
                        onChange={(e) => setBac(e.target.value)}
                      >
                        <option value="">Sélectionnez un type de Bac</option>
                        <option value="Scientifique">Scientifique</option>
                        <option value="Littéraire">Littéraire</option>
                        <option value="Autres">Autres</option>
                      </select>
                  </div> */}
                  {/* <div>
                        {renderLabel("Série du Bac")}
                        <input
                          type="text"
                          name="serieBac"
                          placeholder="Entrer la série du Bac"
                          className="w-full border p-2 rounded"
                          required
                          value={serieBac}
                          onChange={(e) => setSerieBac(e.target.value)}
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
                        value={anneeObtensionBac}
                        onChange={(e) => setAnneeObtensionBac(e.target.value)}
                      />
                  </div> */}
                  <div>
                        {renderLabel("Etablissement d'obtention du Bac")}
                        <input
                          type="text"
                          name="etsObtentionBac"
                          placeholder="Entrer l'établissement d'obtention du Bac"
                          className="w-full border p-2 rounded"
                          required
                          value={etsObtentionBac}
                          onChange={(e) => setEtsObtentionBac(e.target.value)}
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
                        value={diplomeEntrer}
                        onChange={(e) => setDiplomeEntrer(e.target.value)}
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
                        value={anneeObtensionDiplome}
                        onChange={(e) => setAnneeObtensionDiplome(e.target.value)}
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