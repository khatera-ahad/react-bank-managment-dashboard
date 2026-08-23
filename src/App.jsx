// App.jsx
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  // Define the brand object with the required properties
  const brand = {
    name: "Sara",
    icon: "🏦" // or use an image URL
  };

  return (
    <>
      <Navbar brand={brand} />
    </>
  );
}

export default App;