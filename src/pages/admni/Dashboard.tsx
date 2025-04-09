import React from "react";
import Sidebar from "../../Components/Siderbar";
import StatCard from "../../Components/StatCard";
import Navbar_admin from "../../Components/Navbar_admin";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar_admin  />
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Étudiants inscrits" value="350" icon="🎓" />
          <StatCard title="Annonces publiées" value="48" icon="📢" />
          <StatCard title="Admins actifs" value="5" icon="🛠️" />
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Dernières connexions</h2>
          <ul className="bg-white p-4 rounded-lg shadow-md">
            <li>Admin1 - 05/04/2025 à 14:30</li>
            <li>Admin2 - 05/04/2025 à 12:15</li>
            <li>Admin3 - 04/04/2025 à 20:45</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
