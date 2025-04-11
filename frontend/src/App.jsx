import React from 'react';
import NavBar from './Components/navBar';  // Use capitalized NavBar
import HomePage from "./Sections/HomePage";
import { Route, Routes } from 'react-router-dom';
import Classify_SU from './Sections/Classify_SU'; // Ensure this is the correct path to your Classify_SU component
import Sign_org from './Sections/Sign_org';

export default function App() {
  return (
    <div>
      <NavBar />  {/* Make sure NavBar is included */}
      
      {/* Use Routes and Route to define paths correctly */}
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* HomePage will render for the root path */}
        <Route path="/Classify" element={<Classify_SU />} />  {/* Ensure this is correct for the signup page */}
        <Route path="/signup" element={<Sign_org />} />  {/* Ensure this is correct for the signup page */}
      </Routes>
    </div>
  );
}
