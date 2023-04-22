/// <reference types="vite-plugin-svgr/client" />
import './Title.scss';
import { ReactComponent as Logo } from '../../assets/pointer-icon.svg';

/**
 * Splash screen component
 */
export const Title = () => (
  <div className='title-page-container'>
    <div className="title">
      Translator You!
    </div>
    <Logo className='logo' />
  </div>
);
