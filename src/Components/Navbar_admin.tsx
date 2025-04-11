import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons';

const Navbar_admin = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="bg-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Titre ou Logo */}
      <div className="text-xl font-bold text-[#161B70]">AlumniDocs - Admin</div>

      {/* Actions à droite */}
      <div className="flex items-center gap-6">
        {/* Icône Notification */}
        <button className="relative">
          <FontAwesomeIcon icon={faBell} className="w-6 h-6 text-gray-700" />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profil Admin */}
        <div className="relative">
          <button
            className="flex items-center gap-2"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <FontAwesomeIcon icon={faUser} className="w-6 h-6 text-gray-700" />
            <span className="text-gray-700 text-sm font-medium">Admin</span>
          </button>

          {/* Menu déroulant */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 text-gray-800">
              <p className="px-4 py-2 text-sm font-medium">Admin</p>
              <p className="px-4 py-2 text-xs text-gray-500 border-b">admin@alumnidocs.com</p>
              <a
                href="/settings"
                className=" px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faCog} />
                Paramètres
              </a>
              <a
                href="/logout"
                className=" px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Déconnexion
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar_admin;