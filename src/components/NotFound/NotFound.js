import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='notFound'>
            <div className='notFound__container'>
                <h2 className='notFound__title'>404</h2>
                <p className='notFound__subtitle'>Страница не найдена</p>
            </div>
            <Link to='/' className='notFound__link'>
                Назад
            </Link>
        </div>
    );
};

export default NotFound;