import { useState } from "react";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";

export default function Inscription() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    civilité: "",
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
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

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const totalSteps = 3; // Nombre total d'étapes
  const progressPercentage = (step / totalSteps) * 100; // Calcul de la progression

  const renderLabel = (text: string) => (
    <label className="block mb-2 ">
      {text} 
    </label>
  );

  return (
    <div className="min-h-screen flex flex-col bg-watermark">
      <Navbar />
        <div className="w-full max-w-2xl mx-auto p-6 mt-4 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Inscription Étudiant</h2>

        {/* Barre de progression */}
        <div className="relative w-full h-2 bg-gray-200 rounded-full mb-6">
          <div
            className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <form>
          {/* Étape 1 : Informations personnelles */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Informations personnelles</h3>
              <div>
                {renderLabel("civilité")}
                <select name="" id="" 
                  className="w-full border p-2 rounded">
                  <option value=""></option>
                  <option value="">Mr</option>
                  <option value="">Mme</option>
                  <option value="">Mlle</option>
                </select>
              </div>
              <div>
                {renderLabel("Nom")}
                <input
                  type="text"
                  name="nom"
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
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                {renderLabel("Prénom")}
                <input
                  type="text"
                  name="prenom"
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
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                {renderLabel("Date de naissance")}
                <input
                  type="Date"
                  name="telephone"
                  placeholder="Téléphone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                {renderLabel("Region de naissance")}
                <input
                  type="text"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                {renderLabel("Lieu de naissance")}
                <input
                  type="text"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                {renderLabel("Departement de naissance")}
                <input
                  type="text"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              
              <div>
                {renderLabel("Quartier")}
                <input
                  type="text"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                {renderLabel("Photo")}
                <input
                  type="File"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

            </div>
          )}

          {/* Étape 2 : Infos académiques */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Infos académiques</h3>
              <hr />
              <div>
                {renderLabel("Année académique")}
                <select
                  name="anneeAcademique"
                  value={formData.anneeAcademique}
                  onChange={handleChange}
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
                  placeholder="Matricule"
                  value={formData.matricule}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                {renderLabel("Classe")}
                <select
                  name="classe"
                  value={formData.classe}
                  onChange={handleChange}
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
                {renderLabel("Bac")}
                <select
                  name="bac"
                  value={formData.bac}
                  onChange={handleChange}
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
                {renderLabel("Année d'obtention du Bac")}
                <input
                  type="text"
                  name="anneeObtentionBac"
                  placeholder="Année d'obtention du Bac"
                  value={formData.anneeObtentionBac}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                {renderLabel("Diplôme d'entrée")}
                <input
                  type="text"
                  name="diplomeEntree"
                  placeholder="Diplôme d'entrée"
                  value={formData.diplomeEntree}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                {renderLabel("Année d'obtention du diplôme")}
                <input
                  type="text"
                  name="anneeObtentionDiplome"
                  placeholder="Année d'obtention du diplôme"
                  value={formData.anneeObtentionDiplome}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
            </div>
          )}

          {/* Étape 3 : Infos parent */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Informations des parents</h3>
              <hr />
              <div>
                {renderLabel("Nom du père ou tuteur")}
                <input
                  type="text"
                  name="nomPere"
                  placeholder="Nom du père ou tuteur"
                  value={formData.nomPere}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                {renderLabel("Téléphone ")}
                <input
                  type="tel"
                  name="telPere"
                  placeholder="Téléphone du père ou tuteur"
                  value={formData.telPere}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                {renderLabel("Email ")}
                <input
                  type="email"
                  name="emailPere"
                  placeholder="Email du père ou tuteur"
                  value={formData.emailPere}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                {renderLabel("Profession")}
                <input
                  type="text"
                  name="professionPere"
                  placeholder="Profession du père ou tuteur"
                  value={formData.professionPere}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div> <br />
              <hr /> <br />
              <div>
                {renderLabel("Nom de la mère ou tutrice")}
                <input
                  type="text"
                  name="nomMere"
                  placeholder="Nom de la mère ou tutrice"
                  value={formData.nomMere}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                {renderLabel("Téléphone")}
                <input
                  type="tel"
                  name="telMere"
                  placeholder="Téléphone de la mère ou tutrice"
                  value={formData.telMere}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                {renderLabel("Email")}
                <input
                  type="email"
                  name="emailMere"
                  placeholder="Email de la mère ou tutrice"
                  value={formData.emailMere}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                {renderLabel("Profession")}
                <input
                  type="text"
                  name="professionMere"
                  placeholder="Profession de la mère ou tutrice"
                  value={formData.professionMere}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
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
                Soumettre
              </button>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}