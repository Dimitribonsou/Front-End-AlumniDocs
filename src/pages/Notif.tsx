import React from "react";
import Navbar from "../Components/navbar";
import NotificationCard from "../Components/notification";
import Footer from "../Components/footer";

const Notif = () => {
  return (
    <div className="min-h-screen flex flex-col bg-watermark">
      <Navbar />

      {/* Conteneur principal centré */}
      <div className="container mx-auto flex flex-col items-center  space-y-6 px-4">
        {/* Section Notifs */}
        <div className="max-w-4xl w-full mx-auto bg-white shadow-lg mt-6 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-center bg-red-800 text-white py-2 rounded">
          ACCUEIL/NOTIFICATIONS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <NotificationCard
              title="Requete non fondée"
              description="aucune preuve de document"
              date="12 Feb 2025"
              time="12:30"
              titleColor="text-red-600" // Couleur personnalisée
            />
            <NotificationCard
              title="Profil refusé"
              description="photo de profil non visible"
              date="07 Feb 2025"
              time="14:30"
              titleColor="text-blue-600" // Couleur personnalisée
            />
            <NotificationCard
              title="Requete validé"
              description="veuillez vous rendre aux bureaux"
              date="05 Feb 2025"
              time="08:30"
              titleColor="text-blue-600"  // Couleur personnalisée
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <NotificationCard
              title="Requete non fondée"
              description="aucune preuve de document"
              date="12 Feb 2025"
              time="12:30"
              titleColor="text-red-600"
            />
            <NotificationCard
              title="Profil refusé"
              description="photo de profil non visible"
              date="07 Feb 2025"
              time="14:30"
              titleColor="text-blue-600" 
            />
            <NotificationCard
              title="Requete validé"
              description="veuillez vous rendre aux bureaux"
              date="05 Feb 2025"
              time="08:30"
              titleColor="text-blue-600" 
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <NotificationCard
              title="Requete non fondée"
              description="aucune preuve de document"
              date="12 Feb 2025"
              time="12:30"
              titleColor="text-red-600"
            />
            <NotificationCard
              title="Profil refusé"
              description="photo de profil non visible"
              date="07 Feb 2025"
              time="14:30"
              titleColor="text-blue-600" 
            />
            <NotificationCard
              title="Requete validé"
              description="veuillez vous rendre aux bureaux"
              date="05 Feb 2025"
              time="08:30"
              titleColor="text-blue-600" 
            />
          </div>
      </div>
            </div>
            {/* Place le footer en bas de la page */}
            <div className="mt-auto w-full">
              <Footer />
            </div>
          </div>
        );
      };
      
      export default Notif;