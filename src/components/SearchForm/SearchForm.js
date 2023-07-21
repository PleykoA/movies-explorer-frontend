import React, { useState } from 'react';
import FilterCheckBox from '../FilterCheckbox/FilterCheckbox';
import search from '../../images/search.svg';
import find from '../../images/find.svg';
import './SearchForm.css';

const SearchForm = ({
    handleMoviesSearch,
    keyWords = "",
    isCheckBoxActive,
    setIsCheckBoxActive,
}) => {
    const [isSpanActive, setIsSpanActive] = useState(false);
    const [text, setText] = useState(keyWords);

    // Обработка сабмита формы
    const handleSubmit = (e) => {
        e.preventDefault();
        if (text) {
            handleMoviesSearch(text, isCheckBoxActive);
        } else {
            setIsSpanActive(true);
        }
    };
    const handleCheckBoxClick = () => {
        setIsCheckBoxActive(!isCheckBoxActive);
    };

    // Обработка отправки формы по нажатию Enter
    const handleKeydown = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };
    const handleChange = (e) => {
        const value = e.target.value;
        setText(value);
    };

    return (
        <section className='search'>
            <div className='search__container'>
                <form className='search__form' onSubmit={handleSubmit} onKeyDown={handleKeydown} noValidate>
                    <img className='search__icon' src={search} alt='Поисковая иконка' />
                    <input
                        name="search"
                        type='text'
                        className='search__input'
                        placeholder='Фильм'
                        onChange={handleChange}
                        required />

                    <button className={`search__button ${isSpanActive ? "search__button_active" : ""
                        }`}
                        type="button"
                    >
                        <img
                            className='search__button-icon'
                            src={find}
                            alt='Кнопка поиска'
                        />
                    </button>
                </form>
                <FilterCheckBox
                    isCheckBoxActive={isCheckBoxActive}
                    handleCheckBoxClick={handleCheckBoxClick} />
            </div>
        </section>
    );
};

export default SearchForm;