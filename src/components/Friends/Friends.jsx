import React, { useContext } from 'react';

import userService from '../../services/user.js';
import { UserContext } from '../../App.jsx';

function Friends() {
  const user = useContext(UserContext);
  const friends = userService.getFriends(user);
  return (
    <section>
      <h2 className='text-xl font-bold'>Yours Friends</h2>

      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>{friend.firstName}</li>
        ))}
      </ul>
    </section>
  );
}

export default Friends;
