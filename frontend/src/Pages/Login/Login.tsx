import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const { pathname } = useLocation();
  const history = useNavigate();
  const [ phoneNumber, setPhoneNumber ] = useState<string>();
  const [ password, setPassword ] = useState<string>();

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
        >
        Login
        </button>
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