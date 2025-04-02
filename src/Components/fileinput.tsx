import React, { useState } from 'react';

type FileInputProps = {
  label: string;
  name: string;
  onChange: (file: File | null) => void;
};

const FileInput: React.FC<FileInputProps> = ({ label, name, onChange }) => {
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFileName(file ? file.name : '');
    onChange(file);
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} <span className='text-red-600 font-bold'>*</span>
      </label>
      <input
        type="file"
        id={name}
        name={name}
        className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        onChange={handleFileChange}
      />
      {fileName && <p className="mt-2 text-sm text-gray-500">Fichier sélectionné : {fileName}</p>}
    </div>
  );
};

export default FileInput;
