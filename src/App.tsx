import { useState } from 'react';

import './App.scss';
import { Challenge, Title } from './components';
import { data } from './data';

/**
 * returns a shuffled version of the array passed in
 */
const shuffleData = async (startingArray: string[]): Promise<string[]> => {
  const result: string[] = [];
  const wordArray = [...startingArray];
  while(wordArray.length > 0) {
    const randIndex = (Math.random() * wordArray.length) | 0;
    result.push(wordArray[randIndex]);
    wordArray.splice(randIndex, 1);
  }
  return result;
};

export const App = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const [englishList, setEnglishList] = useState<string[]>([]);
  const [frenchList, setFrenchList] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [grade, setGrade] = useState<number | null>(null);

  /**
   * Ends the game and calculates the grade to be displayed
  */
 const handleGradeClick = () => {
    let correct = 0;
    for (const key of Object.keys(data)) {
      if (data[key] === answers[key]) {
        correct++;
      }
    }
    const percentCorrect = Math.round((correct / Object.keys(data).length) * 100);
    setGrade(percentCorrect);
    setGameRunning(false);
  };
  
  /**
   * Resets all values and starts a new game
   */
  const startNewGame = async () => {
    setShowSplash(false);
    setAnswers({});
    setGrade(null);
    setEnglishList(await shuffleData(Object.keys(data)));
    setFrenchList(await shuffleData(Object.values(data)));
    setGameRunning(true);
  };

  /**
   * Handles storing the answers from the Challenge component
   */
  const handleAnswersChange = (english: string, french: string) => {
    const tempAnswers = {...answers};
    tempAnswers[english] = french;
    setAnswers(tempAnswers);
  };

  return (
    <div className='app-container'>
      {showSplash ? (
        <Title />
      ) : (
        <Challenge
          englishList={englishList}
          frenchList={frenchList}
          answers={answers}
          setAnswers={handleAnswersChange}
          disabled={!gameRunning}
        />
      )}
      {grade !== null && <div className='grade'>You scored {grade}%</div>}
      {gameRunning ? (
        <button className='button' onClick={() => handleGradeClick()}>GRADE</button>
      ) : (
        <button className='button' onClick={() => startNewGame()}>Go!</button>
      )}
    </div>
  );
};
