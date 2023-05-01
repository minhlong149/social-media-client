import React from 'react';
import { useParams, Link } from 'react-router-dom';

import postService from '../../services/posts.js';
import userService from '../../services/user.js';
import Post from '../Posts/Post.jsx';

function Profile() {
  const { username } = useParams();
  const user = userService.getUserByUsername(username);
  const posts = postService.getPostsByUser(user);

  return (
    <section>
        <h2 className='text-xl font-bold'>Welcome to {user.firstName} profile</h2>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}

        <Link to={`/${user.username}/friends`} state={user}>
          <button className='bg-sky-500 rounded text-white px-2 py-1'>View friend list</button>
        </Link>
    </section>
  );
}

export default Profile;
