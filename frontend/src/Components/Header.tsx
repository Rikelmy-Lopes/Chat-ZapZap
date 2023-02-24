import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const logout = () => {
    localStorage.removeItem('token');
  };

  return(
    <div>
      <Link
        to='/login'
        onClick={ logout }
      >
      Logout
      </Link>
    </div>
  );
}

export default Header;