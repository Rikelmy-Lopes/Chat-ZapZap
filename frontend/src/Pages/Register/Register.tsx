import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [ phoneNumber, setPhoneNumber ] = useState<string>('');
  const [ name, setName ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const history = useNavigate();

  const registerUser = async (): Promise<void> => {
    const host = process.env.REACT_APP_BACKEND_HOST;
    try {
      const { data: { token } } = await axios.post(`${host}/register`, {
        phoneNumber,
        name,
        password,
      });
      localStorage.setItem('token', JSON.stringify(token));
      history('/contacts');
      return;
    }
    catch (_error) {
      return;
    }
  };

  const isPhoneNumberValid = (): boolean => {
    const regex = /^\+\d{2}\d{11}$/;
    return !regex.test(phoneNumber);
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
        />
        <label htmlFor="name">
          Nome:
        </label>
        <input
          id='name'
          placeholder='Seu nome' 
          type="text"
          onChange={ ({ target }) => setName(target.value) }
        />
        <label htmlFor="password">
          Senha:
        </label>
        <input
          id='password'
          placeholder="**********" 
          type="password" 
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button
          id='register-button'
          disabled={ isPhoneNumberValid()}
          onClick={ registerUser }
        >
        Registrar
        </button>
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