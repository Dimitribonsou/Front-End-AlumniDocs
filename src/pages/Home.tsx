import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/navbar";
import ProfileCard from "../Components/profilcard";
import AnnouncementCard from "../Components/annonces";
import Footer from "../Components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Ilogin from "../types/Ilogin";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
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
            <h2 className="text-xl md:text-2xl font-bold">Bienvenue {data.nom}</h2>
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
            <AnnouncementCard
              imageSrc="../assets/rm.jpeg"
              title="Réunion mobilité"
              description="Il est porté à la connaissance..."
              date="12 Feb 2025"
              time="12:30"
            />
            <AnnouncementCard
              imageSrc="../assets/sn.jpeg"
              title="Session normal 2"
              description="Il est porté à la connaissance..."
              date="07 Feb 2025"
              time="14:30"
            />
            <AnnouncementCard
              imageSrc="../assets/pt.jpeg"
              title="Projet tutoré"
              description="Il est porté à la connaissance..."
              date="05 Feb 2025"
              time="08:30"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;