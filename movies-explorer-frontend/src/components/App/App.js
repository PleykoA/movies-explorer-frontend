import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import SavedMovies from '../SavedMovies/SavedMovies';

const App = () => {
    return (
        <div className='page'>
            <Routes>
                <Route
                    path='/'
                    element={
                        <>
                            <Header loggedIn={false} />
                            <Main />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path='/movies'
                    element={
                        <>
                            <Header loggedIn={true} />
                            <Movies />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path='/saved-movies'
                    element={
                        <>
                            <Header loggedIn={true} />
                            <SavedMovies />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path='/profile'
                    element={
                        <>
                            <Header loggedIn={true} />
                            <Profile />
                        </>
                    }
                />
                <Route path='/signin' element={<Login />} />
                <Route path='/signup' element={<Register />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default App;