import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import './Login.css';
import { IUser } from '../../Interface/Interfaces';

function Login(): JSX.Element {
  const history = useNavigate();
  const { pathname } = useLocation();
  const [ phoneNumber, setPhoneNumber ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [errorExist, setErrorExist] = useState<boolean>(false);
  const [errorStatus, setErrorStatus] = useState<number | undefined>(undefined);

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' && isAllFieldsFilledOut()) {
      validateUser();
      return;
    }
  };

  const isAllFieldsFilledOut = (): boolean => {
    if (phoneNumber.length >= 12 && password.length >= 4) {
      return true;
    }
    return false;
  };

  const removeErrorMessage = (): void => {
    setTimeout(() => {
      setErrorExist(false);
      setErrorStatus(undefined);
    }, 2500);
  };

  const displayErrorMessage = (): ReactElement | undefined => {
    if (!errorExist) return;
    if (errorStatus === 404) {
      removeErrorMessage();
      return (
        <p 
          className='error-message'
          style={ { display: 'inline-block' }}
        >
          Usuário não existe!
        </p>
      );
    }
    else if (errorStatus === 401) {
      removeErrorMessage();
      return (
        <p 
          className='error-message'
          style={ { display: 'inline-block' }}
        >
          Senha Incorreta, Tente Novamente!
        </p>
      );
    }
    removeErrorMessage();
    return (
      <p 
        className='error-message'
        style={ { display: 'inline-block' }}
      >
        Error Desconhecido!
      </p>
    );
  };

  const validateUser = async (): Promise<void> => {
    const host = process.env.REACT_APP_BACKEND_HOST;
    try {
      const { data } = await axios.post<IUser>(`${host}/login`, {
        phoneNumber,
        password,
      });
      localStorage.setItem('user', JSON.stringify(data));
      history('/chats');
      return;
    } catch (axiosError: unknown) {
      const error = axiosError as AxiosError;
      setErrorExist(true);
      setErrorStatus(error.response?.status);
      console.log(error);
    }
  };

  useEffect((): void => {
    if (pathname === '/') history('/login');
    if (localStorage.getItem('user')) history('/chats');
  }, []);
  

  return(
    <div id='login-card'>
      <div id='login'>
        <label htmlFor="phoneNumber">
          Número de Telefone:
        </label>
        <input 
          placeholder='+5538123456789' 
          type="text"
          id='phoneNumber'
          name="phoneNumber" 
          onChange={({ target }) => setPhoneNumber( target.value )}
          onKeyDown={ handleKeyDown }
        />
        <label htmlFor="password">
          Sua senha:
        </label>
        <input 
          placeholder='**********' 
          type="password" 
          id='password'
          name="password" 
          onChange={({ target }) => setPassword( target.value )}
          onKeyDown={ handleKeyDown }
        />
        <button
          id='login-button'
          onClick={ validateUser }
          disabled={ !isAllFieldsFilledOut()}
        >
        Login
        </button>
        { displayErrorMessage() }
        <div id='register-link'>
          <p>Não tem uma conta?</p>
          <Link to='/register'>
         Registre-se
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;