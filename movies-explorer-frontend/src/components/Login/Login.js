import loginLogo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import './Login.css';
import { useFormAndValidation } from '../../utils/validation';

const Login = () => {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const onLogin = (val) => {
    console.log(val);
  };

  return (
    <section className='login'>
      <Link to='/'>
        {' '}
        <img className='login__logo' src={loginLogo} alt='Логотип' />
      </Link>

      <h1 className='login__heading'>Рады видеть!</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin(values);
        }}
        className='login__form' >

        <label htmlFor='' className='login__label'>
          <span className='login__placeholder'>E-mail</span>
          <input
            className='login__input'
            type='email'
            name='email'
            value={values.email || ''}
            onChange={handleChange}
            id='email'
            placeholder='email'
            minLength='2'
            maxLength='30'
            required
          />
          <span
            className={`login__input-error ${isValid ? '' : 'login__input-error_active'
              }`}
          >
            {errors.email}
          </span>
        </label>

        <label htmlFor='' className='login__label'>
          <span className='login__placeholder'>Пароль</span>
          <input
            className='login__input'
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
        </label>

        <button type='submit' className='login__button'>
          Войти
        </button>
      </form>

      <p className='login__question'>
        Еще не зарегистрированы?&nbsp;
        <Link to='/signup' className='login__link'>
          Регистрация
        </Link>
      </p>
    </section>
  );
};

export default Login;