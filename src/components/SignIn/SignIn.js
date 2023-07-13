import React from 'react';
import { NavLink } from 'react-router-dom';
import './SignIn.css';

const SingIn = () => {
    return (
        <nav className='navigation'>
            <ul className='navigation__list'>
                <li className='navigation__list-item'>
                    <NavLink to='/signup' className='navigation__link'>Регистрация</NavLink>
                </li>
                <li className='navigation__list-item'>
                    <NavLink
                        to='/signin'
                        className='navigation__signin'>Войти</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default SingIn;