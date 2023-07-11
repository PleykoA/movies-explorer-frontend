import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = () => {
    return (
        <section className='saved-movies'>
            <SearchForm />
            <MoviesCardList movies={true} />
        </section>
    );
};

export default SavedMovies;