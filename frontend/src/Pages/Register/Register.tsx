import axios, { AxiosError } from 'axios';
import React, { ReactElement, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

function Register(): JSX.Element {
  const history = useNavigate();
  const [ phoneNumber, setPhoneNumber ] = useState<string>('');
  const [ name, setName ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [errorExist, setErrorExist] = useState<boolean>(false);
  const [errorStatus, setErrorStatus] = useState<number | undefined>(undefined);

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' && isAllFieldsFilledOut()) {
      registerUser();
      return;
    }
  };

  const removeErrorMessage = (): void => {
    setTimeout(() => {
      setErrorExist(false);
      setErrorStatus(undefined);
    }, 2500);
  };

  const displayErrorMessage = (): ReactElement | undefined => {
    if (!errorExist) return;
    if (errorStatus === 409) {
      removeErrorMessage();
      return (
        <p 
          className='error-message'
          style={ { display: 'inline-block' }}
        >
          Usuário já Existe!
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

  const registerUser = async (): Promise<void> => {
    const host = process.env.REACT_APP_BACKEND_HOST;
    try {
      const { data } = await axios.post(`${host}/register`, {
        phoneNumber,
        name,
        password,
      });
      localStorage.setItem('user', JSON.stringify(data));
      history('/chats');
    }
    catch (axiosError: unknown) {
      const error = axiosError as AxiosError;
      setErrorExist(true);
      setErrorStatus(error.response?.status);
      console.log(error);
    }
  };

  const isAllFieldsFilledOut = (): boolean => {
    if (phoneNumber.length >= 12 && password.length >= 6 && name.length >= 4) {
      return true;
    }
    return false;
  };

  return(
    <div id='register-card'>
      <div id='register'>
        <label htmlFor="phoneNumber">
          Número de Telefone:
        </label>
        <input 
          placeholder='Exemplo: +5538123456789' 
          type="text" 
          id='phoneNumber'
          onChange={ ({ target }) => setPhoneNumber(target.value) }
          onKeyDown={ handleKeyDown }
        />
        <label htmlFor="name">
          Nome:
        </label>
        <input
          id='name'
          placeholder='Seu nome' 
          type="text"
          onChange={ ({ target }) => setName(target.value) }
          onKeyDown={ handleKeyDown }
        />
        <label htmlFor="password">
          Senha:
        </label>
        <input
          id='password'
          placeholder="**********" 
          type="password" 
          onChange={ ({ target }) => setPassword(target.value) }
          onKeyDown={ handleKeyDown }
        />
        <button
          id='register-button'
          disabled={ !isAllFieldsFilledOut()}
          onClick={ registerUser }
        >
        Registrar
        </button>
        {
          displayErrorMessage()
        }
        <div id='login-link'>
          Já tem uma conta?
          <Link to='/login'>
          Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;