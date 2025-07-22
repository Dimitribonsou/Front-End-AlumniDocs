import React, {  useRef, useState } from "react";
import FileInput from "../Components/fileinput";
import Navbar from "../Components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../Components/footer";
import Ilogin from "../types/Ilogin";
import IclassInfo from "../types/IclasseInfo";

const ProfilePage: React.FC = () => {
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});
  const [fileErrors, setFileErrors] = useState<{ [key: string]: string }>({}); // Ajout pour les erreurs
  const [validFormat, setValidFormat] = useState<boolean>(false); // definis le format du fichier comme valid ou nom

  //recuperer l'id de l'etudiant connecter 
  const dataLogin:Ilogin = JSON.parse(localStorage.getItem("loginData") || '{}') as Ilogin;
  const classeInfo:IclassInfo[] = JSON.parse(localStorage.getItem("classInfo") || '{}') as IclassInfo[];
  const nom_complet=dataLogin.nom+' '+dataLogin.prenom;
  const email_etudiant=dataLogin.email;
  const telephone=dataLogin.telephone;
  // recuperer la classe de l'etudiant
  const classe= classeInfo[0] ? classeInfo[0].libelle_classe : "";

  // Fonction utilitaire pour nettoyer les strings (enlever espaces, accents, etc.)
  const slugify = (str: string="") =>
    (str || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase();

  // Nouvelle fonction handleFileChange avec vérification du format
  const handleFileChange = (name: string, file: File | null, type?: string) => {
    if (file) {
      // Format attendu : classe_nom_prenom_type.pdf
      
      const classeSlug = slugify(classe);
      const nomSlug = slugify(dataLogin.nom);
      const prenomSlug = slugify(dataLogin.prenom);
      const typeSlug = type ? slugify(type) : slugify(name);

      const expectedName = `${classeSlug}_${nomSlug}_${prenomSlug}_${typeSlug}.pdf`;
      if (file.name.toUpperCase().trim() !== expectedName.trim().toUpperCase()) {
        // Si le nom du fichier ne correspond pas au format attendu, marquer le format comme invalide
        setValidFormat(false);
        console.error(`Nom de fichier invalide pour ${name}: ${file.name}`);
        console.error(`Format attendu : ${expectedName}`);
        // Afficher un message d'erreur si le nom du fichier ne correspond pas au format
        setFileErrors((prev) => ({
          ...prev,
          [name]: `Format attendu : ${expectedName}`,
        }));
        setFiles((prevFiles) => ({ ...prevFiles, [name]: null }));
        return;
      } else {
        // marquer le format de fichier comme valide
        setValidFormat(true);
        // Si le format est correct, on peut vider l'erreur pour ce fichier 
        setFileErrors((prev) => ({ ...prev, [name]: "" }));
      }
    } else {
      setFileErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setFiles((prevFiles) => ({ ...prevFiles, [name]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Fichiers soumis :", files);
  };

  // definir une reference pour l'input avec un type specifique
  const inputRef=useRef<HTMLInputElement>(null) ;
  const FileClick=()=>{
    // select the image on click
    if(inputRef.current) {
      inputRef.current.click();
    }
  }
  const handleChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
    // traiter le fichier image ici
    console.log(event.target.files)
  }
   
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
            <input ref={inputRef} onChange={handleChange} type="file" id="file" className="w-40 h-20 bg-blue-500 hidden"  placeholder="Entrer votre photo"  />
            <img
              src="../assets/profil.png"
              alt="Profil"
              onClick={FileClick}
              className="w-24 h-24 rounded-full object-cover border cursor-pointer"
            />
            <div>
              <p className="font-bold capitalize">{nom_complet}</p>
              <p className="text-gray-600">{email_etudiant}</p>
              <p className="text-gray-600">{telephone}</p>
              <p className="text-gray-600">{classe}</p>
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
                  { label: "Acte de naissance",type:'ACTE', name: "birthCertificate", required: true },
                  { label: "CNI", name: "cni",type:'CNI', required: true },
                  { label: "Passeport",type:'PASSPORT', name: "passeport", required: false },
                  { label: "Relevé du niveau 3",type:'R3', name: "r3", required: false },
                  { label: "Relevé du niveau 5",type:'R5' ,name: "r5", required: false },
                ].map((doc) => (
                  <div
                    key={doc.name}
                    className="bg-white p-4 rounded-md shadow-md flex flex-col items-center"
                  >
                    <FileInput
                      label={doc.label}
                      name={doc.name}
                      onChange={(file) => handleFileChange(doc.name, file, doc.type)}
                      required={doc.required}
                      isvalidformat={validFormat}
                    />
                    {fileErrors[doc.name] && (
                      <span className="text-red-600 text-sm mt-2">{fileErrors[doc.name]}</span>
                    )}
                  </div>
                ))}
              </div>
        
              {/* Colonne de droite */}
              <div className="space-y-4">
                {[
                  { label: "Baccalauréat (relévé ou diplôme)", name: "bacTranscript", type: "BAC", required: true },
                  { label: "Relevé du niveau 1", name: "r1", type: "R1", required: false },
                  { label: "Relevé du niveau 2", name: "r2", type: "R2", required: false },
                  { label: "Relevé du niveau 4", name: "r4", type: "R4", required: false },
                ].map((doc) => (
                  <div
                    key={doc.name}
                    className="bg-white p-4 rounded-md shadow-md flex flex-col items-center"
                  >
                    <FileInput
                      label={doc.label}
                      name={doc.name}
                      onChange={(file) => handleFileChange(doc.name, file, doc.type)}
                      required={doc.required}
                      isvalidformat={validFormat}
                    />
                    {fileErrors[doc.name] && (
                      <span className="text-red-600 text-sm mt-2">{fileErrors[doc.name]}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
        
            {/* Boutons */}
            {/* <div className="flex flex-col md:flex-row justify-between mt-6">
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
            </div> */}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;