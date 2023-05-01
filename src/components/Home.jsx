import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Footer from './Home/Footer.jsx';
import Header from './Home/Header.jsx';
import NewPost from './Posts/NewPost.jsx';
import Posts from './Posts/Posts.jsx';
import Profile from './Profile/Profile.jsx';
import ProfilePost from './Profile/ProfilePost.jsx';
import ProfileFriends from './Profile/ProfileFriends.jsx';
import Friends from './Friends/Friends.jsx';

function Home({ logout }) {
  return (
    <>
      <Header logout={logout} />
      <main>
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/create' element={<NewPost />} />
          <Route path='/friends' element={<Friends />} />

          <Route path='/:username' element={<Profile />} />
          <Route path='/:username/:postId' element={<ProfilePost />} />
          <Route path='/:username/friends' element={<ProfileFriends />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default Home;
