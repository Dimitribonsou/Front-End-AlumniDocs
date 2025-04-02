import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";

// Profile Card Component
const ProfileCard = () => {
    return (
      <div className="bg-gray-100 p-4 rounded-lg shadow-md w-80">
        <div className="flex items-center space-x-4">
          <img src="../assets/1.jpg" alt="Profile" className="w-12 h-12 rounded-full" />
          {/* <FontAwesomeIcon icon={faUser}/> */}
          <div>
            <p className="font-semibold">JOE DALTON</p>
            <p className="text-sm text-gray-500">Joe.dalton@example.com</p>
            
            <p className="text-xl text-[#CF3F3F] font-bold mt-1">45%</p>
            <div className="mt-2 bg-gray-200 rounded-full h-6 w-full">
              <div className="bg-yellow-500 h-6 rounded-full" style={{ width: "45%" }}></div>
            </div>
            <p className="text-xs mt-1">Veuillez completez votre profil jusqu'à 100% pour etre à jour</p>
          </div>
        </div>
        <button className="mt-4 bg-red-500 text-white w-full py-2 rounded-md">Compléter mon profil</button>
      </div>
    );
  };
export default ProfileCard;