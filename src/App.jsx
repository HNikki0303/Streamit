
import './App.css'
import React from 'react'
import LandingPage from './Components/LandingPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./Components/User";

function App() {
  return (
    
   <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
    
  )
}

export default App
