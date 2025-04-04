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
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <p className="text-lg italic text-red-600 text-center">
          Complétez votre profil est une phase primordiale en tant qu'utilisateur de AlumniDocs.
          Rassurez-vous de soumettre tous les documents requis.
        </p>

        {/* Informations Personnelles */}
        <div className="mt-6 border-b pb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} /> Informations Personnelles
          </h2>
          <div className="mt-3 flex flex-col md:flex-row items-center gap-4">
            <img
              src="../assets/et.jpeg"
              alt="Profil"
              className="w-20 h-20 rounded-full object-cover border"
            />
            <div className="text-center md:text-left">
              <p className="font-bold">Joe Dalton</p>
              <p className="text-gray-600">joe.dalton@gmail.com</p>
              <p className="text-gray-600">+237 654606328</p>
              <p className="text-gray-600">CS13-DLW</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <FontAwesomeIcon icon={faPencil} /> Modifier le profil
            </button>
          </div>
        </div>

        {/* Documents Requis */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FontAwesomeIcon icon={faFile} /> Documents Requis
          </h2>
          <p className="text-sm text-gray-600">
            Les champs portant <span className="text-red-600 font-bold">*</span>{" "}
            sont obligatoires
          </p>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Acte de naissance", name: "birthCertificate" },
                { label: "Relevé BAC", name: "bacTranscript" },
                { label: "CNI", name: "cni" },
                { label: "R1", name: "r1" },
                { label: "R2", name: "r2" },
                { label: "Reçu Scolarité", name: "schoolReceipt" },
              ].map((doc) => (
                <div
                  key={doc.name}
                  className="bg-white p-4 rounded-md shadow-md flex flex-col items-center"
                >
                  <FileInput
                    label={doc.label}
                    name={doc.name}
                    onChange={(file) => handleFileChange(doc.name, file)}
                  />
                  <button className="mt-2 px-4 bg-blue-700 text-white rounded-md hover:bg-blue-600 w-full sm:w-auto md:h-20 text-sm sm:text-base md:text-lg py-2 sm:py-3">
                    Modifier
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700"
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