import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Siderbar";
import Navbar_admin from "../../Components/Navbar_admin";
import constant from "../../data/constant";
import { StudentType } from "../../types/StudentType";

// Définition des types pour les étudiants et les documents
interface Student {
  id: number;
  matricule: string;
  nom: string;
  prenom: string;
  tel: string;
  email: string;
  promotion: string;
  classe: string;
  documents: string[];
}

const Etudiants: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  useEffect(() => {
    fetch('your_endpoint_here')
      .then(response => response.json())
      .then(data => setStudents(data));
  }, []);

  const [filterClasse, setFilterClasse] = useState<number>();
  const [selectedStudent, setSelectedStudent] = useState<StudentType | null>(null);
  // liste des classes existante 
  const [listClass, setClasseListe]=useState([]);
  const [listEtudiant, setListEtudiant]=useState<StudentType[]>([]);
  
  useEffect(()=>{
    getClasse();
    getClassEtudiant();
  },[]);
  useEffect(()=>{
    getClassEtudiant();
  },[filterClasse]);
  const filteredStudents = listEtudiant.filter(
    (student) =>
      !filterClasse || student.id_classe === filterClasse
  );
const getClasse= async ()=>{
  const response =   await fetch(`${constant.host}/AlumniDocs-API/ClassList`);                                                                                                                                
  if(response.ok)
  {
    //mettre a jour la liste des classe
     setClasseListe(await response.json());
  }
  else
  {
     console.log("erreur lors de la recuperation de la classe");
  }
}
const getClassEtudiant= async ()=>{
  const response = await fetch(`${constant.host}/AlumniDocs-API/studenClass`);
  if(response.ok)
  {
    const data=await response.json();
    //mettre a jour la liste des classe
    setListEtudiant(data);
    console.log(data);
    
  }
  else
  {
    alert("Error !")
     console.log("erreur lors de la recuperation de la liste des etudiant");
  }
}
  const handleExportPDF = () => {
    alert("Exportation de la liste des étudiants au format PDF...");
    // Implémentez ici la logique pour générer un fichier PDF
  };

  const handleExportCSV = () => {
    alert("Exportation de la liste des étudiants au format CSV...");
    // Implémentez ici la logique pour générer un fichier CSV
  };



  const handleDownloadZip = () => {
    alert("Téléchargement des documents de tous les étudiants en tant que dossier ZIP...");
    // Implémentez ici la logique pour générer un fichier ZIP
  };

  const handleViewDocuments = (student: StudentType) => {
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  const handleViewEffectifs = () => {
    alert("Affichage des effectifs en fonction du genre...");
    // Implémentez ici la logique pour afficher les effectifs par genre
  };

  return (
    <div className="flex ">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        {/* Navbar */}
        <Navbar_admin />

        {/* Contenu de la page */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#161B70] mb-6">Gestion des Étudiants</h1>

          {/* Filtres */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-4">Filtres</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Promotion</label>
                <select
                  className="w-full border border-gray-300 p-2 rounded"
                  value={filterPromotion}
                  onChange={(e) => setFilterPromotion(e.target.value)}
                >
                  <option value="">Toutes les promotions</option>
                  <option value="2023-2024">2023-2024</option>
                  <option value="2022-2023">2022-2023</option>
                </select>
              </div> */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Classe</label>
                <select
                  className="w-full border border-gray-300 p-2 rounded"
                  value={filterClasse}
                  onChange={(e) => setFilterClasse(Number(e.target.value))}
                >
                  <option value="">Aucune</option>
                    {/* afficher la liste des classes  */}
                    {listClass.map((classe:any) => (
                              <option key={classe.id_classe} value={classe.id_classe}>{classe.libelle}</option>
                        ))}
                </select>
              </div>
            </div>
            {/* <div className="mt-4">
              <a
                href="#"
                onClick={handleViewEffectifs}
                className="text-blue-500 hover:underline"
              >
                Voir les effectifs par genre
              </a>
            </div> */}
          </div>

          {/* Actions globales */}
          {filterClasse && (
            <>
              <div className="flex justify-end gap-4 mb-6">
                <button
                  onClick={handleExportPDF}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Exporter PDF
                </button>
                <button
                  onClick={handleExportCSV}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Exporter CSV
                </button>
                {/* <button
                  onClick={handleDownloadZip}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Télécharger Documents.zip
                </button> */}
              </div>

              {/* Liste des étudiants */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Liste des Étudiants</h2>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-2 text-left">Matricule</th>
                      <th className="border border-gray-300 p-2 text-left">Nom</th>
                      <th className="border border-gray-300 p-2 text-left">Prénom</th>
                      <th className="border border-gray-300 p-2 text-left">Téléphone</th>
                      <th className="border border-gray-300 p-2 text-left">Email</th>
                      <th className="border border-gray-300 p-2 text-left">Genre</th>
                      <th className="border border-gray-300 p-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id_etudiant} className="hover:bg-gray-100">
                        <td className="border border-gray-300 p-2">{student.matricule}</td>
                        <td className="border border-gray-300 p-2">{student.nom}</td>
                        <td className="border border-gray-300 p-2">{student.prenom}</td>
                        <td className="border border-gray-300 p-2">{student.telephone}</td>
                        <td className="border border-gray-300 p-2">{student.email}</td>
                        <td className="border border-gray-300 p-2">{student.genre}</td>
                        <td className="border border-gray-300 p-2 text-center">
                          <button
                            onClick={() => handleViewDocuments(student)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          >
                            Voir Documents
                          </button>
                          <a
                          href={`/admin/detail-etudiant/${student.id_etudiant}`}
                           className="ml-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 inline-block"
                          style={{ textDecoration: "none" }}
                          >
                           Détails
                          </a>
                        </td>
                      </tr>
                    ))}
                    {filteredStudents.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center text-gray-500 p-3">
                          Aucun étudiant trouvé.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal pour afficher les documents */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Documents de {selectedStudent.nom} {selectedStudent.prenom}</h2>
            <ul className="mb-4">
              {selectedStudent.documents.map((doc, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  <span>{doc}</span>
                  <a
                    href={`#`} // Remplacez par le lien de téléchargement réel
                    download={doc}
                    className="text-blue-500 hover:underline"
                  >
                    Télécharger
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Etudiants;