import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../App.jsx';

function Header({ logout }) {
  const user = useContext(UserContext);
  return (
    <header>
      <nav>
        <Link to='/'>
          <button className='bg-sky-500 rounded text-white px-2 py-1'>Home</button>
        </Link>
        <Link to={`/create`}>
          <button className='bg-sky-500 rounded text-white px-2 py-1'>New post</button>
        </Link>
        <Link to={`/${user.username}`}>
          <button className='bg-sky-500 rounded text-white px-2 py-1'>Profile</button>
        </Link>
        <button className='bg-sky-500 rounded text-white px-2 py-1' onClick={logout}>
          Log out
        </button>
      </nav>
    </header>
  );
}

export default Header;
