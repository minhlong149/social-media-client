import React from 'react';

import postService from '../../services/posts.js';
import Post from '../Posts/Post.jsx';

function Profile({ user }) {
  const posts = postService.getPostsByUser(user);

  return (
    <>
      <h1 className='text-2xl font-bold'>{user.firstName} profile</h1>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}

export default Profile;
