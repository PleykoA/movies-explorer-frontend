import React from "react";
import { Link } from "react-router-dom";
import clickingLogo from "../../images/logo.svg";
import "./Header.css";
import SignIn from "../SignIn/SignIn";
import Navigation from "../Navigation/Navigation";

const Header = ({ loggedIn }) => {
    return (
        <header className={`header ${!loggedIn ? "header_type_unauthorized" : ""}`}>
            <Link to="/" className="header__link">
                <img src={clickingLogo} alt="Эмблема сайта" className="header__logo" />
            </Link>
            {loggedIn && <Navigation />}
            {!loggedIn && <SignIn />}
        </header>
    );
};

export default Header;