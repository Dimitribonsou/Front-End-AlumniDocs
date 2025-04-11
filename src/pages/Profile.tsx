import React, { useState } from "react";
import FileInput from "../Components/fileinput";
import Navbar from "../Components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faFile,
  faPlus,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../Components/footer";

const ProfilePage: React.FC = () => {
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (name: string, file: File | null) => {
    setFiles((prevFiles) => ({ ...prevFiles, [name]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Fichiers soumis :", files);
  };

  return (
    <div className="min-h-screen flex flex-col bg-watermark">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-4 bg-white shadow-md rounded-lg">
        <p className="text-lg italic text-red-600 text-center">
          Complétez votre profil est une phase primordiale en tant qu'utilisateur de AlumniDocs.
          Rassurez-vous de soumettre tous les documents requis.
        </p>

        {/* Informations Personnelles */}
        <div className="mt-6 border-b pb-4 text-center">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faUser} /> Informations Personnelles
          </h2>
          <div className="mt-3 mx-auto flex flex-col items-center gap-4 text-center">
            <img
              src="../assets/et.jpeg"
              alt="Profil"
              className="w-20 h-20 rounded-full object-cover border"
            />
            <div>
              <p className="font-bold">Joe Dalton</p>
              <p className="text-gray-600">joe.dalton@gmail.com</p>
              <p className="text-gray-600">+237 654606328</p>
              <p className="text-gray-600">CS13-DLW</p>
            </div>
          </div>
        </div>

        {/* Documents Requis */}
        <div className="mt-6">
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Colonne de gauche */}
              <div className="space-y-4">
                {[
                  { label: "Acte de naissance", name: "birthCertificate", required: true },
                  { label: "CNI", name: "cni", required: true },
                  { label: "Passeport", name: "passeport", required: false },
                  { label: "Relevé du niveau 3", name: "r3", required: false },
                  { label: "Relevé du niveau 5", name: "r5", required: false },
                ].map((doc) => (
                  <div
                    key={doc.name}
                    className="bg-white p-4 rounded-md shadow-md flex flex-col items-center"
                  >
                    <FileInput
                      label={doc.label}
                      name={doc.name}
                      onChange={(file) => handleFileChange(doc.name, file)}
                      required={doc.required}
                    />
                  </div>
                ))}
              </div>
        
              {/* Colonne de droite */}
              <div className="space-y-4">
                {[
                  { label: "Baccalauréat (relévé ou diplôme)", name: "bacTranscript", required: true },
                  { label: "Relevé du niveau 1", name: "r1", required: false },
                  { label: "Relevé du niveau 2", name: "r2", required: false },
                  { label: "Relevé du niveau 4", name: "r4", required: false },
                ].map((doc) => (
                  <div
                    key={doc.name}
                    className="bg-white p-4 rounded-md shadow-md flex flex-col items-center"
                  >
                    <FileInput
                      label={doc.label}
                      name={doc.name}
                      onChange={(file) => handleFileChange(doc.name, file)}
                      required={doc.required}
                    />
                  </div>
                ))}
              </div>
            </div>
        
            {/* Boutons */}
            <div className="flex flex-col md:flex-row justify-between mt-6">
              <button
                type="button"
                className="bg-gray-600 h-9 hover:bg-gray-600 text-white font-semibold rounded-md py-2 text-sm w-full md:w-1/2 md:mr-2 mb-2 md:mb-0"
              >
                <a href="/home">Quitter sans enregistrer</a>
              </button>
              <button
                type="submit"
                className="bg-red-600 h-9 hover:bg-red-700 text-white font-semibold rounded-md py-2 text-sm w-full md:w-1/2 md:ml-2"
              >
                <FontAwesomeIcon icon={faPlus} /> Soumettre
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;