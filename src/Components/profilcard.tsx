import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBullhorn, faArrowRight, faComments, faEnvelope, faSignOutAlt, faEdit, faUser } from "@fortawesome/free-solid-svg-icons";


// Profile Card Component
const ProfileCard = () => {
  return (
    <div className="bg-gray-100 p-4  w-80  H flex flex-col justify-between">
      <div className="flex items-center space-x-4">
        <img src="../assets/et.jpeg" alt="Profile" className="w-12 h-12 rounded-full" />
        <div>
          <p className="font-semibold">JOE DALTON</p>
          <p className="text-sm text-gray-500">Joe.dalton@example.com</p>

          {/* Barre de progression */}
          <p className="text-xl text-[#CF3F3F] font-bold mt-2">45%</p>
          <div className="mt-2 bg-gray-200 rounded-md h-6 w-full">
            <div className="bg-yellow-500 h-6 rounded-md" style={{ width: "45%" }}></div>
          </div>
          <p className="text-xs mt-1">Veuillez compléter votre profil jusqu'à 100% pour être à jour.</p>
        </div>
      </div>

      {/* Bouton Compléter avec Icône */}
      <button className="mt-4 bg-red-500 text-white w-full py-2 rounded-md flex items-center justify-center gap-2">
        <a href="/profile">Compléter mon profil </a>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default ProfileCard;
