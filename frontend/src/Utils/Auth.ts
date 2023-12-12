import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { IUser } from '../Interface/Interfaces';

const validateToken = async (history: NavigateFunction): Promise<void> => {
  const host = import.meta.env.VITE_BACKEND_HOST;
  const { token }: IUser = JSON.parse(String(localStorage.getItem('user'))) || {};
  try {
    await axios.get(`${host}/login/token`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    return;
  }
  catch(error) {
    console.error(error);
    localStorage.removeItem('user');
    history('/login');
    return;
  }
};

export {
  validateToken
};
