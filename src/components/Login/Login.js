import React, { useEffect } from 'react';
import loginLogo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import './Login.css';
import { useFormValidation } from '../../utils/validation';
import { validateEmail } from '../../utils/validation';

const Login = ({ onLogin }) => {
  const { values, handleChange, errors, resetValidation, isValid } = useFormValidation({});

  useEffect(() => {
    resetValidation();
  }, [resetValidation]);

  function handleSubmit(evt) {
    evt.preventDefault(evt);
    const { email, password } = values
    onLogin(email, password);
  }

  return (
    <section className='login'>
      <Link to='/'>
        {' '}
        <img className='login__logo' src={loginLogo} alt='Логотип' />
      </Link>

      <h1 className='login__heading'>Рады видеть!</h1>
      <form
        className='login__form'
        onSubmit={handleSubmit}>

        <label htmlFor='' className='login__form-label'>
          E-mail
        </label>
        <input
          className='login__input login__input_item_email'
          type='email'
          name='email'
          value={values.email || ''}
          onChange={handleChange}
          id='email'
          pattern='/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,10})+$/'
          placeholder='E-mail'
          minLength='2'
          maxLength='30'
          required
        />
        <span
          className={`login__input-error ${isValid && !validateEmail(values.email).invalid ? '' : 'login__input-error_active'
            }`}
        >
          {validateEmail(values.email).message}
        </span>

        <label htmlFor='' className='login__form-label'>Пароль</label>
        <input
          className='login__input login__input_item_password'
          type='password'
          name='password'
          value={values.password || ''}
          onChange={handleChange}
          id='password'
          placeholder='Пароль'
          minLength='7'
          maxLength='14'
          required
        />
        <span
          className={`login__input-error ${isValid ? '' : 'login__input-error_active'
            }`}
        >
          {errors.password}
        </span>

        <button type='submit'
          className={`login__submit ${!isValid && validateEmail(values.email).invalid ? `login__submit_disabled` : ``}`} disabled={!isValid && validateEmail(values.email).invalid}>Войти</button>

        <div className='login__signup'>
          Еще не зарегистрированы?
          <Link to='/signup' className='login__signin'>
            Регистрация
          </Link>

        </div>
      </form>
    </section>
  );
};

export default Login;