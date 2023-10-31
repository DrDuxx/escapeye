import {  Routes, Route, Navigate, useLocation } from "react-router-dom";

import Dashboard from "./screens/Dashboard";
import Home from "./screens/Home";
import Score from "./screens/Score";
import PreScore from "./screens/PreScore";
import Hints from "./screens/Hints";
import Hint from "./screens/Hint";
import Config from "./screens/Config";
import Warning from "./screens/Warning";
import ResetConfig from "./screens/ResetConfig";
import { useEffect } from "react";
import Monitor from "./screens/Monitor";
import Games from "./screens/Games";
import Rooms from "./screens/Rooms";
import AdminLayout from "./components/AdminLayout";
import Room from "./screens/Room";
import AdminHints from "./screens/AdminHints";
import AdminHint from "./screens/AdminHint";
import AdminAddHint from "./screens/AdminAddHint";
import Game from "./screens/Game";

const App = () => {
  const roomNumber = localStorage.getItem('roomNumber') 
  const localServerIp = localStorage.getItem('localServerIp') 
  const location = useLocation();

  useEffect(() => {
    if(localServerIp && roomNumber && !location.pathname.includes('admin')){
      document.body.style=`background-image:url("http://${localStorage.getItem('localServerIp')}:8080/images/room${roomNumber}.jpg");`;
    }else{      
      document.body.style="background-color:#700B83;height:100vh;";
    }
  }, [roomNumber, localServerIp, location.pathname])
  
  return (
    
      <Routes>
        {/* Game Routes */}
        <Route path="/" element={ (localStorage.getItem('roomId') && localStorage.getItem('localServerIp')) ? <Navigate to="/home"/> : <Navigate to="/warning"/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/warning" element={<Warning />} />
        <Route path="/pre-score" element={<PreScore />} />
        <Route path="/score" element={<Score />} />
        <Route path="/hints" element={<Hints />} />
        <Route path="/hints/:riddleId/:riddleNumber" element={<Hint />} />
        <Route path="/config/:roomNumber" element={<Config />} />
        <Route path="/reset-config" element={<ResetConfig />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/monitor" element={<AdminLayout backLink={"/admin"}><Monitor /></AdminLayout>} />
        <Route path="/admin/games" element={<AdminLayout backLink={"/admin"}><Games /></AdminLayout>} />
        <Route path="/admin/games/:roomId" element={<AdminLayout backLink={"/admin/games"}><Game /></AdminLayout>} />
        <Route path="/admin/rooms" element={<AdminLayout backLink={"/admin"}><Rooms /></AdminLayout>} />
        <Route path="/admin/rooms/edit/:roomId" element={<AdminLayout backLink={"/admin/rooms"}><Room /></AdminLayout>} />
        <Route path="/admin/rooms/edit/:roomId/hints" element={<AdminLayout backLinkDepth={1}><AdminHints /></AdminLayout>} />
        <Route path="/admin/rooms/edit/:roomId/hints/add/:nextNumber" element={<AdminLayout backLinkDepth={2}><AdminAddHint /></AdminLayout>} />
        <Route path="/admin/rooms/edit/:roomId/hints/edit/:hintId" element={<AdminLayout backLinkDepth={2}><AdminHint /></AdminLayout>} />
      </Routes>
  );
};

export default App;
