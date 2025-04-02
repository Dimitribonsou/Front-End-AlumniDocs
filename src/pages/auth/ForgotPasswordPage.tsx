import { useState } from "react";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email envoyé à :", email);
    alert("Un e-mail de réinitialisation a été envoyé.");
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
        <h2 className="text-2xl font-semibold text-center">Mot de passe oublié?<span className="ml-2 text-yellow-500 text-3xl">😊</span><div className="line-with-dots"></div></h2>
        <br />
        <div >
          <p className="text-3sm text-center italic"> 
             Veuillez saisir votre email pour rénitialiser <br />
             votre mot de passe.</p>
        </div>
        <form className="mt-6" onSubmit={handleResetPassword}>

          <div>
            <label className="block mb-2 text-3sm font-medium">Email</label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden  h-10">
              <span className="bg-gray-200 p-3 text-gray-600"><FontAwesomeIcon icon={faAt} /></span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="--Entrez votre email--"
                className="w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>
          </div>
          <br />
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-[#161B70] hover:bg-gray-600 text-white font-semibold rounded-md py-2 text-sm w-1/2 mr-2"
            > <a href="/">Connexion</a>
            </button>
            <button
              type="submit"
              className="bg-[#161B70] hover:bg-blue-600 text-white font-semibold rounded-md py-2 text-sm w-1/2 ml-2"
            >
              Envoyer
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

export default ForgotPasswordPage;


