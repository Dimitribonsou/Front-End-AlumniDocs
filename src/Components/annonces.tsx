import React from "react";
interface AnnouncementCardProps {
    title: string;
    description: string;
    date: string;
    time: string;
  }

const AnnouncementCard = ({ title, description, date, time }: AnnouncementCardProps) => {
    return (
      <div className="bg-white shadow-md p-4 rounded-lg w-64">
        <h3 className="font-bold text-red-600">{title}</h3>
        <p className="text-gray-700 text-sm">{description}</p>
        <p className="text-xs text-gray-500 mt-2">{date} - {time}</p>
        <a href="#" className="text-blue-600 text-sm text-right mt-2 block">Voir plus</a>
      </div>
    );
  };
export default AnnouncementCard;

