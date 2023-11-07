import {  Routes, Route } from "react-router-dom";
import Config from "./screens/Config";
import Ipad from "./screens/Ipad";
import Home from "./screens/Home";
import Game from "./screens/Game";
import PreGame from "./screens/PreGame";
import PlayerBank from "./screens/PlayerBank";
import BankPlayer from "./screens/BankPlayer";
import PlayerPlayer from "./screens/PlayerPlayer";
import ColorPlayer from "./screens/ColorPlayer";
import ColorBank from "./screens/ColorBank";
import Chance from "./screens/Chance";
import Trivia from "./screens/Trivia";
import Mortage from "./screens/Mortage";
import Unmortage from "./screens/Unmortage";
import ExtendTime from "./screens/ExtendTime";
import StopGame from "./screens/StopGame";
import ColorPlayerPlayer from "./screens/ColorPlayerPlayer";
import Winner from "./screens/Winner";
import TriviaCategories from "./screens/TriviaCategories";
import Bosta from "./screens/Bosta";


const App = () => {
  return (
      <Routes>
        {/* Monopoly Routes */}
        <Route path="/" element={<Config />} />
        <Route path="/home" element={<Home />} />
        <Route path="/winner/:name" element={<Winner />} />
        <Route path="/ipad" element={<Ipad />} />
        <Route path="/pre-game" element={<PreGame />} />
        <Route path="/game" element={<Game />} />
        <Route path="/player-bank" element={<PlayerBank />} />
        <Route path="/bank-player" element={<BankPlayer />} />
        <Route path="/player-player" element={<PlayerPlayer />} />
        <Route path="/color-player" element={<ColorPlayer />} />
        <Route path="/color-player-player" element={<ColorPlayerPlayer />} />
        <Route path="/color-bank" element={<ColorBank />} />
        <Route path="/chance" element={<Chance />} />
        <Route path="/trivia" element={<Trivia />} />
        <Route path="/trivia/category" element={<TriviaCategories />} />
        <Route path="/mortage" element={<Mortage />} />
        <Route path="/unmortage" element={<Unmortage />} />
        <Route path="/bosta" element={<Bosta />} />
        <Route path="/extend-time" element={<ExtendTime />} />
        <Route path="/stop-game" element={<StopGame />} />
      </Routes>
  );
};

export default App;
