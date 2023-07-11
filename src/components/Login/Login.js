import loginLogo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import './Login.css';
import { useFormValidation } from '../../utils/validation';

const Login = () => {
  const { values, handleChange, errors, isValid } = useFormValidation();
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
        onSubmit={(evt) => {
          evt.preventDefault();
          onLogin(values);
        }}
        className='login__form' >

        <label htmlFor='' className='login__form login__form-label'>
          E-mail
        </label>
        <input
          className='login__input login__input_item_email'
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


        <label htmlFor='' className='login__form login__form-label'>
          Пароль </label>
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
        <button type='submit' className='login__submit'>
          Войти
        </button>

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