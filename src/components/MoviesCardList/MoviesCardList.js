import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import React from 'react';

export default function MoviesCardList({ movies }) {

  return (
    <section className='moviescard-list'>
      <ul className='movies-list'>
        <li><MoviesCard movies={movies} /></li>
        <li><MoviesCard movies={movies} /></li>
        <li><MoviesCard movies={movies} /></li>
        <li><MoviesCard movies={movies} /></li>
        <li><MoviesCard movies={movies} /></li>
        <li><MoviesCard movies={movies} /></li>
        <li><MoviesCard movies={movies} /></li>
        <li><MoviesCard movies={movies} /></li>
        <li><MoviesCard movies={movies} /></li>
      </ul>
    </section>
  );
};

