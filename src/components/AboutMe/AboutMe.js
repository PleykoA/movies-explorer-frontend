import React from 'react';
import avatar from '../../images/vitaliy.jpg';
import './AboutMe.css';
import { Link } from 'react-router-dom';

const AboutMe = () => {
    return (
        <section className='about-me' id='aboutme'>
            <h2 className='about-me__heading'>Студент</h2>
            <div className='about-me__container'>
                <div className='about-me__info'>
                    <h3 className='about-me__title'>Виталий</h3>
                    <h4 className='about-me__subtitle'>Фронтенд-разработчик, 30 лет</h4>
                    <p className='about-me__description'>
                        Я родился и живу в Саратове, закончил факультет экономики СГУ. У
                        меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
                        бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
                        Контур». После того, как прошёл курс по веб-разработке, начал
                        заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <Link className='about-me__link' to="#">Github</Link>
                </div>

                <img
                    className='about-me__photo'
                    src={avatar}
                    alt='Фотография Виталия'
                />
            </div>
        </section>
    );
};

export default AboutMe;