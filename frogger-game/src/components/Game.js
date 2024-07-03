import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Game.css';

const Game = () => {
  const [frogPosition, setFrogPosition] = useState({ x: 4, y: 9 });
  const [targets, setTargets] = useState([
    { id: 1, x: 0, y: 1, direction: 1 },
    { id: 2, x: 8, y: 3, direction: -1 },
    { id: 3, x: 4, y: 5, direction: 1 },
  ]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const navigate = useNavigate();

  const handleTouchMove = (direction) => {
    if (gameOver || win) return;

    setFrogPosition((prevPosition) => {
      const newPosition = { ...prevPosition };

      if (direction === 'up' && prevPosition.y > 0) newPosition.y -= 1;
      if (direction === 'down' && prevPosition.y < 9) newPosition.y += 1;
      if (direction === 'left' && prevPosition.x > 0) newPosition.x -= 1;
      if (direction === 'right' && prevPosition.x < 9) newPosition.x += 1;

      if (newPosition.y === 0) setWin(true);

      return newPosition;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTargets((prevTargets) => 
        prevTargets.map((target) => {
          const newTarget = { ...target, x: target.x + target.direction };
          if (newTarget.x < 0 || newTarget.x > 9) {
            newTarget.direction *= -1;
            newTarget.x += newTarget.direction;
          }
          return newTarget;
        })
      );

      setGameOver((prevState) =>
        targets.some(
          (target) => target.x === frogPosition.x && target.y === frogPosition.y
        )
      );
    }, 500);

    return () => clearInterval(interval);
  }, [frogPosition, targets]);

  useEffect(() => {
    if (gameOver) {
      // Redirect to another page or route when gameOver is true
      navigate('/game-over');
    }
  }, [gameOver, navigate]);

  return (
    <div className="game-container">
      {win && <div className="win-message">You Win!</div>}
      {gameOver && <div className="game-over-message">Game Over</div>}
      <div className="game-grid">
        <div
          className="frog"
          style={{ top: `${frogPosition.y * 10}%`, left: `${frogPosition.x * 10}%` }}
        />
        {targets.map((target) => (
          <div
            key={target.id}
            className="target"
            style={{ top: `${target.y * 10}%`, left: `${target.x * 10}%` }}
          />
        ))}
      </div>
      <div className="controls">
        <button onClick={() => handleTouchMove('up')}>Up</button>
        <button onClick={() => handleTouchMove('down')}>Down</button>
        <button onClick={() => handleTouchMove('left')}>Left</button>
        <button onClick={() => handleTouchMove('right')}>Right</button>
      </div>
    </div>
  );
};

export default Game;
