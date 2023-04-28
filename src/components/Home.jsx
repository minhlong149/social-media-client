import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Posts from './Posts/Posts.jsx';

// The Home function defines the home page for the social media app.

function Home({ user, logout }) {
  return (
    <>
      <h1 className='text-2xl font-bold'>Hello, {user.firstName}</h1>
      <button className='bg-sky-500 rounded text-white px-2 py-1' onClick={logout}>
        Log out
      </button>

      <Routes>
        <Route path='/' element={<Posts user={user} />} />
      </Routes>
    </>
  );
}

export default Home;
