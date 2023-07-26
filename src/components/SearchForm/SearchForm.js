import React, { useEffect } from 'react';
import FilterCheckBox from '../FilterCheckbox/FilterCheckbox';
import search from '../../images/search.svg';
import find from '../../images/find.svg';
import './SearchForm.css';
import { useLocation } from 'react-router-dom';
import { useFormValidation } from '../../utils/validation';

function SearchForm({ handleFormSubmit, displayShortFilms, shortMovies }) {
    const location = useLocation();
    const { values, handleChange } = useFormValidation({});

    function handleSubmit(e) {
        e.preventDefault();
        if (typeof values.search !== 'undefined' && values.search !== '') {
            if (values.search.trim() !== '') {
                handleFormSubmit(values.search, false)
            } else {
                localStorage.removeItem(`movieSearch`);
                handleFormSubmit(values.search, true)
            }
        } else {
            localStorage.removeItem(`movieSearch`);
            handleFormSubmit(values.search, true)
        }
    };

    useEffect(() => {
        if (location.pathname === '/movies' && localStorage.getItem(`movieSearch`)) {
            const searchValues = localStorage.getItem(`movieSearch`);
            values.search = searchValues;
        }
    }, [location.pathname]);

    return (
        <section className='search'>
            <div className='search__container'>
                <form className='search__form' onSubmit={handleSubmit} noValidate>
                    <img className='search__icon' src={search} alt='Поисковая иконка' />
                    <input
                        name="search"
                        type='text'
                        className='search__input'
                        placeholder='Фильм'
                        onChange={handleChange}
                        value={values.search || ''}
                        required />

                    <button className='search__button'
                        type="submit"
                    >

                        <img
                            className='search__button-icon'
                            src={find}
                            alt='Кнопка поиска'
                        />
                    </button>
                </form>
                <FilterCheckBox
                    onCheck={() => { displayShortFilms(values.search) }}
                    isChecked={shortMovies ? true : false} />
            </div>
        </section>
    );
};

export default SearchForm;