import React from 'react';

import postService from '../../services/posts.js';
import Post from './Post.jsx';

function Posts({ user }) {
  const posts = postService.getPostsForUser(user);
  return (
    <main>
      <h2 className='text-xl font-bold'>This is the new feed</h2>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </main>
  );
}

export default Posts;
