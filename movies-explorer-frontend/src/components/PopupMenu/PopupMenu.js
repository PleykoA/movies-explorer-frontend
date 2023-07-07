import React from 'react';
import './PopupMenu.css';
import { NavLink } from 'react-router-dom';
import icon from '../../images/profile.svg';

const PopupMenu = ({ isOpen, setIsOpen }) => {
    return (
        <aside
            className={
                isOpen ? 'menu__sidebar menu__sidebar_type_open' : 'menu__sidebar'
            }
        >
            <div
                className={
                    isOpen ? 'menu__wrapper menu__wrapper_type_opened' : 'menu__wrapper'
                }
            >
                <button
                    className='menu__close-btn'
                    onClick={() => {
                        setIsOpen(false);
                    }}
                ></button>
                <ul className='menu__list'>
                    <li className='menu__list-item'>
                        <NavLink to='/' className='menu__link'>
                            Главная
                        </NavLink>
                    </li>
                    <li className='menu__list-item'>
                        <NavLink to='/movies' className='menu__link'>
                            Фильмы
                        </NavLink>
                    </li>
                    <li className='menu__list-item'>
                        <NavLink to='/saved-movies' className='menu__link'>
                            Сохранённые фильмы
                        </NavLink>
                    </li>
                    <li className='menu__list-item menu__list-item_type_profile'>
                        <NavLink
                            to='/profile'
                            className='menu__link menu__link_type_profile'
                        >
                            <span className='menu__profile-subtext'>Аккаунт</span>
                            <img
                                className='menu__profile-icon'
                                src={icon}
                                alt='Кликабельная иконка профиля'
                            />
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default PopupMenu;