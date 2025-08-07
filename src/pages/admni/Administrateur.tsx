import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Siderbar";
import Navbar_admin from "../../Components/Navbar_admin";
import constant from "../../data/constant";

interface Administrateur {
  id: number;
  nom: string;
  email: string;
  role: string;
}

const EXEMPLES_ADMINS: Administrateur[] = [
  { id: 1, nom: "Jean-Pierre Ngono", email: "jean.ngono@admin.com", role: "Super Admin" },
  { id: 2, nom: "Marie Mballa", email: "marie.mballa@admin.com", role: "Admin" },
  { id: 3, nom: "Pauline Ewane", email: "pauline.ewane@admin.com", role: "Admin" },
  { id: 4, nom: "Alain Mbarga", email: "alain.mbarga@admin.com", role: "Admin" },
  { id: 5, nom: "Sophie Nkou", email: "sophie.nkou@admin.com", role: "Super Admin" },
  { id: 6, nom: "Lucien Tchoua", email: "lucien.tchoua@admin.com", role: "Admin" },
  { id: 7, nom: "Brigitte Nomo", email: "brigitte.nomo@admin.com", role: "Admin" },
  { id: 8, nom: "Fabrice Zambo", email: "fabrice.zambo@admin.com", role: "Admin" },
  { id: 9, nom: "Claire Foko", email: "claire.foko@admin.com", role: "Admin" },
  { id: 10, nom: "Serge Ebogo", email: "serge.ebogo@admin.com", role: "Admin" },
  { id: 11, nom: "Nadine Mvondo", email: "nadine.mvondo@admin.com", role: "Super Admin" },
  { id: 12, nom: "Hervé Ngassa", email: "herve.ngassa@admin.com", role: "Admin" },
];

const PAGE_SIZE = 5;

const AdministrateurPage: React.FC = () => {
  const [administrateurs, setAdministrateurs] = useState<Administrateur[]>(EXEMPLES_ADMINS);
  const [newAdmin, setNewAdmin] = useState<Administrateur>({
    id: 0,
    nom: "",
    email: "",
    role: "Admin",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminList, setAdminListe] = useState([]);
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [codeaccess, setCodeAccess] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Tous");
    //renitialiser le contenu du formulaire
    const resetFormData= ()=>{
      setEmail("");
      setNom("");
      setPrenom("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setGender("");
      }
        // fonction pour  afficher la liste des classes
  const getAdmin= async ()=>{
    const response = await fetch(`${constant.host}/AlumniDocs-API/AdminList`);
    if(response.ok)
    {
      //mettre a jour la liste des classe
       setAdminListe(await response.json());
    }
    else
    {
       console.log("erreur lors de la recuperation de la classe");
    }
  }
useEffect(()=>{
  getAdmin();
},[])


const handleSubmit = async () => {
  // if (!isFormValid) return;
    // recuperer les donnees saisi dans le formulaire
    const data = {
      nom: nom,
      prenom: prenom,
      email: email,
      telephone: phone,
      password: password,
      genre: gender,
      code_access:codeaccess,
    };
    try {
      const response = await fetch(`${constant.host}/AlumniDocs-API/NewAdmin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('la reponse du serveur est pas correct.');
      }
      const result = await response.text();
      console.log(result);
      // mettre a jour le message retourner par le serveur
      setServerMessage(result);
      // renitialiser les champs du formulaire et rediriger vers le formulaire de cob
      resetFormData();
      // Handle success as needed
    } catch (error) {
      console.log('There was a problem with the fetch operation:', error);
      // Handle error as needed
    }
}


  // Filtrage et recherche
  const filteredAdmins = administrateurs.filter((admin) => {
    const matchSearch =
      admin.nom.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "Tous" || admin.role === roleFilter;
    return matchSearch && matchRole;
  });

  // Pagination
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredAdmins.length / PAGE_SIZE);
  const adminsToShow = filteredAdmins.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // const handleAddAdmin = () => {
  //   if (newAdmin.nom && newAdmin.email) {
  //     setAdministrateurs((prev) => [
  //       ...prev,
  //       { ...newAdmin, id: prev.length + 1 },
  //     ]);
  //     setNewAdmin({ id: 0, nom: "", email: "", role: "Admin" });
  //     setIsModalOpen(false);
  //   } else {
  //     alert("Veuillez remplir tous les champs.");
  //   }

 const handleDeleteAdmin= async()=>{
  try {
        const response = await fetch(`${constant.host}/AlumniDocs-API/deleteAdmin/${adminToDelete}`, {
          method: 'DELETE',
        });
        if(!response.ok)
        {
          console.log("erreur lors de la suppression de L'admin")
        }
        console.log(await response.text())
        setShowConfirmDialog(false);
        getAdmin();
    
    } catch (error) {
      console.log("Une erreur est survenue : "+error)
    }
 }

 const handleDeleteClick = (id_admin: number) => {
  setAdminToDelete(id_admin);
  setShowConfirmDialog(true);
};
const handleCancelDelete = () => {
  setShowConfirmDialog(false);
  setAdminToDelete(null);
};

  return (

    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        {/* Navbar */}
        <Navbar_admin />

        {/* Contenu de la page */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#161B70] mb-6">Gestion des Administrateurs</h1>

          {/* Barre de recherche et filtres */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-2 mb-4">
            <input
              type="text"
              placeholder="Rechercher par nom ou email..."
              className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/3"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <select
              className="border border-gray-300 rounded px-3 py-2 w-full md:w-48"
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="Tous">Tous les rôles</option>
              <option value="Admin">Admin</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>

          {/* Liste des administrateurs */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Liste des Administrateurs</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2 text-left">Nom</th>
                    <th className="border border-gray-300 p-2 text-left">Email</th>
                    <th className="border border-gray-300 p-2 text-left">Rôle</th>
                    <th className="border border-gray-300 p-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminsToShow.map((admin) => (
                    <tr key={admin.id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 p-2 whitespace-nowrap">{admin.nom}</td>
                      <td className="border border-gray-300 p-2 whitespace-nowrap">{admin.email}</td>
                      <td className="border border-gray-300 p-2 whitespace-nowrap">{admin.role}</td>
                      <td className="border border-gray-300 p-2 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteClick(admin.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                  {adminsToShow.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center text-gray-500 p-3">
                        Aucun administrateur trouvé.
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
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#161B70] text-white px-4 py-2 rounded hover:opacity-80"
              >
                Ajouter 
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour ajouter un administrateur */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 w-screen flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-1/2">
            <h2 className="text-xl font-bold mb-4">Ajouter un Administrateur</h2>
            {serverMessage && (
          <div className="w-full mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded text-center border border-gray-300">
            {serverMessage}
          </div>
        )}
            <div className="flex flex-col md:flex-row gap-2 justy-center items-center w-full  px-2">
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Entrez le nom"
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">Prenom</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  placeholder="Entrez le Prenom"
                />
              </div>
            </div>
            <div className="flex  flex-col md:flex-row gap-2 justy-center items-center w-full ">
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={email}
                  onChange={(e) => setEmail( e.target.value )}
                  placeholder="Entrez l'email"
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">Telephone</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={phone}
                  onChange={(e) => setPhone( e.target.value )}
                  placeholder="Entrez le numero de telephone"
                />
              </div>
            </div>
            <div className="flex  flex-col md:flex-row gap-2 justy-center items-center w-full ">
                <div className="mb-4 w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword( e.target.value )}
                    placeholder="Entrez le code d'access"
                  />
                </div>
                <div className="mb-4 w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">genre</label>
                  <select
                    className="w-full border border-gray-300 p-2 rounded"
                    value={gender}
                    onChange={(e) => setGender(e.target.value )}
                  >
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                  </select>
                </div>
            </div>
            <div className="flex  flex-col md:flex-row gap-2 justy-center items-center w-full ">
                <div className="mb-4 w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Code d'access</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded"
                    value={codeaccess}
                    onChange={(e) => setCodeAccess( e.target.value )}
                    placeholder="Entrez le code d'access"
                  />
                </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:opacity-80"
              >
                Annuler
              </button>
              <button
              type="button"
                onClick={handleSubmit}
                className="bg-[#161B70] text-white px-4 py-2 rounded hover:opacity-80"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
            {/* Boîte de dialogue de confirmation */}
            {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Confirmation de suppression</h3>
            <p className="mb-6">Voulez-vous vraiment supprimer cette annonce ?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-[#161B70] text-white rounded hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteAdmin}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdministrateurPage;