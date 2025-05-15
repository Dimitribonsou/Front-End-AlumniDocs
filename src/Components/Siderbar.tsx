import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBullhorn,
  faUserGraduate,
  faCheckCircle,
  faEnvelope,
  faGraduationCap,
  faChalkboardTeacher,
  faBuilding,
  faComments,
  faUserShield,
  faChevronDown,
  faChevronUp,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // État pour la liste déroulante
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // État pour la barre latérale mobile

  const links = [
    { name: "Accueil", path: "/admin", icon: faHome },
    { name: "Annonces", path: "/admin/annonces", icon: faBullhorn },
    { name: "Étudiants", path: "/admin/etudiant", icon: faUserGraduate },
    { name: "Validations", path: "/admin/validations", icon: faCheckCircle },
    { name: "Requêtes", path: "/admin/requetes", icon: faEnvelope },
    { name: "Forums", path: "/admin/forums", icon: faComments },
    { name: "Administrateurs", path: "/admin/admins", icon: faUserShield },
  ];

  const dropdownLinks = [
    { name: "Promotions", path: "/admin/promotions", icon: faGraduationCap },
    { name: "Classes", path: "/admin/classes", icon: faChalkboardTeacher },
    { name: "Filières", path: "/admin/filieres", icon: faBuilding },
  ];

  return (
    <>
      {/* Bouton pour ouvrir/fermer la sidebar en mode mobile */}
      <button
        className="md:hidden fixed top-16 left-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
      </button>

      {/* Sidebar */}
      <div
        className={`w-64 fixed top-0 left-0 h-full bg-[#161B70] text-white transform transition-transform duration-300 z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div className="p-4">
          {/* Titre avec l'image */}
          <div className="flex items-center gap-2 mb-4">
            <img
              src="/assets/3IAC.png"
              alt="3IAC Logo"
              className="h-8 w-8 object-contain"
            />
            <h2 className="text-xl font-bold">Admin Panel</h2>
          </div>

          {/* Liste des liens */}
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.path}>
                <a
                  href={link.path}
                  className="flex items-center gap-2 p-2 rounded hover:bg-[#ec5d5d]"
                >
                  <FontAwesomeIcon icon={link.icon} className="text-white" />
                  <span>{link.name}</span>
                </a>
              </li>
            ))}

            {/* Dropdown */}
            <li>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-full p-2 rounded hover:bg-[#ec5d5d]"
              >
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faGraduationCap}
                    className="text-white"
                  />
                  <span>Gestion</span>
                </div>
                <FontAwesomeIcon
                  icon={isDropdownOpen ? faChevronUp : faChevronDown}
                  className="text-white"
                />
              </button>
              {isDropdownOpen && (
                <ul className="mt-2 space-y-2 pl-6">
                  {dropdownLinks.map((link) => (
                    <li key={link.path}>
                      <a
                        href={link.path}
                        className="flex items-center gap-2 p-2 rounded hover:bg-[#ec5d5d]"
                      >
                        <FontAwesomeIcon
                          icon={link.icon}
                          className="text-white"
                        />
                        <span>{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay pour fermer la sidebar en mode mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;