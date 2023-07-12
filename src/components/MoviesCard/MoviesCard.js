import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

const MoviesCard = ({ movie }) => {
    let location = useLocation();
    const likeBtn = location.pathname === '/movies';
    const deleteBtn = location.pathname === '/saved-movies';

    return (
        <li className='movies-card'>
            <div className='movies-card__info'>
                <p className='movies-card__name'>{movie.nameRU}</p>
                <p className='movies-card__duration'>{movie.duration}</p>
                {likeBtn && (
                    <button
                        className={`movies-card__like ${movie.isLiked ? ' movies-card__like_active' : ''}`}></button>
                )}
                {deleteBtn && (
                    <button
                        className={`movies-card__delete`}></button>
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