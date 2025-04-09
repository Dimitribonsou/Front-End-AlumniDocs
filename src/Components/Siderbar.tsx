import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBullhorn,
  faFlag,
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
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // État pour la liste déroulante

  const links = [
    { name: 'Accueil', path: '/admin', icon: faHome },
    { name: 'Annonces', path: '/admin/annonces', icon: faBullhorn },
    { name: 'Signalements', path: '/admin/annonces-signalées', icon: faFlag },
    { name: 'Étudiants', path: '/admin/etudiant', icon: faUserGraduate },
    { name: 'Validations', path: '/admin/validations', icon: faCheckCircle },
    { name: 'Requêtes', path: '/admin/requetes', icon: faEnvelope },
    { name: 'Forums', path: '/admin/forums', icon: faComments },
    { name: 'Administrateurs', path: '/admin/admins', icon: faUserShield },
  ];

  const dropdownLinks = [
    { name: 'Promotions', path: '/admin/promotions', icon: faGraduationCap },
    { name: 'Classes', path: '/admin/classes', icon: faChalkboardTeacher },
    { name: 'Filières', path: '/admin/filieres', icon: faBuilding },
  ];

  return (
    <aside className="w-64 bg-white h-full p-4">
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
              className="flex items-center gap-2 p-2 rounded hover:bg-[#ec5d5d] "
            >
              <FontAwesomeIcon icon={link.icon} className="text-gray-600" />
              <span>{link.name}</span>
            </a>
          </li>
        ))}

        {/* Dropdown */}
        <li>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-200"
          >
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faGraduationCap} className="text-gray-600" />
              <span>Gestion</span>
            </div>
            <FontAwesomeIcon
              icon={isDropdownOpen ? faChevronUp : faChevronDown}
              className="text-gray-600"
            />
          </button>
          {isDropdownOpen && (
            <ul className="mt-2 space-y-2 pl-6">
              {dropdownLinks.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
                  >
                    <FontAwesomeIcon icon={link.icon} className="text-gray-600" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;