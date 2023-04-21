import { useState } from 'react';

import './App.scss';
import { Challenge, Title } from './components';

export const App = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [gameRunning, setGameRunning] = useState<boolean>(false);

  const handleGoClick = () => {
    setShowSplash(false);
    startNewGame();
  };

  const handleGradeClick = () => {
    startNewGame();
  };

  const startNewGame = () => {
    console.log('start new game ==>');
  };

  return (
    <div className='app-container'>
      {showSplash ? (
        <Title />
      ) : (
        <Challenge />
      )}
      {gameRunning ? (
        <button className='go-button' onClick={() => handleGradeClick()}>GRADE</button>
      ) : (
        <button className='go-button' onClick={() => handleGoClick()}>Go!</button>
      )}
    </div>
  )
};
