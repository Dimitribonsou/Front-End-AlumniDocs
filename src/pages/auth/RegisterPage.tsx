import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLock,faPhone,faUser,faVenusMars } from "@fortawesome/free-solid-svg-icons";
import constant from "../../data/constant";

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
        const response = await fetch(`${constant.host}/AlumniDocs-API/NewAccount`, {
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
    // const phoneRegex = /^([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phone.trim() === "") {
      console.log("le numero  de telphone est obligatoire");
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
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/iuc-bg.jpg"
          alt="background"
          className="w-full h-full object-cover object-center  brightness-75"
        />
        <div className="absolute inset-0"></div>
      </div>

      {/* Centered register card */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-2xl">
        <img
          src="/assets/logo_1_alumnidocs.png"
          alt="Logo"
          className="h-24 mb-6"
        />
        <h2 className="text-3xl font-bold text-[#161B70] mb-2 text-center">Créer un compte</h2>
        <p className="text-gray-500 mb-6 text-center">Remplissez le formulaire pour rejoindre AlumniDocs</p>
        {serverMessage && (
          <div className="w-full mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded text-center border border-gray-300">
            {serverMessage}
          </div>
        )}
        <form className="w-full" onSubmit={handleSubmit}>
          {/* Ligne 1 : Nom & Prénom */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-700">Nom</label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-11 bg-white">
                <span className="bg-gray-100 p-3 text-gray-600">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full py-2 px-3 text-base focus:outline-none bg-white"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-700">Prénom</label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-11 bg-white">
                <span className="bg-gray-100 p-3 text-gray-600">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <input
                  type="text"
                  placeholder="Votre prénom"
                  className="w-full py-2 px-3 text-base focus:outline-none bg-white"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          {/* Ligne 2 : Email & Téléphone */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-11 bg-white">
                <span className="bg-gray-100 p-3 text-gray-600">
                  <FontAwesomeIcon icon={faAt} />
                </span>
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full py-2 px-3 text-base focus:outline-none bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-700">Téléphone</label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-11 bg-white">
                <span className="bg-gray-100 p-3 text-gray-600">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <input
                  type="tel"
                  placeholder="Votre téléphone"
                  className="w-full py-2 px-3 text-base focus:outline-none bg-white"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          {/* Ligne 3 : Sexe */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Sexe</label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-11 bg-white">
              <span className="bg-gray-100 p-3 text-gray-600">
                <FontAwesomeIcon icon={faVenusMars} />
              </span>
              <select
                className="w-full py-2 px-3 text-base focus:outline-none bg-white"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Sélectionnez</option>
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
              </select>
            </div>
          </div>
          {/* Ligne 4 : Mot de passe & Confirmation */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-700">Mot de passe</label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-11 bg-white">
                <span className="bg-gray-100 p-3 text-gray-600">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type="password"
                  placeholder="Mot de passe"
                  className="w-full py-2 px-3 text-base focus:outline-none bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-700">Confirmation</label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-11 bg-white">
                <span className="bg-gray-100 p-3 text-gray-600">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type="password"
                  placeholder="Confirmez le mot de passe"
                  className="w-full py-2 px-3 text-base focus:outline-none bg-white"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          {/* Boutons */}
          <div className="flex flex-col md:flex-row justify-between mt-6 gap-2">
            <button
              type="button"
              className="bg-[#161B70] h-11 hover:bg-gray-600 text-white font-semibold rounded-md py-2 text-sm w-full md:w-1/2"
              onClick={() => window.location.href = "/"}
            >
              Connexion
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={
                !isFormValid
                  ? "bg-gray-500 h-11 text-white font-semibold rounded-md py-2 text-sm w-full md:w-1/2"
                  : "bg-[#161B70] h-11 text-white font-semibold rounded-md py-2 text-sm w-full md:w-1/2"
              }
            >
              Créer le compte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;