import './Challenge.scss';

type Props = {
  englishList: string[];
  frenchList: string[];
  answers: Record<string, string>;
  setAnswers: (english: string, french: string) => void;
}

export const Challenge = ({
  englishList,
  frenchList,
  answers,
  setAnswers
}: Props) => {
  return (
    <div>Challenge page goes here</div>
  );
};
