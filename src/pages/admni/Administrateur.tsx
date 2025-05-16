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
};
 const handleDeleteAdmin= async(id_user:any)=>{
  try {
    const response = await fetch(`${constant.host}/AlumniDocs-API/deleteAdmin/${id_user}`, {
      method: 'DELETE',
    });
    if(!response.ok)
    {
       console.log("erreur lors de la suppression de L'admin")
    }
    console.log(await response.text())
    getAdmin();
   
  } catch (error) {
    console.log("Une erreur est survenue : "+error)
  }
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
                  <th className="border border-gray-300 p-2 text-left">Telephone</th>
                  <th className="border border-gray-300 p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminList.map((admin:any) => (
                  <tr key={admin.id_utilisateur} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{admin.nom}</td>
                    <td className="border border-gray-300 p-2">{admin.email}</td>
                    <td className="border border-gray-300 p-2">{admin.telephone}</td>
                    <td className="border border-gray-300 p-2 text-center">
                      <button
                        onClick={() => handleDeleteAdmin(admin.id_utilisateur)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
                {adminList.length === 0 && (
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
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
              type="button"
                onClick={handleSubmit}
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