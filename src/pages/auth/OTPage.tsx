import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import constant from "../../data/constant";

// Toast component centré au-dessus du formulaire
const Toast = ({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) => (
  <div
    className={`absolute left-1/2 -translate-x-1/2 top-2 px-4 py-3 rounded shadow-lg text-white transition-all duration-300 z-50
      ${type === "success" ? "bg-green-600" : "bg-gray-700"}
    `}
    style={{ minWidth: 220, maxWidth: 320 }}
  >
    <div className="flex items-center gap-2">
      <span>{message}</span>
      <button className="ml-2 text-lg" onClick={onClose}>&times;</button>
    </div>
  </div>
);

const VerifyCodePage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
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
      setToast({ message: "Veuillez entrer le code complet.", type: "error" });
      return;
    }
    setIsSubmitting(true);
    setToast(null);
    try {
      const response = await fetch(`${constant.host}/AlumniDocs-API/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.join("") }),
      });
      const data = await response.json();
      if (data.success) {
        setToast({ message: "Code vérifié avec succès !", type: "success" });
        setTimeout(() => navigate("/home"), 1200);
      } else {
        setToast({ message: data.message || "Code incorrect.", type: "error" });
      }
    } catch {
      setToast({ message: "Erreur lors de la vérification.", type: "error" });
    }
    setIsSubmitting(false);
  };

  const handleResend = () => {
    setToast({ message: "Code de vérification renvoyé !", type: "success" });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/iuc-bg.jpg"
          alt="background"
          className="w-full h-full object-cover object-center blur-sm brightness-75"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Centered card */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-2xl">
        <img
          src="/assets/logo_1_alumnidocs.png"
          alt="Logo"
          className="h-16 mb-6"
        />
        <h2 className="text-3xl font-bold text-[#161B70] mb-2 text-center">Vérification du code</h2>
        <p className="text-gray-500 mb-6 text-center">
          Entrez le code à 6 chiffres envoyé à votre adresse email.
        </p>
        {/* Toast centré au-dessus du formulaire */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
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
            Renvoyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyCodePage;