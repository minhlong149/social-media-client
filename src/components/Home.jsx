import React, { useContext, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import Footer from './Home/Footer.jsx';
import Header from './Home/Header.jsx';
import NewPost from './Posts/NewPost.jsx';
import Posts from './Posts/Posts.jsx';
import Post from './Posts/Post.jsx';
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
  const user = useContext(UserContext);

  const [message, setMessage] = React.useState('');

  useEffect(() => {
    socket.auth = { user };
    socket.connect();

    console.log('socket connected');

    socket.on('friendRequest', ({ userId, username }) => {
      console.log(`you received friend request from ${username}`);
      setMessage(`${username} sent you a friend request`, userId);
      setTimeout(() => setMessage(''), 5000);
    });

    socket.on('friendRequestAccepted', ({ userId, username }) => {
      console.log(`your friend request was accepted by ${username}`);
      setMessage(`${username} accepted your friend request`, userId);
      setTimeout(() => setMessage(''), 5000);
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return (
    <>
      <Header logout={logout} />
      <main>
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/post/:postid' element={<Post />}/>
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
      <Aside message={message} />
    </>
  );
}

export default Home;

function Aside({ message }) {
  if (message === '') return <></>;
  return (
    <Link to='/notifications'>
      <aside className='absolute bottom-6 right-6'>
        <div className='bg-blue-400 rounded-lg shadow-lg p-4 border border-blue-500'>
          <p className='text-sm text-white'>{message}</p>
        </div>
      </aside>
    </Link>
  );
}
