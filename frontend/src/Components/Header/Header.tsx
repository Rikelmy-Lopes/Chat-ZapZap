import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const { pathname } = useLocation();
  const [userName, setUserName] = useState<string>('');

  const logout = () => {
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const user = JSON.parse(String(localStorage.getItem('user')));
    setUserName(user.name);
  }, []);
  
  return(
    <header>
      <p>Nome: { userName }</p>
      {
        pathname.includes('/message/') ? 
          <Link to='/contacts'>
        Contatos
          </Link>
          : null
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