import React, { useState } from "react";
import Sidebar from "../../Components/Siderbar";
import Navbar_admin from "../../Components/Navbar_admin";

interface Administrateur {
  id: number;
  nom: string;
  email: string;
  role: string;
}

const AdministrateurPage: React.FC = () => {
  const [administrateurs, setAdministrateurs] = useState<Administrateur[]>([
    { id: 1, nom: "Jean-Pierre Ngono", email: "jean.ngono@admin.com", role: "Super Admin" },
    { id: 2, nom: "Marie Mballa", email: "marie.mballa@admin.com", role: "Admin" },
    { id: 3, nom: "Pauline Ewane", email: "pauline.ewane@admin.com", role: "Admin" },
  ]);

  const [newAdmin, setNewAdmin] = useState<Administrateur>({
    id: 0,
    nom: "",
    email: "",
    role: "Admin",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAdmin = () => {
    if (newAdmin.nom && newAdmin.email) {
      setAdministrateurs((prev) => [
        ...prev,
        { ...newAdmin, id: prev.length + 1 },
      ]);
      setNewAdmin({ id: 0, nom: "", email: "", role: "Admin" });
      setIsModalOpen(false);
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const handleDeleteAdmin = (id: number) => {
    setAdministrateurs((prev) => prev.filter((admin) => admin.id !== id));
  };

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
          <h1 className="text-2xl font-bold text-[#161B70] mb-6">Gestion des Administrateurs</h1>

          {/* Liste des administrateurs */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Liste des Administrateurs</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2 text-left">Nom</th>
                  <th className="border border-gray-300 p-2 text-left">Email</th>
                  <th className="border border-gray-300 p-2 text-left">Rôle</th>
                  <th className="border border-gray-300 p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {administrateurs.map((admin) => (
                  <tr key={admin.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{admin.nom}</td>
                    <td className="border border-gray-300 p-2">{admin.email}</td>
                    <td className="border border-gray-300 p-2">{admin.role}</td>
                    <td className="border border-gray-300 p-2 text-center">
                      <button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
                {administrateurs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-500 p-3">
                      Aucun administrateur trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Ajouter un administrateur
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour ajouter un administrateur */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Ajouter un Administrateur</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value={newAdmin.nom}
                onChange={(e) => setNewAdmin({ ...newAdmin, nom: e.target.value })}
                placeholder="Entrez le nom"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 p-2 rounded"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                placeholder="Entrez l'email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rôle</label>
              <select
                className="w-full border border-gray-300 p-2 rounded"
                value={newAdmin.role}
                onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
              >
                <option value="Admin">Admin</option>
                <option value="Super Admin">Super Admin</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={handleAddAdmin}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdministrateurPage;