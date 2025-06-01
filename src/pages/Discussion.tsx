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
    <div className="min-h-screen flex flex-col bg-[#eaf1fb] bg-watermark">
      <Navbar />
      <div className=" flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 bg-[#2563eb]">
          <img
            src="/assets/logo_1_alumnidocs.png"
            alt="Avatar"
            className="w-10 h-10 rounded-full bg-white object-cover border border-white shadow"
          />
          <div>
            <div className="text-white font-bold text-lg">{className} - Discussion de classe</div>
            <div className="text-blue-100 text-xs">en ligne</div>
          </div>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 bg-[#eaf1fb] flex flex-col">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col mb-3 max-w-[75%] ${
                msg.sender === 'Moi' ? 'ml-auto items-end' : 'items-start'
              }`}
            >
              <div
                className={`px-4 py-2 rounded-3xl shadow-sm ${
                  msg.sender === 'Moi'
                    ? 'bg-[#2563eb] text-white'
                    : 'bg-white text-gray-900 border border-gray-200'
                }`}
                style={{
                  borderBottomRightRadius: msg.sender === 'Moi' ? '0.5rem' : '1.5rem',
                  borderBottomLeftRadius: msg.sender === 'Moi' ? '1.5rem' : '0.5rem',
                }}
              >
                <span className="block text-base">{msg.text}</span>
              </div>
              <span className="text-xs text-gray-500 mt-1">
                {msg.sender === 'Moi' ? '' : <span className="font-semibold">{msg.sender} · </span>}
                {msg.time}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Input collé au footer */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center gap-2 px-4 py-4 z-10">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-white text-base"
            placeholder="Écrire un message à la classe..."
            onKeyDown={e => { if (e.key === 'Enter') handleSendMessage(); }}
          />
          <button
            onClick={handleSendMessage}
            className="bg-[#2563eb] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#1d4ed8] transition"
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