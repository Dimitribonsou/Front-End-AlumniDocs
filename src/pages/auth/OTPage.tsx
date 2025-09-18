import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import constant from "../../data/constant";
import Ilogin from "../../types/Ilogin";

// Toast component
const Toast = ({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) => (
  <div
    className={`fixed top-6 right-6 z-50 px-4 py-3 rounded shadow-lg text-white transition-all duration-300
      ${type === "success" ? "bg-green-600" : "bg-gray-700"}
    `}
  >
    <div className="flex items-center gap-2">
      <span>{message}</span>
      <button className="ml-2 text-lg" onClick={onClose}>&times;</button>
    </div>
  </div>
);

const VerifyCodePage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  const handleChange = (value: string, idx: number) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[idx] = value;
    setCode(newCode);
    if (value && idx < 5) {
      const nextInput = inputsRef.current[idx + 1];
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      const prevInput = inputsRef.current[idx - 1];
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.some((c) => c === "")) {
      setError("Veuillez entrer le code complet.");
      return;
    }
    setIsSubmitting(true);
    setError("");
    try {
      const dataLogin:any = JSON.parse(localStorage.getItem("loginData") || '{}') as Ilogin;
      const id_user=dataLogin.iduser;
      
      const response = await fetch(`${constant.host}/AlumniDocs-API/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: code.join(""),id_utilisateur:id_user }),
      });
      const data = await response.json();
      console.log(data.success)
      if (data.success) {
        console.log("autentification reussie")
        setToast({ message:"Authentificatin reussie", type: "success" });
        console.log(data.user.role)
       console.log("gestion role !")
        if(data.user.role ==="admin" || data.user.role ==="super-admin")
        {
          console.log("admin")
          setTimeout(() => navigate("/admin"), 1200);
          return;
        }
        console.log("etudiant")
        setTimeout(() => navigate("/home"), 1200);
      } else {
        setError(data.message || "Code incorrect.");
      }
    } catch {
      setError("Erreur lors de la vérification.");
    }
    setIsSubmitting(false);
  };

  const handleResend = () => {
    navigate('/login');
    setError("Code de vérification renvoyé !");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/iuc-bg.jpg"
          alt="background"
          className="w-full h-full object-cover object-center brightness-75"
        />
        <div className="absolute inset-0 "></div>
      </div>

      {/* Centered card */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-2xl">
        <img
          src="/assets/logo_1_alumnidocs.png"
          alt="Logo"
          className="h-24 mb-6"
        />
        <h2 className="text-3xl font-bold text-[#161B70] mb-2 text-center">Vérification du code</h2>
        <p className="text-gray-500 mb-6 text-center">
          Entrez le code à 6 chiffres envoyé à votre adresse email.
        </p>
        {error && (
          <div className="w-full mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded text-center border border-gray-300">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full mt-4">
          <div className="flex justify-center gap-2 mb-4">
            {code.map((digit, idx) => (
              <input
                key={idx}
                ref={el => (inputsRef.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-10 h-12 text-2xl text-center border border-gray-300 rounded focus:outline-none focus:border-[#161B70] transition"
                value={digit}
                onChange={e => handleChange(e.target.value, idx)}
                onKeyDown={e => handleKeyDown(e, idx)}
                autoFocus={idx === 0}
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#161B70] hover:bg-red-600 text-white font-semibold rounded-md py-2 px-6 text-sm w-full"
          >
            Vérifier
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          Vous n'avez pas reçu le code ?{" "}
          <button
            type="button"
            className="text-[#9B1E1E] underline"
            onClick={handleResend}
          >
            réessayer
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyCodePage;