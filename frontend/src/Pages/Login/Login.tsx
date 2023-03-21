import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import './Login.css';
import { IApiResponseMessage, IUser } from '../../Interface/Interfaces';

function Login() {
  const history = useNavigate();
  const { pathname } = useLocation();
  const [ phoneNumber, setPhoneNumber ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');

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
    const tagError:HTMLElement | null = document.getElementById('error-message');
    if(!tagError) return;
    setTimeout(() => {
      tagError.style.display = 'none';
      tagError.innerText = '';
    }, 2500);
  };

  const displayErrorMessage = (error: AxiosError<IApiResponseMessage>): void => {
    const message = error?.response?.data?.message;
    const tagError: HTMLElement | null = document.getElementById('error-message');
    if (!tagError) return;
    if (message === 'User not Found') {
      tagError.style.display = 'inline-block';
      tagError.innerText = 'Usuário não existe!';
      removeErrorMessage();
      return;
    }
    tagError.style.display = 'inline-block';
    tagError.innerText = 'Senha Incorreta, Tente Novamente!';
    removeErrorMessage();
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
    } catch (error) {
      displayErrorMessage(error as AxiosError<IApiResponseMessage>);
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
        <p id='error-message'></p>
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