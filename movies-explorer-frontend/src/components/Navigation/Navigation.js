import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import icon from '../../images/profile.svg';
import PopupMenu from '../PopupMenu/PopupMenu';

const Navigation = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClick = () => {
        if (!isOpen) setIsOpen(true);
        else {
            setIsOpen(false);
        }
    };

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    const setWindowDimensions = () => {
        setWindowWidth(window.innerWidth);
    };
    React.useEffect(() => {
        window.addEventListener('resize', setWindowDimensions);
        return () => {
            window.removeEventListener('resize', setWindowDimensions);
        };
    }, []);

    return (
        <nav className='navigation'>
            {windowWidth > 800 && (
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
                    <li className='navigation__list-item navigation__list-item_type_profile'>
                        <NavLink
                            to='/profile'
                            className='navigation__link navigation__link_type_profile'
                        >
                            <span className='navigation__profile-subtext'></span>
                            <img
                                className='navigation__profile-icon'
                                src={icon}
                                alt='Иконка профиля'
                            />
                        </NavLink>
                    </li>
                </ul>
            )}
            {windowWidth <= 800 && (
                <button
                    className='navigation__menu'
                    onClick={handleClick}
                ></button>
            )}
            <PopupMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </nav>
    );
};

export default Navigation;