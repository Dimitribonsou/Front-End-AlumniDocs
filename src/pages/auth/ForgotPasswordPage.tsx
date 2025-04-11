import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleSendResetLink = async () => {
    setIsSending(true);
    try {
      const response = await fetch('/api/send-reset-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reset link');
      }

      const data = await response.json();
      if (data.success) {
        setSendSuccess(true);
      } else {
        console.error('Failed to send reset link');
      }
    } catch (error) {
      console.error('Error sending reset link:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email envoyé à :", email);
    alert("Un e-mail de réinitialisation a été envoyé.");
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

      {/* Forgot Password Card */}
      <div className="relative md:absolute md:top-1/2 md:left-[70%] bg-white transform md:-translate-x-1/2 md:-translate-y-1/2 shadow-lg rounded-lg p-6 md:p-10 w-full max-w-sm md:max-w-md">
        <h2 className="text-2xl md:text-4xl font-semibold text-center">
          Mot de passe oublié?
          <div className="line-with-dots"></div>
        </h2>
        <br />
        <div>
          <p className="text-sm md:text-base text-center italic">
            Veuillez saisir votre email pour réinitialiser <br />
            votre mot de passe.
          </p>
        </div>
        <form className="mt-6" onSubmit={handleResetPassword}>
          <div>
            <label className="block mb-2 text-sm md:text-base font-medium">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-10">
              <span className="bg-gray-200 p-3 text-gray-600">
                <FontAwesomeIcon icon={faAt} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre email"
                className="w-full py-2 px-3 text-sm md:text-base focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>
          </div>
          <br />
          <div className="flex flex-col md:flex-row justify-between">
            <button
              type="button"
              className="bg-[#161B70] h-9 hover:bg-gray-600 text-white font-semibold rounded-md py-2 text-sm w-full md:w-1/2 md:mr-2 mb-2 md:mb-0"
            >
              <a href="/">Connexion</a>
            </button>
            <button
              type="submit"
              className="bg-[#161B70] h-9 hover:bg-blue-600 text-white font-semibold rounded-md py-2 text-sm w-full md:w-1/2 md:ml-2"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;