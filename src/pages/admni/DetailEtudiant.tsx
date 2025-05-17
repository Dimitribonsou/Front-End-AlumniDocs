import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../Components/Siderbar";
import Navbar_admin from "../../Components/Navbar_admin";
import Footer from "../../Components/footer";

// Type pour les infos étudiant
type InfosEtudiant = {
  civilite: string;
  nom: string;
  nomMarital?: string;
  prenom: string;
  email: string;
  telephone: string;
  nationalite: string;
  dateNaissance: string;
  regionNaissance: string;
  lieuNaissance: string;
  departementNaissance: string;
  quartier: string;
  anneeAcademique: string;
  matricule: string;
  classe: string;
  bac: string;
  anneeObtentionBac: string;
  diplomeEntree: string;
  anneeObtentionDiplome: string;
  nomPere: string;
  telPere: string;
  emailPere: string;
  professionPere: string;
  nomMere: string;
  telMere: string;
  emailMere: string;
  professionMere: string;
};

const renderLabel = (text: string) => (
  <label className="block mb-1 text-sm font-medium text-gray-700">{text}</label>
);

export default function DetailEtudiant() {
  const { id } = useParams<{ id: string }>();
  const [infos, setInfos] = useState<InfosEtudiant | null>(null);

  useEffect(() => {
    // Remplace ceci par un appel API réel
    async function fetchEtudiant() {
      // const res = await fetch(`/api/etudiants/${id}`);
      // const data = await res.json();
      // setInfos(data);

      // MOCK :
      setInfos({
        civilite: "Mr",
        nom: "Doe",
        nomMarital: "",
        prenom: "John",
        email: "john.doe@email.com",
        telephone: "699999999",
        nationalite: "Camerounaise",
        dateNaissance: "2000-01-01",
        regionNaissance: "Centre",
        lieuNaissance: "Yaoundé",
        departementNaissance: "Mfoundi",
        quartier: "Bastos",
        anneeAcademique: "2024-2025",
        matricule: "123456",
        classe: "CSI3 DLW",
        bac: "Scientifique",
        anneeObtentionBac: "2018",
        diplomeEntree: "Bac C",
        anneeObtentionDiplome: "2018",
        nomPere: "Paul Doe",
        telPere: "677000000",
        emailPere: "paul.doe@email.com",
        professionPere: "Ingénieur",
        nomMere: "Marie Doe",
        telMere: "699000000",
        emailMere: "marie.doe@email.com",
        professionMere: "Comptable",
      });
    }
    fetchEtudiant();
  }, [id]);

  if (!infos) {
    return (
      <div className="flex min-h-screen bg-watermark">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-gray-100 min-h-screen">
          <Navbar_admin />
          <div className="w-full max-w-4xl mx-auto p-6 mt-4 bg-white shadow-md rounded-xl text-center">
            <span className="text-gray-500">Chargement...</span>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-watermark">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-100 min-h-screen">
        <Navbar_admin />
        <div className="w-full max-w-4xl mx-auto p-6 mt-4 bg-white shadow-md rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Détails de l'étudiant</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Infos personnelles */}
            <div>
              <h3 className="font-semibold mb-2 text-[#161B70]">Informations personnelles</h3>
              {renderLabel("Civilité")}
              <div>{infos.civilite}</div>
              {renderLabel("Nom")}
              <div>{infos.nom}</div>
              {renderLabel("Nom marital")}
              <div>{infos.nomMarital}</div>
              {renderLabel("Prénom")}
              <div>{infos.prenom}</div>
              {renderLabel("Email")}
              <div>{infos.email}</div>
              {renderLabel("Téléphone")}
              <div>{infos.telephone}</div>
              {renderLabel("Nationalité")}
              <div>{infos.nationalite}</div>
              {renderLabel("Date de naissance")}
              <div>{infos.dateNaissance}</div>
              {renderLabel("Région de naissance")}
              <div>{infos.regionNaissance}</div>
              {renderLabel("Lieu de naissance")}
              <div>{infos.lieuNaissance}</div>
              {renderLabel("Département de naissance")}
              <div>{infos.departementNaissance}</div>
              {renderLabel("Quartier")}
              <div>{infos.quartier}</div>
            </div>
            {/* Infos académiques */}
            <div>
              <h3 className="font-semibold mb-2 text-[#161B70]">Informations académiques</h3>
              {renderLabel("Année académique")}
              <div>{infos.anneeAcademique}</div>
              {renderLabel("Matricule")}
              <div>{infos.matricule}</div>
              {renderLabel("Classe")}
              <div>{infos.classe}</div>
              {renderLabel("Baccalauréat")}
              <div>{infos.bac}</div>
              {renderLabel("Année d'obtention du Bac")}
              <div>{infos.anneeObtentionBac}</div>
              {renderLabel("Diplôme d'entrée")}
              <div>{infos.diplomeEntree}</div>
              {renderLabel("Année d'obtention du diplôme")}
              <div>{infos.anneeObtentionDiplome}</div>
            </div>
            {/* Infos parents */}
            <div className="md:col-span-2 mt-6">
              <h3 className="font-semibold mb-2 text-[#161B70]">Informations des parents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  {renderLabel("Nom du père ou tuteur")}
                  <div>{infos.nomPere}</div>
                  {renderLabel("Téléphone du père ou tuteur")}
                  <div>{infos.telPere}</div>
                  {renderLabel("Email du père ou tuteur")}
                  <div>{infos.emailPere}</div>
                  {renderLabel("Profession du père ou tuteur")}
                  <div>{infos.professionPere}</div>
                </div>
                <div>
                  {renderLabel("Nom de la mère ou tutrice")}
                  <div>{infos.nomMere}</div>
                  {renderLabel("Téléphone de la mère ou tutrice")}
                  <div>{infos.telMere}</div>
                  {renderLabel("Email de la mère ou tutrice")}
                  <div>{infos.emailMere}</div>
                  {renderLabel("Profession de la mère ou tutrice")}
                  <div>{infos.professionMere}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}