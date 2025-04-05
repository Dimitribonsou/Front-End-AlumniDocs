import React from "react";

type NotificationCardProps = {
  title: string;
  description: string;
  date: string;
  time: string;
  titleColor?: string; // Nouvelle propriété pour la couleur du titre
};

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  description,
  date,
  time,
  titleColor = "text-black", // Couleur par défaut
}) => {
  return (
    <div className="p-4 border rounded-md bg-gray-50 shadow-sm">
      <h3 className={`text-lg text-center font-bold ${titleColor}`}>{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
      <p className="text-gray-500 text-xs mt-2">
        {date} - {time}
      </p>
    </div>
  );
};

export default NotificationCard;