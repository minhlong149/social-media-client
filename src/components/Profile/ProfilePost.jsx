import React from 'react';
import { useLocation } from 'react-router-dom';

function ProfilePost() {
  const { state: post } = useLocation();

  return (
    <section>
      <h2 className='text-xl font-bold'>View the full post</h2>
      <p>{post.caption}</p>
    </section>
  );
}

export default ProfilePost;
