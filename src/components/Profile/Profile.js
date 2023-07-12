import React from 'react';
import './Profile.css';
import { useFormValidation } from '../../utils/validation';

const Profile = () => {
    const { values, handleChange, errors, isValid } = useFormValidation();
    const onEditProfile = (val) => {
        console.log(val);
    };

    return (
        <section className='profile'>
            <h1 className='profile__heading'>Привет, Ася!</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                onEditProfile(values);
            }}
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
                        className={`profile-form__input-error ${isValid ? '' : 'profile-form__input-error_active'
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
                        className={`profile-form__input-error ${isValid ? '' : 'profile-form__input-error_active'
                            }`}
                    >
                        {errors.email}
                    </span>
                </label>


                <button
                    type='submit'
                    className='profile-form__button profile-form__button-edit'
                >
                    Редактировать
                </button>
                <button
                    type='submit'
                    className='profile-form__button profile-form__button-signout'
                    to='/singnin'
                >
                    Выйти из аккаунта
                </button>
            </form>
        </section>
    );
};

export default Profile;