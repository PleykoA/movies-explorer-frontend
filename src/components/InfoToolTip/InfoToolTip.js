import React from 'react';
import './InfoToolTip.css';
import failed from '../../images/failed.svg';
import enter from '../../images/enter.svg';


function InfoTooltip({ isOpen, onClose, isSingUpSuccess }) {
    return (
        <section
            className={isOpen ? 'popup popup_opened' : 'popup'}
            name='infotooltip'
            onClick={onClose}
        >

            <div className='popup__container'>
                <img
                    className='infotooltip__image'
                    src={isSingUpSuccess ? enter : failed}
                    alt={isSingUpSuccess ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так'}
                />
                <p className='infotooltip__text'>
                    {isSingUpSuccess ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </p>
                <button
                    className='popup__close-button'
                    type='button'
                    onClick={onClose}
                />

            </div>
        </section >
    );
}

export default InfoTooltip;