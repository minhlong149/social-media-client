import React from 'react';
import { Link } from 'react-router-dom';
import postService from '../../services/posts.js';

function Post({ post }) {
  // const post = postService.getFullPost(post);

  return (
    <section>
      <p>Haha Quá mệt gòy</p>
      
      {/* <Link to={`/${post.author || 'posts'}/${post.id}`} state={post}>
        <button className='bg-sky-500 rounded text-white px-2 py-1'>View</button>
      </Link> */}
    </section>
  );
}

export default Post;
