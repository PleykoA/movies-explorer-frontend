import React from 'react';
import { NavLink } from 'react-router-dom';
import './SignIn.css';

const SingIn = () => {
    return (
        <nav className="navigation">
            <ul className="navigation__list_type_unauthorized">
                <li className="navigation__list-item">
                    <NavLink to="/signup" className="navigation__link">
                        Регистрация
                    </NavLink>
                </li>
                <li className="navigation__list-item">
                    <NavLink
                        to="/signin"
                        className="navigation__link_type_bright"
                    >
                        Войти
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default SingIn;