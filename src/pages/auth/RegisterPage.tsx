import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    console.log("Inscription réussie !");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center">Créer un compte</h2>
        <form className="mt-6" onSubmit={handleRegister}>
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
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              className="w-full p-3 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium">Confirmer le mot de passe</label>
            <input
              type="password"
              className="w-full p-3 border rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            S'inscrire
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Déjà inscrit ? <a href="/" className="text-blue-600">Se connecter</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
