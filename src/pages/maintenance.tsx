import React from 'react';
import logo_alumnidocs from '../assets/logo_1_alumnidocs.png';
import logo_profil from '../assets/profil.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
const MaintenancePage = () => {
    return (
        <div className=' py-2 h-full text-center p-4 text-xl'>
            <a href="/">
               <img src={logo_alumnidocs} alt="logo alumnidocs" className='w-40 h-40 rounded-full bg-white mx-auto' />
            </a>
            <div className='flex  justify-center align-items-center gap-4 flex-wrap mt-2'>
                <div className='w-full md:w-1/2 flex flex-col gap-4 px-3'>
                    {/* alert icon */}
                    <div className='flex flex-col gap-2 items-center'>
                        <FontAwesomeIcon icon={faExclamationTriangle} className='text-red-500 w-8 h-8' />
                        <h1 className='font-bold'>Site en maintenance</h1>
                    </div>
                    <p className='text-left'>Nous travaillons actuellement à l'amélioration de <strong className='text-blue-600'>Alumnidocs</strong>. Veuillez revenir plus tard.</p>
                    {/* contact info */}
                </div>
                <div className='w-full md:w-[45%]'>
                    <div className='flex flex-col gap-2 justify-center align-items-center'>
                        <img src={logo_profil} className='w-32 h-32 rounded-full bg-white'  alt="logo dimidev" />
                        <p>Pour toute question, contactez-le développeur </p>
                        <a href="https://wa.me/237674606328?text=Bonjour pourquoi Alumnidocs est en maintenance" className='px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-red-500 transition-all '>Me contactez</a>
                    </div>
                    <h2 className='font-bold mt-2'>Merci de votre compréhension !</h2>
                </div>
            </div>
        </div>
    );
}
export default MaintenancePage;