import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Partie gauche - fond rouge */}
      <div className="w-full md:w-[40%] bg-[#CF3F3F] flex items-center justify-center relative">
        <div className="absolute top-4 left-4 md:static md:pl-10">
          <img
            src="/assets/logo_1_alumnidocs.png"
            alt="Logo"
            className="h-16 md:h-72 object-contain"
          />
        </div>
      </div>

      {/* Partie droite - fond blanc */}
      <div className="w-full  md:w-[60%] bg-white flex items-center justify-center">
        <div className="w-full max-w-md p-10 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl md:text-4xl font-semibold text-center">
            BIENVENUE
            <p className="italic text-sm text-thin">Créer votre compte</p>
            <div className="line-with-dots"></div>
          </h2>

          <form className="mt-6">
            <div>
              <label className="block mb-2 text-sm font-medium">Nom</label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9">
                <input
                  type="text"
                  className="w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                  required
                  placeholder="Entrez votre nom"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Prénom</label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9">
                <input
                  type="text"
                  className="w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                  required
                  placeholder="Entrez votre prénom"
                />
              </div>
            </div>

            {/* Liste déroulante pour le sexe */}
            <div>
              <label className="block mb-2 text-sm font-medium">Sexe</label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9">
                <select
                  className="w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Sélectionnez votre sexe</option>
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Téléphone</label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9">
                <input
                  type="text"
                  className="w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                  required
                  placeholder="Entrez votre téléphone"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9">
                <input
                  type="email"
                  className="w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Entrez votre email"
                />
                <span className="p-3 text-gray-600">
                  <FontAwesomeIcon icon={faAt} />
                </span>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Mot de passe</label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9">
                <input
                  type="password"
                  className="w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Écrire votre mot de passe"
                />
                <span className="p-3 text-gray-600">
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Confirmation mot de passe</label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9">
                <input
                  type="password"
                  className="w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Réécrire votre mot de passe"
                />
                <span className="p-3 text-gray-600">
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between mt-6">
              <button
                type="button"
                className="bg-[#161B70] h-9 hover:bg-gray-600 text-white font-semibold rounded-md py-2 text-sm w-full md:w-1/2 md:mr-2 mb-2 md:mb-0"
              >
                <a href="/">Connexion</a>
              </button>
              <button
                type="submit"
                className="bg-[#161B70] h-9 hover:bg-blue-600 text-white font-semibold rounded-md py-2 text-sm w-full md:w-1/2 md:ml-2"
              >
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;