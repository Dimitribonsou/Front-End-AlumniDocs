import React from "react";

interface AnnouncementProps {
  imageSrc: string;
  title: string;
  description: string;
  date: string;
  time: string;
}

const AnnouncementCard: React.FC<AnnouncementProps> = ({ imageSrc, title, description, date, time }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
      {/* Image */}
      <img src={imageSrc} alt={title} className="w-full h-32 object-cover" />

      {/* Contenu */}
      <div className="p-4">
        <h3 className="text-lg text-red-700 font-bold">{title}</h3>
        <p className="text-gray-600 mt-2 text-sm">{description}</p>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{date}</span>
          <span>{time}</span>
        </div>
        <a href="/annonce/:id" className="text-blue-600 text-sm text-right mt-2 block">Voir plus</a>
      </div>
    </div>
  );
};

export default AnnouncementCard;
