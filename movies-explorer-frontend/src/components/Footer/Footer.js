import React from 'react';
import './Footer.css';

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__copyright'>
        <p className='footer__date'>&copy;&nbsp;{currentYear}</p>
        <div className='footer__links'>
          <a
            className='footer__link'
            href='https://practicum.yandex.ru/'
            target='_blank'
            rel='noreferrer'
          >
            Яндекс.Практикум
          </a>
          <a
            className='footer__link'
            href='https://github.com/PleykoA'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;