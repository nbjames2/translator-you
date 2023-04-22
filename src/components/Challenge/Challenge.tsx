import { useState } from 'react';
import Xarrow, { Xwrapper } from 'react-xarrows';

import { WordTable } from '../WordTable/WordTable';
import './Challenge.scss';

type Props = {
  englishList: string[];
  frenchList: string[];
  answers: Record<string, string>;
  disabled: boolean;
  setAnswers: (english: string, french: string) => void;
}

export const Challenge = ({
  englishList,
  frenchList,
  answers,
  disabled,
  setAnswers
}: Props) => {
  const [englishChoice, setEnglishChoice] = useState<string>('');
  const [frenchChoice, setFrenchChoice] = useState<string>('');

  const handleMouseDown = (word: string, lang: 'en' | 'fr') => {
    if (!disabled) {
      switch(lang) {
        case 'en': {
          setEnglishChoice(word);
          break;
        }
        case 'fr': {
          setFrenchChoice(word);
          break;
        }
        default: break;
      }
    }
  };

  const handleMouseUp = (word: string, lang: 'en' | 'fr' | null) => {
    if (!disabled) {
      switch(lang) {
        case 'en': {
          if (frenchChoice) {
            setAnswers(word, frenchChoice);
          } else {
            setEnglishChoice('');
          }
          break;
        }
        case 'fr': {
          if (englishChoice) {
            setAnswers(englishChoice, word);
          } else {
            setFrenchChoice('');
          }
          break;
        }
        default: {
          setEnglishChoice('');
          setFrenchChoice(''); 
          break;
        }
      }
    }
  };

  return (
    <div className='challenge-container' onMouseUp={() => handleMouseUp('', null)}>
      <Xwrapper>
        <WordTable
          label='English Word'
          wordList={englishList}
          color='blue'
          handleMouseDown={(word) => handleMouseDown(word, 'en')}
          handleMouseUp={(word) => handleMouseUp(word, 'en')}
        />
        <WordTable
          label='French Word'
          wordList={frenchList}
          color='green'
          handleMouseDown={(word) => handleMouseDown(word, 'fr')}
          handleMouseUp={(word) => handleMouseUp(word, 'fr')}
        />
        {Object.keys(answers).map((key) => <Xarrow start={key} end={answers[key]} path='straight' />)}
      </Xwrapper>
    </div>
  );
};
