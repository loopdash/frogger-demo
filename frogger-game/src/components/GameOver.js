import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './GameOver.css';

const GameOver = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/game');
  };

  return (
    <div className="main-menu">
      <h1>It shouldn't be this tough to vote!</h1>
      <button onClick={startGame}>Play Again</button>
    </div>
  );
};

export default GameOver;
