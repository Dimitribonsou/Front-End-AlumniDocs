import React from 'react';
import Navbar from '../../Components/navbar';
import Footer from '../../Components/footer';
import AnnouncementCard from '../../Components/annonces';

const AnnonceDetailsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col bg-watermark">
      <Navbar />

      {/* Contenu principal centré */}
      <div className="max-w-4xl mx-auto w-full bg-white shadow-lg mt-10 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-center bg-red-800 text-white py-2 rounded">
          ANNONCES/DETAILS
        </h2>

        <h3 className="text-2xl font-bold text-center my-4">Reunion mobiliter</h3>
        <img
          src="../../assets/rm.jpeg"
          alt="Annonce"
          className="w-full h-64 object-cover rounded-lg"
        />
        <p className="text-gray-600 mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati quasi rem, similique natus eum
          veritatis saepe iste omnis suscipit laborum distinctio accusantium unde non ullam eveniet eligendi
          molestias perspiciatis enim tempora in magnam aut consequatur ratione.
        </p>
        <p className="text-gray-500 mt-2 text-right">12 Feb 2025 &nbsp; 12:30</p>
      </div>

      {/* Section Annonces Similaires */}
      <div className="max-w-4xl w-full mx-auto bg-white shadow-lg mt-6 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Annonces similaires</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <AnnouncementCard
            imageSrc="../../assets/rm.jpeg"
            title="Réunion mobilité"
            description="Il est porté à la connaissance..."
            date="12 Feb 2025"
            time="12:30"
          />
          <AnnouncementCard
            imageSrc="../../assets/sn.jpeg"
            title="Session normal 2"
            description="Il est porté à la connaissance..."
            date="07 Feb 2025"
            time="14:30"
          />
          <AnnouncementCard
            imageSrc="../../assets/pt.jpeg"
            title="Projet tutoré"
            description="Il est porté à la connaissance..."
            date="05 Feb 2025"
            time="08:30"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AnnonceDetailsPage;