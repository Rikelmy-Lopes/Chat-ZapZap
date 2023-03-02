import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios, { Axios, AxiosError } from 'axios';
import './Login.css';

function Login() {
  const { pathname } = useLocation();
  const history = useNavigate();
  const [ phoneNumber, setPhoneNumber ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');

  const isAllFieldsFilledOut = () => {
    if (phoneNumber.length >= 12 && password.length >= 4) {
      return true;
    }
    return false;
  };

  const removeErrorMessage = () => {
    const tagError = document.getElementById('error-message') as HTMLElement;
    setTimeout(() => {
      tagError.style.display = 'none';
      tagError.innerText = '';
    }, 2500);
  };

  const displayErrorMessage = (error: any): void => {
    const { data: { message } } = error.response;
    const tagError = document.getElementById('error-message') as HTMLElement;
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
      const { data: { token } } = await axios.post(`${host}/login`, {
        phoneNumber,
        password,
      });
      localStorage.setItem('token', JSON.stringify(token));
      history('/contacts');
      return;
    } catch (error) {
      displayErrorMessage(error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (pathname === '/') history('/login');
    if (localStorage.getItem('token')) history('/contacts');
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