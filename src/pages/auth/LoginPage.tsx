import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'une connexion réussie
    console.log("Connexion réussie !");
    navigate("/home");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#CF3F3F]">
      <div className="absolute inset-0 w-full h-full">
        <img
          // src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Logo&font=Montserrat"
          alt="Logo"
          className="absolute top-10 left-10 w-24 h-24"
        />
      </div>
      <div className="absolute top-1/2 left-[70%] bg-white transform -translate-x-1/2 -translate-y-1/2 bg-gray shadow-lg rounded-lg p-10 w-full max-w-md">
        <h2 className="text-4xl font-semibold text-center">BIENVENUE<span className="ml-2 text-yellow-500 text-3xl">😊</span><div className="line-with-dots"></div></h2>
        
        <form className="mt-6" onSubmit={handleLogin}>
          <div>
            <label className="block mb-2 text-3sm font-medium">Identifiant</label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden  h-10">
              <span className="bg-gray-200 p-3 text-gray-600"><FontAwesomeIcon icon={faUser} /></span>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="--Entrez votre matricule ou email--"
                className="w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-3sm font-medium">Mot de passe</label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden  h-10">
              <span className="bg-gray-200 p-3 text-gray-600"><FontAwesomeIcon icon={faLock} /></span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="--Entrez votre mot de passe--"
                className="w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>
          </div>
          <br />

          <div className="mb-4  text-right text-sm">
            Mot de passe oublié ? <a href="/forgot-password" className="text-[#9B1E1E]">Cliquez ici</a>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-[#161B70] hover:bg-gray-600 text-white font-semibold rounded-md py-2 text-sm w-1/2 mr-2"
            ><a href="/register">Créer un compte</a>
            </button>
            <button
              type="submit"
              className="bg-[#161B70] hover:bg-blue-600 text-white font-semibold rounded-md py-2 text-sm w-1/2 ml-2"
            ><a href="/home">Connexion</a>
              
            </button>
          </div>
        </form>
        {/* <p className="mt-2 text-sm text-center">
          Pas encore inscrit ? <a href="/register" className="text-blue-600">Créer un compte</a>
        </p> */}
      </div>
    </div>
  );
};

export default LoginPage;

