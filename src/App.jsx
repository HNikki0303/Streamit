
import './App.css'
import React from 'react'
import LandingPage from './Components/LandingPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadVideo from "./Components/UploadVideo";
import AI_Assistance from './Components/AI_Assistance';
import FormattedVideo from './Components/FormattedVideo';
import PublishVideo from './Components/publishVideo';


function App() {
  return (
   <Router>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<UploadVideo />} />
        <Route path="/publish" element = {<PublishVideo/>}/>
        <Route path="/AI" element={<AI_Assistance/>}/>
        <Route path="/FormattedVideo" element={<FormattedVideo/>}/>

      </Routes>
    </Router>

  )
}

export default App
