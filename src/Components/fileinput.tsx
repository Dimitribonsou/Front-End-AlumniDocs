import React, { useState } from 'react';
import Ilogin from '../types/Ilogin';
import constant from '../data/constant';
import IclassInfo from '../types/IclasseInfo';

type FileInputProps = {
  label: string;
  name: string;
  onChange: (file: File | null) => void;
  required?: boolean;
  isvalidformat: boolean;
};

const FileInput: React.FC<FileInputProps> = ({ label, name, onChange, required = false ,isvalidformat}) => {
  const [fileName, setFileName] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [serverMessage, setServerMessage] = useState('');
  const [isTooBig, setIsTooBig] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFileName(file ? file.name : '');
    setSelectedFile(file);

    // Vérification du format PDF uniquement
    if (file && file.type !== "application/pdf") {
      setSuccessMsg("Seul le format PDF est accepté !");
      setIsTooBig(true); // Empêche l'envoi
      onChange(null); // Réinitialise le fichier côté parent
      return;
    }

    onChange(file);

    if (file && file.size > 1024 * 512) { // 512 Ko
      setSuccessMsg("Fichier doit être inférieur à 512 Ko !");
      setIsTooBig(true);
    } else {
      setSuccessMsg("");
      setIsTooBig(false);
    }
  };

  const handleSend = async () => {

    if (selectedFile && !isTooBig) {
      const dataLogin:any = JSON.parse(localStorage.getItem("loginData") || '{}') as Ilogin;
      const classeInfo:IclassInfo[] = JSON.parse(localStorage.getItem("classInfo") || '{}') as IclassInfo[];
      const idEtudiant=dataLogin.iduser;
      const nom=dataLogin.nom;
       // recuperer la classe de l'etudiant
      const classe= classeInfo[0] ? classeInfo[0].libelle_classe : "";
  const id_classe=classeInfo[0] ? classeInfo[0].id_classe : null;
      const formData = new FormData();
      formData.append('libelle', label);
      formData.append('document', selectedFile);
      formData.append('nom', nom);
      formData.append('classe', classe);
      formData.append('classe_id', id_classe ? id_classe.toString() : '');
      formData.append('id_etudiant', idEtudiant);
      try {
        const response = await fetch(`${constant.host}/AlumniDocs-API/upload-file`, {
          method: 'POST',
          body: formData
        });
        console.log(formData);
        if (!response.ok) {
          alert("fichier non envoye !")
          throw new Error('La réponse du serveur n\'est pas valide.');
        }
        alert(`Fichier "${selectedFile.name}" envoyé !`);
        const result = await response.text();
        setServerMessage(result);
      } catch (error) {
        console.error('Erreur lors de l\'envoi de la requête :', error);
        setServerMessage('Une erreur est survenue lors de l\'envoi de votre requête.');
      }
    }
  };

  return (
    <div className="mb-4 w-full max-w-sm mx-auto">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
      >
        {label} {required && <span className="text-red-600 font-bold">*</span>}
      </label>
      <input
        type="file"
        id={name}
        name={name}
        className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base md:text-lg"
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={handleSend}
        className={`mt-1 w-full px-4 py-1 rounded text-sm ${
          isTooBig || !selectedFile || isvalidformat=== false
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#161B70] text-white hover:bg-blue-700"
        }`}
        // masquer le bouton de soumission du fichier si le fichier est trop volumineux , si aucun fichier n'est selctionner ou si le format exiger n'est pas respecter
        disabled={isTooBig || !selectedFile || isvalidformat === false}
      >
        Envoyer
      </button>
      {successMsg && (
        <div className="mt-2 px-2 py-2 bg-red-500 text-medium text-white rounded text-xs text-center border border-red-700">
          {successMsg}
        </div>
      )}
    </div>
  );
};

export default FileInput;