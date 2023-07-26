import { Link } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import SignIn from '../SignIn/SignIn';
import logo from '../../images/logo.svg';

export default function Header({ isOpen, isLoggedIn }) {

    console.log(isLoggedIn);

    return (
        <header className='header'>
            <Link to='/' className='header__link'>
                <img src={logo} alt='Эмблема сайта' className='header__logo' />
            </Link>
            {!isLoggedIn ? (<SignIn />) : (<Navigation isOpen={isOpen} />)}
        </header>
    );
}