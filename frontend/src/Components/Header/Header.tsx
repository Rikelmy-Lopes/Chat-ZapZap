import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IUser } from '../../Interface/Interfaces';
import './Header.css';

function Header(): JSX.Element {
  const { pathname } = useLocation();
  const [userName, setUserName] = useState<string>('');

  const logout = (): void => {
    localStorage.removeItem('user');
  };

  useEffect((): void => {
    const user: IUser = JSON.parse(String(localStorage.getItem('user')));
    setUserName(user?.name);
  }, []);
  
  return(
    <header>
      <p>Nome: { userName }</p>
      {
        pathname.includes('/chats') ? 
          <Link to='/new-chat'>
          New Chat
          </Link>
          : 
          <Link to='/chats'>
          Chats
          </Link>
      }
      <Link
        to='/login'
        onClick={ logout }
      >
      Logout
      </Link>
    </header>
  );
}

export default Header;