import React, { useContext } from 'react';

import userService from '../../services/user.js';
import { UserContext } from '../../App.jsx';
import NavBar from '../Home/NavBar.jsx';

function Friends() {
  const user = useContext(UserContext);
  const friends = userService.getFriends(user);
  return (
    <section>
      <div className='md:flex mt-4 max-w-4xl mx-auto gap-6 mb-24 md:mb-0'>
      <NavBar></NavBar>
      <h2 className='text-xl font-bold'>Yours Friends</h2>

      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>{friend.firstName}</li>
        ))}
        </ul>
      </div>
    </section>
  );
}

export default Friends;
