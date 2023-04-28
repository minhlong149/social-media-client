import React from 'react';
import { Link } from 'react-router-dom';

function Header({ logout, user }) {
  return (
    <header>
      <h1 className='text-2xl font-bold'>Hello, {user.firstName}</h1>

      <nav>
        <Link to='/'>
          <button className='bg-sky-500 rounded text-white px-2 py-1'>Home</button>
        </Link>
        <button className='bg-sky-500 rounded text-white px-2 py-1' onClick={logout}>
          Log out
        </button>
      </nav>
    </header>
  );
}

export default Header;
