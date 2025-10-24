import React from "react";
import constant from "../data/constant";
import annonce_image from '../assets/annonce_img.jpg'
interface AnnouncementProps {
  imageSrc: string;
  title: string;
  description: string;
  date: string;
  time: string;
  id_annonce:number;
}

const AnnouncementCard: React.FC<AnnouncementProps> = ({ imageSrc, title, description, date, time ,id_annonce }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
      {/* Image */}
      {/* <img src={ `${constant.img_annonce_path}&id=1n4QPkQ1kzwA5o4AKr9XsrXjozpeAR1w4` } alt={title} className="w-full h-32 object-cover" /> */}
      {/* <img src={imageSrc} alt={title} className="w-full h-32 object-cover" /> */}
      <img src={annonce_image} alt={title} className="w-full h-32 object-cover" />
      {/* Contenu */}
      <div className="p-4">
        <h3 className="text-lg text-red-700 font-bold capitalize ">{title}</h3>
        <p className="text-gray-600 mt-2 text-sm">{description}...</p>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{date}</span>
          <span>{time}</span>
        </div>
        <a href={ `/annonce/${id_annonce}`} className="text-blue-600 text-sm text-right mt-2 block">Voir plus</a>
      </div>
    </div>
  );
};

export default AnnouncementCard;
