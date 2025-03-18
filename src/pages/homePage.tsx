import React from 'react';
import logo_tailwind from '../assets/tailwind.png'
import Navbar from '../Components/navbar';
const HomePage=()=>{
    return(
        <div className="container-fluid">
              {/* Appeller le composant Navbar */}
              <Navbar/>
            <div className="w-full h-20 flex justify-center items-center mt-2">
                 <div className="w-1/3 h-20 bg-gray-50">
                     <h1 className="text-3xl font-bold text-center text-blue-500 ">bienvenue sur AlumniDocs</h1>
                 </div>
                 <div className="w-1/3 h-20 bg-gray-50">
                     <img src={logo_tailwind} alt="image home"/>
                 </div>
            </div>
        </div>
    );
}
export default HomePage