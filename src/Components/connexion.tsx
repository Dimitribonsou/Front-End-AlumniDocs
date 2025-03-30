
import React from 'react';

function Connexion() {
  return (
    <div className="h-screen bg-[#161B70] flex justify-center items-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-80">
        <h2 className="text-center text-lg font-bold mb-4">Connexion</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Adresse e-mail :
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="votre@email.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Mot de passe :
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Connexion;