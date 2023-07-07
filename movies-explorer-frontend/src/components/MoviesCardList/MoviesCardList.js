import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useResize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const getSize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });

    getSize();

    window.addEventListener('resize', getSize);
    return () => window.removeEventListener('resize', getSize);
  }, []);

  return size;
};

const MoviesCardList = ({ movies }) => {
  let size = useResize();
  let location = useLocation();

  movies =
    location.pathname === '/saved-movies'
      ? movies.filter((m) => m.isLiked)
      : movies;
  return (
    <ul className='movies-list'>
      {size.width <= 450
        ? movies?.slice(0, 5).map((movie) => {
            return <MoviesCard key={movie.movieId} movie={movie} />;
          })
        : size.width <= 850
        ? movies?.slice(0, 8).map((movie) => {
            return <MoviesCard key={movie.movieId} movie={movie} />;
          })
        : movies?.map((movie) => {
            return <MoviesCard key={movie.movieId} movie={movie} />;
          })}
    </ul>
  );
};

export default MoviesCardList;