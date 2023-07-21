import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterMovies } from '../../utils/FilterMovies';

const SavedMovies = ({ savedMovies, handleDeleteMovie }) => {
    const [flag] = useState('saved');
    const [keyWords, setKeyWords] = useState('');
    const [moviesToRender, setMoviesToRend] = useState(savedMovies);
    const [isCheckBoxActive, setIsCheckBoxActive] = useState(false);

    // Обработка запроса на поиск фильма
    const handleMoviesSearch = (data, isCheckBoxActive) => {
        setKeyWords(data);
        const moviesFiltered = filterMovies(savedMovies, data, isCheckBoxActive)
        setMoviesToRend(moviesFiltered);
    }

    useEffect(() => {
        const moviesFiltered = filterMovies(savedMovies, keyWords, isCheckBoxActive)
        setMoviesToRend(moviesFiltered);
    }, [isCheckBoxActive])

    useEffect(() => {
        setMoviesToRend(savedMovies);
    }, [savedMovies])


    return (
        <section className='saved-movies'>
            <SearchForm
                keyWords={keyWords}
                setKeyWords={setKeyWords}
                handleMoviesSearch={handleMoviesSearch}
                setMoviesToRend={setMoviesToRend}
                isCheckBoxActive={isCheckBoxActive}
                setIsCheckBoxActive={setIsCheckBoxActive} />
            {
                savedMovies.length === 0
                    ?
                    (<p className='saved-movies__not-found'>Фильмы не найдены.</p>)
                    :

                    <MoviesCardList moviesToRender={moviesToRender} flag={flag} handleClick={handleDeleteMovie} allMovies={['anytext']} />
            }
        </section>
    );
};

export default SavedMovies;