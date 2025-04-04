import React, { useState } from 'react';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

const ForumsPage: React.FC = () => {
  const [forums, setForums] = useState([
    { id: 1, filiere: "Conception des Systemes d'information", topics: [
      { id: 1, title: "DLW", author: "Admin", date: "2025-04-04" },
      { id: 2, title: "IRC", author: "Etudiant1", date: "2025-04-03" }
    ]},
    { id: 2, filiere: "TI", topics: [
      { id: 3, title: "PAM", author: "Professeur", date: "2025-04-02" }
    ]}
  ]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col ">
      
      <Navbar/>
      <div className="max-w-4xl w-full bg-white shadow-lg items-center mt-10 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Forums par Filières</h2>
        <p className="text-gray-500">Choisissez votre filière pour participer aux discussions.</p>
        
        <div className="mt-6 space-y-6">
          {forums.map((forum) => (
            <div key={forum.id} className="p-4 border rounded-md bg-gray-50">
              <h3 className="text-xl font-bold text-blue-700">{forum.filiere}</h3>
              <div className="mt-2 space-y-2">
                {forum.topics.map((topic) => (
                  <div key={topic.id} className="p-3 border rounded-md bg-white">
                    <h4 className="text-lg font-bold">{topic.title}</h4>
                    <p className="text-gray-600 text-sm">Par {topic.author} - {topic.date}</p>
                    <a href="" className="mt-2 text-blue-700 hover:underline">Voir la discussion</a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ForumsPage;
