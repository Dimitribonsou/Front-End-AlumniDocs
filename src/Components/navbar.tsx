import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBullhorn,faComments, faBell, faUsers,faEnvelope, faSignOutAlt, faEdit, faUser } from "@fortawesome/free-solid-svg-icons";


const Navbar = () => {
  const [active, setActive] = useState("Accueil");
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);


  const navItems = [
    { name: "Accueil", icon: faHome },
    { name: "Requetes", icon: faEnvelope },
    { name: "Annonces", icon: faBullhorn },
    { name: "Forum", icon: faComments },
    { name: "Notification", icon: faBell },
  ];

  return (
    <nav className="bg-[#161B70] p-4  shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-white text-2xl font-bold">
          Logo
        </a>

        {/* Menu en grand écran */}
        <ul className="hidden md:flex space-x-6 text-white font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href="#"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition duration-300 ${
                  active === item.name ? "bg-blue-800 text-yellow-300 shadow-md" : "hover:bg-blue-700"
                }`}
                onClick={() => setActive(item.name)}
              >
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
        <div >
          <button
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <FontAwesomeIcon icon={faUser} className="text-blue-600 text-xl" />
          </button>
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 text-gray-800">
              <p className="text-center text-bold">Joe Dalton</p>
              <p className="px-4 py-2 text-italic text-center text-xs border-b">Joe.dalton@gmail.com</p>
              <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                <FontAwesomeIcon icon={faEdit} className="mr-2" /> Modifier
              </a>
              <a href="/" className="block px-4 py-2 text-red-600 hover:bg-gray-200">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Déconnexion
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
