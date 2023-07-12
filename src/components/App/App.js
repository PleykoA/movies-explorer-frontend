import React, { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
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

function App() {
    const [currentUser, setCurrentUser] = useState('');
    const [isClickMenu, setClickMenu] = useState(false);

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
                    <Route path='/signin' element={<Login />} />
                    <Route path='/signup' element={<Register />} />
                    <Route path='/profile'
                        element={
                            <>
                                <Header isOpen={handleOpenMenu} />
                                <Profile />
                            </>
                        }
                    />
                    <Route path='/movies'
                        element={
                            <>
                                <Header isOpen={handleOpenMenu} />
                                <Movies />
                                <Footer />
                            </>
                        }
                    />
                    <Route path='/saved-movies'
                        element={
                            <>
                                <Header isOpen={handleOpenMenu} />
                                <SavedMovies />
                                <Footer />
                            </>
                        }
                    />
                    <Route path='*'
                        element={<NotFound />} />
                </Routes>
            </div>
            <MenuPopup isOpen={isClickMenu} onClose={handleCloseMenu} />
        </CurrentUserContext.Provider>
    );
};

export default App;