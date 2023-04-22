import React, { useRef, useState } from 'react';
import Xarrow, { Xwrapper, useXarrow } from 'react-xarrows';

import { WordTable } from '../WordTable/WordTable';
import './Challenge.scss';

type Props = {
  englishList: string[];
  frenchList: string[];
  answers: Record<string, string>;
  disabled: boolean;
  setAnswers: (english: string, french: string) => void;
}

/**
 * This is the primary game component
 */
export const Challenge = ({
  englishList,
  frenchList,
  answers,
  disabled,
  setAnswers
}: Props) => {
  const [englishChoice, setEnglishChoice] = useState<string>('');
  const [frenchChoice, setFrenchChoice] = useState<string>('');
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const cursor = useRef<HTMLDivElement | null>(null);
  const updateXarrow = useXarrow();

  /**
   * Decides what to do based on what has been clicked on
   */
  const handleMouseDown = (word: string, lang: 'en' | 'fr') => {
    if (!disabled) {
      if (word) setMouseDown(true);
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

  /**
   * Decides what to do based on what was initially clicked on
   * and where the mouse is when click ended
   */
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

  /**
   * Moves the ref element with the mouse if the mouse is currently dragging
   * this is necessary to display the arrow while dragging
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (mouseDown && cursor.current) {
      cursor.current.style.left = e.clientX + 'px';
      cursor.current.style.top = e.clientY + 'px';
      updateXarrow();
    }
  };

  return (
    <Xwrapper>
      <div className='challenge-container' onMouseUp={() => handleMouseUp('', null)} onMouseMove={(e) => handleMouseMove(e)}>
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
        <Xarrow
          showXarrow={mouseDown && !!englishChoice || !!frenchChoice}
          start={englishChoice ? englishChoice : frenchChoice}
          end={cursor}
          path='straight'
        />
        {Object.keys(answers).map((key) => <Xarrow key={`answer-${key}`} start={key} end={answers[key]} path='straight' />)}
        <div ref={cursor} id='cursor' />
      </div>
    </Xwrapper>
  );
};
