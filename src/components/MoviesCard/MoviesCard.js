import React from 'react';
import './MoviesCard.css';
import film from '../../images/film.svg'
const MoviesCard = ({ movie }) => {

    return (
        <li className='movies-card'>
            <div className='movies-card__info'>
                <p className='movies-card__name'>Какой-то фильм</p>
                <p className='movies-card__duration'>
                </p>
                {movie
                    ? <button className='movies-card__delete' type='button' />
                    : <button className='movies-card__like' type='button' />}

                <img className='movies-card__image'
                    src={film}
                    alt='Обложка кинофильма' />
            </div>
        </li>
    );
};

export default MoviesCard;