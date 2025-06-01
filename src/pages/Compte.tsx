import { useState } from "react";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";

export default function Compte() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    civilité: "",
    nom: "",
    nomMarital: "",
    prenom: "",
    email: "",
    telephone: "",
    nationalite: "",
    dateNaissance: "",
    regionNaissance: "",
    lieuNaissance: "",
    departementNaissance: "",
    quartier: "",
    photo: "",
    anneeAcademique: "",
    matricule: "",
    classe: "",
    bac: "",
    anneeObtentionBac: "",
    diplomeEntree: "",
    anneeObtentionDiplome: "",
    nomPere: "",
    telPere: "",
    emailPere: "",
    professionPere: "",
    nomMere: "",
    telMere: "",
    emailMere: "",
    professionMere: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const totalSteps = 2;
  const progressPercentage = (step / totalSteps) * 100;

  const renderLabel = (text: string) => (
    <label className="block mb-2 text-sm font-medium text-gray-700">
      {text}
      {text !== "Nom Marital" && text !== "Département de naissance" && (
        <span className="text-red-600 ml-1">*</span>
      )}
    </label>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Exemple de validation
    setError("Exemple de notification ou d'erreur");
    // Ajoute ici ta logique de soumission réelle
  };

  return (
    <div className="min-h-screen flex flex-col bg-watermark">
      <Navbar />
      <div className="w-full max-w-4xl mx-auto p-6 mt-4 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile Étudiant</h2>

        {/* Notification */}
        {error && (
          <div className="w-full mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded text-center border border-gray-300 font-semibold ">
            {error}
          </div>
        )}

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
                {renderLabel("Civilité")}
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
                  required
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
                  required
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
                  required
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
                  required
                />
              </div>
              <div>
                {renderLabel("Nationalité")}
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
                {renderLabel("Date de naissance")}
                <input
                  type="date"
                  name="dateNaissance"
                  value={formData.dateNaissance}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                {renderLabel("Région de naissance")}
                <input
                  type="text"
                  name="regionNaissance"
                  placeholder="Entrer la région de naissance"
                  value={formData.regionNaissance}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                {renderLabel("Lieu de naissance")}
                <input
                  type="text"
                  name="lieuNaissance"
                  placeholder="Entrer le lieu de naissance"
                  value={formData.lieuNaissance}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                {renderLabel("Département de naissance")}
                <input
                  type="text"
                  name="departementNaissance"
                  placeholder="Entrer le département de naissance"
                  value={formData.departementNaissance}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                {renderLabel("Quartier")}
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
                  className="w-full border p-2 rounded"
                  // Pour gérer l'upload, il faut une logique spécifique
                />
              </div>
            </div>
          )}

          {/* Étape 2 : Infos parent */}
          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {renderLabel("Nom du père ou tuteur")}
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
                {renderLabel("Téléphone du père ou tuteur")}
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
                {renderLabel("Email du père ou tuteur")}
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
                {renderLabel("Profession du père ou tuteur")}
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
                {renderLabel("Nom de la mère ou tutrice")}
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
                {renderLabel("Téléphone de la mère ou tutrice")}
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
                {renderLabel("Email de la mère ou tutrice")}
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
                {renderLabel("Profession de la mère ou tutrice")}
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
                onClick={nextStep}
                className="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
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