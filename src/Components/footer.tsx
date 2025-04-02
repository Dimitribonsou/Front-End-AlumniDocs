import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#161B70] text-white text-medium  py-1 mt-10 ">

            <div className="flex justify-between mt-6 ">
            <p className='text-left px-5'> AlumniDocs {new Date().getFullYear()}</p>
            <p className='text-right pr-5'>Tout droit reservé</p>
            </div>
        </footer>
    );
};

export default Footer;