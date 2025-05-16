import React, { useState } from 'react';

type FileInputProps = {
  label: string;
  name: string;
  onChange: (file: File | null) => void;
  required?: boolean;
};

const FileInput: React.FC<FileInputProps> = ({ label, name, onChange, required = false }) => {
  const [fileName, setFileName] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFileName(file ? file.name : '');
    setSelectedFile(file);
    onChange(file);
  };

  const handleSend = () => {
    if (selectedFile) {
      // Ajoute ici ta logique d'envoi réelle
      alert(`Fichier "${selectedFile.name}" envoyé !`);
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
            className="mt-1  w-full px-4 py-1 bg-[#161B70] text-white rounded hover:bg-blue-700 text-sm"
          >
            Envoyer
          </button>
        </div>
      
  );
};

export default FileInput;