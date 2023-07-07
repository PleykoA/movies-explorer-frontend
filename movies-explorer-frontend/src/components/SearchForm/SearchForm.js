import React from "react";
import FilterCheckBox from "../FilterCheckbox/FilterCheckbox";
import button from "../../images/find.svg";
import icon from "../../images/find.svg";
import "./SearchForm.css";

const SearchForm = () => {
    return (
        <section className="search">
            <div className="search__container">
                <form className="search__form">
                    <img className="search__icon" src={icon} alt="Лупа, указывающая на строку поиска" />
                    <input type="text" className="search__input" placeholder="Фильм" />
                    <button className="search__button">
                        <img
                            className="search__button-icon"
                            src={button}
                            alt="Галочка для отправки поискового запроса"
                        />
                    </button>
                </form>
                <FilterCheckBox />
            </div>
        </section>
    );
};

export default SearchForm;