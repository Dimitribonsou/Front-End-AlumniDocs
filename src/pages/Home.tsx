import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/navbar";
import ProfileCard from "../Components/profilcard";
import AnnouncementCard from "../Components/annonces";
import Footer from "../Components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Ilogin from "../types/Ilogin";
import constant from "../data/constant";
import { AnnonceType } from "../types/annonceType";
import IclassInfo from "../types/IclasseInfo";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [InfoRate,setInfoRate]=useState<number>(20)
  const navigate = useNavigate();
const data = JSON.parse(localStorage.getItem("loginData") || '{}') as Ilogin;
console.log(data.nom);
  const handleNavigation = (path: string) => {
    setIsLoading(true); // Active le spinner
    setTimeout(() => {
      navigate(path); // Navigue vers la page après un délai
      setIsLoading(false); // Désactive le spinner après la navigation
    }, 500); // Simule un délai de chargement
  };
  useEffect(()=>{
    getStudentClassInfo();
    getAnnonces();
  },[]);
const getStudentClassInfo= async ()=>{
  const idEtudiant=data.iduser;
  const response = await fetch(`${constant.host}/AlumniDocs-API/getStudentClass/${idEtudiant}`);
  if(response.ok)
  {
    const data=await response.json()
    // console.log(data)
    // sauvegarder les informations sur la classe de l'etudiant dans le localstorage
    localStorage.setItem("classInfo",JSON.stringify(data));
  }
  else
  {
     console.log("erreur lors de la recuperation de la classe");
  }
}
//focntion permettant davoir le niveau de progression dans la soummission des documents
const getStudentRate= async ()=>{
  const idEtudiant=data.iduser;
  const response = await fetch(`${constant.host}/AlumniDocs-API/profile-completion/${idEtudiant}`);
  if(response.ok)
  {
    const res=await response.json()
    // console.log(data)
    // sauvegarder les informations sur la classe de l'etudiant dans le localstorage
    setInfoRate(res.data.completionRate);
  }
  else
  {
     console.log("erreur lors de la recuperation de la classe");
  }
}
const [annonces,setAnnonces]=useState<AnnonceType[]>([]);
const getAnnonces = async ()=>{
  const classeInfo:IclassInfo[] = JSON.parse(localStorage.getItem("classInfo") || '{}') as IclassInfo[];
 const id_classe=classeInfo.length > 0 ? classeInfo[0].id_classe : 1;
  const response = await fetch(`${constant.host}/AlumniDocs-API/getAnnonceRecent/${id_classe}`);
  if(!response.ok)
  {
     console.log("erreur lors de la recuperation des notifications .");
  }
  // recuperer le resultat retourner par l'api
   const annonceData = await response.json();
   console.log(annonceData);
   //mettre a jour la valeur du state
   setAnnonces(annonceData);
   console.log("Mise a jour des donnees : ", annonces);
}
  return (
    <div className="min-h-screen flex flex-col bg-watermark">
      <Navbar />

      {/* Spinner de chargement */}
      {isLoading && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
)}

      {/* Conteneur principal centré */}
      <div className="container mx-auto flex flex-col items-center mt-10 space-y-6 px-4">
        {/* Bloc supérieur (Bienvenue + Profil) en 50/50 */}
        <div className="flex flex-col md:flex-row w-full max-w-4xl gap-4">
          {/* Section Bienvenue (50%) */}
          <div className="w-full md:w-1/2 shadow-lg p-6 h-auto rounded-lg bg-white">
            {/* <h2 className="text-xl md:text-2xl font-bold">Bienvenue JOE</h2> */}
            <h2 className="text-xl md:text-2xl font-bold capitalize">Bienvenue {data.nom}</h2>
            <p className="text-gray-600 mt-2">
              Beaucoup d'étudiants ayant complété leur profil consultent régulièrement{" "}
              <span className="text-[#CF3F3F] font-semibold">AlumniDocs</span>.
            </p>
            <p className="text-gray-600 mt-2">
              Ne sois pas parmi les étudiants qui ne sont pas informés.
            </p>


            <div className="flex flex-col md:flex-row justify-between mt-4">
              <button
                onClick={() => handleNavigation("/annonce")}
                className="bg-[#161B70] h-9 hover:bg-gray-600 text-white font-semibold rounded-3xl py-2 text-sm w-full md:w-1/2 md:mr-2 mb-2 md:mb-0"
              >
                Annonces
              </button>
              <button
                onClick={() => handleNavigation("/notifications")}
                className="bg-[#161B70] h-9 hover:bg-blue-600 text-white font-semibold rounded-3xl py-2 text-sm w-full md:w-1/2 md:ml-2"
              >
                Notifications
              </button>
            </div>
          </div>

          {/* Section Profil (50%) */}
          <div className="w-full md:w-1/2">
            <ProfileCard  nom={data.nom} email={data.email} islogin={true} message="" />
          </div>
        </div>

        {/* Bouton Voir Plus */}
        <div className="mt-6 flex w-full">
          <button
            onClick={() => handleNavigation("/annonce")}
            className="flex items-center ml-auto justify-center bg-[#161B70] hover:bg-blue-600 text-white font-semibold rounded-full px-6 py-3 text-sm"
          >
            Voir plus <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </div>

        {/* Section Annonces */}
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {annonces.map((annonce)=>(
                <AnnouncementCard
                   imageSrc={annonce.image}
                   title={annonce.libelle}
                   description={annonce.description.substring(0,30)}
                   date={new Date(annonce.date_publication).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                   time={annonce.heure_publication}
                   id_annonce={annonce.id_annonce}
                 />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
