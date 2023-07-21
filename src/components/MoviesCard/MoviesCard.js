import React, { useState } from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

const MoviesCard = ({ movie, handleClick }) => {
    let location = useLocation();
    const likeBtn = location.pathname === '/movies';
    const deleteBtn = location.pathname === '/saved-movies';
    const [isLiked, setIsLiked] = useState(movie.saved);

    // Форматирование продолжительности фильма в часы
    const getTimeFromMins = (duration) => {
        let hours = Math.trunc(duration / 60);
        let minutes = duration % 60;
        return `${hours}ч ${minutes}м`;
    };

    // Обрабокта на жатия клика на иконке
    const handleClickOnIcon = () => {
        setIsLiked(!isLiked); // Меняем сстатус сохранения фильма
        handleClick(movie, isLiked); // Выполняем функцию, которая приходит в пропсах (либо из movies либо ищ saved-movies)
    };

    return (
        <li className='movies-card'>
            <div className='movies-card__info'>
                <p className='movies-card__name'>{movie.nameRU}</p>
                <p className='movies-card__duration'>{getTimeFromMins(movie.duration)}</p>
                {likeBtn && (
                    <button
                        className={`movies-card__like ${isLiked ? ' movies-card__like_active' : ''}`}></button>
                )}
                {deleteBtn && (
                    <button
                        className={`movies-card__delete`}
                        onClick={handleClickOnIcon}></button>
                )}
            </div>
            <img
                className='movies-card__image'
                src={movie.thumbnail}
                alt={movie.nameRU}
            />
        </li>
    );
};

export default MoviesCard;