import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const handleSendResetLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setError("");
    try {
      const response = await fetch('/api/send-reset-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Échec de l\'envoi du lien');

      const data = await response.json();
      if (data.success) {
        setError("Lien de réinitialisation envoyé !");
      } else {
        setError("Impossible d'envoyer le lien.");
      }
    } catch (error) {
      setError("Erreur lors de l'envoi du lien.");
    } finally {
      setIsSending(false);
    }
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

      {/* Forgot Password Card */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-2xl">
        <img
          src="/assets/logo_1_alumnidocs.png"
          alt="Logo"
          className="h-24 mb-6"
        />
        <h2 className="text-3xl font-bold text-[#161B70] mb-2 text-center">
          Mot de passe oublié ?
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          Veuillez saisir votre email pour réinitialiser votre mot de passe.
        </p>
        {error && (
          <div className="w-full mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded text-center border border-gray-300">
            {error}
          </div>
        )}
        <form className="w-full" onSubmit={handleSendResetLink}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-11 bg-white">
              <span className="bg-gray-100 p-3 text-gray-600">
                <FontAwesomeIcon icon={faAt} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre email"
                className="w-full py-2 px-3 text-base focus:outline-none bg-white"
                autoComplete="off"
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-2 mt-4">
            <button
              type="button"
              className="bg-[#161B70] h-11 hover:bg-gray-600 text-white font-semibold rounded-md py-2 text-sm w-full md:w-1/2"
              onClick={() => (window.location.href = "/")}
            >
              Connexion
            </button>
            <button
              type="submit"
              disabled={isSending}
              className={`h-11 font-semibold rounded-md py-2 text-sm w-full md:w-1/2 text-white ${
                isSending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#161B70] hover:bg-blue-600"
              }`}
            >
              {isSending ? "Envoi..." : "Envoyer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;