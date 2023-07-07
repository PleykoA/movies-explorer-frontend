import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { savedMovies } from '../../utils/constants';

const SavedMovies = () => {
    return (
        <div className='saved-movies'>
            <SearchForm />
            <MoviesCardList
                moviesAreLeft={false}
                isSaved={true}
                renderedCards={savedMovies}
            />
        </div>
    );
};

export default SavedMovies;