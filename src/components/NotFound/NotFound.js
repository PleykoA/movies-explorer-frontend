import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}
    return (
        <div className='notFound'>
            <div className='notFound__container'>
                <h2 className='notFound__title'>404</h2>
                <p className='notFound__subtitle'>Страница не найдена</p>
            </div>
            <Link onClick={goBack} href={document.referrer} className='notFound__link'>
                Назад
            </Link>
        </div>
    );
};

export default NotFound;