import React, { useState, useEffect, useContext } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { filterMovies, filterShorts } from '../../utils/utils.js';
import movieApi from '../../utils/MovieApi';
import Preloader from '../Preloader/Preloader';

function Movies({ savedMoviesList, onLike, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const [NotFound, setNotFound] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isAllMovies, setIsAllMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  function handleSetFilteredMovies(movies, userQuery, shortMoviesCheckbox) {
    const moviesList = filterMovies(movies, userQuery, false);
    if (moviesList.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
    setInitialMovies(moviesList);
    setFilteredMovies(
      shortMoviesCheckbox ? filterShorts(moviesList) : moviesList
    );
    localStorage.setItem(`movies`, JSON.stringify(moviesList));
  }

  function handleFormSubmit(inputValue, loadAll) {
    setIsLoader(true);
    localStorage.setItem(`movieSearch`, inputValue);
    localStorage.setItem(`shortMovies`, shortMovies);

    if (loadAll) {
      movieApi
        .getMovies()
        .then(movies => {
          setInitialMovies(movies);
          localStorage.setItem(`movies`, JSON.stringify(movies));
          if (
            localStorage.getItem(`shortMovies`) === 'true'
          ) {
            setFilteredMovies(filterShorts(movies));
          } else {
            setFilteredMovies(movies);
          }
          handleSetFilteredMovies(movies, inputValue, shortMovies);
          if (movies.length < 1) {
            setNotFound(false);
          }
        })
        .catch(() => console.log()
        )
        .finally(() => {
          setIsLoader(false);
        });
    } else {
      if (isAllMovies.length === 0) {
        movieApi
          .getMovies()
          .then(movies => {
            setIsAllMovies(movies);
            handleSetFilteredMovies(isAllMovies, inputValue, shortMovies);
          })
          .catch((err) => console.log(err)
          )
          .finally(() => setIsLoader(false));
      } else {
        handleSetFilteredMovies(isAllMovies, inputValue, shortMovies);
        setIsLoader(false)
      }
    }
  }

  function displayShortFilms() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      setFilteredMovies(filterShorts(initialMovies))
    } else {
      setFilteredMovies(initialMovies)
    }
    localStorage.setItem(`shortMovies`, !shortMovies);
  }

  useEffect(() => {
    if (localStorage.getItem(`shortMovies`) === 'true') {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
    if (localStorage.getItem(`movieSearch`)) {
      handleFormSubmit(localStorage.getItem(`movieSearch`), false)
    }
  }, [currentUser]);

  useEffect(() => {
    if (localStorage.getItem(`movies`) && JSON.parse(localStorage.getItem(`movies`)).length > 0) {
      const movies = JSON.parse(
        localStorage.getItem(`movies`)
      );
      setInitialMovies(movies);
      if (
        localStorage.getItem(`shortMovies`) === 'true'
      ) {
        setFilteredMovies(filterShorts(movies));
      } else {
        setFilteredMovies(movies);
      }
    } else {
      movieApi
        .getMovies()
        .then(movies => {
          setInitialMovies(movies);
          localStorage.setItem(`movies`, JSON.stringify(movies));
          if (
            localStorage.getItem(`shortMovies`) === 'true'
          ) {
            setFilteredMovies(filterShorts(movies));
          } else {
            setFilteredMovies(movies);
          }
        })
        .catch((err) => console.log(err)
        )
        .finally(() => setIsLoader(false));
    }
  }, [currentUser]);

  return (
    <section className='movies'>
      <SearchForm
        handleFormSubmit={handleFormSubmit}
        displayShortFilms={displayShortFilms}
        shortMovies={shortMovies}
      />
      {isLoader && <Preloader />}
      {!NotFound ?
        (<MoviesCardList
          isSavedMovies={false}
          moviesList={filteredMovies}
          savedMoviesList={savedMoviesList}
          onLike={onLike}
          onDelete={onDelete}
        />) : (
          <div className='movies__not-found'>По Вашему запросу ничего не найдено :С</div>
        )
      }
    </section>
  );
}

export default Movies;