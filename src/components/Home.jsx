import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Footer from './Home/Footer.jsx';
import Header from './Home/Header.jsx';
import NewPost from './Posts/NewPost.jsx';
import Posts from './Posts/Posts.jsx';
import Profile from './Profile/Profile.jsx';
import ProfilePost from './Profile/ProfilePost.jsx';
import ProfileFriends from './Profile/ProfileFriends.jsx';
import Friends from './Friends/Friends.jsx';
import Search from './Search/Search.jsx';
import Notifications from './Notifications/Notifications.jsx';
import Settings from './Settings/Settings.jsx';
import { socket } from '../services/socket.js';
import { UserContext } from '../App.jsx';

function Home({ logout }) {
  const user = useContext(UserContext)
  // useEffect(() => {
  //   console.log(user);
  //   socket.auth = { user };
  //   socket.connect();

  //   console.log('socket connected');

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [user]);

  return (
    <>
      <Header logout={logout} />
      <main>
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/create' element={<NewPost />} />
          <Route path='/friends' element={<Friends />} />
          <Route path='/search' element={<Search />} />
          <Route path='/notifications' element={<Notifications />} />
          <Route path='/settings' element={<Settings />} />

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
