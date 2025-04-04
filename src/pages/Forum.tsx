import React, { useState } from 'react';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

const ForumPage: React.FC = () => {
  const [forum, setForum] = useState({
    filiere: "Conception des Systemes d'information", 
    topics: [
      { id: 1, title: "DLW", author: "Admin", date: "2025-04-04" }
    ]
  });

  return (
    <div className="min-h-screen flex flex-col bg-watermark">
      <Navbar />
      
      {/* Contenu principal */}
      <div className="flex-grow max-w-4xl mx-auto w-full bg-white shadow-lg items-center mt-10 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Forum de la Filière</h2>
        <h3 className="text-xl font-bold text-blue-700">{forum.filiere}</h3>
        <p className="text-gray-500">Participez aux discussions de votre filière.</p>
        
        <div className="mt-6 space-y-6">
          {forum.topics.map((topic) => (
            <div key={topic.id} className="p-4 border rounded-md bg-gray-50">
              <h4 className="text-lg font-bold">{topic.title}</h4>
              <p className="text-gray-600 text-sm">Par {topic.author} - {topic.date}</p>
              <a href="/discussion" className="mt-2 text-blue-700 hover:underline">Voir la discussion</a>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ForumPage;