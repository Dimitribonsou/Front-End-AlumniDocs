import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  //renitialiser le contenu du formulaire
  const resetFormData= ()=>{
  setEmail("");
  setNom("");
  setPrenom("");
  setPhone("");
  setPassword("");
  setConfirmPassword("");
  setGender("");
  }
// envoyer les donnees du formulaire au back-end

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = validateForm();
    setIsFormValid(isValid);
  }, [nom, prenom, email, phone, password, confirmPassword, gender]);

  const handleSubmit = async () => {
    // if (!isFormValid) return;
      // recuperer les donnees saisi dans le formulaire
      const data = {
        nom: nom,
        prenom: prenom,
        email: email,
        telephone: phone,
        password: password,
        genre: gender,
        message: "",
      };
  
      try {
        const response = await fetch('http://localhost:5000/AlumniDocs-API/NewAccount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          throw new Error('la reponse du serveur est pas correct.');
        }
  
        const result = await response.text();
        console.log(result);
        // mettre a jour le message retourner par le serveur
        setServerMessage(result);
        // renitialiser les champs du formulaire et rediriger vers le formulaire de cob
        resetFormData();
        // Handle success as needed
        alert('Votre compte a été créé avec succès!');
      } catch (error) {
        console.log('There was a problem with the fetch operation:', error);
        // Handle error as needed
      }
  };
  const validateForm = () => {
    let isValid = true;

    // Validation for nom
    if (nom.trim() === "") {
      console.log("le nom est obligatoire");
      isValid = false;
    }

    // Validation for prenom
    if (prenom.trim() === "") {
      console.log("le prenom est obligatoire");
      isValid = false;
    }

    // Validation for email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      console.log("format email invalide");
      isValid = false;
    }

    // Validation for phone
    const phoneRegex = /^\+?([0-9]{1,3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(phone)) {
      console.log("format de numero de telphone incorrect");
      isValid = false;
    }

    // Validation for password
    if (password.trim() === "") {
      console.log("mot de passe  est obligatoire.");
      isValid = false;
    }

    // Validation for confirmPassword
    if (confirmPassword.trim() !== password) {
      console.log("les mots de passe ne correspondent pas .");
      isValid = false;
    }

    // Validation for gender
    if (gender.trim() === "") {
      console.log("le Genre est obligatoire");
      isValid = false;
    }

    return isValid;
  };

  const renderLabel = (text: string, isRequired: boolean = true) => (
    <label className="block mb-2 text-sm font-medium">
      {text}
      {isRequired && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

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
      <div className="w-full md:w-[60%] bg-white flex items-center justify-center">
        <div className="w-full max-w-md p-10 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl md:text-4xl font-semibold text-center">
            BIENVENUE
            <p className="italic text-sm text-thin">Créer votre compte</p>
            <div className="line-with-dots"></div>
          </h2>

            <p className="  text-center ">Veuillez remplir tout les champs du formulaire</p>
            <span className="mt-2 text-green-500 font-medium block text-center ">{serverMessage}</span>
          <form className="mt-6" >
            <div>
              {renderLabel("Civilité")}
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9">
                <select
                  name=""
                  id=""
                  className="w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                >
                  <option value=""></option>
                  <option value="Mr">Mr</option>
                  <option value="Mme">Mme</option>
                  <option value="Mlle">Mlle</option>
                </select>
              </div>
            </div>

            {/* Nom */}
            <div>
              {renderLabel("Nom")}
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9">
                <input
                  type="text"
                  className="w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                  required
                  placeholder="Entrez votre nom"
                  value={nom}
                  onChange={(e)=>setNom(e.target.value)}
                />
              </div>
            </div>

            {/* Nom Marital */}
            <div>
              {renderLabel("Nom Marital", false)}
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9">
                <input
                  type="text"
                  className="w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                  placeholder="Entrez votre nom marital"
                />
              </div>
            </div>

            {/* Prénom */}
            <div>
              {renderLabel("Prénom")}
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9">
                <input
                  type="text"
                  className="w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                  required
                  placeholder="Entrez votre prénom"
                  value={prenom}
                  onChange={(e)=>setPrenom(e.target.value)}
                />
              </div>
            </div>

            {/* Sexe */}
            <div>
              {renderLabel("Sexe")}
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9">
                <select
                  className="w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value=""></option>
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                </select>
              </div>
            </div>

            {/* Téléphone */}
            <div>
              {renderLabel("Téléphone")}
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9">
                <input
                  type="text"
                  className="w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                  required
                  placeholder="Entrez votre téléphone"
                  value={phone}
                  onChange={(e)=>setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              {renderLabel("Email")}
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

            {/* Nationalité */}
            <div>
              {renderLabel("Nationalité")}
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9">
                <input
                  type="text"
                  className="w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                  required
                  placeholder="Entrez votre nationalité"
                />
              </div>
            </div>

            {/* Date de naissance */}
            <div>
              {renderLabel("Date de naissance")}
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9">
                <input
                  type="date"
                  className="w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Lieu de naissance */}
            <div>
              {renderLabel("Lieu de naissance")}
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9">
                <input
                  type="text"
                  className="w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                  required
                  placeholder="Entrez votre lieu de naissance"
                />
              </div>
            </div>

            {/* Quartier */}
            <div>
              {renderLabel("Quartier")}
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9">
                <input
                  type="text"
                  className="w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                  required
                  placeholder="Entrez votre quartier"
                />
              </div>
            </div>
            <div>
              {renderLabel("Photo")}
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9">
                <input
                  type="file"
                  className="w-full  focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              {renderLabel("Mot de passe")}
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

            {/* Confirmation mot de passe */}
            <div>
              {renderLabel("Confirmation mot de passe")}
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

            {/* Boutons */}
            <div className="flex flex-col md:flex-row justify-between mt-6">
              <button
                type="button"
                className="bg-[#161B70] h-9 hover:bg-gray-600 text-white font-semibold rounded-md py-2 text-sm w-full md:w-1/2 md:mr-2 mb-2 md:mb-0"
              >
                <a href="/">Connexion</a>
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={ !isFormValid ? "bg-gray-500 h-9 text-white font-semibold rounded-md py-2 text-sm w-full md:w-1/2 md:ml-2" : "bg-[#161B70] h-9 text-white font-semibold rounded-md py-2 text-sm w-full md:w-1/2 md:ml-2"}
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