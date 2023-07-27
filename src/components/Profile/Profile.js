import React, { useEffect, useContext, useState } from 'react';
import './Profile.css';
import { useFormValidation } from '../../utils/validation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { validateEmail } from '../../utils/validation';

function Profile({ onSignOut, handleProfileEdit }) {
    const { errors, values, handleChange, isValid, setValues, setIsValid } =
        useFormValidation();
    const currentUser = useContext(CurrentUserContext);
    const [showSaveBtn, setShowSaveBtn] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setValues(currentUser);
            setIsValid(true);
        }
    }, [currentUser, setIsValid, setValues]);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleProfileEdit(values);
        document.getElementById('name').setAttribute('disabled', 'disabled');
        document.getElementById('email').setAttribute('disabled', 'disabled');
        setShowSaveBtn(false);
    };

    useEffect(() => {
        setIsChanged(false);
        if ((currentUser.name !== values.name && currentUser.email !== values.email) || (currentUser.name !== values.name || currentUser.email !== values.email)) {
            setIsChanged(true);
        } else {
            setIsChanged(false);
        }
    }, [handleChange, isChanged]);

    return (
        <section className='profile'>
            <h1 className='profile__heading'>{`Привет, ${currentUser.name || ''}!`}</h1>
            <form onSubmit={handleSubmit}
                className='profile__form'
                noValidate
            >
                <label htmlFor='name' className='profile__label'>
                    <span className='profile__placeholder'>Имя</span>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        className='profile__input'
                        onChange={(e) => { handleChange(e); }}
                        placeholder='Введите имя'
                        defaultValue={currentUser.name || ''}
                        minLength='2'
                        maxLength='40'
                        required
                        disabled
                    />
                    <span
                        className={`profile__input-error ${isValid ? '' : 'profile__input-error_active'}`}
                    >
                        {errors.name}
                    </span>
                </label>
                <label htmlFor='email' className='profile__label'>
                    <span className='profile__placeholder'>E-mail</span>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        pattern='/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,10})+$/'
                        className='profile__input'
                        onChange={handleChange}
                        placeholder='Введите почту'
                        defaultValue={currentUser.email || ''}
                        minLength='2'
                        maxLength='40'
                        required
                        disabled
                    />
                    <span
                        className={`profile__input-error ${!validateEmail(values.email).invalid ? '' : 'profile__input-error_active'}`}
                    >
                        {validateEmail(values.email).message}
                    </span>
                </label>

                {showSaveBtn ? (
                    <button
                        type='submit'
                        className={`profile__button profile__button-save ${((isValid && !validateEmail(values.email).invalid) && isChanged) ? '' : 'disabled'}`}
                        onClick={(e) => {
                            document.getElementById('name').setAttribute('disabled', 'disabled');
                            document.getElementById('email').setAttribute('disabled', 'disabled');
                        }}

                    >
                        Сохранить
                    </button>
                ) : (
                    <button
                        type='submit'
                        className={`profile__button profile__button-edit ${!isValid ? `profile__button profile__button-edit_disabled` : ``}`}
                        onClick={(e) => {
                            e.preventDefault();
                            setShowSaveBtn(true);
                            document.getElementById('name').removeAttribute('disabled');
                            document.getElementById('email').removeAttribute('disabled');
                        }}
                    >
                        Редактировать
                    </button>)}
                <button
                    onClick={onSignOut}
                    type='button'
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