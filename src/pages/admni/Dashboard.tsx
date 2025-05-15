import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Siderbar";
import StatCard from "../../Components/StatCard";
import Navbar_admin from "../../Components/Navbar_admin";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import constant from "../../data/constant";

// Enregistrer les composants nécessaires pour Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {

  useEffect(()=>{
   getStatInfos();
   getChartInfos();
  },[])
  const [result,setResult]=useState<any>({})
  const [chartResult,setChartResult]=useState<any>({})
  const getChartInfos= async ()=>{
    try {   
      //envoyer la requete vers l'API
           const response = await fetch(`${constant.host}/AlumniDocs-API/StatChartJS`);
           if (!response.ok) {
             console.error("Failed to fetch statInfos");
             return;
           }
           const res = await response.json();
           console.log(res);
           if (res.success) {
            setChartResult(res.data);
           } else {
             console.error(res.message);
           }
    } catch (error) {
       console.log("une erreur c'est produite : "+error)
    }
  }
  const getStatInfos= async ()=>{
    try {   
      //envoyer la requete vers l'API
           const response = await fetch(`${constant.host}/AlumniDocs-API/statInfos`);
           if (!response.ok) {
             console.error("Failed to fetch statInfos");
             return;
           }
           const res = await response.json();
           console.log(res);
           if (res.success) {
             setResult(res.data);
           } else {
             console.error(res.message);
           }
    } catch (error) {
       console.log("une erreur c'est produite : "+error)
    }
  }
    // Données pour le graphique en barres
    const barData = {
      // labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
      labels: chartResult.mois,
      datasets: [
        {
          label: "Étudiants inscrits",
          // data: [50, 75, 100, 125, 150, 200],
          data: chartResult.inscriptions,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };
  
    // Options pour le graphique en barres
    const barOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: "Étudiants inscrits par mois",
        },
      },
    };
  
    // Données pour le graphique en secteurs
    const pieData = {
      // labels: ["Étudiants", "Admins", "Annonces"],
      labels: chartResult.categories,
      datasets: [
        {
          label: "Répartition des données",
          // data: [350, 5, 48],
          data: chartResult.valeurs,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar_admin  />
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Étudiants inscrits" value={result.total_inscriptions} icon="🎓" />
          <StatCard title="Annonces publiées" value={result.total_annonces} icon="📢" />
          <StatCard title="Requete non traité " value={result.requetes_en_attente}  icon="🛠️" />
        </div>

        {/* <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Dernières connexions</h2>
          <ul className="bg-white p-4 rounded-lg shadow-md">
            <li>Admin1 - 05/04/2025 à 14:30</li>
            <li>Admin2 - 05/04/2025 à 12:15</li>
            <li>Admin3 - 04/04/2025 à 20:45</li>
          </ul>
        </div> */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Graphique en barres */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Bar data={barData} options={barOptions} />
          </div>

          {/* Graphique en secteurs */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Pie data={pieData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
