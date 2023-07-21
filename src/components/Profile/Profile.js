import React, { useContext, useEffect } from 'react';
import './Profile.css';
import { useFormValidation } from '../../utils/validation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = ({
    onSignOut,
    onUpdateUser,
    setErrorMessage,
    isDisabledEditProfile,
    setIsDisabledEditProfile }) => {
    const { values, handleChange, errors, isValid, setValues, setIsValid } = useFormValidation();
    const { currentUser } = useContext(CurrentUserContext);

    useEffect(() => {
        if (currentUser) {
            setValues(currentUser);
            setIsValid(true);
        }
    }, [currentUser, setIsValid, setValues]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser(values);
    };

    // Обработка клика на выход из профиля
    const handleCLickLogout = () => {
        onSignOut();
    };

    // Обработка клика по кнопке Редактировать
    const handleClickEdit = () => {
        setIsDisabledEditProfile(!isDisabledEditProfile);
        setErrorMessage("");
    };

    return (
        <section className='profile'>
            <h1 className='profile__heading'>Привет, {currentUser.name}!</h1>
            <form onSubmit={handleSubmit}
                className='profile__form'
            >
                <label htmlFor='name' className='profile__label'>
                    <span className='profile__placeholder'>Имя</span>
                    <input
                        type='text'
                        id='name'
                        className='profile__input'
                        onChange={handleChange}
                        placeholder='Введите имя'
                        minLength='2'
                        maxLength='40'
                        required
                    />
                    <span
                        className={`profile__input-error ${isValid ? '' : 'profile__input-error_active'
                            }`}
                    >
                        {errors.name}
                    </span>
                </label>
                <label htmlFor='email' className='profile__label'>
                    <span className='profile__placeholder'>E-mail</span>
                    <input
                        type='email'
                        id='email'
                        className='profile__input'
                        onChange={handleChange}
                        placeholder='Введите почту'
                        minLength='2'
                        maxLength='40'
                        required
                    />
                    <span
                        className={`profile__input-error ${isValid ? '' : 'profile__input-error_active'
                            }`}
                    >
                        {errors.email}
                    </span>
                </label>

                <button
                    type='submit'
                    className={`profile__button profile__button-edit ${!isValid ? `profile__button profile__button-edit_disabled` : ``}`}
                    onClick={handleClickEdit}
                >
                    Редактировать
                </button>
                <button
                    onClick={handleCLickLogout}
                    type='submit'
                    className='profile__button profile__button-signout'
                    to='/singnin'
                >
                    Выйти из аккаунта
                </button>
            </form>
        </section>
    );
};

export default Profile;