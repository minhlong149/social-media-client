import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import postService from '../../services/posts.js';

function ProfilePost() {
  const { state: post } = useLocation();
  const fullPost = postService.getFullPost(post);

  return (
    <section>
      <h2 className='text-xl font-bold'>View the full post</h2>
      <p>{fullPost.caption}</p>
      <ul>
        {fullPost.comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>

      <Link to={`/${post.author}`}>
        <button className='bg-sky-500 rounded text-white px-2 py-1'>View profile</button>
      </Link>
    </section>
  );
}

export default ProfilePost;
