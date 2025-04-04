import React, { useState } from 'react';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

const DiscussionPage: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Admin', text: 'Bienvenue dans cette discussion !', time: '10:00' },
    { id: 2, sender: 'Etudiant1', text: 'Merci ! De quoi allons-nous parler ?', time: '10:05' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMsg = {
        id: messages.length + 1,
        sender: 'Moi',
        text: newMessage,
        time: new Date().toLocaleTimeString().slice(0, 5)
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col bg-watermark">
      <Navbar />
      <div className="max-w-4xl w-full bg-white shadow-lg items-center mt-10 p-6 rounded-lg flex flex-col mx-auto">
        <h2 className="text-2xl font-bold mb-4">Discussion</h2>
        <div className="w-full h-96 overflow-y-auto border p-4 rounded-md bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`p-2 my-2 rounded-lg w-fit ${msg.sender === 'Moi' ? 'ml-auto bg-blue-500 text-white' : 'bg-gray-300'}`}>
              <p className="text-sm font-bold">{msg.sender}</p>
              <p>{msg.text}</p>
              <p className="text-xs text-right text-gray-600">{msg.time}</p>
            </div>
          ))}
        </div>
        <div className="w-full mt-4 flex gap-2">
          <input 
            type="text" 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 border rounded-md" 
            placeholder="Écrire un message..."
          />
          <button 
            onClick={handleSendMessage} 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Envoyer
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiscussionPage;
