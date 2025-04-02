import React from "react";
import Navbar from "../Components/navbar";
import ProfileCard from "../Components/profilcard";
import AnnouncementCard from "../Components/annonces";
import Footer from "../Components/footer";

const Annonce = () => {
  return (
    <div className="min-h-screen flex flex-col bg-watermark">
      <Navbar />

      {/* Conteneur principal centré */}
      <div className="container mx-auto flex flex-col items-center mt-10 space-y-6">

        {/* Section Annonces */}
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-3 gap-4 mt-4">
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
          <div className="grid grid-cols-3 gap-4 mt-4">
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
          <div className="grid grid-cols-3 gap-4 mt-4">
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

export default Annonce;
