
import './App.css'
import React from 'react'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from './Components/LandingPage';
import FormattedVideo from './Components/FormattedVideo';
import PublishVideo from './Components/PublishVideo'; 
import PaginatedVideoFeed from './Components/PaginatedVideoFeed';
import UserChannel from './Components/UserChannel';
import CommonA from './Components/CommonA';
import CommonB from './Components/CommonB';
import UpdateProfile from './Components/UpdateProfile';
import AI_Assistant  from './Components/AI_Assistant'
import FullVideo from './Components/FullVideo';
import Channel_Description from './Components/Channel_Description'

function App() {
  return (
   <Router>
      <Routes>

        <Route path="/" element={<LandingPage/>} />
        <Route path="/publish" element = {<PublishVideo/>}/>
        <Route path="/AI" element={<AI_Assistant/>}/>
        <Route path="/FormattedVideo" element={<FormattedVideo/>}/>
        <Route path="/PaginatedVideoFeed" element = {<PaginatedVideoFeed/>}/>
        <Route path="/UserChannel" element={<UserChannel/>}/>
        <Route path ="/A" element={<CommonA/>}></Route>
        <Route path = "/B" element={<CommonB/>}></Route>
        <Route path= "/UpdateProfile" element={<UpdateProfile/>}></Route>
        <Route path = "/FullVideo" element ={<FullVideo></FullVideo>} ></Route>
        <Route path ='/channel-description' element={<Channel_Description></Channel_Description>}></Route>

      </Routes>
    </Router>

  )
}

export default App
