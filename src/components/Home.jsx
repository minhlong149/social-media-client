import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './Home/Header.jsx';
import NewPost from './Posts/NewPost.jsx';
import Posts from './Posts/Posts.jsx';
import Profile from './Profile/Profile.jsx';
import ProfilePost from './Profile/ProfilePost.jsx';

// The Home function defines the home page for the social media app.

function Home({ user, logout }) {
  return (
    <>
      <Header logout={logout} user={user} />
      <Routes>
        <Route path='/' element={<Posts user={user} />} />
        <Route path='/create' element={<NewPost user={user} />} />

        <Route path='/:username' element={<Profile user={user} />} />
        <Route path='/:username/:postId' element={<ProfilePost />} />
      </Routes>
    </>
  );
}

export default Home;
