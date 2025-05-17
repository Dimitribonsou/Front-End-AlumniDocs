import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBullhorn, faArrowRight, faComments, faEnvelope, faSignOutAlt, faEdit, faUser } from "@fortawesome/free-solid-svg-icons";
import Ilogin from "../types/Ilogin";
import { useEffect, useState } from "react";
import constant from "../data/constant";


// Profile Card Component
const ProfileCard = (props:Ilogin) => {
  const [InfoRate,setInfoRate]=useState<number>(20)
const data = JSON.parse(localStorage.getItem("loginData") || '{}') as Ilogin;
console.log(data.nom);
  useEffect(()=>{
    getStudentRate();
  },[]);
  //focntion permettant davoir le niveau de progression dans la soummission des documents
const getStudentRate= async ()=>{
  const idEtudiant=data.iduser;
  const response = await fetch(`${constant.host}/AlumniDocs-API/profile-completion/${idEtudiant}`);
  if(response.ok)
  {
    const res=await response.json()
    console.log(data)
    // sauvegarder les informations sur la classe de l'etudiant dans le localstorage
    setInfoRate(res.data.completionRate);
  }
  else
  {
     console.log("erreur lors de la recuperation de la classe");
  }
}
  return (

    <div className="bg-gray-100 p-4 shadow-md rounded-md w-80  H flex flex-col justify-between">
      <div className="flex items-center space-x-4">
        <img src="../assets/et.jpeg" alt="Profile" className="w-12 h-12 rounded-full" />
        <div>
          {/* <p className="font-semibold">JOE DALTON</p> */}
          <p className="font-semibold capitalize">{props.nom} </p>
          {/* <p className="text-sm text-gray-500">Joe.dalton@example.com</p> */}
          <p className="text-sm text-gray-500">{props.email}</p>
          {/* Barre de progression */}
          <p className="text-xl text-[#CF3F3F] font-bold mt-2">{InfoRate}%</p>
          <div className="mt-2 bg-gray-200 rounded-md h-6 w-full">
            <div className="bg-yellow-500 h-6 rounded-md" style={{ width: `${InfoRate}%` }}></div>
          </div>
          <p className="text-xs mt-1">Veuillez compléter votre profil jusqu'à 100% pour être à jour.</p>
        </div>
      </div>
      {/* Bouton Compléter avec Icône */}
      <button className="mt-4 bg-red-500 text-white w-full py-2 rounded-md flex items-center justify-center gap-2">
        <a href="/compte">Completer mon profil</a>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default ProfileCard;
