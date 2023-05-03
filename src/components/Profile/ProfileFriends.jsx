import React from 'react';
import { useLocation } from 'react-router-dom';

import userService from '../../services/user.js';

function Friends() {
  const { state: user } = useLocation();
  const friends = userService.getFriends(user);
  
  return (
    <section>
      <h2 className='text-xl font-bold'>{user.username} Friends list</h2>

      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>{friend.firstName}</li>
        ))}
      </ul>
    </section>
  );
}

export default Friends;
