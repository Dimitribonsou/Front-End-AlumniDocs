import React from "react";
import Navbar from "../Components/navbar";
import ProfileCard from "../Components/profilcard";
import AnnouncementCard from "../Components/annonces";
import Footer from "../Components/footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Conteneur principal centré */}
      <div className="container mx-auto flex flex-col items-center mt-10 space-y-6">

        {/* Bloc supérieur (Bienvenue + Profil) */}
        <div className="flex w-full max-w-4xl space-x-6">
          {/* Section Bienvenue */}
          <div className="flex-1  shadow-lg p-6 rounded-lg">
            <h2 className="text-xl font-bold">Bienvenue JOE</h2>
            <p className="text-gray-600 mt-2">
              Beaucoup d'étudiants ayant complété leur profil consultent régulièrement <span className="text-[#CF3F3F] font-semibold">AlumniDocs</span>.
            </p>
            <p className="text-gray-600 mt-2">
                Ne sois pas parmis les étudiants qui ne sont pas informés
            </p>
            <div className=" mt-4">
              <h3 className="text-lg font-bold">Annonces récentes</h3>
            </div>
            <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-[#161B70] hover:bg-gray-600 text-white font-semibold rounded-3xl py-2 text-sm w-1/2 mr-2"
            ><a href="">Annonces</a>
            </button>
            <button
              type="submit"
              className="bg-[#161B70] hover:bg-blue-600 text-white font-semibold rounded-3xl py-2 text-sm w-1/2 ml-2"
            ><a href="">Notifications</a>
              
            </button>
          </div>
          </div>

          {/* Section Profil */}
          <div className="flex-1  shadow-lg p-6 rounded-lg">
            <ProfileCard />
          </div>
        </div>

        {/* Section Annonces */}
        <div className="w-full max-w-4xl">
          <div className="flex space-x-4 mt-4">
            <AnnouncementCard title="Réunion mobilisité" description="Il est porté à la connaissance..." date="12 Feb 2025" time="12:30" />
            <AnnouncementCard title="Session normal 2" description="Il est porté à la connaissance..." date="07 Feb 2025" time="14:30" />
            <AnnouncementCard title="Projet tutoré" description="Il est porté à la connaissance..." date="05 Feb 2025" time="08:30" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
