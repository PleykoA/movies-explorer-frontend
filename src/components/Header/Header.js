import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import SignIn from '../SignIn/SignIn';
import logo from '../../images/logo.svg';

export default function Header({ isOpen }) {
    const location = useLocation();

    return (
        <header className='header'>
            <Link to='/' className='header__link'>
                <img src={logo} alt='Эмблема сайта' className='header__logo' />
            </Link>
            {location.pathname === '/' ? (<SignIn />) : (<Navigation isOpen={isOpen} />)}
        </header>
    );
}