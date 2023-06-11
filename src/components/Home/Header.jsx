import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../App.jsx';

function Header({ logout }) {
  const user = useContext(UserContext);
  const [showMenu, toggleMenu] = useState(false);
  return (
    <header className='bg-slate-200'>
      <nav className='flex justify-between max-w-7xl m-auto p-3'>
        <div className='flex items-center'>
          <Link to='/'>
            <button className='bg-black font-logo rounded text-white px-2 py-1'>Social Media</button>
          </Link>
        </div>
        <div className='flex items-center'>
          <Link to={`/search`}>
            <button className='bg-sky-500 rounded text-white px-2 py-1'>Search</button>
          </Link>
        </div>
        <div className='flex items-center relative '>
          <div className='flex items-center gap-4'>
            <Link to={`/create`}>
              <Button text='New post' />
            </Link>
            <Link to={`/notifications`}>
              <button className='flex items-center'>
                <img src='bell.svg' className='' alt='' height={20} width={20} />
              </button>
            </Link>
            <button onClick={() => toggleMenu(!showMenu)}>
              <img
                className='rounded-full '
                src={user.avatarURL ?? 'https://api.dicebear.com/6.x/notionists-neutral/svg'}
                alt=''
                width={40}
                height={40}
              />
            </button>
          </div>

          <aside
            className={`bg-slate-100 absolute top-10 ${
              showMenu || 'hidden'
            } w-72 mt-1 right-0 p-4 rounded flex flex-col gap-2 shadow-lg border border-gray-300`}
          >
            <Link to={`/${user.username}`}>
              <div className='hover:bg-gray-200 rounded p-2 hover:underline'>
                <p className='text-xl'>
                  {user.firstName} {user.lastName}
                </p>
                <p className='text-gray-600'>@{user.username}</p>
              </div>
            </Link>

            <div className='flex gap-2 justify-between'>
              <Link to={`/friends`}>
                <Button text='Friends' />
              </Link>
              <Link to={`/settings`}>
                <Button text='Settings' />
              </Link>
              <Button text='Logout' action={() => logout()} />
            </div>
          </aside>
        </div>
      </nav>
    </header>
  );
}

export default Header;

function Button({ text, action }) {
  return (
    <button
      className='border border-sky-500 rounded text-sky-500 px-2 py-1 hover:bg-sky-500 hover:text-white'
      onClick={action}
    >
      {text}
    </button>
  );
}
