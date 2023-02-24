import axios from 'axios';
import React, { useCallback, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';

function Contacts() {
  const history = useNavigate();

  const validateToken = async (): Promise<void> => {
    const host = process.env.REACT_APP_BACKEND_HOST;
    try {
      await axios.post(`${host}/login/token`, {
        token: JSON.parse(String(localStorage.getItem('token')))
      });
      return;
    }
    catch(_error) {
      localStorage.removeItem('token');
      history('/login');
      return;
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return(
    <div>
      <Header/>
    </div>
  );
}

export default Contacts;