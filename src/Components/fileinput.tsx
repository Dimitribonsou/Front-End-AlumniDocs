import React, { useState } from 'react';

type FileInputProps = {
  label: string;
  name: string;
  onChange: (file: File | null) => void;
  required?: boolean; // Ajout d'une propriété pour indiquer si le champ est obligatoire
};

const FileInput: React.FC<FileInputProps> = ({ label, name, onChange, required = false }) => {
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFileName(file ? file.name : '');
    onChange(file);
  };

  return (
    <div className="mb-4 w-full max-w-sm mx-auto h-10"> {/* Hauteur définie ici */}
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
      {fileName && (
        <p className="mt-2 text-sm text-gray-500 sm:text-base md:text-lg">
          Fichier sélectionné : <span className="font-semibold">{fileName}</span>
        </p>
      )}
    </div>
  );
};

export default FileInput;