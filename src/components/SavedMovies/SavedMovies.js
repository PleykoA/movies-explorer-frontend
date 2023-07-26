import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterMovies, filterShorts } from '../../utils/utils';

function SavedMovies({ onDelete, savedMoviesList }) {
    const [shortMovies, setShortMovies] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [displayShort] = useState(savedMoviesList);
    const [filteredMovies, setFilteredMovies] = useState(displayShort);

    function displayShortFilms() {
        setShortMovies(!shortMovies);
        localStorage.setItem(`shortSavedMovies`, !shortMovies);
        if (!shortMovies) {
            let moviesList = filterShorts(savedMoviesList);
            setFilteredMovies(moviesList);
            moviesList.length === 0 ? setNotFound(true) : setNotFound(false);
        } else {
            setFilteredMovies(savedMoviesList);
            savedMoviesList.length === 0 ? setNotFound(true) : setNotFound(false);
        }
    }

    function handleFormSubmit(value) {
        const moviesList = filterMovies(savedMoviesList, value, shortMovies);
        if (moviesList.length === 0) {
            setNotFound(true);
        } else {
            setNotFound(false);
            setFilteredMovies(moviesList);
        }
    }

    function handleDeleteMovie(movie) {
        if (typeof movie === 'object') {
            movie = movie._id;
        }

        const freshMovies = filteredMovies.filter(m => {
            if (movie === m._id) {
                return false;
            } else {
                return true;
            }
        });
        onDelete(movie);
        setFilteredMovies(freshMovies);
    }

    useEffect(() => {
        setFilteredMovies(filteredMovies);
        filteredMovies.length !== 0 ? setNotFound(false) : setNotFound(true);

    }, [shortMovies, filteredMovies]);

    return (
        <section className='saved-movies'>
            <SearchForm
                handleFormSubmit={handleFormSubmit}
                displayShortFilms={displayShortFilms}
                shortMovies={shortMovies}
            />
            {!notFound ? (
                <MoviesCardList
                    isSavedMovies={true}
                    moviesList={filteredMovies}
                    savedMoviesList={filteredMovies}
                    onDelete={handleDeleteMovie}
                />
            ) : (
                <p>Ничего не найдено :С</p>
            )}
        </section>
    );
};

export default SavedMovies;