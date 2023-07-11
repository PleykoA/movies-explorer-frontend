import React from 'react';
import FilterCheckBox from '../FilterCheckbox/FilterCheckbox';
import search from '../../images/search.svg';
import find from '../../images/find.svg';
import './SearchForm.css';

const SearchForm = () => {
    return (
        <section className='search'>
            <div className='search__container'>
                <form className='search__form'>
                    <img className='search__icon' src={search} alt='Поисковая иконка' />
                    <input type='text' className='search__input' placeholder='Фильм' />
                    <button className='search__button'>
                        <img
                            className='search__button-icon'
                            src={find}
                            alt='Кнопка поиска'
                        />
                    </button>
                </form>
                <FilterCheckBox />
            </div>
        </section>
    );
};

export default SearchForm;