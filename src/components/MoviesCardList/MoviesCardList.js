import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import useResize from '../../hooks/screenHook';
import MoviesCard from '../MoviesCard/MoviesCard';
import { DEVICE_WIDTH } from '../../utils/constants';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ isSavedMovies, moviesList, savedMoviesList, onLike, onDelete }) {
  const { desktop, tablet, mobile } = DEVICE_WIDTH;
  const [, setIsCount] = useState(true);
  const [displayMovieList, setDisplayMovieList] = useState([]);
  const [cardsDetails, setCardsDetails] = useState({ total: 12, more: 3 });
  const location = useLocation();
  const resize = useResize();

  useEffect(() => {
    if (resize > desktop.width) {
      setCardsDetails(desktop.cards);
    } else if (resize <= desktop.width && resize > mobile.width) {
      setCardsDetails(tablet.cards);
    } else {
      setCardsDetails(mobile.cards);
    }
    return () => setIsCount(false);
  }, [resize, desktop, tablet, mobile]);

  useEffect(() => {
    if (moviesList.length) {
      const res = moviesList.filter((item, i) => i < cardsDetails.total);
      setDisplayMovieList(res);
    }
  }, [moviesList, cardsDetails.total]);

  function onClickMore() {
    const start = displayMovieList.length;
    const finish = start + cardsDetails.more;
    const more = moviesList.length - start;

    if (more > 0) {
      const newCards = moviesList.slice(start, finish);
      setDisplayMovieList([...displayMovieList, ...newCards]);
    }
  }

  return (
    <div className={`movies-list`}>
      <ul className='movies-list__container'>
        {displayMovieList.map(movie => (
          <MoviesCard
            key={movie.id || movie._id}
            isSavedMovies={isSavedMovies}
            onLike={onLike}
            onDelete={() => { onDelete(movie) }}
            movie={movie}
            savedMoviesList={savedMoviesList}
          />
        ))}
      </ul>
      {location.pathname === '/movies' && displayMovieList.length < moviesList.length && (
        <button
          className='movies-list__btn'
          onClick={onClickMore}>Еще</button>
      )}
    </div>
  )
}

export default MoviesCardList