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
    const [currentUser, setCurrentUser] = useState({});
    const headerPaths = ['/movies', '/saved-movies', '/profile'];
    const footerPaths = ['/movies', '/saved-movies'];
    const [isClickMenu, setClickMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSingUpSuccess, setIsSingUpSuccess] = useState(false);
    const [successTTState, setSuccessTTState] = useState(false);
    const [ToolTipMessage, setToolTipMessage] = useState('');
    const [savedMoviesList, setSavedMoviesList] = useState([]);
    const [, setNotFound] = useState(false);
    const [isInfoTooltipOpen, setInfoTTOpen] = useState(false);
    const [closePopup, setAllTTClose] = useState(false);
    const [tempUserData, settempUserData] = useState([]);

    useEffect(() => {
        checkToken();
    }, []);

    function handleRegister(params) {
        mainApi
            .signup(params)
            .then((data) => {
                if (data) {
                    setIsSingUpSuccess(true);
                    setSuccessTTState(true);
                    setToolTipMessage("Вы успешно зарегистрировались!");
                    setInfoTTOpen(true);
                    settempUserData(params);
                }
            })
            .catch((err) => {
                setIsSingUpSuccess(false);
                setSuccessTTState(false);
                if (err.message.indexOf("409") > 0) {
                    setToolTipMessage("Изменения не сохранены! Пользователь с таким email уже существует");
                } else {
                    setToolTipMessage("Произошла ошибка! Изменения не сохранены!");
                }
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
                    mainApi
                        .getUserInfo()
                        .then((user) => {
                            setCurrentUser(user);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    setIsLoggedIn(true);
                    navigate('/movies');
                }
            })
            .catch((err) => {
                setIsSingUpSuccess(false);
                setInfoTTOpen(true);
                setToolTipMessage("Пользователь не найден!");
                console.log(err);
            });
    }

    useEffect(() => {
        setInfoTTOpen(false);
        if (isSingUpSuccess) {
            handleLogin(tempUserData.email, tempUserData.password);
            settempUserData([]);
        }
    }, [closePopup]);

    useEffect(() => {
        let routesArr = reactRouterToArray(routes);
        if (routesArr.includes(location.pathname)) {
            setNotFound(true);
        } else {
            setNotFound(false);
        }
    }, [navigate]);

    function checkToken() {
        mainApi
            .getUserInfo()
            .then((user) => {
                setCurrentUser(user);
                setIsLoggedIn(true);
                localStorage.setItem('loggedIn', true);
                if (location.pathname === '/signin' || location.pathname === '/signup') {
                    navigate('/movies', { replace: true })
                } else {
                    navigate({ location }, { replace: true })
                }
            })
            .catch((error) => {
                console.log(error);
                if (headerPaths.includes(location.pathname)) {
                    navigate('/');
                }
                setIsLoggedIn(false);
            });
    }

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
                setToolTipMessage("Изменения успешно сохранены!");
                setSuccessTTState(true);
                setInfoTTOpen(true);
            })
            .catch((error) => {
                if (error.message.indexOf("409") > 0) {
                    setToolTipMessage("Изменения не сохранены! Пользователь с таким email уже существует");
                } else {
                    setToolTipMessage("Произошла ошибка! Изменения не сохранены!");
                }
                setSuccessTTState(false);
                setInfoTTOpen(true);
            });
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
        if (isLoggedIn && currentUser && (location.pathname === '/movies' || location.pathname === '/saved-movies')) {
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
                    <Header isOpen={handleOpenMenu} isLoggedIn={isLoggedIn} />
                )}
                <Routes>
                    <Route path='/'
                        element={
                            <>
                                <Header isLoggedIn={isLoggedIn} />
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
                successState={successTTState}
                message={ToolTipMessage}
            />
        </CurrentUserContext.Provider>
    );

    return routes;
};

export default App;