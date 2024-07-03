import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './MainMenu.css';

const MainMenu = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/game');
  };

  return (
    <div className="main-menu">
      <h1>Frogger Game</h1>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default MainMenu;
