import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import constant from './../../data/constant'
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logindata, setLoginData] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsFormValid(email.trim() !== "" && password.trim() !== "");
  }, [email, password]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      const response = await fetch(`${constant.host}/AlumniDocs-API/Loginjwt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Réponse du réseau non valide");

      const data = await response.json();
      console.log(data);
      if (data.message) {
        setError(data.message);
      } 
      if(data.islogin)
      {
        // console.log("Connexion réussie !");
        // sauvegarder les elements dans la une variable
        setLoginData(data);
        //sauvegarder ces infomations dans le local storage
        localStorage.setItem('loginData', JSON.stringify(data));
        //naviger vers la page d'acceuil
        navigate("/otp");
      }
    } catch (error) {
      setError("Une erreur est survenue lors de la connexion. Veuillez réessayer.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/iuc-bg.jpg"
          alt="background"
          className="w-full h-full object-cover object-center  brightness-75"
        />
        <div className="absolute inset-0 "></div>
      </div>

      {/* Centered login card */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-2xl">
        <img
          src="/assets/logo_1_alumnidocs.png"
          alt="Logo"
          className="h-24 mb-6"
        />
        <h2 className="text-3xl font-bold text-[#161B70] mb-2 text-center">Connexion</h2>
        <p className="text-gray-500 mb-6 text-center">Connectez-vous à votre espace AlumniDocs</p>
        {error && (
          <div className="w-full mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded text-center border border-gray-300">
            {error}
          </div>
        )}
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-11 bg-white">
              <span className="bg-gray-100 p-3 text-gray-600">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Email ou matricule"
                className="w-full py-2 px-3 text-base focus:outline-none bg-white"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-2">
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-11 bg-white">
              <span className="bg-gray-100 p-3 text-gray-600">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Votre mot de passe"
                className="w-full py-2 px-3 text-base focus:outline-none bg-white"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4 text-right text-xs">
            <a href="/forgot-password" className="text-[#161B70] hover:underline">
              Mot de passe oublié ?
            </a>
          </div>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full h-11 rounded-md font-semibold text-white transition ${
              isFormValid
                ? "bg-[#161B70] hover:bg-[#0e1350]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Connexion
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          Pas encore de compte ?{" "}
          <a href="/register" className="text-[#161B70] font-semibold hover:underline">
            Créer un compte
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
