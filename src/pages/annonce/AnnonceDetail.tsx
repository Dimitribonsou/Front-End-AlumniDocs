import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/navbar';
import Footer from '../../Components/footer';
import AnnouncementCard from '../../Components/annonces';
import { AnnonceType } from '../../types/annonceType';
import constant from '../../data/constant';
import IclassInfo from '../../types/IclasseInfo';

const AnnonceDetailsPage: React.FC = () => {
  const [annonces, setAnnonces] = useState<AnnonceType[]>([]);
  const [detailAnnonces, setDetailAnnonces] = useState<AnnonceType | null>(null);

  useEffect(() => {
    getAnnonces();
    getDetailAnnonce();
  }, []);

  const getAnnonces = async () => {
    const classeInfo: IclassInfo[] = JSON.parse(localStorage.getItem("classInfo") || '[]') as IclassInfo[];
    const id_classe = classeInfo[0] ? classeInfo[0].id_classe : 1 ;
    const response = await fetch(`${constant.host}/AlumniDocs-API/getAnnonceRecent/${id_classe}`);
    if (!response.ok) {
      console.log("erreur lors de la recuperation des notifications .");
      return;
    }
    const annonceData = await response.json();
    setAnnonces(annonceData);
    console.log(annonceData)
  };

  const getDetailAnnonce = async () => {
    const id_annonce = window.location.pathname.split('/').pop();
    if (!id_annonce) return;

    const response = await fetch(`${constant.host}/AlumniDocs-API/getAnnonceDetail/${id_annonce}`);
    if (!response.ok) {
      console.log("erreur lors de la recuperation des notifications .");
      return;
    }
    const annonceData = await response.json();
    setDetailAnnonces(annonceData);
    console.log(annonceData)
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col bg-watermark">
      <Navbar />

      {/* Contenu principal centré */}
      <div className="max-w-4xl mx-auto w-full bg-white shadow-lg mt-10 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-center bg-red-800 text-white py-2 rounded">
          ANNONCES/DETAILS
        </h2>

        {detailAnnonces && (
          <>
            <h3 className="text-2xl font-bold text-center my-4">{detailAnnonces.libelle}</h3>
            <img
              src={`${constant.img_annonce_path}/${detailAnnonces.image}`}
              alt="Annonce"
              className="w-full h-64 object-cover rounded-lg"
            />
            <p className="text-gray-600 mt-4">
              {detailAnnonces.description}
            </p>
            <p className="text-gray-500 mt-2 text-right">
              {detailAnnonces.date_publication ? new Date(detailAnnonces.date_publication).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'} &nbsp; {detailAnnonces.heure_publication}
            </p>
          </>
        )}
      </div>

      {/* Section Annonces Similaires */}
      <div className="max-w-4xl w-full mx-auto bg-white shadow-lg mt-6 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Annonces similaires</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {annonces.map((annonce) => (
            <AnnouncementCard
              key={annonce.id_annonce}
              imageSrc={annonce.image}
              title={annonce.libelle}
              description={annonce.description.substring(0, 80)}
              date={new Date(annonce.date_publication).toISOString().split('T')[0]}
              time={annonce.heure_publication}
              id_annonce={annonce.id_annonce}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AnnonceDetailsPage;