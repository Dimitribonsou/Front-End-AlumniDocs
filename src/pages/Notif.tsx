import React, { useEffect, useState } from "react";
import Navbar from "../Components/navbar";
import NotificationCard from "../Components/notification";
import Footer from "../Components/footer";
import constant from "../data/constant";
import Ilogin from "../types/Ilogin";

interface Inotif{
  id_notification:number,
  libelle:string,
  description:string,
  date_envoi:string,
  heure_envoi:string,
  annee_scolaiee?:string,
  statut?:string
}
const Notif = () => {
  const [notifications,setNotifications]=useState([]);
  useEffect( () => {
      getNotification();
  },[]);
  const getNotification = async ()=>{
    const data = JSON.parse(localStorage.getItem("loginData") || '{}') as Ilogin;
   const id_etudiant=data.iduser;
    const response = await fetch(`${constant.host}/AlumniDocs-API/getStudentNotification/${id_etudiant}`);
    if(!response.ok)
    {
       console.log("erreur lors de la recuperation des notifications .");
    }
    // recuperer le resultat retourner par l'api
     const notificationData = await response.json();
     console.log(notificationData);
     //mettre a jour la valeur du state
     setNotifications(notificationData);
     console.log("Mise a jour des donnees : ", notifications);
  }
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
          <div className={  notifications && notifications.length > 0  ?    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4" : "grid grid-cols-1"  }> 
            {notifications && notifications.length > 0 ? (
          notifications.map((notification: Inotif) => (
            <NotificationCard
              key={notification.id_notification}
              title={notification.libelle}
              description={notification.description}
              date={new Date(notification.date_envoi).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
              time={notification.heure_envoi} // assuming time is the same as date_envoi
              titleColor={notification.statut === 'success' ? 'text-blue-800' : 'text-red-600'} 
            />
          ))
          
        ) : (
          <p className="text-center font-medium text-blue-800 w-full my-2 text-xl">Aucune notification disponible pour l'instant.</p>
        )}
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