import React from 'react';
import { Link } from 'react-router-dom';
import { useFormValidation } from '../../utils/validation';
import Logo from '../../images/logo.svg';
import './Register.css';

const Register = () => {
    const { values, handleChange, errors, isValid } = useFormValidation();
    const onRegister = (v) => {
        console.log(v);
    };

    return (
        <section className='register'>
            <Link to='/'>
                <img className='register__logo' src={Logo} alt='Лого сайта' />
            </Link>

            <h1 className='register__heading'>Добро пожаловать!</h1>

            <form className='register__form'
                onSubmit={(evt) => {
                    evt.preventDefault();
                    onRegister(values);
                }}
            >
                <label className='register__form-label'>
                    Имя
                </label>
                <input
                    className='register__input register__input_item_name'
                    id='user-name'
                    name='name'
                    type='text'
                    value={values.name || ''}
                    onChange={handleChange}
                    placeholder='Введите имя'
                    minLength='2'
                    maxLength='40'
                    required
                />
                <span
                    className={`register__input-error ${isValid ? '' : 'register__input-error_active'}`}
                >
                    {errors.name}
                </span>

                <label className='register__form-label'>
                    E-mail
                </label>
                <input
                    className='register__input register__input_item_email'
                    id='user-email'
                    name='email'
                    type='email'
                    value={values.email || ''}
                    onChange={handleChange}
                    placeholder='Введите почту'
                    minLength='2'
                    maxLength='40'
                    required
                />
                <span
                    className={`register__input-error ${isValid ? '' : 'register__input-error_active'}`}
                >
                    {errors.email}
                </span>

                <label className='register__form-label'>
                    Пароль
                </label>
                <input
                    className='register__input register__input_item_password'
                    id='user-password'
                    name='password'
                    type='password'
                    value={values.password || ''}
                    onChange={handleChange}
                    placeholder='Введите пароль'
                    minLength='6'
                    maxLength='200'
                    required
                />
                <span
                    className={`register__input-error ${isValid ? '' : 'register__input-error_active'}`}
                >
                    {errors.password}
                </span>

                <button
                    className='register__submit'
                    type='submit'
                    disabled={!isValid}
                >
                    Зарегистрироваться</button>

                <div className='register__signup'>
                    Уже зарегистрированы?
                    <Link to='/signin' className='register__signin'>
                        Войти
                    </Link>

                </div>
            </form>
        </section>
    );
};

export default Register;