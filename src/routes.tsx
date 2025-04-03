import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import HomePage from "./pages/Home";
import Profile from "./pages/Profile";
import Annonce from "./pages/Annonces";
import RequetePage from "./pages/Requete";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Annonce" element={<Annonce />} />
        <Route path="/requetes" element={<RequetePage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
