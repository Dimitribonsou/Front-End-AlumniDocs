import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faFileAlt, faBell, faShieldAlt, faUsers, faPaperPlane, faBookOpen, faGlobe } from '@fortawesome/free-solid-svg-icons';
import logo_alumnidocs from '../assets/logo_1_alumnidocs.png';
import profil_photo from '../assets/profil.webp';
import linkind from '../assets/linkind.jpg';
import github from '../assets/github.jpg';
import portfolio from '../assets/site web.jpg';
import profil_jamila from '../assets/JAMILA 1.jpg';
// import { faGithubAlt, faLinkedin } from '@fortawesome/free-brands-svg-icons';


export default function AlumniDocsLanding() {
  const [menuOpen, setMenuOpen] = useState(false);

  const features = [
    {
      icon: <FontAwesomeIcon icon={faPaperPlane} className="w-8 h-8" />,
      title: "Soumission des Requêtes",
      description: "Envoyez vos demandes facilement et suivez leur traitement en temps réel"
    },
    {
      icon: <FontAwesomeIcon icon={faBell} className="w-8 h-8" />,
      title: "Réception des Annonces",
      description: "Recevez les annonces personnalisées selon votre classe"
    },
    {
      icon: <FontAwesomeIcon icon={faUsers} className="w-8 h-8" />,
      title: "Création de Compte",
      description: "Inscription simple et rapide pour tous les étudiants"
    },
    {
      icon: <FontAwesomeIcon icon={faFileAlt} className="w-8 h-8" />,
      title: "Soumission de Documents",
      description: "Déposez vos documents personnels de manière sécurisée"
    },
    {
      icon: <FontAwesomeIcon icon={faBell} className="w-8 h-8" />,
      title: "Notifications",
      description: "Restez informé avec des notifications instantanées"
    },
    {
      icon: <FontAwesomeIcon icon={faShieldAlt} className="w-8 h-8" />,
      title: "Sécurité des Données",
      description: "Protection maximale de vos informations personnelles"
    }
  ];

const developers = [
    {
        name: "Dimitri Bonsou (Dimidev)",
        role: "Développeur Full Stack",
        image: profil_photo,
        linkedin: "https://www.linkedin.com/in/dimitribonsou/",
        github: "https://github.com/Dimitribonsou",
        portfolio: "https://dimitribonsou.vercel.app"
    },
    {
        name: "Jamila Beulguibe (JamiDev)",
        role: "Développeuse Front-End",
        image: profil_jamila,
        linkedin: "https://www.linkedin.com/in/jamila-beulguibe-248672272?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        github: "https://github.com/bjaminous",
        portfolio: "https://github.com/bjaminous"
    }
];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className=" p-2 rounded-lg">
                {/* <FontAwesomeIcon icon={faBookOpen} className="w-6 h-6 text-white" /> */}
                <img src={logo_alumnidocs} alt="logo" className='w-24 h-24 scale-110' />
              </div>
              {/* <span className="text-2xl font-bold text-gray-800">AlumniDocs</span> */}
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition">Accueil</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition">À Propos</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition">Fonctionnalités</a>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
              ) : (
                <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-3 space-y-3">
              <a href="#home" className="block text-gray-700 hover:text-blue-600">Accueil</a>
              <a href="#about" className="block text-gray-700 hover:text-blue-600">À Propos</a>
              <a href="#features" className="block text-gray-700 hover:text-blue-600">Fonctionnalités</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 opacity-95"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Bienvenue sur AlumniDocs
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Simplifiez la collecte des informations des étudiants   c'est notre mission
          </p>
          <p className="text-2xl sm:text-3xl font-semibold text-white mb-12 italic">
            "Votre parcours étudiant, simplifié en un clic"
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-5 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition shadow-xl">
                 <a href="/login">
                  Se Connecter
                </a> 
                </button>
                {/* <a href="/test-maintenance" className="bg-white text-blue-600 px-5 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition shadow-xl">
                  Se Connecter
                </a> */}
            {/* <button className="bg-transparent border-2 border-white text-white px-5 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition">
                <a href="#about" className="bg-transparent border-2 border-white text-white px-5 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition">En Savoir Plus</a>
            </button> */}
            <a href="#about" className="bg-transparent border-2 border-white text-white px-5 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition">En Savoir Plus</a>
            
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">À Propos d'AlumniDocs</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-justify">
              AlumniDocs est une solution innovante développée pour faciliter la collecte et la gestion 
              des informations des étudiants . 
              cette plateforme modernise les processus administratifs et améliore la communication 
              entre l'administration et les étudiants.
            </p>
          </div>

          <div className="mt-16">
             <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4"> Les Développeurs</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {developers.map((dev, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
                  <img 
                    src={dev.image} 
                    alt={dev.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-lg"
                  />
                  <h4 className="text-xl font-bold text-center text-gray-800 mb-2">{dev.name}</h4>
                  <p className="text-blue-600 text-center font-semibold mb-6">{dev.role}</p>
                  <div className="flex justify-center space-x-4">
                    <a href={dev.linkedin} className="bg-white p-3 rounded-full hover:bg-blue-600 hover:text-white transition shadow">
                      {/* <FontAwesomeIcon icon={faBars} className="w-5 h-5" /> */}
                      <img src={linkind} alt="linkind" className="w-8 h-8" />
                    </a>
                    <a href={dev.github} className="bg-white p-3 rounded-full hover:bg-gray-800 hover:text-white transition shadow">
                      <img src={github} alt="github" className="w-8 h-8" />
                    </a>
                    <a href={dev.portfolio} className="bg-white p-3 rounded-full hover:bg-indigo-600 hover:text-white transition shadow">
                      <img src={portfolio} alt="portfolio" className="w-8 h-8" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4"> Fonctionnalités</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez toutes les fonctionnalités qui rendent AlumniDocs indispensable pour vos étudiants .
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-white p-2 rounded-full">
                  {/* <FontAwesomeIcon icon={faBookOpen} className="w-6 h-6 text-white" /> */}
                    <img src={logo_alumnidocs} alt="logo" className='w-24 h-24 scale-110' />
                </div>
                {/* <span className="text-2xl font-bold">AlumniDocs</span> */}
              </div>
              <p className="text-gray-400">
                Simplifier la collecte des informations des étudiants 
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-white transition">Accueil</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition">À Propos</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition">Fonctionnalités</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">Institut Universitaire de la Côte</p>
              <p className="text-gray-400">3IAC - Douala, Cameroun</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 AlumniDocs. Tous droits réservés. 
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
