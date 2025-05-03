import React from 'react';
import NavBar from './Components/navBar';  // Use capitalized NavBar
import HomePage from "./Sections/HomePage";
import { Route, Routes } from 'react-router-dom';
import Classify_SU from './Sections/Classify_SU'; // Ensure this is the correct path to your Classify_SU component
import Sign_org from './Sections/Sign_org';
import Sign_att from './Sections/Sign_att'; // Ensure this is the correct path to your Login_att component
import Login_org from './Sections/Login_org'; // Ensure this is the correct path to your Login_org component
import Login_att from './Sections/Login_att'; // Ensure this is the correct path to your Login_att component

export default function App() {
  return (
    <div>
       {/* <NavBar />  */}
      
      {/* Use Routes and Route to define paths correctly */}
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* HomePage will render for the root path */}
        <Route path="/Classify" element={<Classify_SU />} />  {/* Ensure this is correct for the signup page */}
        <Route path="/signup_Attendee" element={<Sign_att />} />  {/* Ensure this is correct for the signup page */}
        <Route path="/signup_Organizer" element={<Sign_org />} />  {/* Ensure this is correct for the signup page */}
        <Route path="/Login_Organizer" element={<Login_org />} />  {/* Ensure this is correct for the signup page */}
        <Route path="/Login_Attendee" element={<Login_att />} />  {/* Ensure this is correct for the signup pag */}
      </Routes>
    </div>
  );
}
