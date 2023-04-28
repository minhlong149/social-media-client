import React from 'react';
import { Link } from 'react-router-dom';

function Post({ post }) {
  return (
    <section>
      <p>{post.caption}</p>
      <Link to={`/${post.id}`} state={post}>
        <button className='bg-sky-500 rounded text-white px-2 py-1'>View</button>
      </Link>
    </section>
  );
}

export default Post;
