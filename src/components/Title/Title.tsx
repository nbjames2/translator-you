/// <reference types="vite-plugin-svgr/client" />
import './Title.scss';
import { ReactComponent as Pointer } from '../../assets/pointer-icon.svg';

export const Title = () => {

  return (
    <div className='title-page-container'>
      <div className="title">
        Translator You!
      </div>
      <Pointer className='logo' />
    </div>
  );
};
