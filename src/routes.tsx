
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import Inscription from "./pages/Inscription";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import HomePage from "./pages/Home";
import Profile from "./pages/Profile";
import Annonce from "./pages/annonce/Annonces";
import RequetePage from "./pages/Requete";
import ForumPage from "./pages/Forum";
import AnnonceDetailsPage from "./pages/annonce/AnnonceDetail";
import Notif from "./pages/Notif";
import Ilogin from "./types/Ilogin";
import Dashboard from "./pages/admni/Dashboard";
import Annonces from "./pages/admni/Annonces";
import AnnoncesSignalees from "./pages/admni/AnnoncesSignalees";
import App from "./App";
import Compte from "./pages/Compte";
// import AdminEtudiantsParClasse from "./pages/admni/Etudiant";
// import AdminEtudiantsParClasse from "./pages/admni/Etudiant";
const AppRoutes = () => {
  // recuperer les elements du localstorage afin de savoir si l'utilisateur est connecte
  const data = JSON.parse(localStorage.getItem("loginData") || '{}') as Ilogin;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* // faire le test sur la variable islogin */}
        {data.islogin ? (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Annonce" element={<Annonce />} />
            <Route path="/requetes" element={<RequetePage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/annonce/:id" element={<AnnonceDetailsPage />} />
            <Route path="/notifications" element={<Notif />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/annonces" element={<Annonces />} />
            <Route path="/admin/annonces-signalées" element={<AnnoncesSignalees />} />
            <Route path="/inscription" element={<Inscription />} />
          </>
          // rediriger vers le formulaire de connexion
        ) : (
          <>
            <Route path="/home" element={<Navigate replace to="/" />} />
            <Route path="/profile" element={<Navigate replace to="/" />} />
            <Route path="/Annonce" element={<Navigate replace to="/" />} />
            <Route path="/requetes" element={<Navigate replace to="/" />} />
            <Route path="/forum" element={<Navigate replace to="/" />} />
            <Route path="/annonce/:id" element={<Navigate replace to="/" />} />
            <Route path="/notifications" element={<Navigate replace to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
