import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBullhorn,
  faComments,
  faBell,
  faEnvelope,
  faSignOutAlt,
  faEdit,
  faUser,
  faBars,
  faTimes,
  faFile,
  faPencil
} from "@fortawesome/free-solid-svg-icons";
// fonction permettant a un utilisateur de se deconnecter
const logOut=()=>{
// suprimer la variable loginData du localstorage
localStorage.removeItem('loginData');
//rediriger vers la page de connexion
window.location.href = '/';
}
const Navbar = () => {
  const [active, setActive] = useState("Accueil");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Accueil", icon: faHome, route: "/home" },
    { name: "Inscription", icon: faPencil, route: "/inscription" },
    { name: "Document", icon: faFile, route: "/profile" },
    { name: "Requetes", icon: faEnvelope, route: "/requetes" },
    { name: "Annonces", icon: faBullhorn, route: "/annonce" },
    { name: "Forum", icon: faComments, route: "/forum" },
    { name: "Notification", icon: faBell, route: "/notifications" },
  ];

  return (
    <nav className="bg-[#1e2494] py-2 px-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/home" className="text-white text-2xl font-bold">
          <img
            src="/assets/logo_1_alumnidocs.png"
            alt="Logo"
            className="h-14 w-20  scale-150 object-contain"
          />
        </a>

        {/* Menu pour les grands écrans */}
        <ul className="hidden md:flex space-x-6 text-white font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.route}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition duration-300 ${
                  active === item.name
                    ? "bg-blue-800 text-yellow-300 shadow-md"
                    : "hover:bg-blue-700"
                }`}
                onClick={() => setActive(item.name)}
              >
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Bouton pour le menu mobile et icône de profil */}
        <div className="flex items-center space-x-4">
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
          </button>
          <button
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <FontAwesomeIcon icon={faUser} className="text-blue-600 text-xl" />
          </button>
        </div>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <ul className="absolute top-16 right-0 w-full bg-[#1e2494] text-white font-medium flex flex-col space-y-4 py-4 px-6 md:hidden">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.route}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition duration-300 ${
                    active === item.name
                      ? "bg-blue-800 text-yellow-300 shadow-md"
                      : "hover:bg-blue-700"
                  }`}
                  onClick={() => setActive(item.name)}
                >
                  <FontAwesomeIcon icon={item.icon} />
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* User Menu */}
        {isUserMenuOpen && (
          <div className="absolute right-0 mt-40 w-48 bg-white shadow-lg rounded-lg py-2 text-gray-800">
            <p className="text-center text-bold">Joe Dalton</p>
            <p className="px-4 py-2 text-italic text-center text-xs border-b">
              Joe.dalton@gmail.com
            </p>
            <a href="#" className="block px-4 py-2 hover:bg-gray-200">
              <FontAwesomeIcon icon={faEdit} className="mr-2" /> Modifier
            </a>
            <a
              onClick={logOut}
              className="block px-4 py-2 text-red-600 hover:bg-gray-200"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />{" "}
              Déconnexion
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;