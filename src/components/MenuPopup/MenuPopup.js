import React, { useEffect } from 'react';
import './MenuPopup.css';
import { NavLink } from 'react-router-dom';
import closeIcon from '../../images/close-icon-menu.svg';
import iconProfile from '../../images/profile.svg';


function Menu({ isOpen, onClose, setIsOpen }) {
    function handleEscClose(evt) {
        evt.key === 'Escape' && onClose();
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEscClose);
        return () => document.removeEventListener('keydown', handleEscClose);
    });

    return (
        <div
            className={`menu
    ${isOpen ? 'menu_opened' : ''}`}
        >
            <div className='menu__container'>
                <button className='menu__close-button' type='button'>
                    <img
                        className='menu__close-button-image'
                        src={closeIcon}
                        alt='Крестик для закрытия окна'
                        onClick={() => {
                            setIsOpen(false)
                        }}
                    />
                </button>
                <ul className='menu__items'>
                    <li className='menu__item'>
                        <NavLink to='/'>Главная</NavLink>
                    </li>
                    <li className='menu__item'>
                        <NavLink to='/movies'>Фильмы</NavLink>
                    </li>
                    <li className='menu__item'>
                        <NavLink to='/saved-movies'>Сохранённые фильмы</NavLink>
                    </li>
                    <li className='menu__item-account'>
                        <NavLink to='/profile'>
                            <img className='menu__item-account-image'
                                src={iconProfile}
                                alt='Иконка для перехода на страницу профиля' />
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Menu;