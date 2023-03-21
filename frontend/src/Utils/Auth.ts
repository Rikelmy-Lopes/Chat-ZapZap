import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { IUser } from '../Interface/Interfaces';

const validateToken = async (history: NavigateFunction): Promise<void> => {
  const host = process.env.REACT_APP_BACKEND_HOST;
  const { token }: IUser = JSON.parse(String(localStorage.getItem('user'))) || {};
  try {
    await axios.post(`${host}/login/token`, {
      token
    });
    return;
  }
  catch(_error) {
    localStorage.removeItem('user');
    history('/login');
    return;
  }
};

export { 
  validateToken
};