import React, { useState } from "react";
import constant from "../data/constant";

const UploadDocumentComponent = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [documentTypes, setDocumentTypes] = useState<string[]>([]);
  const [id_etudiant, setIdEtudiant] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Gestion du changement de fichiers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      
      // Vérification de la taille des fichiers
      const validFiles = selectedFiles.filter(file => file.size <= 1024 * 1024); // 1MB
      
      if (validFiles.length !== selectedFiles.length) {
        setMessage("Certains fichiers dépassent la limite de 1MB");
      }
      
      // Vérification du nombre de fichiers
      if (validFiles.length > 10) {
        setMessage("Maximum 10 fichiers autorisés");
        setFiles(validFiles.slice(0, 10));
      } else {
        setFiles(validFiles);
      }

      // Initialiser les types de documents
      setDocumentTypes(validFiles.map(() => "DOCUMENT"));
    }
  };

  // Gestion du changement de type de document
  const handleDocumentTypeChange = (index: number, value: string) => {
    const newTypes = [...documentTypes];
    newTypes[index] = value;
    setDocumentTypes(newTypes);
  };

  // Soumission du formulaire
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setMessage("");

    if (files.length === 0) {
      setMessage("Veuillez sélectionner au moins un fichier");
      setUploading(false);
      return;
    }

    const formData = new FormData();
    
    // Ajout de l'ID étudiant
    formData.append("id_etudiant", id_etudiant);
    
    // Ajout des types de documents
    documentTypes.forEach((type, index) => {
      formData.append(`documentTypes[${index}]`, type);
    });

    // Correction de l'ajout des fichiers
    files.forEach((file) => {
      // Le nom du champ doit correspondre à celui attendu par multer
      formData.append("documents", file);  // 'documents' est le nom attendu par multer
    });
    // Debug: Vérifier le contenu du FormData
    Array.from(formData.entries()).forEach(([key, value]) => {
      console.log(key, value);
    });

    try {
      const response = await fetch(`${constant.host}/AlumniDocs-API/upload-documents`, {
        method: "POST",
        // Ne pas définir le Content-Type, le navigateur le fera automatiquement
        body: formData
      });

      const result = await response.json();
      console.log("Réponse du serveur:", result);  // Debug

      if (response.ok) {
        setMessage("Documents téléversés avec succès");
        setFiles([]);
        setDocumentTypes([]);
      } else {
        setMessage(result.message || "Erreur lors du téléversement");
      }
    } catch (error) {
      console.error("Erreur:", error);  // Debug
      setMessage("Erreur lors du téléversement");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">Upload de Documents</h2>

      <form onSubmit={handleUpload}>
        {/* Champ ID Étudiant */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">ID Étudiant</label>
          <input
            type="text"
            value={id_etudiant}
            onChange={(e) => setIdEtudiant(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Sélection des fichiers */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Documents</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            name="documents"
            className="w-full"
          />
          <p className="text-sm text-gray-500">Maximum 10 fichiers, 1MB par fichier</p>
        </div>

        {/* Liste des fichiers sélectionnés avec leurs types */}
        {files.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium">Fichiers sélectionnés :</h3>
            {files.map((file, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="flex-1">{file.name}</span>
                <select
                  value={documentTypes[index]}
                  onChange={(e) => handleDocumentTypeChange(index, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="DOCUMENT">Document</option>
                  <option value="CNI">CNI</option>
                  <option value="DIPLOME">Diplôme</option>
                  <option value="CERTIFICAT">Certificat</option>
                </select>
              </div>
            ))}
          </div>
        )}

        {/* Message d'erreur ou de succès */}
        {message && (
          <p className={`mt-2 ${message.includes("succès") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}

        {/* Bouton de soumission */}
        <button
          type="submit"
          disabled={uploading || files.length === 0}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {uploading ? "Téléversement en cours..." : "Téléverser les documents"}
        </button>
      </form>
    </div>
  );
};

export default UploadDocumentComponent;
