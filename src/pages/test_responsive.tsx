import React from "react";
import img_home from "../assets/profil.png";
import img_about from "../assets/site web.jpg";
import img_profil from "../assets/github.jpg";
const TestResponsive = () => {  
    return (
        <div>
            <div className="home h-full">
                <header className="flex justify-between align-items-center h-20 bg-blue-500 text-white px-3">
                    <h1>Mon Site Web</h1>
                    <nav>
                        <ul className="flex justify-center gap-6 p-4 bg-gray-200">
                            <li><a href="#home" className="text-blue-500 hover:text-green-500">Accueil</a></li>
                            <li><a href="#about" className="text-blue-500 hover:text-green-500">À propos</a></li>
                            <li><a href="#skills" className="text-blue-500 hover:text-green-500">Compétences</a></li>
                        </ul>
                    </nav>
                </header>
                 <h1 className="font-bold text-center text-uppercase md:text-2xl lg:text-base  p-3 text-blue-500 md:text-red-500 lg:text-green-500 mb-6">bienvenue sur la page de test responsive</h1>
                 <div className=" flex flex-col justify-center align-items-center h-56 px-4">
                    <p className=" w-full sm:w-[75%]  shadow-xl min-w-56 p-4">Cette page est un exemple de mise en page responsive. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium corporis quisquam obcaecati sapiente ipsum dolores eum dolorem officia, libero accusamus cupiditate? Repellat vel inventore unde.</p>
                    <div className="mt-4 flex justify-center align-items-center flex-wrap gap-10">
                         <button className="py-[15px] px-4 text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-green-500 min-w-11">Cliquer ici</button>
                         <button className="py-[15px] px-4 text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-green-500">Nous contacter</button>
                    </div>
                 </div>
            </div>
            {/* <div className="about">
                    <h2>À propos de nous</h2>
                    <div>
                         <p>Nous sommes une équipe dédiée à la création de solutions web innovantes.</p>
                         <img src={img_about} alt="À propos de nous" />
                    </div>
            </div>
            <div className="competences">
                    <h2>Nos compétences</h2>
                    <div>
                         <p>Nous sommes spécialisés dans le développement web, le design UI/UX et le marketing digital.</p>
                         <img src={img_profil} alt="Nos compétences" />
                    </div>
            </div> */}
        </div>
    );
};
export default TestResponsive;