import React, { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Main from '../Main/Main';
import Header from '../Header/Header';
import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import InfoTooltip from '../InfoToolTip/InfoToolTip';
import NotFound from '../NotFound/NotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import MenuPopup from '../MenuPopup/MenuPopup';
import ProtectedRouteElement from '../ProtectedRoute';
import mainApi from '../../utils/MainApi';
import reactRouterToArray from "react-router-to-array";

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState('');
    const headerPaths = ['/movies', '/saved-movies', '/profile'];
    const footerPaths = ['/movies', '/saved-movies'];
    const [isClickMenu, setClickMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSingUpSuccess, setIsSingUpSuccess] = useState(false);
    const [savedMoviesList, setSavedMoviesList] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [isInfoTooltipOpen, setInfoTTOpen] = useState(false);
    const [closePopup, setAllTTClose] = useState(false);

    function handleRegister(params) {
        mainApi
            .signup(params)
            .then((data) => {
                if (data) {
                    setIsSingUpSuccess(true);
                    setInfoTTOpen(true);
                }
            })
            .catch((err) => {
                setIsSingUpSuccess(false);
                setInfoTTOpen(true);
                console.log(err);
            });
    }

    function handleLogin(email, password) {
        mainApi
            .login(email, password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    setIsLoggedIn(true);
                    getUserData();
                    navigate('/movies');
                    setAllTTClose(true);
                }
            })
            .catch((err) => {
                setIsSingUpSuccess(false);
                setInfoTTOpen(true);
                console.log(err);
            });

    }

    useEffect(() => {
        setInfoTTOpen(false);
        if (isSingUpSuccess) {
            navigate('/signin');
        }
    }, [closePopup]);

    useEffect(() => {
        if (!isLoggedIn) {
            mainApi
                .getUserInfo()
                .then((user) => {
                    setCurrentUser(user);
                    setIsLoggedIn(true);
                    localStorage.setItem('loggedIn', true);
                })
                .catch((error) => console.log(error));
        }
        let routesArr = reactRouterToArray(routes);

        if (routesArr.includes(location.pathname)) {
            setNotFound(true);
        } else {
            setNotFound(false);
        }

    }, [navigate, isLoggedIn]);

    function handleSignOut() {
        mainApi
            .logout()
            .then((res) => {
                setIsLoggedIn(false);
                localStorage.clear();
                setSavedMoviesList([]);
                setCurrentUser({});
                navigate('/');
                console.log(res);
            })
            .catch((error) => console.log(error));
    };

    function handleProfileEdit(values) {
        mainApi
            .updateUserInfo(values.name, values.email)
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((error) => console.log(error));
    };

    function handleLikeMovie(movie, isLiked, id) {
        if (isLiked) {
            handleDeleteMovie(id);
        } else {
            mainApi
                .saveMovie(movie)
                .then((res) => {
                    setSavedMoviesList([...savedMoviesList, res]);
                })
                .catch((error) => console.log(error));
        }
    };

    function handleDeleteMovie(movie) {
        if (typeof movie === 'object') {
            movie = movie._id;
        }
        mainApi
            .deleteMovie(movie)
            .then(() => {
                const freshMovies = savedMoviesList.filter(m => {
                    if (movie === m._id) {
                        return false;
                    } else {
                        return true;
                    }
                });
                setSavedMoviesList(freshMovies);
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        if (isLoggedIn && currentUser) {
            mainApi
                .getSavedMovies()
                .then(data => {
                    const UserMoviesList = data.filter(m => m.owner === currentUser._id);
                    setSavedMoviesList(UserMoviesList);
                })
                .catch((error) => console.log(error));
        }
    }, [currentUser, isLoggedIn]);

    useEffect(() => {
    }, [savedMoviesList]);

    function getUserData() {
        if (isLoggedIn) {
            mainApi
                .getUserInfo()
                .then((res) => {
                    setCurrentUser(res.data);
                })
                .catch((error) => console.log(error));
        }
    };

    function tokenCheck() {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            mainApi
                .getUserInfo()
                .then((res) => {
                    if (res._id) {
                        setCurrentUser(res);
                        setIsLoggedIn(true);
                        if (notFound) {
                            navigate('/movies');
                        }
                    }
                })
                .catch((error) => console.log(error));
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            tokenCheck();
        }
    }, [isLoggedIn]);


    function handleOpenMenu() {
        setClickMenu(true);
    }

    function handleCloseMenu() {
        setClickMenu(false);
    }
    const routes = (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='app'>
                {headerPaths.includes(location.pathname) && (
                    <Header isOpen={handleOpenMenu} />
                )}
                <Routes>
                    <Route path='/'
                        element={
                            <>
                                <Header />
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
                                element={Profile}
                                loggedIn={isLoggedIn}
                                onSignOut={handleSignOut}
                                handleProfileEdit={handleProfileEdit}
                            />} />
                    <Route path='/movies'
                        element={
                            <ProtectedRouteElement
                                element={Movies}
                                loggedIn={isLoggedIn}
                                savedMoviesList={savedMoviesList}
                                onLike={handleLikeMovie}
                                onDelete={handleDeleteMovie}
                            />} />
                    <Route path='/saved-movies'
                        element={
                            <ProtectedRouteElement
                                loggedIn={isLoggedIn}
                                element={SavedMovies}
                                savedMoviesList={savedMoviesList}
                                onDelete={handleDeleteMovie}
                            />} />
                    <Route path='*'
                        element={<NotFound />} />
                </Routes>

                {footerPaths.includes(location.pathname) && <Footer />}
            </div>
            <MenuPopup isOpen={isClickMenu} onClose={handleCloseMenu} setIsOpen={handleCloseMenu} />
            <InfoTooltip
                isOpen={isInfoTooltipOpen}
                onClose={setAllTTClose}
                isSingUpSuccess={isSingUpSuccess}
            />
        </CurrentUserContext.Provider>
    );

    return routes;
};

export default App;