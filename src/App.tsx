import React from 'react';
import './App.scss';
import HomePage from './pages/homePage';



function App() {
  return (
    <div className="w-full">
      {/* Appel du composant home page */}
      <HomePage/>
    </div>
  );
}

export default App;
