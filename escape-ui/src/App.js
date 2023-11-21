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
import Monopoly from "./screens/Monopoly";
import MonopolyChance from "./screens/MonopolyChance";
import MonopolyTrivia from "./screens/MonopolyTrivia";
import MonopolyFeesBonus from "./screens/MonopolyFeesBonus";
import MonopolyColors from "./screens/MonopolyColors";
import MonopolyLocations from "./screens/MonopolyLocations";
import MonopolySettings from "./screens/MonopolySettings";
import MonopolyChanceAdd from "./screens/MonopolyChanceAdd";
import MonopolyChanceEdit from "./screens/MonopolyChanceEdit";
import MonopolyTriviaAdd from "./screens/MonopolyTriviaAdd";
import MonopolyTriviaEdit from "./screens/MonopolyTriviaEdit";
import MonopolyDare from "./screens/MonopolyDare";
import MonopolyDareAdd from "./screens/MonopolyDareAdd";
import MonopolyDareEdit from "./screens/MonopolyDareEdit";

const App = () => {
  const roomNumber = localStorage.getItem('roomNumber') 
  const localServerIp = localStorage.getItem('localServerIp') 
  const location = useLocation();

  useEffect(() => {
    if(localServerIp && roomNumber && !location.pathname.includes('admin')){
      document.body.style=`background-image:url("http://${localStorage.getItem('localServerIp')}:8080/images/room${roomNumber}.jpeg");background-size:100%;`;
    }else{      
      document.body.style="background-color:#700B83;height:100vh;";
    }
  }, [roomNumber, localServerIp, location.pathname])
  
  return (<>
    {/* <div style={{position:'absolute', top:0,left:0,right:0,bottom:0, backgroundColor:'rgba(0,0,0,.4)', zIndex:'-1'}}></div> */}
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


        {/* Monopoly Routes */}
        <Route path="/admin/monopoly" element={<AdminLayout backLink={"/admin"}><Monopoly /></AdminLayout>} />
        <Route path="/admin/monopoly/chance" element={<AdminLayout backLink={"/admin/monopoly"}><MonopolyChance /></AdminLayout>} />
        <Route path="/admin/monopoly/trivia" element={<AdminLayout backLink={"/admin/monopoly"}><MonopolyTrivia /></AdminLayout>} />
        <Route path="/admin/monopoly/fees-and-bonuses" element={<AdminLayout backLink={"/admin/monopoly"}><MonopolyFeesBonus /></AdminLayout>} />
        <Route path="/admin/monopoly/colors" element={<AdminLayout backLink={"/admin/monopoly"}><MonopolyColors /></AdminLayout>} />
        <Route path="/admin/monopoly/locations" element={<AdminLayout backLink={"/admin/monopoly"}><MonopolyLocations /></AdminLayout>} />
        <Route path="/admin/monopoly/settings" element={<AdminLayout backLink={"/admin/monopoly"}><MonopolySettings /></AdminLayout>} />
        
        <Route path="/admin/monopoly/chance" element={<AdminLayout backLink={"/admin/monopoly"}><MonopolyChance /></AdminLayout>} />
        <Route path="/admin/monopoly/chance/add" element={<AdminLayout backLink={"/admin/monopoly/chance"}><MonopolyChanceAdd /></AdminLayout>} />
        <Route path="/admin/monopoly/chance/edit/:chanceId" element={<AdminLayout backLink={"/admin/monopoly/chance"}><MonopolyChanceEdit /></AdminLayout>} />
        <Route path="/admin/monopoly/dare" element={<AdminLayout backLink={"/admin/monopoly"}><MonopolyDare /></AdminLayout>} />
        <Route path="/admin/monopoly/dare/add" element={<AdminLayout backLink={"/admin/monopoly/dare"}><MonopolyDareAdd /></AdminLayout>} />
        <Route path="/admin/monopoly/dare/edit/:dareId" element={<AdminLayout backLink={"/admin/monopoly/dare"}><MonopolyDareEdit /></AdminLayout>} />
        <Route path="/admin/monopoly/trivia" element={<AdminLayout backLink={"/admin/monopoly"}><MonopolyTrivia /></AdminLayout>} />
        <Route path="/admin/monopoly/trivia/add" element={<AdminLayout backLink={"/admin/monopoly/trivia"}><MonopolyTriviaAdd /></AdminLayout>} />
        <Route path="/admin/monopoly/trivia/edit/:triviaId" element={<AdminLayout backLink={"/admin/monopoly/trivia"}><MonopolyTriviaEdit /></AdminLayout>} />

        
      </Routes></>
  );
};

export default App;
