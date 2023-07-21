import React, { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterMovies } from "../../utils/FilterMovies";
import Preloader from '../Preloader/Preloader';

import {
  MOVIES_PER_PAGE_SIZE_MORE_1280,
  MOVIES_PER_PAGE_SIZE_761_1279,
  MOVIES_PER_PAGE_SIZE_LESS_761,
  MOVIES_BTN_ADD_SIZE_MORE_1280,
  MOVIES_BTN_ADD_SIZE_LESS_1279,
} from '../../utils/constants.js'

function Movies({
  handleSaveMovie, savedMovies, handleDeleteMovie, allMovies, getAllMovies, isLoading, handleClick,
}) {

  const [moviesToRender, setMoviesToRender] = useState([]);
  const [moviesStartPack, setMoviesStartPack] = useState(moviesToRender);
  const [isBtnHidden, setIsBtnHidden] = useState(false);
  const [moviesPerPage, setMoviesPerPage] = useState(MOVIES_PER_PAGE_SIZE_MORE_1280);
  const [moviesAddToPage, setMoviesAddToPage] = useState(MOVIES_BTN_ADD_SIZE_MORE_1280);

  // Определение ширины экрана и установление количества отображемых фильмов на страинце и количества добавляемых фильмов при нажатие клавиши Еще
  const checkWindowWidth = () => {
    const screenWidth = window.screen.width;

    if (screenWidth >= 1280) {
      setMoviesPerPage(MOVIES_PER_PAGE_SIZE_MORE_1280);
      setMoviesAddToPage(MOVIES_BTN_ADD_SIZE_MORE_1280);
    } else if (screenWidth < 1280 && screenWidth > 761) {
      setMoviesPerPage(MOVIES_PER_PAGE_SIZE_761_1279);
      setMoviesAddToPage(MOVIES_BTN_ADD_SIZE_LESS_1279);
    } else {
      setMoviesPerPage(MOVIES_PER_PAGE_SIZE_LESS_761);
      setMoviesAddToPage(MOVIES_BTN_ADD_SIZE_LESS_1279);
    }
  };

  // Извлекаю статус чекбокса фильтрации по короткометражным фильмам из LocalStorage и возращую значение для обновления стейта isCheckBoxActive
  const extractCheckBoxStatus = () => {
    const userCheckBoxStatus = JSON.parse(localStorage.getItem("checkBox"));
    return userCheckBoxStatus ? userCheckBoxStatus : false;
  };

  // Извлекаю статус чекбокса фильтрации по короткометражным фильмам из LocalStorage и возращую значение для обновления стейта isCheckBoxActive
  const extractKeyWords = () => {
    const userKeyWords = localStorage.getItem("keyWords");
    return userKeyWords ? userKeyWords : "";
  };

  const [isCheckBoxActive, setIsCheckBoxActive] = useState(
    extractCheckBoxStatus()
  );
  const [flag] = useState("movies");

  // Обработка запроса на поиск фильма
  const handleMoviesSearch = (text, isCheckBoxActive) => {
    if (allMovies.length < 1) {
      getAllMovies();
    }
    setKeyWords(text);
  };

  const [keyWords, setKeyWords] = useState(extractKeyWords());

  // Обратботка нажатия на чекбокс для коротко метражных фильмов
  const handleCheckBoxClick = () => {
    setIsCheckBoxActive(!isCheckBoxActive);
  };

  // Сохранение в LocalStorage статус чекбокса фильтрации короткометражных фильмов
  useEffect(() => {
    localStorage.setItem("checkBox", isCheckBoxActive);
  }, [isCheckBoxActive]);

  useEffect(() => {
    const moviesFiltered = filterMovies(allMovies, keyWords, isCheckBoxActive);
    setMoviesToRender(moviesFiltered);
  }, [isCheckBoxActive, keyWords, allMovies]);

  // ОБработка на жатися на иконку сохраниить фильм (в зависимости от статуса фильма происходит разные действия)
  const handleClickSaveIcon = (data, isSaved) => {
    if (!isSaved) {
      handleSaveMovie(data);
    } else {
      const deletetMovie = savedMovies.filter(
        (item) => item.movieId === data.movieId
      );
      handleDeleteMovie(deletetMovie[0]);
    }
  };

  // Сохраняет ключевое слово с LocalStorage каждай раз при его изменении
  useEffect(() => {
    localStorage.setItem("keyWords", keyWords);
  }, [keyWords]);

  // В зависимости от страницы  (movies or saved-movies) управляет состоянием кнопки Еще и количеством фильмов на странице
  useEffect(() => {
    switch (flag) {
      case 'saved':
        setIsBtnHidden(true);
        setMoviesStartPack(moviesToRender);
        break;
      case 'movies':
        if (moviesToRender.length <= moviesPerPage) {
          setIsBtnHidden(true);
        } else { setIsBtnHidden(false); };
        setMoviesStartPack(moviesToRender.slice(0, moviesPerPage));
        break;
      default:
        console.log('error');
        break;
    }

  }, [moviesToRender, flag, moviesPerPage]);
  // Определяю размер экрана при загрузке страницы
  useEffect(() => {
    checkWindowWidth();
  }, [moviesToRender]);

  // Следит за размерами экрана и запускат функцию checkWindowWidth с задержкой
  window.onresize = (event) => {
    setTimeout(checkWindowWidth, 50);
  };

  // Функция изменяет стейт количество фильмов на странице по принципу
  const handleClickMoreMovies = () => {
    setMoviesPerPage(moviesPerPage + moviesAddToPage);
  };


  return (
    <section className='movies'>
      <SearchForm
        handleMoviesSearch={handleMoviesSearch}
        keyWords={keyWords}
        isCheckBoxActive={isCheckBoxActive}
        handleCheckBoxClick={handleCheckBoxClick}
        setKeyWords={setKeyWords}
        setIsCheckBoxActive={setIsCheckBoxActive} />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          moviesToRender={moviesToRender}
          flag={flag}
          handleClick={handleClickSaveIcon}
          allMovies={allMovies} />
      )}
      <button className={`movies__btn ${isBtnHidden ? "movies__btn_disabled" : ""
        }`}
        type="button"
        onClick={handleClickMoreMovies}>Ещё</button>
    </section>
  );
}

export default Movies;