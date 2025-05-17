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
import VerifyCodePage from "./pages/auth/OTPage";
import DetailEtudiant from "./pages/admni/DetailEtudiant"; // Ensure this is a valid React component

import UpdloadDocumentComponent from "./Components/uploadDocument";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminRoute from "./Components/AdminRoute";
// Removed the import for AdminRoute due to the error

const AppRoutes = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/uploadTest" element={<UpdloadDocumentComponent />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/otp" element={<VerifyCodePage/>} />
        <Route path="/admin/annonces" element={<Annonces />} />
        <Route path="/compte" element={<Compte />} />
        <Route path="/admin/promotions" element={<Promotions />} />
        <Route path="/admin/filieres" element={<Filieres />} />
        <Route path="/admin/detail-etudiant" element={<DetailEtudiant />} />
        <Route path="/admin/classes" element={<Classes />} />
        <Route path="/admin/forums" element={<Forums />} />
        <Route path="/admin/etudiant" element={<Etudiants />} />
        <Route path="/admin/requetes" element={<RequeteAdmin />} />
        <Route path="/admin/admins" element={<AdministrateurPage />} />
        <Route path="/admin/validations" element={<ValidationsPage />} />
            
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
        <Route path="/admin/annonces" element={<AdminRoute><Annonces /></AdminRoute>} />
        <Route path="/compte" element={<ProtectedRoute allowedRoles={['etudiant']}><Compte /></ProtectedRoute>} />
        <Route path="/admin/promotions" element={<AdminRoute><Promotions /></AdminRoute>} />
        <Route path="/admin/filieres" element={<AdminRoute><Filieres /></AdminRoute>} />
        <Route path="/admin/classes" element={<AdminRoute><Classes /></AdminRoute>} />
        <Route path="/admin/forums" element={<AdminRoute><Forums /></AdminRoute>} />
        <Route path="/admin/etudiant" element={<AdminRoute><Etudiants /></AdminRoute>} />
        <Route path="/admin/requetes" element={<AdminRoute><RequeteAdmin /></AdminRoute>} />
        <Route path="/admin/admins" element={<AdminRoute><AdministrateurPage /></AdminRoute>} />
        <Route path="/admin/validations" element={<AdminRoute><ValidationsPage /></AdminRoute>} />
        <Route path="/home" element={<ProtectedRoute allowedRoles={['etudiant','admin']}><HomePage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute allowedRoles={['etudiant','admin']}><Profile /></ProtectedRoute>} />
        <Route path="/Annonce" element={<ProtectedRoute allowedRoles={['etudiant','admin']}><Annonce /></ProtectedRoute>} />
        <Route path="/requetes" element={<ProtectedRoute allowedRoles={['etudiant','admin']}><RequetePage /></ProtectedRoute>} />
        <Route path="/forum" element={<ProtectedRoute allowedRoles={['etudiant','admin']}><ForumPage /></ProtectedRoute>} />
        <Route path="/annonce/:id" element={<ProtectedRoute allowedRoles={['etudiant','admin']}><AnnonceDetailsPage /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute allowedRoles={['etudiant','admin']}><Notif /></ProtectedRoute>} />
        <Route path="/inscription" element={<ProtectedRoute allowedRoles={['etudiant','admin']}><Inscription /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
