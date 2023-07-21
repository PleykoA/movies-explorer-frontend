import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

const MoviesCardList = ({
  movies,
  savedMovies,
  onLikeMovie,
  onDeleteMovie }) => {
  let location = useLocation();

  movies =
    location.pathname === '/saved-movies'
      ? movies.filter((m) => m.isLiked)
      : movies;
  return (
    <ul className='movies-list'>
      {
        movies.map((movie) => {
          return <MoviesCard
            key={movie.id || movie.movieId}
            movie={movie}
            savedMovies={savedMovies}
            onLikeMovie={onLikeMovie}
            onDeleteMovie={onDeleteMovie} />;
        })
      }
    </ul>
  );
};

export default MoviesCardList;