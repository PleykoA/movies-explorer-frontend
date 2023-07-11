import React from 'react';
import './Portfolio.css';
import string from '../../images/string.svg';

function Portfolio() {
    return (
        <section className='portfolio'>
            <h2 className='portfolio__header'>Портфолио</h2>
            <ul className='portfolio__items'>
                <li className='portfolio__item'>
                    <a
                        className='portfolio__link'
                        href='https://github.com/PleykoA/how-to-learn'
                        target='_blank'
                        rel='noreferrer'
                    >
                        <p className='portfolio__link-text'>Статичный сайт</p>
                        <img
                            className='portfolio__link-image'
                            src={string}
                            alt='Ссылка на сайт'
                        />
                    </a>
                </li>
                <li className='portfolio__item'>
                    <a
                        className='portfolio__link'
                        href='https://github.com/PleykoA/russian-travel'
                        target='_blank'
                        rel='noreferrer'
                    >
                        <p className='portfolio__link-text'>Адаптивный сайт</p>
                        <img
                            className='portfolio__link-image'
                            src={string}
                            alt='Ссылка на сайт'
                        />
                    </a>
                </li>
                <li className='portfolio__item'>
                    <a
                        className='portfolio__link'
                        href='https://github.com/PleykoA/react-mesto-api-full-gha'
                        target='_blank'
                        rel='noreferrer'
                    >
                        <p className='portfolio__link-text'>Одностраничное приложение</p>
                        <img
                            className='portfolio__link-image'
                            src={string}
                            alt='Ссылка на сайт'
                        />
                    </a>
                </li>
            </ul>
        </section>
    );
};

export default Portfolio;