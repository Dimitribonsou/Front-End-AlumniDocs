import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Siderbar";
import Navbar_admin from "../../Components/Navbar_admin";
import constant from "../../data/constant";
import { StudentType } from "../../types/StudentType";

// Définition des types pour les étudiants et les documents
interface Student {

  id_etudiant: number;
  matricule: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  promotion: string;
  classe: string;
  documents: string[];
}

const EXEMPLES_ETUDIANTS: StudentType[] = [
  { id_etudiant: 34, matricule: "ETU001", nom: "Ngono", prenom: "Jean-Pierre", telephone: "655123456", email: "jean.ngono@gmail.com", annee_scolaire: "2023-2024", classe: "CSI3 DLW", documents: "doc1.pdf,doc2.pdf" },
  { id_etudiant: 2, matricule: "ETU002", nom: "Mballa", prenom: "Marie", telephone: "654987321", email: "marie.mballa@gmail.com", annee_scolaire: "2023-2024", classe: "CSI3 DLW", documents: "doc3.pdf"},
  { id_etudiant: 3, matricule: "ETU003", nom: "Ewane", prenom: "Pauline", telephone: "653456789", email: "pauline.ewane@gmail.com", annee_scolaire: "2022-2023", classe: "3IL2", documents: "doc4.pdf, doc5.pdf" },
  { id_etudiant: 4, matricule: "ETU004", nom: "Mbarga", prenom: "Alain", telephone: "652111222", email: "alain.mbarga@gmail.com", annee_scolaire: "2023-2024", classe: "3IL2", documents: "doc6.pdf" },
  { id_etudiant: 5, matricule: "ETU005", nom: "Nkou", prenom: "Sophie", telephone: "651333444", email: "sophie.nkou@gmail.com", annee_scolaire: "2022-2023", classe: "CSI3 DLW", documents: "doc7.pdf" },
  { id_etudiant: 6, matricule: "ETU006", nom: "Tchoua", prenom: "Lucien", telephone: "650222333", email: "lucien.tchoua@gmail.com", annee_scolaire: "2023-2024", classe: "CSI3 DLW", documents: "doc8.pdf" },
  { id_etudiant: 7, matricule: "ETU007", nom: "Nomo", prenom: "Brigitte", telephone: "655444555", email: "brigitte.nomo@gmail.com", annee_scolaire: "2022-2023", classe: "3IL2", documents: "doc9.pdf" },
  { id_etudiant: 8, matricule: "ETU008", nom: "Zambo", prenom: "Fabrice", telephone: "654666777", email: "fabrice.zambo@gmail.com", annee_scolaire: "2023-2024", classe: "CSI3 DLW", documents: "doc10.pdf" },
  { id_etudiant: 9, matricule: "ETU009", nom: "Foko", prenom: "Claire", telephone: "653888999", email: "claire.foko@gmail.com", annee_scolaire: "2022-2023", classe: "3IL2", documents: "doc11.pdf" },
  { id_etudiant: 10, matricule: "ETU010", nom: "Ebogo", prenom: "Serge", telephone: "652000111", email: "serge.ebogo@gmail.com", annee_scolaire: "2023-2024", classe: "CSI3 DLW", documents: "doc12.pdf" },
];

const PAGE_SIZE = 5;

const Etudiants: React.FC = () => {
  const [students, setStudents] = useState<StudentType[]>(EXEMPLES_ETUDIANTS);
  const [filterPromotion, setFilterPromotion] = useState<string>("");
  const [filterClasse, setFilterClasse] = useState<string>("");
  const [ClasseList, setClasseList] = useState([]);
  const [PromotionList, setPromotionList] = useState([]);
  const [search, setSearch] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<StudentType | null>(null);

  // Filtrage et recherche
  const filteredStudents = students.filter(
    (student) =>
      (filterPromotion === "" || student.annee_scolaire === filterPromotion) &&
      (filterClasse === "" || student.classe === filterClasse) &&
      (
        student.nom!.toLowerCase().includes(search.toLowerCase()) ||
        student.prenom!.toLowerCase().includes(search.toLowerCase()) ||
        student.email!.toLowerCase().includes(search.toLowerCase()) ||
        student.matricule!.toLowerCase().includes(search.toLowerCase())
      )
  );

  // fonction pour  afficher la liste des classes
const getClasse= async ()=>{
  const response = await fetch(`${constant.host}/AlumniDocs-API/ClassList`);
  if(response.ok)
  {
    //mettre a jour la liste des classe
     setClasseList(await response.json());
  }
  else
  {
     console.log("erreur lors de la recuperation de la classe");
  }
}
  // fonction pour  afficher la liste des promotions
const getPromotion= async ()=>{
  const response = await fetch(`${constant.host}/AlumniDocs-API/PromotionList`);
  if(response.ok)
  {
    //mettre a jour la liste des classe
     setPromotionList(await response.json());
  }
  else
  {
     console.log("erreur lors de la recuperation de la classe");
  }
}
const getAllStudent= async ()=>{
  const response = await fetch(`${constant.host}/AlumniDocs-API/UserList`);
  if(response.ok)
  {
    //mettre a jour la liste des classe
     setStudents(await response.json());
  }
  else
  {
     console.log("erreur lors de la recuperation de la classe");
  }
}
// appeler la fonction getClasse a chaque fois que la page est recharger
useEffect(()=>{
  getClasse();
  getPromotion();
  getAllStudent();
},[])
  // Pagination
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredStudents.length / PAGE_SIZE);
  const studentsToShow = filteredStudents.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleExportPDF = () => {
    alert("Exportation de la liste des étudiants au format PDF...");
  };

  const handleExportCSV = () => {
    alert("Exportation de la liste des étudiants au format CSV...");
  };



  const handleDownloadZip = () => {
    alert("Téléchargement des documents de tous les étudiants en tant que dossier ZIP...");
  };

  const handleViewDocuments = (student: StudentType) => {
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  const handleViewEffectifs = () => {
    alert("Affichage des effectifs en fonction du genre...");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        {/* Navbar */}
        <Navbar_admin />

        {/* Contenu de la page */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#161B70] mb-6">Gestion des Étudiants</h1>

          {/* Filtres et barre de recherche */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-4">Filtres</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Promotion</label>
                <select
                  className="w-full border border-gray-300 p-2 rounded"
                  value={filterPromotion}
                  onChange={(e) => { setFilterPromotion(e.target.value); setPage(1); }}
                >
                  <option value="">Sélectionnez une promotion</option>
                  {PromotionList.map((promotion:any) => (
                              <option key={promotion.annee_scolaire} value={promotion.annee_scolaire}>{promotion.annee_scolaire}</option>
                        ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Classe</label>
                  <select
                  className="w-full border border-gray-300 p-2 rounded"
                  value={filterClasse}
                 onChange={(e) => { setFilterClasse(e.target.value); setPage(1); }}
                >
                  <option value="">Sélectionnez un classe</option>
                  {ClasseList.map((classe:any) => (
                              <option key={classe.id_classe} value={classe.libelle}>{classe.libelle}</option>
                        ))}
                </select>
                {/* <select
                  className="w-full border border-gray-300 p-2 rounded"
                  value={filterClasse}
                  onChange={(e) => { setFilterClasse(e.target.value); setPage(1); }}
                >
                  <option value="">Toutes les classes</option>
                  <option value="CSI3 DLW">CSI3 DLW</option>
                  <option value="3IL2">3IL2</option>
                </select> */}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recherche</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Nom, prénom, email, matricule..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                />
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
          {(filterClasse !== "" || filterPromotion !== "" || search !== "") && (
            <div className="flex justify-end gap-4 mb-6">
              <button
                onClick={handleExportPDF}
                className="bg-[#161B70]  text-white px-4 py-2 rounded "
              >
                Exporter PDF
              </button>
              <button
                onClick={handleExportCSV}
                className="bg-red-600 text-white px-4 py-2 rounded "
              >
                Exporter CSV
              </button>
              <button
                onClick={handleDownloadZip}
                className="bg-[#161B70]  text-white px-4 py-2 rounded "
              >
                 Documents.zip
              </button>
            </div>
          )}

          {/* Liste des étudiants */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Liste des Étudiants</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-[#161B70] text-white">
                    <th className="border border-gray-300 p-2 text-left">Matricule</th>
                    <th className="border border-gray-300 p-2 text-left">Nom</th>
                    <th className="border border-gray-300 p-2 text-left">Prénom</th>
                    <th className="border border-gray-300 p-2 text-left">Téléphone</th>
                    <th className="border border-gray-300 p-2 text-left">Email</th>
                    <th className="border border-gray-300 p-2 text-left">Promotion</th>
                    <th className="border border-gray-300 p-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsToShow.map((student) => (
                    <tr key={student.id_etudiant} className="hover:bg-gray-100">
                      <td className="border border-gray-300 p-2">{student.matricule}</td>
                      <td className="border border-gray-300 p-2">{student.nom}</td>
                      <td className="border border-gray-300 p-2">{student.prenom}</td>
                      <td className="border border-gray-300 p-2">{student.telephone}</td>
                      <td className="border border-gray-300 p-2">{student.email}</td>
                      <td className="border border-gray-300 p-2">{student.annee_scolaire}</td>
                      <td className="border border-gray-300 p-2 text-center">
                        <button
                          onClick={() => handleViewDocuments(student)}
                          className="bg-[#161B70] text-white-500 text-white px-3 py-1 rounded hover:opacity-80"
                        >
                          Docs
                        </button>
                        <a
                          href={`/admin/detail-etudiant/${student.id_etudiant}`}
                          className="ml-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 inline-block"
                          style={{ textDecoration: "none" }}
                        >
                          Détails
                        </a>
                      </td>
                    </tr>
                  ))}
                  {studentsToShow.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center text-gray-500 p-3">
                        Aucun étudiant trouvé.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <div>
                Page {page} sur {totalPages}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Précédent
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour afficher les documents */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-[40%]">
            <h2 className="text-xl font-bold mb-4">Documents de <strong className="capitalize text-red-600">{selectedStudent.nom} {selectedStudent.prenom}</strong></h2>
            <ul className="mb-4">
              {selectedStudent.documents.trim() === "" ? (
                <li className="text-gray-500">Documents non soumis</li>
              ) : (
                selectedStudent.documents.split(',').map((doc, index) => (
                  <li key={index} className="flex justify-between items-center mb-2">
                    <span>{doc.trim().length>40 ? doc.trim().substring(0,35).concat(" ...") : doc.trim()} </span>
                    <a
                      href={`${constant.doc_path}/${doc.trim()}`}
                      download={doc.trim()}
                      className="text-[#161B70] hover:underline"
                      target="_blank" rel="noopener noreferrer"
                    >
                      Télécharger
                    </a>
                  </li>
                ))
              )}
            </ul>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-red-600 text-white px-4 py-2 rounded hover:opacity-80"
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