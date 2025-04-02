function Navbar()
{
    function setIsOpen(arg0: boolean): void {
        throw new Error("Function not implemented.");
    }

  return(
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-white text-2xl font-bold">MyApp</a>

        {/* Menu en grand écran */}
        <ul className="hidden md:flex space-x-6 text-white font-medium">
          <li><a href="#" className="hover:underline">Accueil</a></li>
          <li><a href="#" className="hover:underline">Services</a></li>
          <li><a href="#" className="hover:underline">Contact</a></li>
        </ul>

        {/* Menu en petit écran */}
        <div className="md:hidden">
            <button onClick={() => setIsOpen(true)} className="text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </div>
      </div>
    </nav>
  );
}
export default Navbar