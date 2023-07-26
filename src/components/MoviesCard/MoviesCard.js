import React from 'react';
import './MoviesCard.css';
import { getTime } from '../../utils/utils';
import { MOVIES_URL } from '../../utils/constants';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movie, savedMoviesList, onLike, onDelete }) {
    let location = useLocation();
    const isLike = location.pathname === '/movies';
    const isDelete = location.pathname === '/saved-movies';
    const isLiked = savedMoviesList ? savedMoviesList.some((i) => i.movieId === movie.id) : false;
    const saved = savedMoviesList ? savedMoviesList.find((item) => item.movieId === movie.id) : '';

    return (
        <li className='movies-card'>
            <div className='movies-card__info'>
                <p className='movies-card__name'>{movie.nameRU}</p>
                <p className='movies-card__duration'>{getTime(movie.duration)}</p>
                {isLike && (
                    <button
                        onClick={() => onLike(movie, isLiked, saved?._id)}
                        className={`movies-card__like ${isLiked ? ' movies-card__like_active' : ''}`} type='button'
                    ></button>
                )}

                {isDelete && (
                    <button
                        onClick={() => onDelete(movie._id)}
                        className={'movies-card__delete'}
                    ></button>
                )}

            </div><a href={movie.trailerLink} target='_blank' rel='noreferrer'><img
                className='movies-card__image'
                src={movie.image.url ? `${MOVIES_URL}${movie.image.url}` : movie.image}
                alt={movie.nameRU}
                title={`${movie.description} \n\n ${movie.country} ${movie.year}г.`}
            />
            </a>
        </li>
    );
};


export default MoviesCard;