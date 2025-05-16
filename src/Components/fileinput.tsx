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
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [isTooBig, setIsTooBig] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFileName(file ? file.name : '');
    setSelectedFile(file);
    onChange(file);

    if (file && file.size > 1024 * 1024) {
      setSuccessMsg("Fichier est supérieur à 1 Mo !");
      setIsTooBig(true);
    } else {
      setSuccessMsg("");
      setIsTooBig(false);
    }
  };

  const handleSend = () => {
    if (selectedFile && !isTooBig) {
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
        className={`mt-1 w-full px-4 py-1 rounded text-sm ${
          isTooBig || !selectedFile
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#161B70] text-white hover:bg-blue-700"
        }`}
        disabled={isTooBig || !selectedFile}
      >
        Envoyer
      </button>
      {successMsg && (
        <div className="mt-2 px-2 py-1 bg-red-700 text-white rounded text-xs text-center border border-red-700">
          {successMsg}
        </div>
      )}
    </div>
  );
};

export default FileInput;