import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
    return (
        <section className='about-project' id='about-project'>

            <h2 className='about-project__title'>О проекте</h2>
            <div className='about-project__cards'>
                <div className='about-project__card'>
                    <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
                    <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className='about-project__card'>
                    <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
                    <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className='about-project__items'>
                <span className='about-project__item about-project__item_heading'>1 неделя</span>
                <span className='about-project__item'>4 недели</span>
            </div>
            <div className='about-project__subitem'>
                <span className='about-project__item-text'>Back-end</span>
                <span className='about-project__item-text'>Front-end</span>
            </div>

        </section>
    );
};

export default AboutProject;