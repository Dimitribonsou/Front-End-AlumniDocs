import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import constant from "../../data/constant";

const VerifyCodePage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  // Gère la saisie et le focus automatique
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
      const response = await fetch(`${constant.host}/AlumniDocs-API/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.join("") }),
      });
      const data = await response.json();
      if (data.success) {
        navigate("/home");
      } else {
        setError(data.message || "Code incorrect.");
      }
    } catch {
      setError("Erreur lors de la vérification.");
    }
    setIsSubmitting(false);
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
      {/* Card */}
      <div className="relative md:absolute md:top-1/2 md:left-[70%] bg-white transform md:-translate-x-1/2 md:-translate-y-1/2 shadow-lg rounded-lg p-6 md:p-10 w-full max-w-sm md:max-w-md">
        <h2 className="text-2xl md:text-4xl font-semibold text-center mb-2">
          Vérification du code
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Entrez le code à 6 chiffres envoyé à votre adresse email.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
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
          {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
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
            onClick={() => alert("Code de vérification renvoyé !")}
          >
            Renvoyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyCodePage;