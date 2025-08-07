import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#161B70] text-white text-medium  py-3 mt-10 ">

            <div className="flex justify-between items-center flex-wrap gap-3 mt-6 ">
            <p className='text-left px-5'> AlumniDocs {new Date().getFullYear()}  © tout droit réservé</p>
            <p className='text-right pr-5 px-2 flex flex-wrap items-center justify-center'>Développer par <a href="httpps://dimidev-service-website.vercel.app" className='font-bold  text-white mx-2'> BONSOU DIMITRI</a>  & <strong>BEULGUIBE JAMILA</strong></p>
            </div>
        </footer>
    );
};

export default Footer;