import React, { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Main from '../Main/Main';
import Header from '../Header/Header';
import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import MenuPopup from '../MenuPopup/MenuPopup';
import ProtectedRouteElement from '../ProtectedRoute';

import MainApi from '../../utils/MainApi';
import MovieApi from '../../utils/MovieApi';
import Auth from '../../utils/auth';

function App() {
    const [currentUser, setCurrentUser] = useState('');
    const [isClickMenu, setClickMenu] = useState(false);
    const [movies, setMovies] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [emailUserHeader, setEmailUserHeader] = useState('');
    const navigate = useNavigate();
    const [enter, setEnter] = useState(false);

    const mainApi = new MainApi({
        url: 'localhost:3000',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
    });
    const movieApi = new MovieApi({
        url: 'https://api.nomoreparties.co/beatfilm-movies',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const auth = new Auth({
        url: 'http://localhost:3000',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    useEffect(() => {
        setTimeout(() => {
            loggedIn &&
                Promise.all([mainApi.getUserData(), mainApi.getAllMovies()])
                    .then(([user, movies]) => {
                        setCurrentUser(user);
                        setMovies(movies);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
        }, 0)
    }, [loggedIn]);

    function handleLogin(email, password) {
        auth
            .login(email, password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    setLoggedIn(true);
                    setEmailUserHeader(data.email);
                    navigate('/');
                }
            })
            .catch((err) => {
                setEnter(false);
                console.log(err);
            });
    }

    function handleRegister(name, email, password) {
        auth
            .register(name, email, password)
            .then((data) => {
                if (data) {
                    console.log('reg');
                    navigate('/signin');
                    setEnter(true);
                }
            })
            .catch((err) => {
                setEnter(true);
                console.log(err);
            });
    }

    function handleToken() {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth
                .getToken(jwt)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        setEmailUserHeader(res.email);
                        navigate('/');
                        console.log('token');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    useEffect(() => {
        handleToken();
    }, [loggedIn]);


    function handleSingOut() {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        navigate('/signin');
    }

    function handleOpenMenu() {
        setClickMenu(true);
    }

    function handleCloseMenu() {
        setClickMenu(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='app'>

                <Routes>
                    <Route path='/'
                        element={
                            <>
                                <Header isOpen={handleOpenMenu} />
                                <Main />
                                <Footer />
                            </>
                        }
                    />
                    <Route path='/signin' element={<Login onLogin={handleLogin} />} />
                    <Route path='/signup' element={<Register onRegister={handleRegister} />} />
                    <Route path='/profile'
                        element={
                            <ProtectedRouteElement
                                loggedIn={loggedIn}
                                element={<>
                                    <Header isOpen={handleOpenMenu} />
                                    <Profile />
                                </>}
                            />} />
                    <Route path='/movies'
                        element={
                            <ProtectedRouteElement
                                loggedIn={loggedIn}
                                element={<>
                                    <Header isOpen={handleOpenMenu} />
                                    <Movies />
                                    <Footer />
                                </>}
                            />} />
                    <Route path='/saved-movies'
                        element={
                            <ProtectedRouteElement
                                loggedIn={loggedIn}
                                element={<>
                                    <Header isOpen={handleOpenMenu} />
                                    <SavedMovies />
                                    <Footer />
                                </>}
                            />} />
                    <Route path='*'
                        element={<NotFound />} />
                </Routes>
            </div>
            <MenuPopup isOpen={isClickMenu} onClose={handleCloseMenu} />
        </CurrentUserContext.Provider>
    );
};

export default App;