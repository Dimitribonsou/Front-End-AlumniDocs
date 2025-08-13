import React, { useState } from "react";
import Sidebar from "../../Components/Siderbar";
import Navbar_admin from "../../Components/Navbar_admin";

const Promotions = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Alice Dupont", promotion: "2023-2024", classe: "CSI3 DLW", admis: false, redoublant: false },
    { id: 2, name: "Jean Martin", promotion: "2023-2024", classe: "CSI3 DLW", admis: true, redoublant: false },
    { id: 3, name: "Claire Bernard", promotion: "2022-2023", classe: "3IL2", admis: false, redoublant: true },
  ]);

  const [filterPromotion, setFilterPromotion] = useState("");
  const [filterClasse, setFilterClasse] = useState("");

  const handleCheckboxChange = (id: number, field: "admis" | "redoublant") => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, [field]: !student[field] } : student
      )
    );
  };

  const filteredStudents = students.filter(
    (student) =>
      (filterPromotion === "" || student.promotion === filterPromotion) &&
      (filterClasse === "" || student.classe === filterClasse)
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        {/* Navbar */}
        <Navbar_admin />

        {/* Contenu de la page */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#161B70] mb-6">Gestion des Étudiants par Promotion</h1>

          {/* Filtres */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-4">Filtres</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
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
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Classe</label>
                <select
                  className="w-full border border-gray-300 p-2 rounded"
                  value={filterClasse}
                  onChange={(e) => setFilterClasse(e.target.value)}
                >
                  <option value="">Toutes les classes</option>
                  <option value="CSI3 DLW">CSI3 DLW</option>
                  <option value="3IL2">3IL2</option>
                </select>
              </div>
            </div>
          </div>

          {/* Liste des étudiants */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Liste des Étudiants</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-[#161B70] text-white">
                  <th className="border border-gray-300 p-2 text-left">#</th>
                  <th className="border border-gray-300 p-2 text-left">Nom</th>
                  <th className="border border-gray-300 p-2 text-left">Promotion</th>
                  <th className="border border-gray-300 p-2 text-left">Classe</th>
                  <th className="border border-gray-300 p-2 text-center">Admis</th>
                  <th className="border border-gray-300 p-2 text-center">Redoublant</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{student.id}</td>
                    <td className="border border-gray-300 p-2">{student.name}</td>
                    <td className="border border-gray-300 p-2">{student.promotion}</td>
                    <td className="border border-gray-300 p-2">{student.classe}</td>
                    <td className="border border-gray-300 p-2 text-center">
                      <input
                        type="checkbox"
                        checked={student.admis}
                        onChange={() => handleCheckboxChange(student.id, "admis")}
                      />
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      <input
                        type="checkbox"
                        checked={student.redoublant}
                        onChange={() => handleCheckboxChange(student.id, "redoublant")}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;