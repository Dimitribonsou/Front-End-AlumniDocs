import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'une connexion réussie
    console.log("Connexion réussie !");
    navigate("/home");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center">Connexion</h2>
        <form className="mt-6" onSubmit={handleLogin}>
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
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Se connecter
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          <a href="/forgot-password" className="text-blue-600">Mot de passe oublié ?</a>
        </p>
        <p className="mt-2 text-sm text-center">
          Pas encore inscrit ? <a href="/register" className="text-blue-600">Créer un compte</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
