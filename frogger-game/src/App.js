import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import GameOver from './components/GameOver';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game-over" element={<GameOver/>} />
      </Routes>
    </Router>
  );
}

export default App;
