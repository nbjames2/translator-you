import './WordTable.scss';

type Props = {
  wordList: string[];
  label: string;
  color: string;
  handleMouseDown: (value: string) => void;
  handleMouseUp: (value:string) => void;
};

/**
 * Displays the Table for an array of words passed in
 */
export const WordTable = ({wordList, label, color, handleMouseDown, handleMouseUp}: Props) => {
  return (
    <table className={`wordtable-container ${color}`}>
      <thead>
        <tr>
          <th>{label}</th>
        </tr>
      </thead>
      <tbody>
        {wordList.map((word, index) => (
          <tr key={word} className={index % 2 === 0 ? 'dark-row' : 'light-row'}>
            <td
              id={word}
              onMouseDown={() => handleMouseDown(word)}
              onMouseUp={() => handleMouseUp(word)}
            >{word}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
