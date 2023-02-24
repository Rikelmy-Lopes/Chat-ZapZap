import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const { pathname } = useLocation();
  const history = useNavigate();
  const [ phoneNumber, setPhoneNumber ] = useState<string>();
  const [ password, setPassword ] = useState<string>();

  const validateUser = async (): Promise<void> => {
    const host = process.env.REACT_APP_BACKEND_HOST;
    console.log(host);
    const { status } = await axios.post(`${host}/login`, {
      phoneNumber,
      password,
    });

    if (status === 200) return history('/contacts');
    return; 
  };

  useEffect(() => {
    if (pathname === '/') history('/login');
    
  }, []);

  return(
    <div>
      <input 
        placeholder='+5538123456789' 
        type="text" 
        name="phoneNumber" 
        id=""
        onChange={({ target }) => setPhoneNumber( target.value )}
      />
      <input 
        placeholder='Sua senha' 
        type="password" 
        name="password" 
        id=""
        onChange={({ target }) => setPassword( target.value )}
      />
      <button
        onClick={ validateUser }
      >
        Login
      </button>
    </div>
  );
}

export default Login;