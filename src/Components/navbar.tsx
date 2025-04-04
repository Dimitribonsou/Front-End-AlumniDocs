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
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [active, setActive] = useState("Accueil");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // État pour le spinner

  const handleNavigation = (route: string) => {
    setIsLoading(true); // Active le spinner
    setTimeout(() => {
      window.location.href = route; // Navigue vers la page
      setIsLoading(false); // Désactive le spinner après la navigation
    }, 500); // Simule un délai de chargement
  };

  const navItems = [
    { name: "Accueil", icon: faHome, route: "/home" },
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
            className="h-12 object-contain"
          />
        </a>

        {/* Spinner de chargement */}
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}

        {/* Menu pour les grands écrans */}
        <ul className="hidden md:flex space-x-6 text-white font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => handleNavigation(item.route)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition duration-300 ${
                  active === item.name
                    ? "bg-blue-800 text-yellow-300 shadow-md"
                    : "hover:bg-blue-700"
                }`}
              >
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Bouton pour le menu mobile */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
        </button>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <ul className="absolute top-16 left-0 w-full bg-[#1e2494] text-white font-medium flex flex-col space-y-4 py-4 px-6 md:hidden">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavigation(item.route)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition duration-300 ${
                    active === item.name
                      ? "bg-blue-800 text-yellow-300 shadow-md"
                      : "hover:bg-blue-700"
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} />
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* User Menu */}
        <div className="relative">
          <button
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <FontAwesomeIcon icon={faUser} className="text-blue-600 text-xl" />
          </button>
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 text-gray-800">
              <p className="text-center text-bold">Joe Dalton</p>
              <p className="px-4 py-2 text-italic text-center text-xs border-b">
                Joe.dalton@gmail.com
              </p>
              <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                <FontAwesomeIcon icon={faEdit} className="mr-2" /> Modifier
              </a>
              <a
                href="/"
                className="block px-4 py-2 text-red-600 hover:bg-gray-200"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />{" "}
                Déconnexion
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;