
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import App from "./App";
import Compte from "./pages/Compte";
import Promotions from "./pages/admni/Promotions";
import Filieres from "./pages/admni/Filieres";
import Classes from "./pages/admni/Classes";
import Forums from "./pages/admni/Forums";
import Etudiants from "./pages/admni/Etudiant";
import RequeteAdmin from "./pages/admni/Requete";
import AdministrateurPage from "./pages/admni/Administrateur";
import ValidationsPage from "./pages/admni/Validations";
import UpdloadDocumentComponent from "./Components/uploadDocument";


const AppRoutes = () => {
  // recuperer les elements du localstorage afin de savoir si l'utilisateur est connecte
  const data = JSON.parse(localStorage.getItem("loginData") || '{}') as Ilogin;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/uploadTest" element={<UpdloadDocumentComponent />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/annonces" element={<Annonces />} />
        <Route path="/compte" element={<Compte />} />
        <Route path="/admin/promotions" element={<Promotions />} />
        <Route path="/admin/filieres" element={<Filieres />} />
        <Route path="/admin/classes" element={<Classes />} />
        <Route path="/admin/forums" element={<Forums />} />
        <Route path="/admin/etudiant" element={<Etudiants />} />
        <Route path="/admin/requetes" element={<RequeteAdmin />} />
        <Route path="/admin/admins" element={<AdministrateurPage />} />
        <Route path="/admin/validations" element={<ValidationsPage />} />
          <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Annonce" element={<Annonce />} />
            <Route path="/requetes" element={<RequetePage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/annonce/:id" element={<AnnonceDetailsPage />} />
            <Route path="/notifications" element={<Notif />} />
            <Route path="/inscription" element={<Inscription />} />
        {/* // faire le test sur la variable islogin */}
        {/*{data.islogin ? (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Annonce" element={<Annonce />} />
            <Route path="/requetes" element={<RequetePage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/annonce/:id" element={<AnnonceDetailsPage />} />
            <Route path="/notifications" element={<Notif />} />
            <Route path="/inscription" element={<Inscription />} />
          </>
          // rediriger vers le formulaire de connexion
        ) : (
          <>
            <Route path="/home" element={<Navigate replace to="/home" />} />
            <Route path="/profile" element={<Navigate replace to="/" />} />
            <Route path="/Annonce" element={<Navigate replace to="/" />} />
            <Route path="/requetes" element={<Navigate replace to="/" />} />
            <Route path="/forum" element={<Navigate replace to="/" />} />
            <Route path="/annonce/:id" element={<Navigate replace to="/" />} />
            <Route path="/notifications" element={<Navigate replace to="/" />} />
          </>
        )}
        */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
