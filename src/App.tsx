import { useState } from 'react';

import './App.scss';
import { Challenge, Title } from './components';
import { data } from './data';

const shuffleData = async (startingArray: string[]): Promise<string[]> => {
  const result = [];
  while(startingArray.length > 0) {
    const randIndex = Math.floor(Math.random() * startingArray.length) + 1;
    result.push(startingArray[randIndex]);
    startingArray.splice(randIndex, 1);
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

  const handleGoClick = () => {
    setShowSplash(false);
    startNewGame();
  };

  const handleGradeClick = () => {
    let correct = 0;
    let wrong = 0;
    for (const key of Object.keys(data)) {
      if (data[key] === answers[key]) {
        correct++;
      } else {
        wrong++;
      }
    }
    const percentCorrect = Math.round(correct / wrong);
    setGrade(percentCorrect);
    setGameRunning(false);
  };

  const startNewGame = async () => {
    setAnswers({});
    setGrade(null);
    setEnglishList(await shuffleData(Object.keys(data)));
    setFrenchList(await shuffleData(Object.values(data)));
    setGameRunning(true);
  };

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
        <Challenge englishList={englishList} frenchList={frenchList} answers={answers} setAnswers={handleAnswersChange}/>
      )}
      {grade && <div className='grade'>You scored {grade}%</div>}
      {gameRunning ? (
        <button className='button' onClick={() => handleGradeClick()}>GRADE</button>
      ) : (
        <button className='button' onClick={() => handleGoClick()}>Go!</button>
      )}
    </div>
  );
};
