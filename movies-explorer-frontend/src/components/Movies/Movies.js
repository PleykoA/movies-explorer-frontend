import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { savedMovies } from '../../utils/constants';

const Movies = () => {
  return (
    <section className='movies'>
      <SearchForm />
      <MoviesCardList movies={savedMovies} />
      <button className='movies__btn'>Ещё</button>
    </section>
  );
};

export default Movies;