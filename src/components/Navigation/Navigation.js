import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import menu from '../../images/menu.svg';
import icon from '../../images/profile.svg';

const Navigation = ({ isOpen }) => {
    return (
        <nav className='navigation'>
            <ul className='navigation__list'>
                <li className='navigation__list-item'>
                    <NavLink to='/movies' className='navigation__link'>
                        Фильмы
                    </NavLink>
                </li>
                <li className='navigation__list-item'>
                    <NavLink to='/saved-movies' className='navigation__link'>
                        Сохранённые фильмы
                    </NavLink>
                </li>
                <li className='navigation__list-item navigation__list-item_item_profile'>
                    <NavLink
                        to='/profile'
                        className='navigation__link navigation__link_item_profile'
                    >
                        <img
                            className='navigation__profile-icon'
                            src={icon}
                            alt='Иконка профиля'
                        />
                    </NavLink>
                </li>
            </ul>
            <button className='navigation__menu' onClick={isOpen}>
                <img src={menu} alt='Меню' />
            </button>
        </nav>
    );
};

export default Navigation;