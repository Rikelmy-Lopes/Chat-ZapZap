import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

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
    <div>
      <input 
        placeholder='+5538123456789' 
        type="text" 
        name="phoneNumber" 
        onChange={({ target }) => setPhoneNumber( target.value )}
      />
      <input 
        placeholder='Sua senha' 
        type="password" 
        name="password" 
        onChange={({ target }) => setPassword( target.value )}
      />
      <button
        onClick={ validateUser }
      >
        Login
      </button>
      <Link to='/register'>
         Não tem uma conta?
      </Link>
    </div>
  );
}

export default Login;