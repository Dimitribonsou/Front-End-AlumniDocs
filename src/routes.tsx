import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Dashboard from "./pages/admni/Dashboard";
import Annonces from "./pages/admni/Annonces";
import AnnoncesSignalees from "./pages/admni/AnnoncesSignalees";
import App from "./App";
import AdminEtudiantsParClasse from "./pages/admni/Etudiant";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
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
        <Route path="/admin/etudiant" element={<AdminEtudiantsParClasse />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
