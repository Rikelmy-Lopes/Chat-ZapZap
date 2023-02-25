import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [ phoneNumber, setPhoneNumber ] = useState<string>();
  const [ name, setName ] = useState<string>();
  const [ password, setPassword ] = useState<string>();
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

  return(
    <div>
      <input 
        placeholder='Exemplo: +5538123456789' 
        type="text" 
        onChange={ ({ target }) => setPhoneNumber(target.value) }
      />
      <input 
        placeholder='Seu nome' 
        type="text"
        onChange={ ({ target }) => setName(target.value) }
      />
      <input 
        placeholder='Sua Senha' 
        type="password" 
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <button
        onClick={ registerUser }
      >
        Registrar
      </button>
    </div>
  );
}

export default Register;