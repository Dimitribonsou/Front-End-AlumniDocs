import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

const DiscussionPage: React.FC = () => {
  const className = "CSI3 DLW";
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Professeur', text: 'Bienvenue à la discussion de la classe !', time: '10:00' },
    { id: 2, sender: 'Etudiant1', text: 'Merci Prof ! On commence quand le TP ?', time: '10:05' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMsg = {
        id: messages.length + 1,
        sender: 'Moi',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafd]">
      <Navbar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-[#2563eb] to-[#1e40af] shadow-md">
          <img
            src="/assets/logo_1_alumnidocs.png"
            alt="Avatar"
            className="w-12 h-12 rounded-full bg-white object-cover border-2 border-white shadow"
          />
          <div>
            <div className="text-white font-semibold text-lg">{className} – Discussion de classe</div>
            <div className="text-blue-100 text-sm">Membres connectés</div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-[#f0f4fb]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[70%] transition-opacity duration-300 ${
                msg.sender === 'Moi' ? 'ml-auto items-end' : 'items-start'
              }`}
            >
              <div
                className={`px-5 py-3 rounded-2xl shadow-md text-sm md:text-base ${
                  msg.sender === 'Moi'
                    ? 'bg-[#2563eb] text-white'
                    : 'bg-white text-gray-800'
                }`}
                style={{
                  borderBottomRightRadius: msg.sender === 'Moi' ? '0.5rem' : '1.5rem',
                  borderBottomLeftRadius: msg.sender === 'Moi' ? '1.5rem' : '0.5rem',
                }}
              >
                {msg.text}
              </div>
              <span className="text-xs text-gray-500 mt-1">
                {msg.sender !== 'Moi' && <span className="font-medium">{msg.sender} · </span>}
                {msg.time}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="sticky bottom-0 bg-white border-t border-gray-300 px-4 py-4 flex items-center gap-3 shadow-sm">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
            className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-sm bg-gray-50"
            placeholder="Écrire un message à la classe..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2 rounded-full text-sm font-semibold transition"
          >
            Envoyer
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiscussionPage;
