import { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email envoyé à :", email);
    alert("Un e-mail de réinitialisation a été envoyé.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center">Mot de passe oublié</h2>
        <form className="mt-6" onSubmit={handleResetPassword}>
          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            Réinitialiser le mot de passe
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          <a href="/" className="text-blue-600">Retour à la connexion</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
