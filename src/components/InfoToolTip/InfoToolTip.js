import React from 'react';
import './InfoToolTip.css';
import failed from '../../images/failed.svg';
import enter from '../../images/enter.svg';


function InfoTooltip({ isOpen, onClose, successState, message }) {
    return (
        <section
            className={isOpen ? 'popup popup_opened' : 'popup'}
            name='infotooltip'
            onClick={onClose}
        >

            <div className='popup__container'>
                <img
                    className='infotooltip__image'
                    src={successState ? enter : failed}
                    alt={message}
                />
                <p className='infotooltip__text'>
                    {message}
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