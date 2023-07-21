import React, { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import MenuPopup from '../MenuPopup/MenuPopup';
import ProtectedRouteElement from '../ProtectedRoute';
import movieApi, { MOVIE_URL } from "../../utils/MovieApi";
import mainApi from '../../utils/MainApi';

function App() {
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState('');
    const headerPaths = ['/movies', '/saved-movies', '/profile'];
    const footerPaths = ['/movies', '/saved-movies'];
    const [isClickMenu, setClickMenu] = useState(false);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Отвечает за авторизацию
    const [errorMesage, setErrorMessage] = useState("");
    const [savedMovies, setSavedMovies] = useState([]);
    const [isPreloaderActive, setIsPreloaderActive] = useState(false);
    const [isDisabledEditProfile, setIsDisabledEditProfile] = useState(false);


    // Извлекаю базу фильмов из LocalStorage, проверяю на длинну и возращую значение для обновления стейта movies
    const extractAllMoviesLocal = () => {
        let allMoviesLocal = JSON.parse(localStorage.getItem("allMovies"));
        if (!allMoviesLocal) {
            return (allMoviesLocal = []);
        }
        return allMoviesLocal;
    };

    const [allMovies, setAllMovies] = useState(extractAllMoviesLocal());

    // Запрос списка всех фильмов и проведение ниобходимых операций с ним
    const convertMovieData = (movie) => {
        const convertedMovie = {
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `${MOVIE_URL}${movie.image.url}`,
            trailerLink: movie.trailerLink,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            thumbnail: `${MOVIE_URL}${movie.image.url}`,
            movieId: `${movie.id}`,
            saved: false,
        }

        return convertedMovie;
    }

    const setStatusSaved = (movie, savedMovies) => {
        let updatedMovie = movie;

        // Проверяю наличие списка сохраненных фильмов
        if (savedMovies.length >= 1) {
            const find = savedMovies.find(el => el.movieId === movie.movieId);

            // Проверяю найден ли фильм в спсике сохраненных фильмов
            if (find) {
                updatedMovie.saved = true;
            } else {
                updatedMovie.saved = false;
            }

        } else {
            updatedMovie = movie;
        }

        return updatedMovie;
    }

    const getAllMovies = () => {
        setIsPreloaderActive(true); // Включаем прелоадер
        movieApi
            .getMovies()
            .then((res) => {
                let moviesList = res.map((item) => convertMovieData(item)); // форматирование полей
                moviesList = moviesList.map((item) =>
                    setStatusSaved(item, savedMovies)
                ); // проверка на сохранение ранее
                setAllMovies(moviesList); // установка стейта
                localStorage.setItem("allMovies", JSON.stringify(moviesList)); // запись в LocalStorage
                setIsPreloaderActive(false); // Выключаем прелоадер
            })
            .catch((err) => {
                console.log(err)
            }
            );
    };

    // Обработка регистрации пользователя
    function handleRegister(name, email, password) {
        mainApi
            .signup(name, email, password)
            .then((data) => {
                if (data) {
                    navigate('/signin');
                }
            })
            .catch((err) => {
                setErrorMessage(err.response);
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
                }
            })
            .catch((err) => {
                setErrorMessage(err.response);
                console.log(err);
            });
    }

    // Обработка де-авторизации
    const handleSingOut = () => {
        mainApi
            .logout()
            .then((res) => {
                setIsLoggedIn(false);
                localStorage.clear();
                setAllMovies([]);
                setSavedMovies([]);
                setCurrentUser({});
                navigate("/");
                console.log(res);
            })
            .catch((err) => forceLogOutIfErr(err));
    };

    // Обработка обновления данных профиля
    const onUpdateUser = ({ name, email }) => {
        mainApi
            .updateUserInfo(name, email)
            .then((res) => {
                setCurrentUser(res.data);
                setIsDisabledEditProfile(false);
            })
            .catch((err) => {
                forceLogOutIfErr(err);
                setErrorMessage(err.response);
            });
    };

    // Обработка открытия попапа бургер меню
    /*    const handlePopupOpen = () => {
           setIsPopupOpned(!isPopupOpened);
       }; */

    // Получение данных о текущем пользователе и сохранении их в currentUser
    const getUserData = () => {
        if (isLoggedIn) {
            mainApi
                .getUserInfo()
                .then((res) => {
                    setCurrentUser(res.data);
                })
                .catch(err => forceLogOutIfErr(err));
        }
    };

    const handleSaveMovie = (movie) => {
        // Проверяю есть сохраняемый фильм среди уже сохраненных чтобы исключить повторное сохранение фильма
        const isMovieSawedAllReady = savedMovies.some(
            (item) => item.movieId === movie.movieId
        );

        if (!isMovieSawedAllReady) {
            // Удаляю лишнее свойство saved из объекта для сохранения в mongoDb 
            delete movie.saved;
            delete movie._id;
            // Отправляю фильм на сохранение в mongoDb
            mainApi
                .saveMovie(movie)
                .then((res) => {
                    // Сохраненный фильм сохраняю в массив сохраненных фильмов
                    setSavedMovies([...savedMovies, res.data]);
                    const updatedAllMovies = allMovies.map((el) =>
                        el.movieId === res.data.movieId
                            ? (el = { ...el, saved: true, _id: res.data._id })
                            : el
                    );
                    setAllMovies(updatedAllMovies);
                    localStorage.setItem("allMovies", JSON.stringify(updatedAllMovies));
                })
                .catch((err) => forceLogOutIfErr(err));
        }
    };

    const handleDeleteMovie = (movie) => {
        const { _id } = movie;
        mainApi
            .deleteMovie(_id)
            .then(() => {
                const newSavedMovies = savedMovies.filter(
                    (item) => item._id !== movie._id
                );
                setSavedMovies(newSavedMovies);
                const updatedAllMovies = allMovies.map((el) =>
                    el.movieId === movie.movieId ? (el = { ...el, saved: false }) : el
                );
                setAllMovies(updatedAllMovies);
                localStorage.setItem("allMovies", JSON.stringify(updatedAllMovies));
            })
            .catch((err) => forceLogOutIfErr(err));
    };

    // Отправяет данные на сервер, если ответ пришел и в нем есть id, то устанавливает статус LoggedIn и данные текущего пользователя
    function tokenCheck() {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            mainApi
                .getUserInfo(jwt)
                .then((res) => {
                    if (res.data._id) {
                        setCurrentUser(res.data);
                        setIsLoggedIn(true);
                        localStorage.setItem("login", true);
                    }
                })
                .catch(err => forceLogOutIfErr(err));
            ;
        }
    }
    // При загрузке страницы используем tokenCheck
    useEffect(() => {
        if (isLoggedIn) {
            tokenCheck();
        }
    }, [isLoggedIn]);


    /* 
        function handleToken() {
            const jwt = localStorage.getItem('jwt');
            if (jwt) {
                auth
                    .getToken(jwt)
                    .then((res) => {
                        if (res) {
                            setIsLoggedIn(true);
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
     */

    // Функция делает полный лог-аут в случае, если любой запрос к серверу заканчивается ошибкой авторизации
    const forceLogOutIfErr = (err) => {
        if (err.response === 'Authorization is needed') {
            setIsLoggedIn(false);
            localStorage.clear();
            setAllMovies([]);
            setSavedMovies([]);
            setCurrentUser({});
            setErrorMessage('');
            navigate("/");
            setIsDisabledEditProfile(false);
        } else { return err }
    }

    // При загрузке страницы запрашивает список сохраненных фильмов
    useEffect(() => {
        if (isLoggedIn) {
            mainApi
                .getSavedMovies()
                .then((data) => setSavedMovies(data.data))
                .catch((err) => {
                    forceLogOutIfErr(err);
                    console.log(err)
                });
        }
    }, [isLoggedIn]);


    /*   function handleSingOut() {
          setIsLoggedIn(false);
          localStorage.removeItem('jwt');
          navigate('/signin');
      } */

    function handleOpenMenu() {
        setClickMenu(true);
    }

    function handleCloseMenu() {
        setClickMenu(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='app'>
                {headerPaths.includes(location.pathname) && (
                    <Header isLoggedIn={isLoggedIn} />
                )}
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
                                onLogout={handleSingOut}
                                isLoggedIn={isLoggedIn}
                                handleUpdateUserData={onUpdateUser}
                                errorMesage={errorMesage}
                                setErrorMessage={setErrorMessage}
                                isDisabledEditProfile={isDisabledEditProfile}
                                setIsDisabledEditProfile={setIsDisabledEditProfile}
                                element={
                                    Profile
                                }
                            />} />
                    <Route path='/movies'
                        element={
                            <ProtectedRouteElement
                                isLoggedIn={isLoggedIn}
                                handleSaveMovie={handleSaveMovie}
                                savedMovies={savedMovies}
                                handleDeleteMovie={handleDeleteMovie}
                                allMovies={allMovies}
                                getAllMovies={getAllMovies}
                                isPreloaderActive={isPreloaderActive}
                                element={
                                    Movies
                                }
                            />} />
                    <Route path='/saved-movies'
                        element={
                            <ProtectedRouteElement
                                isLoggedIn={isLoggedIn}
                                handleDeleteMovie={handleDeleteMovie} А
                                element={SavedMovies}
                            />} />
                    <Route path='*'
                        element={<NotFound />} />
                </Routes>
                {footerPaths.includes(location.pathname) && <Footer />}
            </div>
            <MenuPopup isOpen={isClickMenu} onClose={handleCloseMenu} />
        </CurrentUserContext.Provider>
    );
};

export default App;