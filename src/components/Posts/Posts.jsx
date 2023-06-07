import React, { useContext } from 'react';

import { UserContext } from '../../App.jsx';
import postService from '../../services/posts.js';
import Post from './Post.jsx';

function Posts() {
  const user = useContext(UserContext);
  const posts = postService.getPostsForUser(user);
  return (
    <section>
      <h2 className='text-xl font-bold'>This is the new feed</h2>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
    
  );
}

export default Posts;
