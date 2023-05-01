import React, { useContext } from 'react';

import postService from '../../services/posts.js';
import Post from '../Posts/Post.jsx';
import { UserContext } from '../../App.jsx';

function Profile() {
  const user = useContext(UserContext);
  const posts = postService.getPostsByUser(user);

  return (
    <section>
      <h2 className='text-xl font-bold'>Welcome to {user.firstName} profile</h2>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  );
}

export default Profile;
