import { useState } from "react";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import constant from "../data/constant";
import Ilogin from "../types/Ilogin";

export default function Compte() {
  const dataLogin:Ilogin = JSON.parse(localStorage.getItem("loginData") || '{}') as Ilogin;
  const nomEtd=dataLogin.nom;
  const emailEtd=dataLogin.email;
  const idEtudiant=dataLogin.iduser;
  const telephoneEtudiant=dataLogin.telephone;
  const prenomEtudiant=dataLogin.prenom;
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    civilité: "",
    id_etudiant:idEtudiant,
    nom:nomEtd,
    nomMarital: "",
    prenom:prenomEtudiant,
    email:emailEtd,
    telephone:telephoneEtudiant,
    nationalite: "",
    lieu_naissance: "",
    date_naissance: "",
    quartier: "",
    dep_naissance: "",
    region_naissance: "",
    photo: "",
    nomPere: "",
    telPere: "",
    emailPere: "",
    professionPere: "",
    nomMere: "",
    telMere: "",
    emailMere: "",
    professionMere: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${constant.host}/AlumniDocs-API/newProfil`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Réponse du réseau non valide');
      }

      const message = await response.text();
      console.log(message);
      if (message) {
        setError(message);
      } else {
        console.log("Profil mis à jour avec succès !");
      }
    } catch (error) {
      console.error('Erreur lors de l\'opération de récupération des données :', error);
      setError("Une erreur est survenue lors de la mise à jour du profil. Veuillez réessayer.");
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const thisStep = () => setStep((prev) => prev );

  const totalSteps = 2; // Nombre total d'étapes
  const progressPercentage = (step / totalSteps) * 100; // Calcul de la progression
  // fonction permettant de valider les champs du formulaire
  const isFormValid = () => {
    if (step === 1) {
      const requiredFields = [ "civilité","nationalite", "lieu_naissance", "date_naissance", "quartier", "dep_naissance"];
      return requiredFields.every((field) => {
        // // Validation améliorée de l'email
        // if (field === "email") {
        //   const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        //   return regex.test(formData[field as keyof typeof formData]);
        // }
        return formData[field as keyof typeof formData] !== "";
      });
    }
    return false;
  };

  const renderLabel = (text: string,icon:string="") => (
    <label className="block mb-2 text-sm font-medium text-gray-700">{text} <sup className="text-red-500 font-bold ">{icon}</sup></label>
  );

  return (
    <div className="min-h-screen flex flex-col bg-watermark">
      <Navbar />
      <div className="w-full max-w-4xl mx-auto p-6 mt-4 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile Étudiant</h2>
        <p className='font-medium text-center   my-1 text-green-500 rounded-sm'>{error}</p>
        {/* Barre de progression */}
        <div className="relative w-full h-2 bg-gray-200 rounded-full mb-6">
          <div
            className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Étape 1 : Informations personnelles */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {renderLabel("Civilité","*")}
                <select
                  name="civilité"
                  value={formData.civilité}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Sélectionnez</option>
                  <option value="Mr">Mr</option>
                  <option value="Mme">Mme</option>
                  <option value="Mlle">Mlle</option>
                </select>
              </div>
              <div>
                {renderLabel("Nom")}
                <input
                  type="text"
                  name="nom"
                  placeholder="Entrer le nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  
                />
              </div>
              <div>
                {renderLabel("Nom Marital")}
                <input
                  type="text"
                  name="nomMarital"
                  placeholder="Entrer le nom marital"
                  value={formData.nomMarital}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                {renderLabel("Prénom")}
                <input
                  type="text"
                  name="prenom"
                  placeholder="Entrer le prénom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  
                />
              </div>
              <div>
                {renderLabel("Email")}
                <input
                  type="email"
                  name="email"
                  placeholder="Entrer l'email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  
                />
              </div>
              <div>
                {renderLabel("Téléphone")}
                <input
                  type="tel"
                  name="telephone"
                  placeholder="Entrer le téléphone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  
                />
              </div>
              <div>
                {renderLabel("Nationalité","*")}
                <input
                  type="text"
                  name="nationalite"
                  placeholder="Entrer la nationalité"
                  value={formData.nationalite}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                {renderLabel("Date de naissance","*")}
                <input
                  type="date"
                  name="date_naissance"
                  placeholder="Entrer la date de naissance"
                  value={formData.date_naissance}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                {renderLabel("Région de naissance","*")}
                <input
                  type="text"
                  name="region_naissance"
                  placeholder="Entrer la région de naissance"
                  value={formData.region_naissance}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                {renderLabel("Lieu de naissance","*")}
                <input
                  type="text"
                  name="lieu_naissance"
                  placeholder="Entrer le lieu de naissance"
                  value={formData.lieu_naissance}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                {renderLabel("Département de naissance","*")}
                <input
                  type="text"
                  name="dep_naissance"
                  placeholder="Entrer le département de naissance"
                  value={formData.dep_naissance}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                {renderLabel("Quartier","*")}
                <input
                  type="text"
                  name="quartier"
                  placeholder="Entrer le quartier"
                  value={formData.quartier}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                {renderLabel("Photo")}
                <input
                  type="file"
                  name="photo"
                  placeholder="Télécharger une photo"
                  value={formData.photo}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>
          )}
          {/* Étape 2 : Infos parent */}
          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {renderLabel("Nom du père ou tuteur","*")}
                <input
                  type="text"
                  name="nomPere"
                  placeholder="Entrer le nom du père ou tuteur"
                  value={formData.nomPere}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                {renderLabel("Téléphone du père","*")}
                <input
                  type="tel"
                  name="telPere"
                  placeholder="Entrer le téléphone du père ou tuteur"
                  value={formData.telPere}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                {renderLabel("Email du père")}
                <input
                  type="email"
                  name="emailPere"
                  placeholder="Entrer l'email du père ou tuteur"
                  value={formData.emailPere}
                  onChange={handleChange}
                  className="w-full border p-2 rounded" 
                />
              </div>
              <div>
                {renderLabel("Profession","*")}
                <input
                  type="text"
                  name="professionPere"
                  placeholder="Entrer la profession du père ou tuteur"
                  value={formData.professionPere}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                {renderLabel("Nom de la mère ou tutrice","*")}
                <input
                  type="text"
                  name="nomMere"
                  placeholder="Entrer le nom de la mère ou tutrice"
                  value={formData.nomMere}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                {renderLabel("Téléphone e la mère","*")}
                <input
                  type="tel"
                  name="telMere"
                  placeholder="Entrer le téléphone de la mère ou tutrice"
                  value={formData.telMere}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                {renderLabel("Email de la mère")}
                <input
                  type="email"
                  name="emailMere"
                  placeholder="Entrer l'email de la mère ou tutrice"
                  value={formData.emailMere}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  
                />
              </div>
              <div>
                {renderLabel("Profession de la mère","*")}
                <input
                  type="text"
                  name="professionMere"
                  placeholder="Entrer la profession de la mère ou tutrice"
                  value={formData.professionMere}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>
          )}

          {/* Boutons navigation */}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
              >
                Précédent
              </button>
            )}
            {step < totalSteps && (
              <button
                type="button"
                disabled={!isFormValid()}
                onClick={isFormValid() ? nextStep : thisStep}
                className={ isFormValid() ? "ml-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" : "ml-auto bg-gray-500 text-white font-semibold py-2 px-4 rounded"}
              >
                Suivant
              </button>
            )}
            {step === totalSteps && (
              <button
                type="submit"
                className="ml-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
              >
                Enregistrer
              </button>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}