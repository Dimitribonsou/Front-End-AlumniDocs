import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // sauvegarder tout les donnees envoyee par le serveurs dans une variables
  const [logindata, setLoginData]=useState({});
  // definir le hook pour la validation du formulaire
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Connexion réussie !");
    navigate("/home");
  };
  const [error, setError] = useState("");
// utiliser le hooks usereffect pour effectuer des changements sur la valeur des champs du formulaire
useEffect(()=>{
  const isvalid=valideForm();
  // mettre a jour la variable de validation du formulaire
  setIsFormValid(isvalid);
})
  // definir la fonction permettant de valider le formualaire
  const valideForm=()=>
  {
    let isValid=true;
      //  verifier si l'identifiant a ete definis
           if(email.trim() ==='')
           {
              isValid=false;
              console.log("email est obligatoire");
           }
           // verifier si le mot de passe a ete definis
           if(password.trim() ==="")
           {
              isValid=false;
              console.log("le mot de passe est obligatoire");
           }
      
          return isValid;
  }
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/AlumniDocs-API/Loginjwt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Réponse du réseau non valide');
      }

      const data = await response.json();
      console.log(data);
      if (data.message) {
        setError(data.message);
      } 
      if(data.islogin) {
        // console.log("Connexion réussie !");
        // sauvegarder les elements dans la une variable
        setLoginData(data);
        //sauvegarder ces infomations dans le local storage
        localStorage.setItem('loginData', JSON.stringify(data));
        //naviger vers la page d'acceuil
        navigate("/home");
      }
    } catch (error) {
      console.error('Erreur lors de l\'opération de récupération des données :', error);
      setError("Une erreur est survenue lors de la connexion. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#CF3F3F] px-4">
      {/* Logo */}
      <div className="absolute top-4 left-4 md:inset-0 md:flex md:items-center md:justify-start md:pl-10">
        <img
          src="/assets/logo_1_alumnidocs.png"
          alt="Logo"
          className="h-16 md:h-72 object-contain"
        />
      </div>

      {/* Login Card */}
      <div className="relative md:absolute md:top-1/2 md:left-[70%] bg-white transform md:-translate-x-1/2 md:-translate-y-1/2 shadow-lg rounded-lg p-6 md:p-10 w-full max-w-sm md:max-w-md">
        <h2 className="text-2xl md:text-4xl font-semibold text-center">
          BIENVENUE
          <span className="ml-2 text-yellow-500 text-xl md:text-3xl">😊</span>
          <div className="line-with-dots"></div>
        </h2>
         <p className="text-center text-red-500 my-2">{error}</p>
        <form className="mt-6" onSubmit={handleLogin}>
          <div>
            <label className="block mb-2 text-left text-sm md:text-base font-medium">
              Identifiant
            </label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-10">
              <span className="bg-gray-200 p-3 text-gray-600">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Entrez votre matricule ou email"
                className="w-full py-2 px-3 text-sm md:text-base focus:outline-none focus:border-blue-500"
                autoComplete="off"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-left text-sm md:text-base font-medium">
              Mot de passe
            </label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-10">
              <span className="bg-gray-200 p-3 text-gray-600">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Entrez votre mot de passe"
                className="w-full py-2 px-3 text-sm md:text-base focus:outline-none focus:border-blue-500"
                autoComplete="off"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
          </div>
          <br />

          <div className="mb-4 text-right text-xs md:text-sm">
            Mot de passe oublié ?{" "}
            <a href="/forgot-password" className="text-[#9B1E1E]">
              Cliquez ici
            </a>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <button
              type="button"
              className="bg-[#161B70] h-9 hover:bg-red-600 text-white font-semibold rounded-md py-2 text-sm w-full md:w-1/2 md:mr-2 mb-2 md:mb-0"
            >
              <a href="/register">Créer un compte</a>
            </button>
            <button
              type="button"onClick={handleSubmit}
              disabled={!isFormValid}
              className={ !isFormValid ? "bg-gray-500 h-9 text-white font-semibold rounded-md py-2 text-sm w-full md:w-1/2 md:ml-2" : "bg-[#161B70] hover:bg-red-500  h-9 text-white font-semibold rounded-md py-2 text-sm w-full md:w-1/2 md:ml-2"}
            >
              Connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;