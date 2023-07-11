import React from 'react';
import './Promo.css';
import NavTab from '../NavTab/NavTab';
import promo from '../../images/logoPromo.svg'

function Promo() {
    return (
        <section className='promo'>
            <div className='promo__container'>
                <h1 className='promo__heading'>
                    Учебный проект студента факультета Веб-разработки.
                </h1>
                <img src={promo} className='promo__image' alt='Логотип'></img>
                <NavTab />
            </div>
        </section>
    );
};

export default Promo;