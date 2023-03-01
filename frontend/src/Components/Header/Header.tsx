import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const { pathname } = useLocation();

  const logout = () => {
    localStorage.removeItem('token');
  };
  
  return(
    <header>
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